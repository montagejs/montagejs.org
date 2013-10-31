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
        if(tag === "npm-link") {
            console.log('npm link',  packageName);
            return Q.ninvoke(loadedNpm.commands, "link", [packageName]);
        } else {
            console.log('npm install',  packageName +"@"+ tag);
            return Q.ninvoke(loadedNpm.commands, "install", [packageName +"@"+ tag]);
        }
    })
    .then(function() {
        var defer = Q.defer();
        var repo = {
            montage: {
                sha: "11ccc5566986d891716837105385daaaf8884980",
                message: "Even Rocky had a montage."
            },
            digit: {
                sha: "d8114c47bdee76b8f750c39dfc95bfee8a6ac341",
                message: "New digit logo"
            },
            matte: {
                sha: "1713cf2df3ac98860a69362a772935d6d41cfe92",
                message: "Find and replace montage for matte..."
            }
        };
        if (tag === "npm-link" && repo[packageName]) {
            var montagePath = path.join(mainPath, "..", "node_modules", packageName);

            exec("git show -s --format=%B " + repo[packageName].sha, {cwd: montagePath}, function(error, stdout) {
                if (error) {
                    defer.reject(error);
                } else {
                    if (stdout.trim() === repo[packageName].message) {
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
    if (process.argv.length == 4) {
        module.exports.apply(null, process.argv.slice(2));
    } else {
        console.log("Usage:\n  ./jsdoc.js montage npm-link [output path]");
        process.exit(1);
    }
}
