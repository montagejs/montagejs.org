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

//deal with argv

var outDir, packageName, tag;

if (process.argv[2] === "-out") {
    outDir = process.argv[3];
    packageName = process.argv[4];
} else {
    packageName = process.argv[2];
}


if (!packageName) {
    packageName = "montage";
    tag = "latest";
} else if (packageName.indexOf("@") !== -1) {
    var what = String.prototype.split.call(packageName,"@");
    packageName = what[0];
    tag = what[1];
}




Q.ninvoke(npm, "load", config)
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
            path.join(mainPath,'node_modules/jsdoc/jsdoc'),
            args,
            {
                cwd: mainPath
            });
        console.log('executing:',  path.join(mainPath,'node_modules/jsdoc/jsdoc'), args.join(" "));
        jsdoc.on('close', function (code, signal) {
            if (signal) {
                jsdocGeneration.reject(new Error(signal))
            } else {
                jsdocGeneration.resolve()
            }
        });

        return jsdocGeneration.promise;
    }).then(function (version) {
        console.log('jsdoc generated.');
    })
    .done();
