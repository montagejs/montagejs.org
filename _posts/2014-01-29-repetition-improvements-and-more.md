---
layout: blog
title: Repetition improvements and more
author: Stuart Knightley
author_url: http://github.com/Stuk/
---

Just a few changes last week.

The repetition has had a bit of work, the [selection management was fixed](https://github.com/montagejs/montage/pull/1409),
[the `content` changed to `object`](https://github.com/montagejs/montage/pull/1410) and an [optimization was generalized for the Flow](https://github.com/montagejs/montage/pull/1390) which reduces the number of bindings fired. And sometimes instead of a binding, you can just use the same object. That's what was done for the [AbstractSelect](https://github.com/montagejs/montage/pull/1408). The ability to [block a component from drawing has been added](https://github.com/montagejs/montage/pull/1407) which can be used to avoid a flickering UI when waiting for async operations to complete.

In Collections, [the behavior of `Object.equals` for `NaN` was fixed](https://github.com/montagejs/collections/pull/44) which means that `NaN` can be removed from a collection. In general the constructor functions on `Object` (such as `Object.has(thing, "a")`) will call the eponymous method of the first argument if it exists (i.e. `thing.has("a")`), rather than requiring it to be on the prototype chain, so Crockford-style instances will work properly and for the improvement of performance.

If you haven't seen it already, check out the blog post we published last week on [building a 3D app with Montage](http://montagejs.org/blog/2014/01/22/build-3d-applications-with-montagejs/).


