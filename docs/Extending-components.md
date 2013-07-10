---
layout: docs
title: Extending components
---

# Extending components

Extending a component is similar to extending a JavaScript object: you create a new object and make its prototype the object you want to extend. The main difference is that you may also need to extend the component’s HTML template, when one is present.

The process of extending a component is the same as creating an entirely new component using the original one as its prototype. If the customization doesn’t require a change in the component’s controller (its JavaScript object) then it is sufficient to create an instance of the extended object. If the component being extended has an HTML template, the developer must either point to the template of the extended component, or create a new template.

There are three options to extend a component’s template:

1. If the extended component doesn’t wish to introduce changes in the template, the component can set its `templateModuleId` property to point to the parent module’s template.
2. Create a new template that will completely redefine the markup of the component with no relation to the original template.
3. Set the `extends` property of the template that points to the template to be imported and where. This is similar to the “decorator” pattern of the proposed [Web Components](http://dvcs.w3.org/hg/webcomponents/raw-file/tip/explainer/index.html#decorator-section) feature. This approach is useful when the component needs to add additional CSS data, or reuse the original markup. The template object will be accessible through the `template` label of the serialization.

## Examples
### Extending the Toggle component only changing its markup

```js
//my-toggle.js
var Montage = require("montage").Montage,
    Toggle = require("ui/toggle").Toggle;

exports.MyToggle = Montage.create(Toggle);
```

```html
// my-toggle.html
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <link rel="stylesheet" type="text/css" href="my-toggle.css">
    <script type="text/montage-serialization">
    {
        "owner": {
            "prototype": "my-toggle.reel",
            "properties": {
                "element": {"#": "my-toggle"}
            }
        }
    }
    </script>

</head>
<body>
    <div id="my-toggle">
        <div id="thumb" />
    </div>
</body>
</html>
```

### Extending the Toggle component by only changing some of its logic

```js
//my-toggle.js
var Montage = require("montage").Montage,
    Toggle = require("montage/ui/toggle.reel").Toggle;

exports.MyToggle = Montage.create(Toggle, {
    draw: {
        value: function() {
            // my different draw implementation
        }
    },
    templateModuleId: {
        value: "montage/ui/toggle.reel/toggle.html"
    }
});
```

### Extending the Toggle component by adding styling elements

```js
//my-toggle.js
var Montage = require("montage").Montage,
    Toggle = require("montage/ui/toggle.reel").Toggle;

exports.MyToggle = Montage.create(Toggle, {
    draw: {
        value: function() {
            // my different draw implementation
        }
    }
});
```

```html
//my-toggle.html
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <link rel="stylesheet" type="text/css" href="my-toggle.css">
    <script type="text/montage-serialization">
    {   
        "owner": {
        "prototype": "my-toggle.reel",
            "properties": {
                "element": {"#": "my-toggle"}
            }
        },

        "template": {
           "properties": {
               "extends": {
                   "templateModuleId": "montage/ui/toggle.reel/toggle.html",
                   "element": {"#": "toggle"},
               "instances": {
                  "owner": {"@": " owner"}
                   }
               }
           }
       }
    }
    </script>

</head>
<body>
    <div id="my-toggle"> ← (merge attributes from toggle.html)
       <h1>My Toggle</h1>
       <div id="toggle"></div>
   </div>
</body>
</html>
```
