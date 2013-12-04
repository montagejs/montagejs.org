---

layout: docs
title: MontageJS Repetition UI Container

prev-page: native-components
this-page: repetition
next-page: substitution

---


# Repetition

http://montagejs.github.io/mfiddle/#!/7764259

The repetition iterates through its `content` property rendering the content originally inside the repetition's own element for each object. 

http://montagejs.github.io/mfiddle/#!/7765238

This `content` property can be set directly with a typical array for simple repeating. However, the repetition has expanded capabilities when working in tandem with a `RangeController` assigned to its `contentController` property, in lieu of populating the `content` property manually.

Repetitions expose a special bindable property `objectAtCurrentIteration` intended for use by repeated components to reach the object within the `content` property related to that iteration.

## Basic usage
http://montagejs.github.io/mfiddle/#!/7760932

This example sets a repetition's `contentController` property to be a `RangeController` managing some content.

A `Text` component is a child of the repetition and derives its `value` property from the repetition's `objectAtcurrentIteration`

Clicking the "Change Content" button replaces the managed content with new random content.
