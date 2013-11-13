---

layout: blog
title: Aliases, events, improvements, other updates
author: Stuart Knightley
author_url: http://github.com/Stuk/

---

Aliases, which were added a [couple of weeks ago](/blog/2013/10/30/docs-blog-posts-and-future-features/), can now be [deserialized](https://github.com/montagejs/montage/pull/1325) and [used in bindings](https://github.com/montagejs/montage/pull/1335). This paved the way for the implementation of [`@repetition:iteration`](https://github.com/montagejs/montage/pull/1336) introducing some exciting new possibilities for nested repetitions.

The TranslateComposer had a [bug with listening to `mousemove` fixed](https://github.com/montagejs/montage/pull/1333) and the Flow was updated to scroll even when you [start dragging on top of another clickable element](https://github.com/montagejs/montage/pull/1341).

The KeyComposer was [made easier to use](https://github.com/montagejs/montage/pull/1330), as shown in [this update to its usage in Montage](https://github.com/montagejs/montage/pull/1331/files).

The Matte List [gained the `listEnd` event](https://github.com/montagejs/matte/pull/32) to make lazy loading of list items easier.

And finally, [welcome.reel was removed from the Minit `app` template](https://github.com/montagejs/minit/pull/56) to help simplify the creation of a new Montage app.
