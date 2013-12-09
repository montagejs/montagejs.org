---
layout: docs
title: MontageJS Components

prev-page: montagejs-examples
this-page: exploring-components
next-page: serialization-format

---

# MontageJS Components

>**Note:** We are currently in the process of updating our docs. This document may not be complete or fully up-to-date yet. We apologize for any inconvenience.

MontageJS applications consist of a model layer that handles the data and a view layer that reads from the models. Components make up the view portion of a MontageJS application. As a rule, these components are stored in the ui directory of your MontageJS application (which has the benefit that you can use any MontageJS package and easily locate the user interface components it provides).

MontageJS components are encapsulated; the structure (HTML), appearance (CSS), and behavior (JavaScript) that power a user interface component are all located in the same directory, identified with a .reel suffix. For example, the foo-bar component is located in the ui directory of your MontageJS application at `montageapp/ui/foo-bar.reel` and encapsulates the following files: foo-bar.css, foo-bar.html, and foo-bar.js. Because components are self-contained, it's easy to work on, rename, or even remove an individual component without having to find bits and pieces of it scattered across directories.

MontageJS components are modular; regardless of where a component is used, the same HTML, CSS, and JavaScript will control how that particular component is structured, looks, and behaves.

>**Note**: Out of the box, MontageJS includes three prebuilt widget sets (or themes) for user interface components: Digit, Matte, and Native. Digit is a touch-friendly widget set optimzed for mobile device development. Matte contains desktop-optimized UI components. The Native package contains native UI components. This package lets you wrap HTML5 elements to give them access to MontageJS features such as data bindings and the MontageJS event handling model. All styling is left to the user-agent/browser or the author to apply.

## Anatomy of a Component
Let's take a closer look at some key features of the HTML, CSS, and JS files included in the FooBar component. First the HTML file.

Every component's HTML file is a complete and valid HTML document. The head section includes the component's CSS file and a script block, which contains all serialized MontageJS objects in the document.

```html
<link rel="stylesheet" type="text/css" href="foo-bar.css">
<script type="text/montage-serialization">
{
    "owner": {
        "properties": {
            "element": {"#": "foo-bar"}
        }
    }
}
</script>
```

For more details on the serialization format refer to [MontageJS Serialization Format](http://montagejs.org/docs/Montage-serialization-format). For now, note the following:

* The script type is set to `text/montage-serialization`.
* The serialization format is JSON, with some enforced semantics.
* `"owner"` is a special label in the serialization that refers to the current component. (Think of it as the equivalent of `this` in JavaScript.)
* `{"#": "foo-bar"}` refers to the root element in the body of the HTML file, identified with the [custom data-attribute](http://www.whatwg.org/specs/web-apps/current-work/multipage/elements.html#custom-data-attribute) `data-montage-id` of `foo-bar`:

```html
<body>
    <div data-montage-id="foo-bar" class="FooBar">
    </div>
</body>
```
>**Note:** In the object serialization JSON tree the “#” identifier refers to DOM elements (We also use the “@” identifier, which refers to template objects or other components defined in the object serialization).

This means that when you use a FooBar component in a MontageJS application the only portion of its template that will be rendered is the `foo-bar` element.

>**Note:** MontageJS components are reusable, that is, you can insert them multiple times in the same document, which is why we use a [custom data-attribute](http://www.whatwg.org/specs/web-apps/current-work/multipage/elements.html#custom-data-attribute), `data-montage-id`, to identify elements and not the document-unique HTML `id` attribute. This also gives you the freedom to use the `id` attribute for styling, whether for performance or legacy reasons.

Next, the CSS file: By default, we start off with an almost blank style sheet, waiting for you to bring it to life by adding your meticulously crafted rules. The only content we pass along is the class name of the root element.

```css
.FooBar {

}
```

Note also that the class name is a CamelCase version of the .reel directory name. This is part of our internal [CSS naming convention](https://github.com/montagejs/montage/wiki/Naming-Conventions); it allows us to scope each component's CSS so that it doesn't "leak out" and accidentally style other components.

Finally, the JS file:

```javascript
exports.FooBar = Component.specialize(/** @lends FooBar# */ {
   constructor: {
       value: function FooBar() {
           this.super();
       }
   }
});
```

The file exports a single object with a CamelCase version of the .reel directory name which inherits MontageJS methods from `Component`. The first argument provides a way to define the properties (methods and values) that will be available on the instances of the new type being created. The second argument provides a way to define properties of the type itself, they are accessible directly on the type (e.g., `Component.method()`).

`this.super()` is a special function that will call the parent method with the same name. in this case it will call the constructor function that was defined in the Component type. This is useful to extend a behavior and is similar to its Java counterpart.

When in use, the FooBar component will be rendered in a document using its element from its included template, styled using its included CSS, and given instructions on how to act from its included JavaScript.
