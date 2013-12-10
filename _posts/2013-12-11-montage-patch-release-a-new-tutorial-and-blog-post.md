---
layout: blog
title: Montage patch release, a new tutorial and blog post
author: Stuart Knightley
author_url: http://github.com/Stuk/
---

Montage [v0.13.9](https://github.com/montagejs/montage/pull/1364) was released last week to fix an issue were components could be drawn before their styles had loaded.

Afonso's [leet](http://en.wikipedia.org/wiki/Leet) pull request was merged, which [adds template properties](https://github.com/montagejs/montage/pull/1337) and completes the work needed to replace `@repetition.currentIteration` with `@repetition:iteration`, allowing more powerful composition.

A [Label component was added](https://github.com/montagejs/montage/pull/1278) to make building forms in Montage easier, the Select [was patched](https://github.com/montagejs/montage/pull/1353) to work around an FRB bug which allowed default value code to be [moved from Digit to Montage](https://github.com/montagejs/digit/pull/53). The Digit select was [fixed to prevent an `undefined` item in the content breaking drawing](https://github.com/montagejs/digit/pull/54). [Wheel/mousewheel events were fixed in the Flow](https://github.com/montagejs/montage/pull/1362).

The RangeController received some fixes for the [`swap` method](https://github.com/montagejs/montage/pull/1365) and the [`selection` property](https://github.com/montagejs/montage/pull/1352).

We've [published a new tutorial](http://montagejs.org/docs/tutorial-reddit-client-with-montagejs.html) showing how to create a Reddit browser using many of the common concepts in Montage. A new blog post was published, ["What's in a Flick?"](http://montagejs.org/blog/2013/12/05/what-is-in-a-flick/), exploring how to differentiate between a user's drag and scroll intentions.

The documentation continues to be improved, including the [Repetition](https://github.com/montagejs/montagejs.org/pull/80) and [how it works with the RangeController](https://github.com/montagejs/montagejs.org/pull/82), and the [styling of code blocks was changed](https://github.com/montagejs/montagejs.org/pull/74).

## Releases
Montage [v0.13.9](https://github.com/montagejs/montage/pull/1364)
