#!/bin/bash
# exit on errors
set -e

THIS_DIR=`dirname "${BASH_SOURCE[0]}"`
export GEM_PATH="$TEMP_DIR/gems"

export WIKI_DIR="$TEMP_DIR/montage.wiki"
export TEMPLATE_FILE="$THIS_DIR/template.mustache"

# setup
rm -rf $WIKI_DIR
git clone git@github.com:montagejs/montage.wiki.git "$WIKI_DIR"

echo "Installing ruby gems. This may take several minutes..."
gem install --verbose --no-rdoc --no-ri --install-dir "$GEM_PATH" gollum

# generate docs
"$THIS_DIR/generate.rb"

# Home needs to be index for serving
mv "$OUT_DIR/docs/Home.html" "$OUT_DIR/docs/index.html"

# get wiki commit hash
wiki_hash=`git --git-dir="$WIKI_DIR/.git/" rev-parse --short HEAD`
echo "wiki: $wiki_hash " >> "$TEMP_DIR/COMMIT_MESSAGE"
