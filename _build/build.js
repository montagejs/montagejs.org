#!/usr/bin/env node

var FS = require("fs");
var PATH = require("path");
var Q = require("q");
var Writable = require("stream").Writable;
/*jshint node:true */
var shell = require('shelljs'); // nicer scripting interface

var spawn = require("child_process").spawn;
/**
 * Wrap executing a command in a promise
 * @param  {string} command command to execute
 * @param  {Array<string>} args    Arguments to the command.
 * @param  {string} cwd     The working directory to run the command in.
 * @return {Promise}        A promise for the completion of the command.
 */
var exec = function (command, args, cwd, silent) {
    var deferred = Q.defer();
    cwd = cwd || process.cwd();

    if (!silent) {
        console.log("+", command, args.join(" "), "# in", cwd);
    }
    var proc = spawn(command, args, {
        cwd: cwd,
        stdio: silent ? "ignore" : "inherit"
    });
    proc.on('exit', function(code) {
        if (code !== 0) {
            deferred.reject(new Error(command + " " + args.join(" ") + " in " + cwd + " exited with code " + code));
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
};

// if (
//     exec("git ls-files --exclude-standard --others", {silent: true}).output !== "" ||
//     exec("git diff-index --quiet HEAD").code !== 0
// ) {
//     // throw new Error("Uncommited changes found. Stopping.");
// }

var APPS = {
    "popcorn": "https://github.com/montagejs/popcorn.git"
};

var TEMP_DIR;

// start

// var TEMP_DIR = exec("mktemp -d -t montagejs_org_temp.XXXXXX").output;

function cloneAndMopApps(apps) {
    return Q.all(Object.keys(apps).map(function (name) {
        var repo = apps[name];
        var outPath = PATH.join(process.cwd(), "apps", name);
        var clonePath = PATH.join(TEMP_DIR, name);

        return exec("git", ["clone", repo, clonePath])
        .then(function () {
            return exec("npm", ["install"], clonePath);
        })
        .then(function () {
            var montageVersion = JSON.parse(FS.readFileSync(PATH.join(clonePath, "package.json"))).dependencies.montage;
            montageVersion = montageVersion.match(/\d\.\d+/)[0];
            return exec("npm", ["install", "mop@" + montageVersion], clonePath);
        })
        .then(function () {
            // need devDeps in Montage (q-io/fs) for Mop to work
            return exec("npm", ["install"], PATH.join(clonePath, "node_modules", "montage"));
        })
        .then(function () {
            return exec("./node_modules/.bin/mop", [], clonePath);
        })
        .then(function () {
            return exec("rm", ["-r", outPath], clonePath);
        })
        .then(function () {
            return exec("cp", ["-r", PATH.join("builds", name), outPath], clonePath);
        })
        .then(function () {
            console.log("toto");
        });
    }));
}

// var TEMP_DIR = shell.exec("mktemp -d -t montagejs_org_temp.XXXXXX").output;
var TEMP_DIR = PATH.join(process.cwd(), "tmp");
exec("rm", ["-rf", TEMP_DIR])
.then(function () {
    return exec("mkdir", [TEMP_DIR]);
})
.then(function () {
    return cloneAndMopApps(APPS);
})
.then(function () {
    console.log("done");
})
.done();
