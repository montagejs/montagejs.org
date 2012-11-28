#!/bin/bash

DIR=`dirname "${BASH_SOURCE[0]}"`
export GEM_PATH=$DIR/gems

# setup
git clone git@github.com:montagejs/montage.wiki.git $DIR/montage.wiki
gem install --no-rdoc --no-ri --install-dir $GEM_PATH gollum

# generate docs
$DIR/generate.rb

# commit
# get wiki commit hash
hash=`git --git-dir=$DIR/montage.wiki/.git/ rev-parse --short HEAD`
cd $DIR/..
git add *.html
git commit -m "Update docs to wiki version $hash"
