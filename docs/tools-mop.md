---

layout: docs
title: minit | MontageJS utility

prev-page: tools-minit
this-page: tools-mop

---

# Using mop

>**Note:** We are currently in the process of updating our docs. This document may not be complete or fully up-to-date yet. We apologize for any inconvenience.

<a href="https://github.com/montagejs/mop#montage-optimizer" target="_blank">Mop</a>  is the MontageJS application optimizer&#8212;a simple command line tool that reliably transforms an application in development into an application ready for deployment. Mop also minifies JavaScript, HTML, and CSS to help minimize the loadtime of your application. Mop supports asynchronous preloading, so an application can get its first draw out as quickly as possible.

## How mop Works

After you have finished coding your application, your project folder contains:

* The bootstrapping code
* The initial modules and their dependencies
* The code that you wrote

All of this amounts to a very large project. Mop sifts through your project folder:

* First it identifies the dependencies in the MontageJS codebase you used in your application.
* Then it minifies your source code and creates *bundles* (files) that consist of your application code and its dependencies, ready for deployment. These files contain (almost) everything needed to run your app.

Bundling modules has the benefit that in the browser, instead of doing an HTTP request for each module individually, only an HTTP request for each bundle is needed (you can dial in the number of bundles for a bundle-size/HTTP-pipelining trade-off).

## Installing mop

Mop is not part of the default MontageJS starter project. To use it you have to install it first. Follow these steps:

Open a Terminal window and type `npm install -g mop`.

This installs mop globally so you can use it in any of your projects.

## Using mop

You can use mop in any directory that contains a MontageJS application.

1. Switch (`cd`) to your project directory.
2. At the prompt enter: `mop` and press Return.

    Mop analyzes the code dependencies, identifies the modules the application uses, and then adds a builds directory to your project directory. This directory contains a minified deployment version of your application in the current working directory.
    
To deploy your app, copy the directory pointed to by the builds/app-name symlink to your web server.