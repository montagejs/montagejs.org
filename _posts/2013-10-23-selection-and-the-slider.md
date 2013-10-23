---

layout: blog
title: Selection, and a streamlined Slider
author: Stuart Knightley
author_url: http://github.com/Stuk/

---

There were just a couple of merged changes this week, and both were tidying up.

The RangeController had an [improvement to the `selection`](https://github.com/montagejs/montage/pull/1320) which reduces the complexity of the code and adds some new features, such as ensuring that that all items in `selection` are members of the `content`.
[Matte](https://github.com/montagejs/matte/pull/30) and [Native](https://github.com/montagejs/native/pull/4) were updated for compatibility.

And in Digit Slider was [streamlined to use fewer elements](https://github.com/montagejs/digit/pull/45), simplifying the HTML and CSS.
