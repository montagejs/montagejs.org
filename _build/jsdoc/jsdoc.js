"use strict";

var Q = require("q");
var npm = require("npm");
var path = require("path");
var spawn = require('child_process').spawn;

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
