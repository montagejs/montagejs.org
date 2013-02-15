#!/bin/bash
# exit on errors and echo commands as they are executed
set -e -x

export ROOT_DIR=`dirname "${BASH_SOURCE[0]}"`
export TEMP_DIR=`mktemp -d -t montagejs_org_temp`
export OUT_DIR=`mktemp -d -t montagejs_org_output`

echo "Output directory is $OUT_DIR"
echo "Temp directory is $TEMP_DIR"
echo

master_hash=`git rev-parse --short HEAD`
echo "Update to master $master_hash" >> "$TEMP_DIR/COMMIT_MESSAGE"
echo "" >> "$TEMP_DIR/COMMIT_MESSAGE"

#####################################################################
# Add sub-build scripts here
# These environment variables are available:
#
# $TEMP_DIR
#           Directory to place temporary build files
# $TEMP_DIR/COMMIT_MESSAGE
#           Append to this file to add to the commit message
# $OUT_DIR
#           Directory to put new output files. At the end of the build all
#           files in this directory are copied into the gh-pages branch

./docs/build/build.sh

#####################################################################

if [ "$1" == "--no-commit" ]
then
    echo "Not committing"
    exit 0;
fi

# commit

echo
echo "Checking out gh-pages for commit"
echo

git checkout -B gh-pages origin/gh-pages

echo "Copying new files from $OUT_DIR to $ROOT_DIR"

cp -r "$OUT_DIR"/* $ROOT_DIR

git add "$ROOT_DIR"

# Commit exits with non-zero status if there are no changes. "|| :" swallows
# this exit status so that the rest of the script continues.
git commit --file="$TEMP_DIR/COMMIT_MESSAGE" || :

git checkout -

rm -rf $OUT_DIR
rm -rf $TEMP_DIR

echo "Done."
