---
layout: docs
title: MontageJS Draw Cycle

prev-page: montagejs-examples
next-page: extending-components
---

# Draw Cycle

You want your web applications, especially mobile ones, to perform well in order to be valuable to users. People don't like to wait; "every millisecond counts!" Although you can, to some extent, mitigate perceived application performance issues by optimizing user interface flows and elements, you cannot get around two key factors that can trigger expensive reflow: DOM manipulation (i.e., creating or modifying the DOM structure or styles) and DOM inspection (i.e., querying an element's calculated style; for example, `offsetWidth`).

Repeatedly manipulating and reading the DOM in an unmanaged fashion—AKA interleaving write and read operations or "layout thrash"—will cause expensive reflows that can have a critical impact on the performance and responsivenes of your web application and, by extension, on usage and brand perception. This is where MontageJS comes in.

To help maximize application performance, MontageJS components participate in a managed draw cycle that batches DOM write and read operations into separate code passes. In this approach, all the required DOM updates are made in a single pass, followed by another pass that executes all required DOM queries. As a result, only the first DOM query triggers a reflow; subsequent queries do not.


## How It Works

When a component needs to update its appearance, it requests a draw by setting its `needsDraw` property to true. This causes the component to be added to an internal _draw list_. During each draw cycle, MontageJS iterates over this list and invokes a series of predefined callback methods on each component. The three primary callback methods are `willDraw()`, `draw()`, and `didDraw()`. A callback method is performed on all components in the draw list before the next callback method.
```

These features are implemented through a series of component method callbacks that the framework invokes. Each draw cycle involves two stages:

1. The request draw phase, which involves building a _draw list_ of components that have their `needsDraw` property set to true.
2. The draw phase, in which a series of callback methods are invoked on each component in the draw list.

Draw cycles are scheduled using `requestAnimationFrame()` on browsers that support it, or `setTimeout()` on legacy systems.

## Building the draw list
During each draw cycle, Montage explores [??? parse? examine???] the application's component tree for all components that have their `needsDraw` property set to `true`. Only components that have indicated [how?] they want to draw, or have a child that wants to draw are explored. If a component being added to the draw list is participating in a draw cycle for the first time, its `prepareForDraw()` callback method is invoked. A parent component can also block exploration of its child components by returning `false` from its `canDraw()` method.

Once this initial list has been created, Montage invokes `willDraw()` on each component in the list. As a result of this, additional components may have had their `needsDraw` property set to `true`. For example, a parent component’s `willDraw()` implementation might determine that one of its child components needs to update its DOM, so it sets the component’s `needsDraw` property to true. To include these components in the current draw cycle, Montage explores the component tree again for new components that requested a draw and adds them to the draw list. It then invokes `willDraw()` on each of the newly added components. This process is repeated until no additional components have requested a draw. Any component that requests a draw during the remainder of the draw cycle will be incuded in the following draw cycle.

## Drawing phase
After generating the draw list, Montage invokes the `draw()` method on each member of the list. This method is the prescribed location [???a method == location??] for components to modify their DOM structure or CSS styles; those types of operations should not be performed outside of a component's `draw()` method. 

Finally, `didDraw()` is called on each component in the draw list. If this was the first time a component in the draw list was drawn, that component automatically dispatches a `"firstDraw"` event.

Children of a component are always drawn before their parents.

## Callback methods and rules
The following are the component callback methods involved in the draw cycle. These methods should never be called directly by an application as These methods are called by MontageJS framework calls these methods at the appropriate times, and should never be called directly by an application. Any component that intends to directly update its DOM structure must implement a `draw()` method; which method a component implements depends on what it wants to do. 

### Callback methods

#### canDraw()
* __When invoked:__ While MontageJS walks [parses???] the component tree determining which components to add to the draw list.
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

Components must follow rules for the draw cycle:

1. A component shall never perform any DOM manipulation outside of its `draw()` method. This includes element style changes, and appending or removing elements from the DOM.
2. Any reading of the DOM for measurements (such as an element's `offsetWidth`) shall  be performed only in the `willDraw()` or `didDraw()` methods, and never in the `draw()` method.

Following these rules when implementing your component's DOM changes and queries will limit the amount of reflows in the browser which, in turn, will help improve the performance of your application.

## Component tree model
A MontageJS application consists of one or more components arranged hierarchically in a tree, much like the DOM. Every component has an element that is the component's primary connection to the DOM, specified by the component's `element` property. You can access a component by reading the `controller` property on its DOM element. To find a component's parent component, you walk up the DOM tree from its own DOM element until it finds an element that has a non-null `controller` property.

Every MontageJS application has a root component that is created automatically by the framework. ~~Every component (except the root) has a parent component.~~ Every component ~~also~~ has an associated DOM element that is the component's primary connection to the DOM and is specified by the component's `element` property. The component is the element's "controller," and can be accessed by reading the `controller` property on its DOM element. A component's parent component, therefore, can be found by walking up the DOM tree from its own DOM element until it finds an element that has a non-null `controller` property.
