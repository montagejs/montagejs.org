#!/bin/bash
# exit on errors
set -e

export ROOT_DIR=`dirname "${BASH_SOURCE[0]}"`
export OUT_DIR=`mktemp -d -t montagejs_org_build`

rm -f COMMIT_MESSAGE
master_hash=`git rev-parse --short HEAD`
echo "Update to master $master_hash" >> COMMIT_MESSAGE
echo "" >> COMMIT_MESSAGE

./docs/build/build.sh
cd "$ROOT_DIR"

if [ "$1" == "--no-commit" ]
then
    echo "Not committing"
    echo "Build files in $OUT_DIR"
    exit 0;
fi

# commit

echo
echo "Checking out gh-pages for commit"
echo

git checkout -B gh-pages origin/gh-pages

echo "Copying new files from $OUT_DIR"

cp -r "$OUT_DIR"/* $ROOT_DIR

git add "$ROOT_DIR"

git commit --file=COMMIT_MESSAGE
rm COMMIT_MESSAGE

git checkout -
