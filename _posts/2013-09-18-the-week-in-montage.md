---

layout: blog
title: The week in Montage – 18th September '13
author: Stuart Knightley
author_url: http://github.com/Stuk/

---

This was a week of bug fixes and small improvements.

[Matte](https://github.com/montagejs/matte) now looks better on [high resolution screens](https://github.com/montagejs/matte/pull/10) and the text-slider [switches seamlessly to the editing state](https://github.com/montagejs/matte/pull/11).

The Montage overlay gained support for [`shouldDismissOverlay` on the delegate](https://github.com/montagejs/montage/pull/1292), and the button [no longer enters an infinite loop when setting the label](https://github.com/montagejs/montage/pull/1284). [`dispatchEvent` was aligned with the spec](https://github.com/montagejs/montage/pull/1279) to return whether the default action should be performed.

Thanks to [@wpk-](https://github.com/wpk-) for noticing some issues in [LruSet](https://github.com/montagejs/collections/issues/29), which were then [promptly](https://github.com/montagejs/collections/commit/b85c4da4d243c54631108b2174e48b5072f1892e) [fixed](https://github.com/montagejs/collections/commit/49fbef0b349c14b7bd5c8fa2ba998a1790b7d34d), as was another [event dispatching issue with Dict](https://github.com/montagejs/collections/pull/28).

Not wanting to be left out, Mr also received a bug fix for [relative paths in the `main` property](https://github.com/montagejs/mr/pull/50) of package.json, but also gained a new feature: a way to [sandbox `require`](https://github.com/montagejs/mr/pull/22) and inject dependencies for testing purposes.

## Releases

[Matte v0.1.4](https://github.com/montagejs/matte/blob/master/CHANGES.md#014) and [Native v0.1.3](https://github.com/montagejs/native/blob/master/CHANGES.md#v013)
