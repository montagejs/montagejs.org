#!/bin/bash

THIS_DIR=`dirname "${BASH_SOURCE[0]}"`
export GEM_PATH="$THIS_DIR/gems"

export WIKI_DIR="$THIS_DIR/montage.wiki"
export OUT_DIR="$THIS_DIR/out"
export DOCS_DIR="$THIS_DIR/.."
export TEMPLATE_FILE="$THIS_DIR/template.mustache"

# setup
rm -rf $WIKI_DIR
git clone git@github.com:montagejs/montage.wiki.git $WIKI_DIR
gem install --no-rdoc --no-ri --install-dir $GEM_PATH gollum

# generate docs
$THIS_DIR/generate.rb

# Home needs to be index for serving
mv $OUT_DIR/Home.html $OUT_DIR/index.html

if [ "$1" == "--no-commit" ]
then
  echo "Not committing"
  exit 0;
fi

# commit

# get wiki commit hash
hash=`git --git-dir="$WIKI_DIR/.git/" rev-parse --short HEAD`

git checkout gh-pages
mv $OUT_DIR/*.html $DOCS_DIR
git add $DOCS_DIR/*.html
git commit -m "Update docs to wiki commit $hash"

git checkout -
