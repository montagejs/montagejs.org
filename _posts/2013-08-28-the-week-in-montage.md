---

layout: blog
title: The week in Montage – 28th October '13
author: Stuart Knightley
author_url: http://github.com/Stuk/

---

Last week the Montage team was happy to gain two new members, [Adam Solove](https://github.com/asolove) and [Nikita Vasilyev](https://github.com/NV)! Nikita jumped straight in and improved component generation in Minit and fixed up some issues in our documentation on [montagejs.org](http://montagejs.org/). Adam landed an improvement to the currency converter, and [fixed `Template`](https://github.com/montagejs/montage/pull/1264) to call `templateDidLoad` on an instance `owner` that doesn't appear in the serialization.

Chrome 29 was released last week which defined `window.Touch` on all devices and breaks some of our mouse/touch interaction code. A quick fix was implemented in Montage until we have a better solution, and a number of our examples were updated. **Montage** v0.13.5 was released with this fix, Adam's changes and improvements to [mousewheel handling in Flow](https://github.com/montagejs/montage/pull/1263) (replacing v0.13.4 which accidentally included some extra files).

**Minit** [v0.3.8 was released](https://github.com/montagejs/minit/commit/87b8fd87e49112e17c3e21550f0c13257d907e79) including Nikita's changes and some API improvements. **FRB** [v0.2.13 also saw a release](https://github.com/montagejs/frb/commit/9a26108be96f977d1b54c085160ef14c64999ad9), as did **Joey** [v1.3.0](https://github.com/montagejs/joey/commit/42383cda3121745b3c1fc12d114b3ab2dae53ef7) with support for `route.any` thanks to [wmertens](https://github.com/wmertens). **Digit** components were updated to be nicer on the fingers and the toggle-switch had a bit of a clean up.

Michael has been busy updating the readmes for all our [example apps](http://montagejs.org/apps/) to be more consistent, along with plenty more updates to the website.
