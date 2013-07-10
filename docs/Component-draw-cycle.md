---
layout: docs
title: Component draw cycle
---

# Component draw cycle

When building HTML5 applications, especially on mobile, performance is important. Two things that can have a critical impact on web application performance are DOM manipulation (creating or modifying DOM structure or styles) and DOM inspection (querying an element’s calculated style, such `offsetWidth`). Repeatedly manipulating and reading the DOM, in a unmanaged fashion, can cause multiple style reflows that can slow down an application considerably, even on a desktop machine. The term “layout thrash” has been used to describe the result of this type of DOM manipulation.

## Overview
To maximize application performance, Montage uses a deferred drawing model in which DOM updates and queries are batched together, limiting the number of DOM reflows. These features are implemented through a series of component method callbacks that the framework invokes. Each draw cycle involves two main stages:

1. Building a list, called the “draw list”, of components that have set their `needsDraw` property to true.
2. The draw phase, in which a series of callback methods are invoked on each component in the draw list.

Draw cycles are scheduled using `requestAnimationFrame()` on browsers that support it, or `setTimeout()` on legacy systems.

## Building the draw list
During each draw cycle, Montage explores the application’s component tree for all components that have their `needsDraw` property set to `true`. Only components that have indicated they want to draw, or have a child that wants to draw are explored. If a component being added to the draw list is participating in a draw cycle for the first time, its `prepareForDraw()` callback method is invoked. A parent component can also block exploration of its child components by returning `false` from its `canDraw()` method.

Once this initial list has been created, Montage invokes `willDraw()` on each component in the list. As a result of this, additional components may have had their `needsDraw` property set to `true`. For example, a parent component’s `willDraw()` implementation might determine that one of its child components needs to update its DOM, so it sets the component’s `needsDraw` property to true. To include these components in the current draw cycle, Montage explores the component tree again for new components that requested a draw and adds them to the draw list. It then invokes `willDraw()` on each of the newly added components. This process is repeated until no additional components have requested a draw. Any component that requests a draw during the remainder of the draw cycle will be part of the next draw cycle.

## Drawing phase
Once the list of components that need to be redrawn has been generated, Montage invokes the `draw()` method on each member of the list. This method is the prescribed location for components to modify their DOM structure or CSS styles; those types of operations should not be performed outside of a component’s `draw()` method. Finally, `didDraw()` is called on each component in the draw list. If this was the first time a component in the draw list was drawn, that component automatically dispatches a `"firstDraw"` event.

Children of a component are always drawn before their parents.

## Callback methods and rules
The following are the component callback methods involved in the draw cycle. The framework calls these methods at the appropriate times, and should never be called directly by an application. Which methods a component implements depends on what it wants to do. But in general, any component that intends to directly update its DOM structure must implement a `draw()` method.

### Callback methods

#### canDraw()
* __When invoked:__ While Montage walks the component tree determining which components to add to the draw list.
* __Purpose:__ If a component returns `false` from this method then it won’t be added to the draw list, and its child component tree isn’t explored.

#### prepareForDraw()
* __When invoked:__ The first time a component is added to the draw list.
* __Purpose:__ Provides the component a chance to prepare for it being drawn for the first time. For a component with an HTML template, this method is invoked when the template been loaded and applied to the DOM.

#### willDraw()
* __When invoked:__ Invoked on each component in the generated draw list.
* __Purpose:__ Provides the component an opportunity to query the DOM for any necessary calculations before drawing. If the execution of this method sets `needsDraw` to true on other components, those components will be added to the current draw cycle.

#### draw()
* __When invoked:__ Invoked on each component in the generated draw list, after `willDraw()` has been invoked on each.
* __Purpose:__ This is the prescribed location for components to update its DOM structure or modify its styles.

#### didDraw()
* __When invoked:__ Invoked on each component in the generated draw list, after `draw()` has been invoked on each.
* __Purpose:__ Provides the component an opportunity to query the DOM for any necessary calculations after drawing.

Components must follow Rules for the draw cycle:
1. A component should never perform any DOM manipulation outside of its `draw()` method. This includes element style changes, and appending or removing elements from the DOM.
2. Any reading of the DOM for measurements (such as an element’s `offsetWidth`) should only be performed in the `willDraw()` or `didDraw()` methods, and never in `draw()` method.

By implementing your component’s DOM changes and queries in this way will limit the amount of reflows by the browser which will help to improve performance.

## Component tree model
A Montage application consists of one or more components arranged hierarchically in a tree, much like the DOM. Every Montage application has a root component that is created automatically by the framework. Every component (except the root) has a parent component. Every component also has an associated DOM element that is the component’s primary connection to the DOM, and is specified by the component’s `element` property. The component is the element’s “controller”, and can be accessed by reading the `controller` property on its DOM element. A component’s parent component, therefore, can be found by walking up the DOM tree from its own DOM element until it finds an element that has a non-null `controller` property.
