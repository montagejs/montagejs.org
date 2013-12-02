---

layout: blog
title: More features, fewer bugs, smaller builds
author: Stuart Knightley
author_url: http://github.com/Stuk/

---

Plenty of changes were merged this week, and 4 updates were released.

Thanks to [Hugo Daniel](http://hackological.com/blog/) for submitting [a fix for the Overlay in Firefox](https://github.com/montagejs/montage/pull/1342). The readme in the Minit app template was [made much clearer](https://github.com/montagejs/minit/pull/59) and [a bug in the `minit serve` command fixed](https://github.com/montagejs/minit/pull/57).

FRB gained a number of new features: [a binder for one()](https://github.com/montagejs/frb/pull/31), [min() and max() functions](https://github.com/montagejs/frb/pull/25), and [support for rounding](https://github.com/montagejs/frb/pull/28) with `round`, `ceil`, and `floor` operators. Bugs were fixed too, by [reimplementing `view`](https://github.com/montagejs/frb/pull/26) and [correctly passing arguments to `addRangeChangeListener`](https://github.com/montagejs/frb/pull/29). All these changes are in [FRB v0.2.16](https://github.com/montagejs/frb/commit/6b36b00174aeb7613964d3c50ce623eaac5df47b).

The size of bundles produced by Mop have been decreased by [excluding the `readme` property](https://github.com/montagejs/mop/pull/43) that gets added by npm, decreasing the size of a simple application by 160k on disk, and 60k on the wire! This was released in [Mop v0.13.3](https://github.com/montagejs/mop/commit/b24a5fe4f1519ac608a29c209b17607acf0b3711).

Joey, our promise-based webserver, was updated to [use the latest versions of Q and Q-IO](https://github.com/montagejs/joey/commit/42c5037f040eb4e883f9df4d18f0d7fb78238d0d) in [v1.3.3](https://github.com/montagejs/joey/commit/9a82af48ef80807d583bd96338b54d7a024890f5)

Mr gained [support for the `browser` `package.json` property](https://github.com/montagejs/mr/pull/59), increasing compatibililty with Browserify. This will be released soon along with some other improvements.

## Releases

[FRB v0.2.16](https://github.com/montagejs/frb/commit/6b36b00174aeb7613964d3c50ce623eaac5df47b), [Collections v0.2.2](https://github.com/montagejs/collections/commit/7feefe23e1309fc51642a7adef42143f6ae90645), [Mop v0.13.3](https://github.com/montagejs/mop/commit/b24a5fe4f1519ac608a29c209b17607acf0b3711), and [Joey v1.3.3](https://github.com/montagejs/joey/commit/9a82af48ef80807d583bd96338b54d7a024890f5)
