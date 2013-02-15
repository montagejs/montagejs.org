#!/bin/bash
# exit on errors
set -e

export ROOT_DIR=`dirname "${BASH_SOURCE[0]}"`

rm -f COMMIT_MESSAGE
master_hash=`git rev-parse --short HEAD`
echo "Update to master $master_hash" >> COMMIT_MESSAGE
echo "" >> COMMIT_MESSAGE

./docs/build/build.sh
cd "$ROOT_DIR"

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
git commit --file=COMMIT_MESSAGE
rm COMMIT_MESSAGE

git checkout -
