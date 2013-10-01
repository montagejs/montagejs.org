---

layout: blog
title: The week in Montage – 2nd October '13
author: Stuart Knightley
author_url: http://github.com/Stuk/

---

Internal changes, UI updates and API improvements abound this week.

Montage received a [big update to the overlay](https://github.com/montagejs/montage/pull/1299) last week, along with a fix for a bug where [dragging the slider would select text](https://github.com/montagejs/montage/pull/1304). The Digit slider got [visual improvements for Firefox](https://github.com/montagejs/digit/pull/38) as well. Also on UI components, the [Flow now adds the `selected` and `active` classes to its child elements](https://github.com/montagejs/montage/pull/1231). On the purely API side listeners from [`addRangeAtPathChangeListener` now handle invalid properties along the path](https://github.com/montagejs/montage/pull/1301).

A bug in range and map change listeners has been fixed such that [dispatchesRangeChanges and dispatchesMapChanges have been made non-enumerable](https://github.com/montagejs/collections/pull/34) on observed arrays. This fixes an issue that made equivalent observed and non-observed arrays difficult to compare. Also, [the List and Set collections can now dispatch range change events](https://github.com/montagejs/collections/pull/33), which in turn makes them bindable through FRB expressions that could previously only react to changes in Array and SortedSet. In FRB the [Set now supports the `only` operator](https://github.com/montagejs/frb/pull/16), and after some [internal changes to the Scope object](https://github.com/montagejs/frb/pull/15) the [parent binder, `^`, has been added](https://github.com/montagejs/frb/pull/18).

Thanks to [Tim Statler](https://github.com/tstatler) who helped out by [fixing the Minit app template](https://github.com/montagejs/minit/pull/54), and [mattisfrommars](https://github.com/mattisfrommars) for improving [some of the Popcorn code](https://github.com/montagejs/popcorn/pull/13).

## Releases

Collections [v0.2.0](https://github.com/montagejs/collections/blob/master/CHANGES.md#v020), FRB [v0.2.14](https://github.com/montagejs/frb/blob/master/CHANGES.md#v0214) and introducing [Domenic](https://npmjs.org/package/domenic)!

