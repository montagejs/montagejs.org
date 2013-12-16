This is the repo for the [montagejs.org](http://montagejs.org) website.

## Contributing
If you find any bugs or want to contribute, feel free to create an issue or send a pull request.


## Jekyll
The site uses Jekyll for templates and includes. You can find more infos on [jekyllrb.com](http://jekyllrb.com/).

You need **Ruby version > 2.0.0**.

### Install
First you need Ruby and RubyGems, see [details](http://jekyllrb.com/docs/installation/). Once installed run:

    gem install jekyll

Then `cd` into your montagejs.org directory and run:

    jekyll serve

Now you should see the site at `http://localhost:4000`.

After making changes you can close the server with `Ctrl c` and then rebuild the site with `jekyll serve` again. Then if you refresh the browser, you should see the changes.

If you don't wanna manually rebuild after every change, you can serve with the "watch" command:

    jekyll serve --watch

Then the site gets automatically rebuilt once you save a file. __Note__: Because some directories like the /apps are quite big, it is advised to exclude them temporarily while testing locally. It speeds up rebuilding a lot and your CPU thanks you for that. To exclude directories, open the `/_config.yml` file and uncomment this line `exclude: [apps, built-apps, node_modules, packages, ui]` (it might look a bit different by now). Just make sure you don't commit that change to _config.yml.


## Building and deploying

First install the build dependencies:

```bash
$ cd _build
$ npm install
$ cd ..
```

The apps, API docs and home example can all be built individually:

```bash
$ _build/build.js apps
$ _build/build.js api
$ _build/build.js home
```

or several at the same time:

```bash
$ _build/build.js home apps
```

or you can shortcut and build all the things:

```bash
$ _build/build.js all
```

### API docs

To build *just* a subset of the API docs, or build docs for a specific version, use the `_build/jsdoc/jsdoc.js` command. It takes arguments for which project and version docs you want to build.

```bash
# Locally checked out Montage
$ _build/jsdoc/jsdoc.js montage npm-link $PWD/api
# Version of Montage
$ _build/jsdoc/jsdoc.js montage v0.13.9 $PWD/api
# Version of Digit
$ _build/jsdoc/jsdoc.js digit v0.4.0 $PWD/api
```
