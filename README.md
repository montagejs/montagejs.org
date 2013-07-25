This is the repo for the [montagejs.org](http://montagejs.org) website.

## Contributing
If you find any bugs or want to contribute, feel free to create an issue or send a pull request.


## Jekyll
The site uses Jekyll for templates and includes. You can find more infos on [jekyllrb.com](http://jekyllrb.com/).

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

Run `./build.sh`. It will take its time installing gems to compile the wiki
into HTML. In the end the `deploy` directory contains the gh-pages of this
repo, with a new commit containing any updates.

Before you push make sure you have committed your changes and then built, so
that the gh-pages commit message has the correct commit hash.

To deploy, change into the deploy directory and run `git push origin gh-pages`

You can run `build.sh` with these arguments:

* `--no-build` – will generate the wiki pages, but will not Mop the site into the deploy directory
* `--no-commit` – will generate the deploy directory, but won't commit the changes

## Updating Apps and Kitchen Sink

To get the changes from an App or Kitchen Sink, run the following:

### Popcorn
`git subtree pull --squash --prefix=source/apps/popcorn git@github.com:montagejs/popcorn.git master -m "Update Popcorn to master"`

### Kitchen Sink
`git subtree pull --squash --prefix=source/docs/kitchen-sink git@github.com:montagejs/kitchen-sink.git master -m "Update Kitchen sink to master"`

More [infos](https://github.com/montagejs/montage/wiki/git-subtree) about using `subtree`.