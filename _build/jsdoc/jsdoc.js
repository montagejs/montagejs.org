#!/usr/bin/env node
/*global __dirname */
"use strict";

var Q = require("q");
var npm = require("npm");
var path = require("path");
var spawn = require('child_process').spawn;
var exec = require("child_process").exec;
var fs = require("fs");

var mainPath = __dirname;
var config = {
   prefix : mainPath,
   production : true
};


module.exports = function (packageName, tag, outDir) {
    return Q.ninvoke(npm, "load", config)
    .then(function (loadedNpm) {
        var defer = Q.defer();
        if(tag === "npm-link") {
            console.log('npm link',  packageName);
            exec("npm link " + packageName, {cwd: mainPath}, function(error) {
                if (error) {
                    defer.reject(error);
                } else {
                    defer.resolve();
                }
            });
        } else {
            console.log('npm install',  packageName +"@"+ tag);
            exec("npm install " + packageName +"@"+ tag, {cwd: mainPath}, function(error) {
                if (error) {
                    defer.reject(error);
                } else {
                    defer.resolve();
                }
            });
        }
        return defer.promise;
    })
    .then(function() {
        var defer = Q.defer();
        var repositoryId = require("./"+ packageName).repositoryId;
        if (tag === "npm-link" && repositoryId) {
            var montagePath = path.join(mainPath, "..", "node_modules", packageName);

            exec("git show -s --format=%B " + repositoryId.sha, {cwd: montagePath}, function(error, stdout) {
                if (error) {
                    defer.reject(error);
                } else {
                    if (stdout.trim() === repositoryId.message) {
                        exec("git rev-parse HEAD", {cwd: montagePath}, function(error, stdout) {
                            if (error) {
                                defer.reject(error);
                            } else {
                                var sha = stdout.trim();
                                defer.resolve(sha);
                            }
                        });
                    } else {
                        defer.reject(packageName + " is not a known repo.");
                    }
                }
            });
        } else {
            defer.resolve("");
        }
        return defer.promise;
    })
    .then(function(sha) {
        var defer = Q.defer();

        if (tag === "latest" || tag === "npm-link") {
            tag = "v" + require(packageName + "/package.json").version;
        }

        function saveCommitish(commitish) {
            var configPath = path.join(mainPath, packageName+ ".json");
            console.log("Save commit-ish (" + commitish + ") to " + configPath);
            var json = fs.readFileSync(configPath);
            var config = JSON.parse(json);
            config.opts.commitish = commitish;
            fs.writeFileSync(configPath, JSON.stringify(config, null, "    "));
        }

        if (sha) {
            var montagePath = path.join(mainPath, "../node_modules/" + packageName);
            exec("git tag --points-at " + sha, {cwd: montagePath}, function(error, stdout) {
                if (error) {
                    defer.reject(error);
                } else {
                    var tag = stdout.trim();
                    if (tag) {
                        saveCommitish(tag);
                    } else {
                        saveCommitish(sha);
                    }
                    defer.resolve();
                }
            });
        } else {
            saveCommitish(tag);
            defer.resolve();
        }

        return defer.promise;
    })
    .then(function () {
        var jsdocGeneration = Q.defer();

        var args = ["-c", path.join(mainPath,packageName+ ".json")];
        if (outDir) {
            args.push("-d", outDir);
        }

        var jsdoc = spawn(
            path.join(mainPath,'../node_modules/jsdoc/jsdoc'),
            args,
            {
                cwd: mainPath,
                stdio: "inherit"
            });
        console.log('executing:',  path.join(mainPath,'../node_modules/jsdoc/jsdoc'), args.join(" "));
        jsdoc.on('close', function (code, signal) {
            if (signal) {
                jsdocGeneration.reject(new Error(signal));
            } else {
                jsdocGeneration.resolve();
            }
        });

        return jsdocGeneration.promise;
    }).then(function () {
        console.log('jsdoc generated.');
    });
};

if (!module.parent) {
    if (process.argv.length == 5) {
        module.exports.apply(null, process.argv.slice(2)).done();
    } else {
        console.log('Usage:\n  ./jsdoc.js <package name> <release | "npm-link"> <output path>');
        console.log();
        console.log('  package name: "montage" or "digit"');
        console.log();
        console.log('       release: a version of the package released on the npm registry or');
        console.log('                "npm-link" to use the version linked by the npm command');
        console.log();
        console.log('   output path: a directory to generate the docs into');
        process.exit(1);
    }
}
