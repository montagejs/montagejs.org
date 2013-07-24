---
layout: docs
title: Naming Conventions
---

# Naming Conventions

This document summarizes MontageJS-specific naming conventions and recommendations for modules, components, and CSS classes. Please refer to these conventions when creating MontageJS packages or contributing to the MontageJS framework.

## Rationale
We chose these conventions for the following reasons:

* To reduce the effort to read and understand the markup structure of our source code.
* To increase code usability because you can double-click each part of the code to quickly select and edit it. (Try it: `montage-InputRange-thumb` versus `montage_InputRange_thumb`.)
* To avoid name collisions due to multiple selectors.

## Modules

All module and package names are written in lowercase letters or numbers and delimited by dashes (for example, child-package).

## Components
User interface components are stored in the ui directory of your MontageJS project and identified by a .reel extension. 

The following naming conventions apply for `.reel` directories:

* Component names are always spelled in lowercase letters.
* If an official W3C HTML element exists, the component's name matches the name of that element; for example, `button` (`button.reel`) for a `<button>`.
* If an official HTML equivalent does not exist, assign a name that captures the function or meaning of the component; for example, `toggle-switch`.
* Input elements follow a dash-delimited `"element-type"` pattern; for example, `input-range`, `input-radio`, or `input-color`.


## CSS Classes

CSS class names follow a dash-delimited `org-Component` and `org-Component-childElement` pattern. For example, for the progress bar it would be: `montage-Progress` and `montage-Progress-bar`.

More specifically, the following conventions apply:

1. All CSS classes are prefixed with **montage** + **dash**: `montage-`.
2. Component names follow the namespace identifier (`montage-`) and always start with an uppercase letter; for example, `montage-Button`. 

    ```
    <button data-montage-id "button" class="montage-Button">
    ```

    If a component name consists of more than one word, each new word also starts with an uppercase letter, a convention commonly  referred to as **upper camel case** ("CamelCaps") formatting; for example, `montage-Button`, `montage-InputRange`.
    
3. Composite components (components with children) follow this convention:

    If a component has a **child element**, the child's name is written in lowercase (to signal the distinction between parent and child) and follows the component’s name separated by a dash; for example, `montage-InputRange-thumb`. Be sure to use the same name for children as the native pseudo (Shadow DOM) elements if known; for example: -webkit-progress-**bar**. Angelina Fabbro put together a nice reference [list](https://gist.github.com/3759334) of pseudo element selectors used in WebKit.
    * If a child element consists of concatenated words, its name is written in lower camelCase; for example, `montage-InputRange-thumbWithSpikyEars`.
    * If a component has multiple levels of child elements, each child is separated from the other by a dash; for example, `montage-InputRange-thumb-nobs-centerNob`.

        **Note:** There is **no limit** as to how many levels of child elements can be used, but if the whole CSS class becomes too long, it might be a good idea to **break** it into subcomponents.

    If a class name represents a **state** or a **variation**, a double-dash is used; for example, (states) `montage-InputRange--dragging`, `montage-Button--pressed` or (variations) `montage-Button--big`, `montage-Button--primary`.