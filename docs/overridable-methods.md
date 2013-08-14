---

layout: docs
title: Overridable Methods

---

# Overridable Methods

You can implement certain methods on your objects and components that will be called. This is a list of them until we have more JSDoc documentation.

## Object
### didCreate
Constructor called after the object is created

## component

### prepareForDraw
Called before the first draw of the component. This is where you should write to the DOM for any setup that needs to happen before the first draw. This includes adding any event listeners on your DOM elements, except for touch or mouse event listeners (see prepareForActivationEvents).

### prepareForActivationEvents
Called the first time a touch event or mouse event is received on one of your child elements. This is where you should listen for any events that occur after user interaction.

### willDraw
Called before the `draw` of the component. This is where you should read any values from the DOM (for example the styles of you element or child elements). See `draw`.

### draw
This is the only place that your component should modify the DOM. By putting DOM reads in `willDraw` and DOM writes in `draw` all the reads and all the writes are batched together, which reduces the number of browser repaints and increases the fluidity of your app.

### didDraw
Called after the `draw` of the component. This is where you should read any values from the DOM (for example the styles of you element or child elements). See `draw`.

### contentWillChange
Called before the `domContent` of the component is changed.

### contentDidChange
Called after the `domContent` of the component is changed.

### childComponentWillPrepareForDraw
Called before a child component's `willPrepareForDraw`.

### willPrepareForDraw
Called before the first draw of the component. This is where you should read the DOM for any setup that needs to happen on the first draw.

## template
### deserializedFromTemplate
Called on any object that appears in a template serialization, after it has been deserialized.

### templateDidLoad
Called on the owner of a template, most likely a component, when all the objects in the template have loaded and been instantiated.