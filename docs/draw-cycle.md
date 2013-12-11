---

layout: docs
title: MontageJS Draw Cycle

prev-page: event-handling
this-page: draw-cycle

---


# Draw Cycle

Web applications should perform well. Users don't like to wait while interacting with an app; "every millisecond counts!" For simple applications, improving the user experience can be as easy as following some <a href="https://developers.google.com/speed/docs/best-practices/rules_intro" target="_blank">performance best practices</a> and writing efficient JavaScript. For more complex applications, however, these practices are rarely enough to manage the main causes for poor application performance: DOM-based manipulation and styling changes. This is where MontageJS comes in.

To help maximize application performance, MontageJS components participate in a managed draw cycle that aims at reducing the negative effects of expensive browser reflows and repaints on the user experience. In this approach, DOM write and read operations are batched into separate code passes and scheduled to execute at timed event loops using the browser's `requestAnimationFrame()` API.

## Performance Matters

The draw cycle is a timed loop that allows components to modify their element's DOM structure. Technically, a component can change the DOM at any time; performance best practice, however, is to batch all DOM read/write operations into separate processes. This is critical because of the way browsers handle DOM changes. For the most part, browsers are pretty smart; they will queue up change operations and execute them in batches in order to minimize the number of reflows they need to perform. However, when your script requests style information (e.g., `element.offsetLeft`), you force the browser to give you the most up-to-date value, and this causes a reflow that can be expensive depending on the scope of the change.

> For an overview of what happens in a browser after it has downloaded the source code for a page, see Stoyan Stefanov's article on "<a href="http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/" target="_blank">Rendering: repaint, reflow/relayout, restyle</a>."

Interleaving read/write issues are simple enough to solve at a component level; you just need to be careful in how you write your DOM changes. In a complex web application, however, you are dealing with any number of components, some of which you may not even have authored yourself.

Take for example an application that includes two components, a fancy slider and a text box, whose values are bound together. When a user drags the slider, the numeric value in the text box is updated to reflect the value of the slider at the current position; likewise, when a user enters a numeric value in the text box, the slider moves to reflect the chosen value.

Dragging the slider forces the component to update its DOM structure and set the new value on the text box component which, in turn, forces the text box component to update its DOM. If each component draws independently of the other, chances are you'll end up with interleaving DOM read/write operations. Now imagine a similar scenario with many more components drawing completely independently of each other. This is where the MontageJS draw manager steps in: it ensures that read/write operations to the DOM are not interleaved while keeping components unaware of each other.

## Draw Cycle in a Nutshell

When a component needs to update its appearance, its `needsDraw` property is set to `true` (`this.needsDraw = true`). This, in turn, informs the template's root component that one of its siblings needs to draw and a draw cycle is scheduled. Roughly, draw cycles consist of two phases:

1. The request draw phase, which involves building a _draw list_ of components that have their `needsDraw` property set to `true`.
2. The draw phase, in which a series of predefined callback methods are invoked sequentially on the components in the draw list. The three primary callback methods are `willDraw()`, `draw()`, and `didDraw()`.

Draw cycles are scheduled automatically using the `requestAnimationFrame()` method if supported or, as a fallback, `setTimeout()`.

### Building the Draw List

During each draw cycle, the draw manager walks the application's component tree and constructs a draw list of components that have their `needsDraw` property set to `true`. If a component in the draw list is participating in a draw cycle for the first time, the `prepareForDraw()` event callback method is invoked at the very beginning of the draw cycle. (This ensures that the element is in the document before event listeners are added to it. Furthermore, if this particular component has a template, this is also the first time when the `.element` property refers to the element that comes from the template and not the placeholder. Naturally, event listeners are attached to the element, not the placeholder.)


After the initial draw list has been created, the draw manager invokes `willDraw()` on each component in the list. This, in turn, may cause additional (child) components to set their `needsDraw` property to `true`. To include these components in the current draw cycle, the draw manager explores the component tree again for new components to add to the draw list. It then invokes `willDraw()` on each of the newly added components. This process is repeated until no additional components have requested a draw [or until the browser draw cycle starts] Any component that requests a draw during the remainder of the draw cycle will be included in the following draw cycle.

### Executing the Draw List

After generating the draw list, the draw manager invokes the `draw()` method on every component in the list. This is the prescribed method for components to modify their DOM structure or CSS styles; DOM modifications should not be performed outside of a component's `draw()` method.

Finally, if the components need to read the final state of a draw cycle, after all `draw()` functions have been performed, `didDraw()` is called on each component in the draw list. This forces the reflow of the DOM at this point in time without having to worry that it is changed again by another component.


### Callback Methods

The following list summarizes the component callback methods involved in the draw cycle. These methods should never be called directly by an application; they are invoked automatically by the MontageJS framework. Any component that intends to update its DOM structure directly must implement a `draw()` method.

#### prepareForDraw()

* __When invoked:__ The first time a component is added to the draw list.
* __Description:__ Enables the component to prepare for its first draw. For components that have an HTML template, this method is invoked after the template has been loaded and applied to the DOM.

#### willDraw()
* __When invoked:__ On each component in the generated draw list before a `draw()` is performed.
* __Description:__ Guarantees that the DOM is safe to be read. If the execution of this method sets `needsDraw` to true on other components, those components will be added also to the current draw cycle.

#### draw()
* __When invoked:__ On each component in the generated draw list, after `willDraw()` has been invoked on each.
* __Description:__ Contains all DOM write operations of components.

#### didDraw()
* __When invoked:__ On each component in the generated draw list, after `draw()` has been invoked on each (and if the component needs to read the final state of a draw cycle).
* __Description:__ Provides the component an opportunity to query the DOM for any necessary calculations after drawing, so it can force a reflow of the DOM at this point in time without having to worry that it is changed again by another component.

## How to Use the Draw Cycle
The draw cycle is an internal implementation of MontageJS. That means a lot of the heavy lifting is done for you by the framework, as long as you use the prebuilt MontageJS ui components. When creating your own components the following draw cycle rules apply:

1. A component shall never perform any DOM manipulation outside of its `draw()` method. This includes element style changes and appending or removing elements from the DOM.
2. Any reading of the DOM for measurements (such as an element's `offsetWidth` property) shall be performed only in the `willDraw()` or `didDraw()` methods, and never in the `draw()` method.

Following these rules when implementing your component's DOM changes and queries will limit the amount of reflows in the browser which, in turn, will help improve the performance of your application.

For an example implementation of the draw cycle, see [MFiddle](http://montagejs.github.io/mfiddle/#!/5904498).
