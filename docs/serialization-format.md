---

layout: docs
title: MontageJS Component Object Model

prev-page: extending-components
this-page: serialization-format
next-page: montagejs-objects

---


# Serialization format

This document explains the serialization format used by MontageJS to serialize, and later deserialize, an _object graph_. A serialized object graph describes the objects, components, properties, component data bindings, and DOM relationships involved in a MontageJS application. MontageJS uses JavaScript Object Notation (JSON) as the serialization format. At runtime, MontageJS parses the JSON structure and deserializes its contents into JavaScript that is then evaluated and executed in the browser.

## JSON overview
JSON is a text-based open standard designed for human-readable data interchange. It can represent six data types:

* Four primitive types: strings, numbers, Booleans, and null
* Two structured types: objects and arrays

In JSON, an object is represented as an unordered collection of zero or more name/value pairs. A name is a string, and a value is one of the primitive JSON data types—string, number, Boolean, or null. An array structure is represented as square brackets surrounding zero or more values (or elements). Elements are separated by commas.

For example, the following JSON content defines an object named `anObject` that contains three properties:

* A string named `id`
* An array named `colors`
* A Boolean named `readyState`

```json
"anObject": {
    "id": "123asd",
    "colors": [ "red", "green", "blue"],
    "readystate": false
}
```

In addition to these standard data types, MontageJS supports a few special types to enable serialization of more complex objects. These types include references to other objects in the same serialization, DOM references, functions, and regular expressions.

## Serialization Example
The following simple (yet complete) Montage application is defined in a single HTML document. This example gives you a sense of what serialization in Montage is about and why it's useful.

```html
<html>
    <script src="../../montage.js"></script>
    <script type="text/montage-serialization">
    {
        "firstName": {
            "prototype": "montage/ui/text.reel",
            "properties": {
                "element": {"#": "firstName"}
            }
        }
    }
    </script>
    <body>
        <span data-montage-id="firstName"></span>
    <body>
</html>
```

Important things to note:

* The HTML body contains a single `<input>` tag that has the ID "fName".
* The document head contains a `<script>` block of type `text/montage-serialization`. This block contains all serialized Montage objects used in the document.
* The serialization block declares a Montage Textfield component with an object label of "firstName". The component's module ID ("montage/ui/textfield.reel") and its name ("Textfield") allow Montage to re-create the component from its serialized form at runtime.
* The "properties" object assigns initial values to the component’s properties. One of the most important properties of a Montage component is its `element` property, which corresponds to the associated HTML element on which the component operates on. In this case, the Text component’s element property is set to the `<span>` tag that has the ID "fName". The Montage serialization format provides a special JSON object representation to refer to an element. This special object’s name is a hash mark ("#") and its value is the ID of the element.
* Montage can load components from a directory that has a .reel extension. The module system redirects `require("x.reel")` to `require("x.reel/x")`.

## Serialization owner
A Montage serialization can declare an optional object named "owner". The specified owner acts as the controller for the document. For example, the following code creates a new module (main.js) that exports a `Main` prototype object.

```js
// Module: main
// Exported object name: Main
var Component = require("montage/ui/component").Component;
//
exports.Main = Component.specialize({
// Prototype methods and properties
})
<script type="text/montage-serialization">
{
    "owner": {
        "prototype": "main",
        "properties": {
            "element": {"#": "main"}
        }
    }
}
</script>
```

## Serialization formats
The following sections explain serialization for different objects.

### Object serialization
To serialize custom JavaScript objects, including Montage components, define a JSON object with a `prototype` property. This property corresponds to the ID of the module that defines (or exports) the desired object.

The following serialization fragment declares a Montage Text component:

```html
<script type="text/montage-serialization">
{
    "hello": {
        "prototype": "montage/ui/text.reel"
    }
}
</script>
```

At runtime Montage parses this serialization and evaluates it as the following JavaScript:

```js
var Text = require("montage/ui/text.reel").Text;
```

The object labels in a serialization (such as “hello” in the above example) can be accessed in the JavaScript runtime through the `templateObjects` property of the "owner" object of the serialization (when such an object is part of the serialization).
You __can__ reference objects within a serialization using a special JSON representation.

You can assign initial values to an object’s properties in a serialization by adding a `properties` object to the serialization. For example, the Montage Text component has a `value` property that contains the string to display in the text's element. The following assigns the value "Hello World" to the Text component’s `value` property.

```json
"hello": {
    "prototype": "montage/ui/text.reel",
    "properties": {
        "value": "Hello World!"
    }
}
```

## Referencing DOM elements in a serialization

You can reference DOM elements from a Montage serialization using a special JSON object representation. This is commonly used to assign an HTML element to a component’s `element` property, or anytime you need a reference to a DOM element.

To reference an element by ID, use the following JSON syntax where _elementID_ is the ID of an element in the document that contains the serialization.

```json
{"#": "elementID"}
```

For example, this serialization block declares a Montage Text component whose `element` property is assigned the <span> with the ID of `hello`:

```html
// index.html
<html>
<script src="../../montage.js"></script>
<script type="text/montage-serialization">
{
    "hello": {
        "prototype": "montage/ui/text.reel",
        "properties": {
            "element": {"#": "hello"}
        }
    }
}
</script>
<body>
    <span id="hello" class="text"></span>
<body>
</html>
```

### Referencing other objects in a serialization

Often you need to reference one serialized Montage object from another object in the same serialization. For instance, the serialization might declare a Montage button that you want to reference from the controller (or owner) object in the serialization.

To reference an element by ID, use the following JSON syntax. In this example, _objectLabel_ is the label assigned to the serialized object.

```json
{"@": "objectLabel"}
```

## Data bindings in serializations
You can define event listener and data bindings between components within a serialization. To better understand the binding serialization syntax, look at the underlying JavaScript method used for creating data bindings, `Montage.defineBinding()`. This method takes three parameters:

* The target object defining the binding.
* The name of the target object’s property that is being bound.
* A descriptor object that specifies, minimally, the direction of the binding - one-way "<-" or 2-way "<->" and the path that the target property is bound to.

```js
Montage.defineBinding(targetObject, "propertyName", {
    "<-": "key.path.of.property"
}, {
    source: boundObject
});
```

You specify a component’s bindings in a serialization with a “bindings” JSON object that, in turn, defines one or more JSON objects.
In the serialization a binding path is an FRB expression, components from the serialization can be referenced by using the syntax `@componentLabel`. More information about FRB can be found [here](http://documentup.com/montagejs/frb/).

```json
"bindings": {
    "boundValue": {
        "<-": {"@boundObjectLabel.key.path.of.property"}
    }
}
```

## Event listeners in serializations

You can assign event listeners to serialized components in a serialization using a `listeners` property.

This can reduce the amount of code required to establish event handling for your components. The serialization in the following example declares two objects: a custom controller object (Controller) and a Montage Button. The controller object acts as the event listener object to respond to “action” events that the Button emits when clicked or touched.

This code for the Controller component defines a single function named `handleAction()`, which is invoked when the user clicks the button:

```js
// Module: controller
// Name: Controller
var Montage = require("montage").Montage;
exports.Controller = Montage.specialize({
    handleAction: {
        value: function(event) {
            console.log("Button event handled...");
            // Do login stuff...
        }
    },
});
```

The following is the HTML document and component serialization. The "loginBtn" object in the serialization contains a "listeners" array property. This array can contain one or more.

```html
<html>
<head>
<script src="../../montage.js"></script>
<script type="text/montage-serialization">
{
    "controller": {
        "prototype": "controller",
        "properties": {
            "button": {"@": "loginButton"}
        }
    },
    "loginButton": {
        "prototype": "digit/ui/button.reel",
        "properties": {
            "element": {"#": "loginButton"}
        },
        "listeners": [
            {
                "type": "action",
                "listener": {"@": "controller"}
            }
        ]
    }
}
</script>
</head>
<body>
    <div id="main">
        <div id="loginButton">Click to enter</div>
    </div>
<body>
</html>
```

## JSON formatting rules

Montage uses the browser's native JSON parsing APIs to parse the serialization block. For the browser to successfully parse the JSON object, the JSON must be well-formed. If the JSON serialization contains a formatting error, Montage throws an error and does not attempt to deserialize the JSON object. Some formatting concerns are:

* Trailing commas. A trailing comma after the last property in a JSON object or array generates runtime errors. In the following example the comma that trails the `readyState` property would generate a JSON parsing error:

    ```json
    "anObject": {
        "id": "123asd",
        "colors": ["red", "green", "blue"],
        "readystate": false,
    }
    ```
* Matching brackets. Obviously, each open bracket must have a matching close bracket.

Montage reports any serialization/JSON formatting errors in the console when you run the application.
