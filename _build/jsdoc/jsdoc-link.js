"use strict";
/*global __dirname*/

var PATH = require("path");
var generateJsdoc = require("./jsdoc");

var argv = require('optimist')
    .usage("node jsdoc-link.js [--out=path]")
    .check(function(argv) {
        return argv.out;
    })
    .argv;

var out = argv.out || PATH.join(__dirname, "..", "..", "api");

generateJsdoc(out, "montage", "npm-link");
