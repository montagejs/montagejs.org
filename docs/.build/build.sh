#!/bin/bash

DIR=`dirname "${BASH_SOURCE[0]}"`
export GEM_PATH=$DIR/gems

git clone git@github.com:montagejs/montage.wiki.git $DIR/montage.wiki

gem install --no-rdoc --no-ri --install-dir $GEM_PATH gollum

$DIR/generate.rb
