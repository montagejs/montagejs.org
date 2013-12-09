---

layout: docs
title: MontageJS Declaration

prev-page: exploring-components
this-page: serialization-format
next-page: montagejs-objects

---


# MontageJS Declaration

>**Note:** We are currently in the process of updating our docs. This document may not be complete or fully up-to-date yet. We apologize for any inconvenience.

This document explains the serialization format Montage uses to serialize, and later deserialize, an _object graph_ AKA declaration

A declaration describes the objects, components, properties, component data bindings, and DOM relationships involved in a MontageJS application. MontageJS uses JavaScript Object Notation (JSON) as the serialization format. At runtime, Montage parses the JSON structure and deserializes its contents into JavaScript, which is then evaluated and executed in the browser.

## JSON Overview
JSON, a text format designed for serializing structured data, can represent six data types:

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
    "readyState": false
}
```

In addition to these standard data types, MontageJS supports a few special types to enable serialization of more complex objects. These types include references to other objects in the same serialization, DOM references, functions, and regular expressions.

## Declaration Example
The following simple (yet complete) MontageJS application is defined in a single HTML document. This example gives you an idea of what serialization in MontageJS is about and why it's useful.

```html
<html>
   <script src="../../montage.js"></script>
   <script type="text/montage-serialization">
   {
       "firstName": {
           "prototype": "digit/ui/text-field.reel",
           "properties": {
               "element": {"#": "fName"}
           }
        }
   }
   </script>
   <body>
    <input data-montage-id="fName"></input>
   <body>
</html>
```

Important things to note:

* The HTML body section contains a single `<input>` tag, identified with the [custom data-attribute](http://www.whatwg.org/specs/web-apps/current-work/multipage/elements.html#custom-data-attribute) `data-montage-id` of `fName`. 
* The head section contains a `<script>` block of type `text/montage-serialization`. This block contains all serialized MontageJS objects used in the document.
* The serialization block declares a MontageJS TextField component with an object label of `firstName`. The component's module ID ("digit/ui/text.reel") and its name ("textfield") allow MontageJS to recreate the component from its serialized form at runtime.
* The `properties` object assigns initial values to the component's properties. One of the most important properties of a Montage component is its `element` property, which corresponds to the associated HTML body element on which the component operates. In this case, the TextField component's `element` property is set to the `<input>` tag that has the ID `"fName"`. The Montage serialization format provides a special JSON object representation to refer to an element. This special object's name is a hash mark ("#") and its value is the ID of the element.
* Montage can load components from a directory that has a .reel extension. The module system redirects `require("x.reel")` to `require("x.reel/x")`.

## Declaration Owner
A Montage serialization can declare an optional object named "owner". The specified owner acts as the controller for the document. For example, the following code creates a new module (main.js) that exports a `Main` prototype object.

```js
// Module: main.js
// Exported object name: Main
var Montage = require("montage/core/core").Montage;
var Component = require("montage/ui/component").Component;
//
exports.Main = Montage.create(Component, {
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

## Declaration Formats
The following sections explain object-dependent declarations.

### Serializing a Custom Object
To serialize custom JavaScript objects, including Montage components, define a JSON object with two properties: `module` and `name`. These properties correspond to the ID of the module that defines (or exports) the object with the specified name.

For example, the following declaration fragment declares a MontageJS Button component:

```html
<script type="text/montage-serialization">
{
    "loginButton": {
        "name": "Button",
        "module": "montage/ui/button"
    }
}
</script>
```

At runtime Montage parses this declaration and evaluates it as the following JavaScript:

```js
var Button = require("montage/ui/button").Button;
```

Note that object labels in a declaration (such as `"loginButton"` in the above example) are only used internally by Montage during the deserialization process. For example, the object label does not translate into a JavaScript variable at runtime. You _can_ reference objects within a declaration using a special JSON representation.

You can assign initial values to an object's properties in a declaration by adding a `properties` object to the declaration. For example, the Montage Button component has a `value` property that contains the string to display as the button's label. The following assigns the value "Click me" to the Button component's `value` property:

```json
"loginButton": {
    "name": "Button",
    "module": "montage/ui/button",
    "properties": {
       "value": "Click me"
    }
}
```

### Referencing DOM Elements
You can reference DOM elements from a MontageJS declaration using a special JSON object representation. This is commonly used to assign an HTML element to a component's `element` property, or anytime you need a reference to a DOM element.

To reference an element by ID, use the following JSON syntax, where _elementID_ is the ID of an element in the document that contains the serialization:

`{"#": "elementID"}`

For example, the following block declares a MontageJS Button component whose `element` property is assigned the <div> with the ID of `loginButton`:

```html
// index.html
<html>
 <script src="../../montage.js"></script>
 <script type="text/montage-serialization">
 {
      "loginBtn": {
        "name": "Button",
        "module": "montage/ui/button.reel",
        "properties": {
            "element": {"#": "loginButton"}
        }
      }
 }
 </script>
 <body>
      <div data-montage-id="loginButton" class="Text">Click to enter</div>
 <body>
</html>
```

### Referencing Other Objects
Often you need to reference one serialized MontageJS object from another object in the same serialization. For instance, the serialization might declare a Montage button that you want to reference from the controller (or owner) object in the serialization.

To reference an element by ID, use the following JSON syntax. In this example, _objectLabel_ is the label assigned to the serialized object.

`{"@": "objectLabel"}`

To demonstrate, first create the owner prototype object that references the button. The owner object—a custom component named Main—is defined in a JavaScript file main.js. The Main component declares a variable `loginButton` that will hold the reference to the Button object in the main application. We can reference that variable elsewhere in the Main component, such as its `prepareForDraw()` function, which is invoked before the first time the component is drawn. In this case, we use this callback opportunity to attach an event listener to the Button object. The event handler displays a message in the JavaScript console.

```js
// Module: main.js
// Name: Main
var Montage = require("montage/core/core").Montage;
var Component = require("montage/ui/component").Component;
exports.Main = Montage.create(Component, {
    hasTemplate: {
        value: false
    },
    loginButton: {
        value:null
    },
    handleAction: {
        value: function(event) {
            console.log("Button event handled...");
            // Do login stuff...
        }
    },
    prepareForDraw: {
        value: function() {
            this.loginButton.addEventListener("action", this)
        }
    }
});
```

Next, create the main HTML document that declares the Button and Main components. On line 10 a reference to the `"loginBtn"` serialized Button is assigned to the `"loginButton"` property of the Main component.

```html
<html>
 <script src="../../montage.js"></script>
 <script type="text/montage-serialization">
 {
    "owner": {
        "name": "Main",
        "module": "main",
        "properties": {
            "element": {"#": "main"},
            "loginButton": {"@": "loginBtn"}
        }
    },
    "loginBtn": {
        "name": "Button",
        "module": "montage/ui/button.reel",
        "properties": {
            "element": {"#": "buttonDiv"}
        }
    }
 }
 </script>
<body>
    <div id="main">
        <div data-montage-id="buttonDiv" class="Text">Click to enter</div>
    </div>
<body>
</html>
```

## Data Bindings in Declarations
You can define event listener and data bindings between components within a serialization. To better understand the binding serialization syntax, look at the underlying JavaScript method used for creating data bindings, `Object.defineBinding()`. This method takes three parameters:

* The source object defining the binding.
* The name of the source object's property that is being bound.
* A descriptor object that specifies, minimally, the bound object and the key path of the property being bound. The descriptor can have optional parameters for specifying whether the binding is one-way, or whether the binding should not execute immediately.

```js
Object.defineBinding(sourceObject, "propertyName", {
    boundObject: boundObject>,
    boundObjectPropertyPath: "property.key.path"
});
```

You specify a component's bindings in a serialization with a "bindings" JSON object that, in turn, defines one or more JSON objects.

```json
"bindings": {
   "boundValue": {
      "boundObject": {"@": "bound-object-label",
      "boundObjectPropertyPath": "key.path.of.property",
   },
}
```

The following simple example adds data bindings to a serialization. It consists of two Montage Slider components. The first slider's value is bound to the second slider's value. By default, data bindings are bi-directional, so changes to either bound property are pushed to the corresponding property. In this case, the `"oneway"` parameter is set to false so that changes propagate only from the bound object to the one that defined the binding (the source object).

```html
<html>
<head>
    <title>Slider binding text</title>
    <script src="../../montage.js"></script>
    <script type="text/montage-serialization">
    {
        "slider1": {
            "name": "Slider",
            "module": "montage/ui/slider.reel",
            "properties": {
                "element": {"#": "slider1"}
            },
            "bindings": {
                "value": {
                    "boundObject": {"@": "slider2"},
                    "boundObjectPropertyPath": "value",
                    "oneway": true
                }
            }
        },
        "slider2": {
            "name": "Slider",
            "module": "montage/ui/slider.reel",
            "properties": {
                "element": {"#": "slider2"}
            }
        }
    }
    </script>
</head>
<body>
    <div data-montage-id="slider1"></div>
    <div data-montage-id="slider2"></div>
</body>
</html>
```

## Event Listeners in Declarations
You can assign event listeners to serialized components in a serialization using a `listeners` property.

This can reduce the amount of code required to establish event handling for your components. The serialization in the following example declares two objects: a custom controller object (Controller) and a Montage Button. The controller object acts as the event listener object to respond to "action" events that the Button emits when clicked or touched.

The following code for the Controller component defines a single function named `handleAction()`, which is invoked when the user clicks the button:

```js
// Module: controller.js
// Name: Controller
var Montage = require("montage/core/core").Montage;
exports.Controller = Montage.create(Montage, {
    handleAction: {
        value: function(event) {
            console.log("Button event handled...");
            // Do login stuff...
        }
    },
});
```

The following is the HTML document and component serialization. The "loginBtn" object in the serialization contains a `"listeners"` array property. This array can contain one or more elements.

```html
<html>
 <script src="../../montage.js"></script>
 <script type="text/montage-serialization">
 {
    "controller": {
        "name": "Controller",
        "module": "controller",
        "properties": {
            "element": {"#": "main"},
            "loginButton": {"@": "loginBtn"}
        }
    },
    "loginBtn": {
        "name": "Button",
        "module": "montage/ui/button.reel",
        "properties": {
            "element": {"#": "buttonDiv"}
        },
        "listeners": [
            {
                "type": "action",
                "listener": {"@": "controller"},
                "capture": false
            }
        ]
    }
 }
 </script>
<body>
    <div id="main">
        <div data-montage-id="buttonDiv" class="Text">Click to enter</div>
    </div>
<body>
</html>
```

## JSON Formatting Rules
Montage uses the browser's native JSON parsing APIs to parse the serialization block. For the browser to parse the JSON object successfully, the JSON syntax must be well-formed. If the JSON serialization contains a formatting error, Montage throws an error and does not attempt to deserialize the JSON object. Two common formatting concerns are:

* Trailing commas. A trailing comma after the last property in a JSON object or array generates runtime errors. In the following example the comma that trails the `readyState` property would generate a JSON parsing error:

    ```json
    "anObject": {
        "id": "123asd",
        "colors": [ "red", "green", "blue"],
        "readystate": false,
    }
    ```

* Matching brackets. Obviously, each open bracket must have a matching close bracket.

Montage reports any formatting errors in the console when you run the application.
