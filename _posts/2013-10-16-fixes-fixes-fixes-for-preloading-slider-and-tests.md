---

layout: blog
title: Fixes, fixes, fixes, for preloading, Slider, and tests
author: Stuart Knightley
author_url: http://github.com/Stuk/

---

Mostly fixes were merged this week: urls that are absolute or are on the `file:// protocol are [no longer preloaded](https://github.com/montagejs/montage/pull/1316), as they are potential x-domain requests. This fixes some errors with [Mopped](https://github.com/montagejs/mop) applications.

The Slider received some more attention, with fixes for the [initial thumb position](https://github.com/montagejs/montage/pull/1312) and not [moving to non-percentage values](https://github.com/montagejs/montage/pull/1313). A large number of tests failing in IE10 were fixed by [shimming `console.group`](https://github.com/montagejs/montage-testing/pull/8).

Finally, the Overlay gained the ability to be [closed with the escape key](https://github.com/montagejs/montage/pull/1303).

