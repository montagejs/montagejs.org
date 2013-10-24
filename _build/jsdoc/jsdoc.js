#!/usr/bin/env node
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


module.exports = function (outDir, packageName, tag) {
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
        if (tag === "npm-link") {
            var montagePath = path.join(mainPath, "../node_modules/montage");
            exec("git show -s --format=%B 11ccc5566986d891716837105385daaaf8884980", {cwd: montagePath}, function(error, stdout, stderr) {
                if (error) {
                    defer.reject(error);
                } else {
                    if (stdout.trim() === "Even Rocky had a montage.") {
                        exec("git rev-parse HEAD", {cwd: montagePath}, function(error, stdout, stderr) {
                            if (error) {
                                defer.reject(error);
                            } else {
                                var sha = stdout.trim();
                                defer.resolve(sha);
                            }
                        });
                    } else {
                        defer.reject(montagePath + " is not a montage repo.");
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
            tag = "v" + require("montage/package.json").version;
        }

        function saveCommitish(commitish) {
            var configPath = path.join(mainPath, "montage.json");
            console.log("Save commit-ish (" + commitish + ") to " + configPath);
            var json = fs.readFileSync(configPath);
            var config = JSON.parse(json);
            config.opts.commitish = commitish;
            fs.writeFileSync(configPath, JSON.stringify(config, null, "    "));
        }

        if (sha) {
            var montagePath = path.join(mainPath, "../node_modules/montage");
            exec("git tag --points-at " + sha, {cwd: montagePath}, function(error, stdout, stderr) {
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

        var args = ["-c", path.join(mainPath,"montage.json")];
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
    }).then(function (version) {
        console.log('jsdoc generated.');
    });
};

if (!module.parent) {
    if (process.argv.length == 5) {
        module.exports.apply(null, process.argv.slice(2));
    } else {
        console.log("Usage:\n  ./jsdoc.js ../../api/ ~/Code/montage/montage/ npm-link");
        process.exit(1);
    }
}
