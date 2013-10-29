---

layout: blog
title: Docs, blog posts and future features
author: Stuart Knightley
author_url: http://github.com/Stuk/

---

Mostly website updates this week, with some code to support future features.

We're having a push to improve API documentation at the moment, with updates to [link to the source](https://github.com/montagejs/montagejs.org/pull/51), other [small changes](https://github.com/montagejs/montage/commit/02504a8c2b2bed2aeddecd9da57b87afe2e1078a) with plenty more on the way. [Simurai](http://github.com/simurai) also wrote a blog post explaining some of [the UX reasons for our CSS naming convention](http://montagejs.org/blog/2013/10/24/BEM-syntax-with-ux-in-mind/) and the way to [get started with Montage has been made more prominent](https://github.com/montagejs/montagejs.org/commit/47ec5e7d25395445105a22c5496e45ddfbb1750f) on the homepage.

In the world of code, there's been a [fix for capturing the pointer in touch](https://github.com/montagejs/montage/pull/1319). "Aliases" have [been](https://github.com/montagejs/montage/pull/1322) [added](https://github.com/montagejs/montage/pull/1324) to Montage, and changes made in [FRB to support the syntax](https://github.com/montagejs/frb/pull/23). This is a is a new type of object that can be declared in the serialization that will lead to the introduction of object labels like `@repetition:iteration` replacing `@repetition.currentIteration`. It will improve the robustness and composition of repetitions and substitutions to make components such as `Table` easier to implement. Stay tuned for more information in the coming weeks.
