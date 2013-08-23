---

layout: docs
title: MontageJS Data Binding

prev-page: montagejs-objects
next-page: event-handling

---


# Data binding

Data binding lets you easily associate the value of a property of one object to a property in another object. Data binding relies on the property change observer feature in Montage When the value oThe object that defines the binding is called the source object, and the object to which it binds is called the bound object. When the value of the property changes on the bound object, the new value is assigned to the corresponding property in the source object.

![Montage Data Binding](/images/docs/databinding.png)

You establish a data binding using the Object.defineBinding() method, or by adding a “bindings” property to an object in a serialization. Each data binding requires a source object and property path, and a bound object and property path. You can configure a data binding in the following ways:

### One-way or bi-directional
By default, bindings are “bi-directional”, meaning that changes to property (in either object are pushed to the other. You can override this behavior when you define the binding.

### Converters
Each binding descriptor may specify a converter object that sits between the source and bound objects. A converter implements two methods (`convert()` and `revert()`) that are invoked automatically when a data binding executes, but before the new property value assignments are made.

### Deferred execution
By default, when the value of a bound property changes, the new value is immediately pushed to the corresponding property in the source object (and visa-versa for bi-directional bindings). You can configure a data binding to defer “executing” its bindings until you explicitly request it.

Some examples of data binding:

* Bind the `checked` property of a Checkbox component to the `enabled` property of a Button component. When the Checkbox is checked, the button is enabled, and vice versa.
* Bind an `ArrayCollection` object to a Repetition or Flow component’s `contentController` property.
* Bind an Image component’s `src` property to a user-provided value.

## Relationship to property change observing
Data binding depends on the Property change observing feature in Montage. In short, this feature lets you register an event listener on an array or a property of an object. When the observed property changes, or the target array is modified, a callback method is invoked allowing the application to respond. Data binding is, in fact, a system of managed, configurable, special purpose property change observers.

## Creating data bindings
You can define a data binding between any two Montage objects or components. To create a binding you can use the `Object.defineBinding()` method, or declaratively create one as part of a template’s serialization.

## Creating data bindings with Object.defineBinding()
You use the Object.defineBinding() method to create a data binding between two objects. The method has the following signature:

```js
Object.defineBinding(sourceObject, propertyPath, bindingDescriptor)
```

The first parameter, `sourceObject`, is a reference to the object on which the binding is defined. The second parameter, `propertyPath`, is a string that specifies the key path to the bound property on the source object. The third parameter, `bindingDescriptor`, is an object that contains the following properties:

* `boundObject` (Object reference) Reference to the bound object
* `boundObjectPropertyPath` (String) The key path to the bound property in the bound object
* `deferred` (Boolean) Boolean | If `true`, the binding does not immediate execute (that is, push new values to their destinations) when an observed property value changes. Default is `false`, meaning bindings execute immediately by default.
* `oneway` (Boolean) If `true`, changes to the source object’s property are not pushed to the bound object. Default is `false`, meaning that bindings are two-way by default.

The following code example creates a binding between the `enabled` property of a Button component and the `checked` property of a Checkbox component. This means that when the checkbox is not checked, the button will be disabled, and vice versa.

```js
var Button = require("montage/ui/button.reel").Button;
var Checkbox = require("montage/ui/checkbox.reel").Checkbox;

var btn = Button.create();
var cb2 = Checkbox.create();
btn.element = document.getElementById("button");
cb2.element = document.getElementById("checkbox");

Object.defineBinding(btn, "enabled", {
    boundObject: cb2,
    boundObjectPropertyPath: "checked"
});
```

To prevent the binding from executing immediately when the observed property value changes, add a `deferred` property to the binding descriptor object whose value is “false”.

```js
Object.defineBinding(btn, "enabled", {
    boundObject: cb2,
    boundObjectPropertyPath: "checked",
    deferred: true
});
```

## Creating data bindings in a serialization
Each serialized object in a serialization may specify a “bindings” property, which is an object that defines the bindings for that object. One advantage to define bindings in a serialization is the binding shorthand syntax, which lets you quickly and easily define bindings.

```html
<html>
<head>
    <title>Data binding test</title>
    <script src="../../montage.js" data-auto-package></script>
    <script type="text/montage-serialization">
    {
        "btn": {
            "prototype": "montage/ui/button.reel/button[Button]",
            "properties": {
                "element": {"#": "button"}
            },
            "bindings": {
                "enabled": {"<-" : "@checkbox.checked"}
            }
        },

        "checkbox": {
            "prototype": "montage/ui/checkbox.reel/checkbox[Checkbox]",
            "properties": {
                "element": {"#": "checkbox"}
            }
        }
    }
    </script>
</head>
<body>
    <input type="button" id="button" name="" value="Button">
    <input type="checkbox" id="checkbox" name="" value="Checkbox">
</body>
</html>
```

## Data binding serialization shorthand syntax
Montage provides a shorthand syntax when declaring data bindings in a serialization. An arrow symbol that indicates the source of the binding and whether its one-way or two-way. The symbol can take one of the following forms:

| Symbol | Description |
| :----: | --- |
|  `<-`  | __One-way__ data binding, bound object on __right__ |
|  `->`  | __One-way__ data binding, bound object on __left__ |
| `<<->` | __Two-way__ data binding, bound object on __right__ |
| `<->>` | __Two-way__ data binding, bound object on __left__ |

The `boundObject` and `boundObjectPropertyPath` properties of `defineBinding()` API are combined into a single string form. The syntax takes the following general form:

```json
"boundProperty": {"direction-symbol": "@objectReference.key.path"}
```

To demonstrate consider an application whose serialization contains a Textfield component and a Slider component. To create a one-way binding between the Slider’s `value` property and the Textfield’s `value` property using the short-hand syntax:

```json
{
   "inputText": {
       "prototype": "textfield",
       "bindings": {
          "value": {"<-": "@slider.value"}
       }
    },
    "slider": {
       "prototype": "slider"
    }
}
```

This means that changes to `slider.value` will be pushed to the Textfield. In code, this would be written as follows, assuming `inputText` is a Textfield instance and `slider` is a Slider instance.

```js
Object.defineBinding(inputText, "value", {
    boundObject: slider,
    boundObjectPropertyPath: "value"
});
```

To define a one-way binding in the opposite direction (from the Textfield to the Slider), simply reverse the direction of the arrow symbol:

```json
{
   "inputText": {
       "prototype": "textfield",
       "bindings": {
          "value": {"->": "@slider.value"}
       }
    },
    "slider": {
       "prototype": "slider"
    }
}
```

In code this would be written as follows:

```js
Object.defineBinding(slider, "value", {
    boundObject: textField,
    boundObjectPropertyPath: "value"
});
```

Or, equivalently, you can define the binding on the Slider object instead:

```json
{
   "inputText": {
       "prototype": "textfield"
    },
   "slider": {
       "prototype": "slider",
       "bindings": {
          "value": {"<-": "@inputText.value"}
       }
    }
}
```

To create a two-way binding between the object’s properties, with Textfield as the source, you add a single arrow pointing to @slider.value, and a double arrow pointing in the opposite direction:

```json
{
   "inputText": {
       "prototype": "textfield",
       "bindings": {
          "value": {"<<->": "@slider.value"}
       }
    },
   "slider": {
       "prototype": "slider"
    }
}
```

Which is equivalent to the following code:

```js
Object.defineBinding(inputText, "value", {
    boundObject: slider,
    boundObjectPropertyPath: "value"
});
```

To create a two-way binding with Slider as the binding source, you add a single arrow pointing to the left, and a double arrow pointing to the right:

```json
{
   "inputText": {
       "prototype": "textfield",
       "bindings": {
          "value": {"<->>": "@slider.value"}
       }
    }
}
```

Or, equivalently, you can declare the binding on the slider and reverse the direction of the arrow:

```json
{
   "slider": {
       "prototype": "slider",
       "bindings": {
          "value": {"<<->": "@slider.value"}
       }
    }
}
```

In long-form syntax, you would declare the following:

```json
{
   "slider": {
       "prototype": "slider",
       "bindings": {
          "value": {
              "boundObject": {"@": "inputText"},
              "boundObjectPropertyPath": "value"
          }
       }
    }
}
```

## One-way and two-way bindings
By default, all data bindings are two-way. This means when the value of the observed property changes in either the source or the bound object, the new value is assigned to the corresponding property in the other object. In a one-way data binding, only changes to the property on the bound object are observed, not changes to source object. To make a data binding one-way you set the `oneway` property on the binding descriptor object to `true`.

![Montage Data Binding](/images/docs/databinding.png)

To demonstrate, below is a simple Montage object that defines a single property, `name`.

```js
var Montage = require("montage").Montage;
var Person = exports.Person = Montage.create(Montage, {
    name: {
        value: null,
    }
});
```

We create two instances of the Person object and define a binding between their `name` properties:

```js
// Create two instances of Person
var p1 = Person.create();
var p2 = Person.create();
// Define a binding between p1.name and p2.name
Object.defineBinding(p1, "name", {
  boundObject: p2,
  boundObjectPropertyPath: "name",
});
```

If you assign a value to `name` on either the `p1` or `p2` instances, then the value on the other object changes accordingly:

```js
p1.name = "Abe";
console.log("p2.name is now: " + p2.name);
// console says: "p2.name is now: Abe"
```

```js
p2.name = "Betty";
console.log("p1.name is now: " + p1.name);
// console says: "p1.name is now: Betty"
```

If you set `oneway` in the `defineBinding()` call to `true`, then changes to `p2` will cause the binding to execute, but not changes to `p1`.

```js
// Create two Person instances:
var p1 = Person.create();
var p2 = Person.create();
p1.name = "Harry";
p2.name = "Kate"
// Define a oneway binding between p1.name and p2.name
Object.defineBinding(p1, "name", {
   boundObject: p2,
   boundObjectPropertyPath: "name",
   oneway: true
});
```

Any changes to `p1.name` does not update `p2.name`, but changes to `p2.name` does update `p1.name`.

```js
p1.name = "Thomas";
console.log("p2.name is now: " + p2.name);
// "p2.name is now: Kate". No change to p2 in oneway data binding.
// Change p2.name
p2.name = "Eleanor";
console.log("p1.name is now: " + p1.name);
// "p1.name is now: Eleanor"
```
