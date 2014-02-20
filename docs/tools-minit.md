---

layout: docs
title: minit | MontageJS utility

this-page: tools-minit
next-page: tools-mop

---

# Using minit

MontageJS includes two commond line utilities: minit and mop. You use minit to ...; you use mop to optimize an application in production.

The MontageJS initializer, <a href="https://github.com/montagejs/minit#minit--the-montage-initializer" target="_blank">minit</a> is a multipurpose command line utility that provides a convenient way to kickstart and serve your MontageJS projects. With minit you can quickly generate default application directories (or projects) or add components to an existing project. Minit also doubles as a single server so you can preview your application locally.

## Basic Examples of Using minit

Run the following commands from within your project directory:

* To create a new project:

    <pre>$ minit create:app -n <em>app-name</em></pre>

    This generates a new directory—*app-name*, which contains the default MontageJS application directories with production dependencies—in the current directory.

* To add a component to a project:

    <pre>$ minit create:component -n <em>comp-name</em></pre>

    This generates a new ui component—*comp-name.reel*, which contains the default HTML, CSS, and JS files—in the ui directory of the current application directory.

* To set up a local on-demand server for previewing the current project in the browser:

    <pre>$ minit serve &</pre>
    
    >**Note:** The ampersand (&) option ensures that you don't have to open a second Terminal window while working on your project.

* To update to the latest version of minit:

    <pre>$ sudo npm install -gq minit@latest</pre>

* For a complete list of minit options:

    <pre>$ minit --help</pre>

See also the <a href="https://github.com/montagejs/minit#usage" target="_blank">minit repo</a> on Github.