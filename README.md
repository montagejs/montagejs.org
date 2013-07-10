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