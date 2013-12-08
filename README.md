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

First install the dependencies, and then run the build script.

```bash
$ cd _build
$ npm install
# wait ...
$ cd ..
$ _build/build.js
# wait...
```

This will build the apps and the API docs

## Building the JSDoc only
```bash
$ _build/jsdoc/jsdoc-link.js
$ jekyll serve # needed only once
```

Then you can uncomment the apps in the jekyll config:
Open the `/_config.yml` file and uncomment this line `exclude: [apps, built-apps, node_modules, packages, ui]`.
From now on you can run jekyll to rebuild automatically

```bash
$ jekyll serve --watch
```

Open in the browser: `http://localhost:4000/api/`