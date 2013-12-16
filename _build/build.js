#!/usr/bin/env node
/*jshint node:true */

var FS = require("fs");
var PATH = require("path");
var Q = require("q");
var Writable = require("stream").Writable;
var shell = require('shelljs'); // nicer scripting interface
var generateJsdoc = require("./jsdoc/jsdoc");

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

var SOURCE_PATH = PATH.join(__dirname, "..");
var APPS = {
    "popcorn": {url: "https://github.com/montagejs/popcorn.git", commit: "v0.12"}
};

var TEMP_DIR = PATH.join(SOURCE_PATH, "tmp");

function cloneAndMopApps(apps) {
    return Q.all(Object.keys(apps).map(function (name) {
        var repo = apps[name].url;
        var commit = apps[name].commit || "master";

        var outPath = PATH.join(SOURCE_PATH, "apps", name);
        var clonePath = PATH.join(TEMP_DIR, name);

        return exec("git", ["clone", repo, clonePath])
        .then(function () {
            return exec("git", ["checkout", commit], clonePath);
        })
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
            // Put a file in the app dir with the hash it was built from
            shell.pushd(clonePath);
            var hash = shell.exec("git rev-parse --short HEAD").output;
            shell.popd();
            FS.writeFileSync(PATH.join(outPath, "HASH"), hash);
        })
        .then(function () {
            console.log(name + " built");
        });
    }));
}

function mopHomeExample() {
    var sourcePath = PATH.join(__dirname, "home-example");
    var buildPath = PATH.join(sourcePath, "builds", "montagejs.org");
    var outPath = SOURCE_PATH;

    // Files to copy out of the build
    var paths = ["packages", "index.html.bundle-0.js"];

    return exec("npm", ["install"], sourcePath)
    .then(function () {
        return exec("npm", ["install"], PATH.join(sourcePath, "node_modules", "montage"));
    })
    .then(function () {
        return exec("./node_modules/.bin/mop", [], sourcePath);
    })
    .then(function () {
        // Remove generated files from root
        return Q.all(paths.map(function (path) {
            return exec("rm", ["-r", PATH.join(outPath, path)]);
        }));
    })
    .then(function () {
        // Copy generated files back to root
        return Q.all(paths.map(function (path) {
            return exec("cp", ["-r", PATH.join(buildPath, path), PATH.join(outPath, path)]);
        }));
    })
    .then(function () {
        // Copy home-example include
        return exec("cp", [PATH.join(buildPath, "index.html"), PATH.join(outPath, "_includes", "home-example.html")]);
    });
}

function usage() {
    console.log(process.argv[0], process.argv[1], "<what>");
    console.log();
    console.log("Where 'what' is one or more of:");
    console.log();
    console.log("    all    Build everything");
    console.log("    apps   Update and Mop the example apps");
    console.log("    api    Build the API docs");
    console.log("    home   Mop the embedded home page example");
}

if (require.main === module) {
    var argv = process.argv.slice(2);

    var buildAll = argv.indexOf("all") !== -1;
    var buildApps = buildAll || argv.indexOf("apps") !== -1;
    var buildApi = buildAll || argv.indexOf("api") !== -1;
    var buildHome = buildAll || argv.indexOf("home") !== -1;

    if (!buildApps && !buildApi && !buildHome) {
        usage();
        process.exit(1);
    }

    exec("rm", ["-rf", TEMP_DIR])
    .then(function () {
        return exec("mkdir", [TEMP_DIR]);
    })
    .then(function () {
        if (buildApps) {
            return cloneAndMopApps(APPS);
        }
    })
    .then(function () {
        if (buildApi) {
            return generateJsdoc("montage", "latest", PATH.join(SOURCE_PATH, "api"));
        }
    })
    .then(function () {
        if (buildHome) {
            return mopHomeExample();
        }
    })
    .then(function () {
        console.log("done");
    })
    .done();

}
