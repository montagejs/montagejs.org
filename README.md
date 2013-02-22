This is the repo for the [montagejs.org](http://montagejs.org) website.

## Contributing
If you find any bugs or want to contribute, feel free to create an issue or send a pull request.

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

