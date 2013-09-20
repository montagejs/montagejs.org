---

layout: blog
title: The week in Montage – 11th September '13
author: Stuart Knightley
author_url: http://github.com/Stuk/

---

There were a couple of releases last week.

Montage recieved an update to templates that allow some external resources (images and iframes) to be [loaded relative to the `.reel`](https://github.com/montagejs/montage/pull/1250) and [`forceDecimals` was added](https://github.com/montagejs/montage/pull/1283) to the NumberConverter. These changes were included in [Montage v0.13.6](https://github.com/montagejs/montage/commit/3c0e48b56252c17df71abff5725757867e117624) which was released on Thursday along with the newly released [Mr v0.13.4](https://github.com/montagejs/mr/commit/3f10114a97a4a57e1a2c8d12f99d6acae09a7ffd). This includes an updated version of [Q](https://github.com/kriskowal/q) and some fixes for loading modules in preloading bundles after an application has been Mopped.

The RangeController was updated to make [the `selection` update synchronously](https://github.com/montagejs/montage/pull/1290) while being consistent with the `multiSelect` and `avoidsEmptySelection` properties, which fixes some visual artifacts in the repetition. FRB also had a couple of [bugs with `filter` fixed](https://github.com/montagejs/frb/commit/eccded462da2d0120c69dbc3c0b967a2ecd298a4) and [minidom](https://github.com/montagejs/minidom) now uses a spec compliant HTML5 parser provided by [parse5](https://npmjs.org/package/parse5) (along with a lot more tests!).

And finally, if you have ever been confused about how Montage uses Javascript objects then take a look at the newly rewritten [MontageJS Objects](http://montagejs.org/docs/montagejs-objects.html) article.
