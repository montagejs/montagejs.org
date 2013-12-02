---

layout: blog
title: RangeController, Docs, Collections and Mr
author: Stuart Knightley
author_url: http://github.com/Stuk/

---

Last week Montage recieved a bug fix to [show "0" when the textfield is set to 0](https://github.com/montagejs/montage/pull/1350).
The selection management of the RangeController has had [another revision](https://github.com/montagejs/montage/pull/1345) after some problems were found with the previous implementation.

Our documentation keeps improving; a large amount of [JSDoc was merged](https://github.com/montagejs/montage/commit/5962b33a90acd6dcd5ae57b59a1fce805b5661c4) and the [styling was made more compact](https://github.com/montagejs/montagejs.org/pull/67). An example can be seen in the [Application documentation](http://montagejs.org/api/Application.html).

Two bugs were fixed in Collections: the change-dispatching array `splice` [now handles negative start](https://github.com/montagejs/collections/pull/40) and all property change listeners are still called even if [earlier ones remove themselves](https://github.com/montagejs/collections/pull/41).

A number of merges were made into Mr, including a [fix for loading of minified modules](https://github.com/montagejs/mr/pull/61), and [dropping `directories` support](https://github.com/montagejs/mr/pull/60) to increase compatibility with Node. These changes and more were released as [Mr v0.14.0](https://github.com/montagejs/mr/commit/3309dfc73f37e1e30b52639857143903da7d4bae). [Mop v0.13.4](https://github.com/montagejs/mop/commit/c20091495d159a5e6cc8a6eddfed26e7c73cd7de) was released to accommodate the [minor version bump](http://semver.org/).

## Releases

[Mr v0.14.0](https://github.com/montagejs/mr/commit/3309dfc73f37e1e30b52639857143903da7d4bae) and [Mop v0.13.4](https://github.com/montagejs/mop/commit/c20091495d159a5e6cc8a6eddfed26e7c73cd7de).
