---

layout: docs
title: Pull Request Workflow

---

# Pull Request Workflow

The idea is that the way you add code to montage is by creating a branch in your GitHub fork and asking for it to be merged into master, this is a pull request.

## Keeping in sync

Assuming your local repository/directory has two remotes
* **montage** Montage main repo on GitHub
* **personal** Your fork repo on GitHub
With the pull request workflow, there are now 3 masters to keep in sync, montage/master, personal/master, and master - Montage’s master, your fork’s master and the local one.

Without having master checked out run the following command.

``
git fetch montage && git branch -f master montage/master && git 	fetch personal && git push personal montage/master:master
``
**git fetch montage** Gets all the new commits from the main montage remote.
**git branch -f master montage/master** Move your local master branch’s ref so that is pointing to 	the same ref as montage/master is.
**git fetch personal** Gets all the new commits from your personal fork’s remote.
**git push personal montage/master:master** Pushing the commits that we learnt about from montage into your personal fork.
What is this git push command with 2 parameters? It is simply a more explicit syntax:
``
git push REMOTE_NAME LOCAL_BRANCH_NAME:BRANCH_NAME_ON_REMOTE
``

## Doing some work

Create a feature/work branch for every new thing you want to add or modify. A single development branch should represent changes related to a single issue. It is a lot easier if you never commit anything to master directly. The important part to remember is that any ancestors of montage/master are not going to change therefore it is safe (stable) to branch from them. If you branch from a commit that isn’t yet in the main montage repository you run the risk of having that commit not be integrated as is. You would then have to do a rebase or cherry-pick of your changes so that they can be integrated themselves.

btw: If you want to refer to an Issue in your commit message use gh-## where ## is the issue number.

## Branching

So at this point if you want to do some new work, create a branch off master and check it out.
`git checkout -b SOMETHING_DESCRIPTIVE`
Once you have done some work and have one or more commits on your branch, you want to push the changes to your fork so that you have backup and maybe you can share your changes with someone else.
**REVIEW BEFORE YOU PUSH**, you should at least run the automated tests.
`git push personal SOMETHING_DESCRIPTIVE:SOMETHING_DESCRIPTIVE`
Rinse and repeat. While you are doing this work, many days may have gone by or you might have noticed some changes on master that might create conflicts with your changes. At that point it is a good idea to do a merge of the master branch into your own work branch. see Merging

Do not repeatedly merge master into your branch, instead simply rollback your previous merge:
	**WARNING**, this will delete all your local changes so stash them before you do this.
`git reset --hard HEAD^1`
Then you can merge master again. see Merging

## Merging

At this point it is important not to have any local changes or untracked files.
`git merge --no-commit master`

What you are doing here is staging a merge commit, if there are any conflicts to resolve the console will indicate this. The merge is intentionally split into two steps to reduce the variability of the process. Once the conflicts are resolved, you will need to stage the resolved conflicts.
`git add PATH_TO_FILE`

If there are no conflicts you have nothing to add and you will need to commit the merge:
`git commit -m "Merge branch master"`

Merge commits should follow the naming conventions: Merge Commit Messages

## The pull request

When you are happy with what you have in your fork’s branch, you can go to GitHub, navigate to your branch and send a pull request.
If you want to change some things within the content of the pull request, because you found a bug or because someone left a comment, you can simply push to that branch again and the pull request will get the new changes automatically. The rule there would be don’t add anything without adding a comment yourself or if it isn’t a response to a comment from somebody. Once the pull request is closed, don’t use that branch again.