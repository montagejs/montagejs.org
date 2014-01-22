---
layout: blog
title: The month in Montage
author: Stuart Knightley
author_url: http://github.com/Stuk/
---

It's been over a month since the last update and a lot has happened!

Three patch versions of Montage 0.13 have been released that fix [several](https://github.com/montagejs/montage/pull/1385) [issues](https://github.com/montagejs/montage/pull/1399) with `require`, the [KeyComposer](https://github.com/montagejs/montage/commit/0b118adf546c6aca1c57f785e8c5e301d62c7193) and an [uneeded warning](https://github.com/montagejs/montage/pull/1396). Full details are in the [Montage v0.13.12 changelog](https://github.com/montagejs/montage/blob/0.13/CHANGES.md#v01312), and of course it's available to install from npm.

Plenty of pull requests have been merged into Montage master and so I've skipped some of them here to save some time.

When using a Loader the console would display an unnecessary warning [which has now been fixed](https://github.com/montagejs/montage/pull/1396), The NumberField now correctly handles [floating point numbers in `step`](https://github.com/montagejs/montage/pull/1391). Thanks to @evax who [implemented `getPreventDefault` in MutableEvent](https://github.com/montagejs/montage/pull/1386). The Overlay is now [not shown if it can't be the active target](https://github.com/montagejs/montage/pull/1379) and the Esc key [now correctly dismisses the Overlay the second time](https://github.com/montagejs/montage/pull/1381). Now that `:iteration` is availabe [`objectAtCurrentIteration` has been deprecated](https://github.com/montagejs/montage/pull/1377). The [generation of new `data-montage-id`s when merging templates](https://github.com/montagejs/montage/pull/1376) has been improved along with [using the metadata to label objects if available](https://github.com/montagejs/montage/pull/1403). A [nasty Safari bug with uuids was fixed](https://github.com/montagejs/montage/pull/1372) (although it seems there are still some problems with UUIDs and events). A bug that occured occasionally in the [PressComposer was fixed](https://github.com/montagejs/montage/pull/1404).

In Digit a new [transparent skin](https://github.com/montagejs/digit/pull/59) was added that can be easily customized by chaging the `color` CSS property. This is along with the [Button--glass variation](https://github.com/montagejs/digit/pull/24) that makes borderless icon buttons easier. As in the Repetition, [`objectAtCurrentIteration` was deperecated in BigList](https://github.com/montagejs/digit/pull/58). The [tab/focus support](https://github.com/montagejs/digit/pull/18) was improved and support was added for [using an `<a>` element with Button](https://github.com/montagejs/digit/pull/17). Improvement of [the JSDocs continues](https://github.com/montagejs/digit/pull/49).

Joey has been updated to the [latest Q-IO](https://github.com/montagejs/joey/commit/c8c55a1b79378dd37cf14d97beab0ed423c6401b) that fixes host negotiation decision tracking and ranged HTTP requests for files, and the "binary" now supports [priviledge descalation with the `-u UID`argument](https://github.com/montagejs/joey/commit/4d3d7ece0a38c1e0604ea1be39b68166d7f4d5e4). Minit was updated to take advantage of this new release.

Another thanks to @evax for noticing a [typo in Mop, which was then fixed](https://github.com/montagejs/mop/commit/563b7a575bc82da9cd0a391fe812235d877bfa58).

And, of course, you can now RSVP to be the first to find out about some [exciting new things we've been up to](http://montagejs.org/reveal/).

## Releases

[Montage v0.13.12](https://github.com/montagejs/montage/blob/0.13/CHANGES.md#v01312), [Minit v0.4.3](https://github.com/montagejs/minit/blob/master/CHANGES.md#v043), [FRB v0.2.17](https://github.com/montagejs/frb/blob/master/CHANGES.md#v0217), [Mousse v0.3.0](https://github.com/montagejs/mousse/commit/95bafcdcd65b6fa21e52935dd22beb32648cbf9b), [Mr v0.15.1](https://github.com/montagejs/mr/blob/master/CHANGES.md#0151), [Joey v1.4.0](https://github.com/montagejs/joey/blob/master/CHANGES.md#140).
