---
layout: docs
title: Repetition component
---

# Repetition component
The repetition iterates through its ```objects``` property rendering the content originally inside the repetition's own element for each object. 

This ```objects``` property can be set directly with a typical array for simple repeating. However, the repetition has expanded capabilities when working in tandem with an ArrayController assigned to its ```contentController``` property, in lieu of populating the ```objects``` property manually.

Repetitions expose a special bindable property ```objectAtCurrentIteration``` intended for use by repeated components to reach the object within the ```objects``` property related to that iteration.

## Basic usage
http://montagejs.github.com/mfiddle/#!/4163708

This example sets a repetition's ```contentController``` property to be an ArrayController managing some content.

A DynamicText component is a child of the repetition and derives its ```value``` property from the repetition's ```objectAtcurrentIteration```

Clicking the change content button replaces the managed content with new random content.