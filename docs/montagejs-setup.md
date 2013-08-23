---

layout: docs
title: Set Up MontageJS - Quick Start part 1

prev-page: index
this-page: montagejs-setup
next-page: hello-montagejs

---

# Getting Started

This tutorial will show you how to set up MontageJS development. It is part 1 of our MontageJS quick start; however, the steps outlined here apply to any MontageJS project. To make the most of this tutorial, you should have a basic understanding of HTML, CSS, and JavaScript and some familiarity with working in a command-line environment.

>**Note**: If you are unfamiliar with the common convention to denote the command line, note that a leading dollar sign ($) indicates that what follows is a command to be run; it is not part of the command. In other words, do not type the leading dollar sign at the beginning of a command line when following the instructions in this document.

## Requirements
MontageJS application development is divided into a development (creating the app) phase and a production (compiling the app) phase. For the development phase you need:

* Node.js and npm. MontageJS application development depends on npm, the Node package manager, which is distributed with Node.js.
* A recent stable release of Google Chrome, Safari, or Firefox. MontageJS leverages the evolving web platform of modern browsers.
* `minit`, the MontageJS Initilizer. `minit` is a is a cross-platform command line tool that provides convenient automated tasks during the development phase, from generating the default application directory to creating new components.
* A text editor.


## Set Up MontageJS Development

Before you start to learn how to program with MontageJS, you will need to set up your development environment. Follow these steps:

1. [Download](http://nodejs.org/download/) and run the prebuilt Node.js installer for your platform from the Node.js website.

2. Install the latest version of `minit`, the MontageJS Initializer.

    **Mac OS X / Linux**
    
    Open a Terminal window and type: 

    ```
    $ mkdir -p ~/.npm
    $ sudo npm install -gq minit@latest
    ```

    > **Note**: `minit` does not need sudo access; this is a workaround due to a current [issue](https://github.com/isaacs/npm/pull/3506) with the OS X node installer package.

    **Windows**
    
    Open the Command Prompt and type:

    ```
    npm install -gq minit@latest
    ```

3. Use `minit` to create a new MontageJS project called "hello":

    ```
    $ minit create:app -n hello
    ```

    **Note**: If you get an EACCES warning when trying to run `minit:create`, use `sudo chown -R <username> ~/.npm` and then use `$ minit create:app -n hello`. This is a workaround due to a bug in npm.

    This generates the hello directory—which contains the default MontageJS application template, including the production dependencies—in your current directory.

4. To verify your installation, switch to the hello directory and serve your new MontageJS project using `minit`:

    ```
    $ cd hello
    $ minit serve &
    ```

5. Point your browser to http://localhost:8083/.

    You should see the contents of the Welcome component—a simple single-page application, which is explicitly loaded to accompany [part 2](http://montagejs.org/docs/hello-montagejs.html) of our quick start tutorial.
    
    ![GS_Figure1](/images/docs/gs_tut_fig_01.png)
    
You are now ready to start coding.

For a quick introduction on the basics of how to assemble MontageJS components into a user interface, continue with [part 2](http://montagejs.org/docs/hello-montagejs.html) of our quick start tutorial. 

If you prefer to explore MontageJS development on your own, refer to the documentation or the MontageJS [examples](montagejs-examples.html).