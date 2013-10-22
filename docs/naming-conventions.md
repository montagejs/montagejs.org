---

layout: docs
title: Naming Conventions

---

# Naming Conventions

This document summarizes MontageJS-specific naming conventions and recommendations for modules, components, and CSS classes. Please refer to these conventions when creating MontageJS packages or contributing to the MontageJS framework.


## Modules

All module and package names are written in lowercase letters or numbers and delimited by dashes (for example, `child-package`).


## Components (.reel)
User interface components are stored in the ui directory of your MontageJS project and identified by a .reel extension. 

The following naming conventions apply for `.reel` directories:

* Component names are always spelled in lowercase letters.
* If the name uses multiple words, follow a dash-delimited `"word-word"` pattern; for example, `radio-button.reel`, or `text-field.reel`.


## CSS Classes

CSS class names follow a dash-delimited `package-Component` and `package-Component-childElement` pattern. For variations and states, double dash is used. For example, for the Matte Progress component it would be:

```css
.digit-Progress          /* package-Component */
.digit-Progress-bar      /* package-Component-childElement */
.digit-Progress--small   /* package-Component--variation */
.digit-Progress--loading /* package-Component--state */
```

More specifically, the following conventions apply:

1. All CSS classes are **name-spaced** with **package** + **dash**, like `montage-`, `digit-`, `matte-` etc.
2. Followed by the **Component** name that always starts with an uppercase letter; for example a button component would be: `digit-Button` and used as: 

    ```html
    <button data-montage-id="button" class="digit-Button">
    ```

    If a component name consists of more than one word, each new word also starts with an uppercase letter, a convention commonly  referred to as **upper camel case** ("CamelCaps") formatting; for example, `montage-InputRange`.
    
3. **Composite components** (components with children) follow this convention:
    * If a component has a **child element**, the child's name is written in lowercase (to signal the distinction between parent and child) and follows the component’s name separated by a dash; for example, `digit-Slider-thumb`.
    * If a child element consists of concatenated words, its name is written in lower camelCase; for example, `digit-Slider-thumbWithSpikyEars`.
    * If a component has multiple levels of child elements, each child can be separated from the other by a dash; for example, `digit-Slider-thumb-nobs-centerNob`. This is not required in all cases as the class name would become too long. Only use if it makes sense.

4. **Variations** If a component offers variations, a double-dash is used; for example: `digit-Button--primary`, `digit-Slider--vertical`.

5. **States** If a component uses different states, also a double-dash is used; for example: `digit-Slider--dragging`, `matte-Button--pressed`.

### Rationale
These CSS naming conventions are similar to [BEM](http://bem.info/method/). But the syntax got adapted for the following reasons:

* Name-spacing it with the package avoids name collisions when packages are getting mixed.
* Not using underscores "_" increases usability because you can double-click each part to quickly select and edit it. (Try it: `digit-Slider-thumb` versus `digit_Slider_thumb`.)
* Using upper "CamelCase" for components highlights component/child relationship.
* Using "camelCase" for multiword names increases readability but still keeps each part grouped together.
