---

layout: blog
title: The week in Montage – 25th September '13
author: Stuart Knightley
author_url: http://github.com/Stuk/

---

More improvements and some exciting new features.

Montage gained [a big enhancement to the `super` implementation](https://github.com/montagejs/montage/pull/1243), increasing speed and allowing it to work in strict mode. There were a couple improvements to the draw cycle: not adding components to the draw list [when they shouldn't be](https://github.com/montagejs/montage/pull/1291) and [loading stylesheets before drawing](https://github.com/montagejs/montage/pull/1274) to avoid a flash of unstyled content. The `Image` now has a [`crossOrigin` property](https://github.com/montagejs/montage/pull/1281) to allow it to be [drawn to and read from a canvas](https://developer.mozilla.org/en-US/docs/HTML/CORS_Enabled_Image).

An exciting new feature has been added to the translate-composer that [changes the logic it uses to determine whether it should steal the pointer](https://github.com/montagejs/montage/pull/1241) from another component that has claimed it. This is based on some interesting research by [Afonso](https://github.com/aadsm) on the thresholds that should be used for different devices to ensure a great user experience on each of them.

After reporting issues on collections last week [Paul Koppen](https://github.com/wpk-) [fixed another](https://github.com/montagejs/collections/pull/31) and submitted an [improvement to the LRUSet](https://github.com/montagejs/collections/pull/30). Thanks!
