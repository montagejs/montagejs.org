---
layout: docs
title: Event handling
---

# Event handling

Montage includes a custom event manager that transparently wraps the browser’s native event handling mechanism. This enables several features in Montage, including simpler event handling code, property change observing, and results in better performing web applications.

## About event delegation
Montage uses _event delegation_ to manage event handling and dispatching. With event delegation, instead of installing event listeners on every element that may dispatch an event, a single event listener is installed on a parent element that listens for and responds to events that target its children. This is made possible by the standard event “flow” defined by the [DOM Level 3 Event Specification](http://www.w3.org/TR/DOM-Level-3-Events/#event-flow).

Event delegation provides several benefits. For instance, application performance is improved since the number of event listeners is reduced. In a Montage application there is only one “native” event listener, which acts as the primary event responder and dispatcher of all events. It also enables Montage applications to observe changes to property values and arrays.

## Creating event handlers
You use the standard `addEventListener()` method to register an event handler on a target object. In Montage, the `target` object can be any JavaScript object, not just a DOM element.

`target.addEventListener(eventType, listener[, useCapture]);`

* `eventType ` A string representing the event type.
* `listener` An object that implements the Montage event listener interface, or a function to call directly.
* `useCapture` A boolean that, if true, causes all events of the specified type to be dispatched to the registered listener before being dispatched to any other event target beneath it in the DOM tree. By default, this is property is `false`.

### Montage event listener interface
The Montage event listener interface extends the [DOM Level 3 EventListener interface](http://dev.w3.org/2006/webapi/DOM-Level-3-Events/html/DOM3-Events.html#interface-EventListener) specification implemented by all modern web browsers. In the standard interface you specify an object as a “listener” object for an event type. The listener object defines an `handleEvent()` method that is invoked by the browser whenever the specified event occurs:
```js
// DOM Level 3 EventListener interface
var listenerObj = {};
listenerObj.handleEvent = function(event) {
     alert("Got 'mousedown' event.");
}
var loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener("mousedown", listenerObj);
```

Montage extends this interface to make it more useful for developers. Instead of calling the same `handleEvent()` method on the listener object, Montage infers the name of the specific event handler to call from three pieces of information:

* The event’s phase (bubble or capture)
* The event name
* Optionally, a string identifier property on the target element or object

The following pseudo-code shows how the event manager determines what method to call on the listener object:
```js
methodToInvoke = "";
identifier = eventTarget.identifier;
if (event.phase == "bubble" ) {  
   methodToInvoke = "handle" + 
                     (identifier ? identifier.toCapitalized() : "") +
                     eventType.toCapitalized();
} else {
   methodtoInvoke = "capture" + 
                    (identifier ? identifier.toCapitalized() : "") + 
                     eventType.toCapitalized();
}
```

The easiest way to understand how this works is to look at some examples.

### Examples
The following code is almost identical to the previous example (without Montage), except that the handler method is named `handleMousedown()` instead of `handleEvent()`. This method will be invoked automatically by the event manager when the `mousedown` event occurs on `loginBtn`, but only during the event’s bubble phase.

```js
// Listening for mousedown event during bubble phase
var listenerObj = {};
listenerObj.handleMousedown = function(event) {
     alert("Got 'mousedown' event.");
}
var loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener("mousedown", listenerObj);
```

To listen for the same event during its capture phase, you pass `true` as the third parameter to `addEventListener()`, and change the name of the event handler from `handleMousedown()` to `captureMousedown()`.

```js
// Listening for capture events on same element 
var listenerObj = {};
listenerObj.captureMousedown = function(event) {
     alert("Got 'mousedown' event during bubble phase.");
}
var loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener("mousedown", listenerObj, true); // useCapture = true
```

You can further specialize the event handler name by adding an `identifier` to the event target. The event manager includes this string, with its first letter capitalized, in the method name it composes. In the following example, the string “__login__” is assigned to the `loginBtn`‘s `identifier` property, so the event listener defines a `handleLoginMousedown()` function.

```js
// Using identifier strings on target elements
var listenerObj = {};
// Listener for loginBtn
listenerObj.handleLoginMousedown = function(event) {
    console.log("mousedown on loginBtn");
}
var loginBtn = document.querySelector("#loginBtn");
// Assign string identifier to button
loginBtn.identifier = "login";
loginBtn.addEventListener("mousedown", listenerObj);
```

### Event handler precedence
The event manager will always invoke the most specific event handler. For instance, in the following example the listener object defines two event handlers, one that includes the target’s identifier string (`handleLoginBtnMousedown()`) and one that doesn’t (`handleMousedown()`). Montage will always invoke `handleLoginBtnMousedown()` as its purpose is more specific than the other.

```js
// Event handler precedence
var listenerObj = {};
listenerObj.handleMousedown = function(event) {
     // This won't get called.
     alert("Got 'mousedown' event.");
}
listenerObj.handleLoginbtnMousedown = function (event) {
     alert("Got 'mousedown' event on event.target"); 
}
var loginBtn = document.querySelector("#loginBtn");
loginBtn.identifier = "login";
loginBtn.addEventListener("mousedown", listenerObj);
```

Note that if `loginBtn` did not define an `identifier` property, the event manager would invoke `handleMousedown()`.

Also, Montage will invoke the listener’s generic `handleEvent()` method, if it exists, and if a more specifically named handler is not declared. This provides a fallback mechanism to respond to “generic” events.

```js
// Using default handleEvent() handler
var listenerObj = {};
listenerObj.captureClickEvent = function(event) {
     alert("Got click event");
}
listenerObj.handleEvent = function(event) {
     alert("No specific handler for " + event.type);
}
loginBtn.addEventListener("mousedown", listenerObj);
loginBtn.addEventListener("click", listenerObj, true);
```

## Declaring event listeners in a serialization
Each object in a serialization may include a "listeners" object that specifies the event type, listener object, and (optionally) whether to enable capture for the event.

First you create the listener object, which contains a `handleAction()` method. This method changes the `value` property of the Montage Button component that dispatched the event, setting its label.

```js
// controller.js
var Montage = require("montage/core/core").Montage;

exports.Controller = Montage.create(Montage, {
    handleAction: {
        value: function(event) {
            event.target.value = "Well done";
        }
    }
})
```

Next we create the HTML page that declares the Button component and the custom Controller object. The Button component’s `listeners` property specifies the type of event to listen for (`action`) and the listener object that will handle the event.

```html
<html>
 ...
<script type="text/montage-serialization">
{
    "button" : {
        "name": "Button",
        "module": "montage/ui/button.reel",
        "properties": {
            "element": {"#": "btn"}
        },
        "listeners": [
            {
                "type": "action",
                "listener": {"@": "controller"}
            }
        ]
    },

    "controller": {
        "name": "Controller",
        "module": "controller"
    }
}
</script>
 ...
</html>
```

You can also specify the `identifier` string in the serialization, as shown below:
```json
<script type="text/montage-serialization">
{
    "button" : {
        "name": "Button",
        "module": "montage/ui/button.reel",
        "properties": {
            "element": {"#": "btn"},
            "identifier": "purchase"
        },
        "listeners": [
            {
                "type": "action",
                "listener": {"@": "controller"}
            }
        ]
    },

    "controller": {
        "name": "Controller",
        "module": "controller"
    }
}
</script>
```

## Dependent properties
A property belonging to an object may declare itself to be dependent on one or more other “independent” properties. If the value of one of the dependencies changes, a `change@dependentProp` event is dispatched, as if the dependent property was modified itself. This is especially useful in [data binding](https://github.com/montagejs/montage/wiki/Data-binding).

### Basic example
To declare a property’s dependencies you can use the `dependencies` property attribute when defining the object prototype, or by calling `Montage.addDependencyToProperty()`. The `dependencies` attribute is an array of strings whose values correspond to the name(s) of the property (or properties) that the observed property depends on.

In the following example, the `Employee` object defines a `fullName` property that depends on the object’s `firstName` and `lastName` properties. The `fullName` property is contains an accessor (getter method) that returns a concatenation of the first and last names. An event listener is registered on the Employee object for the `change@fullName` event type. The same object is specified as the listener object (`this` as the second parameter to `addEventListener()`) so its `handleEvent()` is called when the specified event type occurs.

```js
// employee.js
var Montage = require("montage/core/core").Montage;

exports.Employee = Montage.create(Montage, {

    firstName: {
        value: "James"
    },
    lastName: {
        value: "Kirk"
    },
    fullName: {
        dependencies: ["firstName", "lastName"],
        get: function() {
            return this.firstName + " " + this.lastName;
        }
    },
    handleEvent: {
        value: function(event) {
            console.log("fullName changed to " + this.fullName);
        }
    },
    deserializedFromTemplate: {
        value: function() {
            // Create a change@ event listener, 
            this.addEventListener("change@fullName", this);
            // And modify the value of firstName. 
            this.firstName = "John";
        }
    }
});
```

To run this example, create an HTML page that includes the Montage framework. Alternatively, you can specify dependencies of a property by calling `Montage.addDependencyToProperty()`, as shown below.

```js
var Montage = require("montage/core/core").Montage;

exports.Employee = Montage.create(Montage, {
    firstName: {
        value: "James"
    },
    lastName: {
        value: "Kirk"
    },
    fullName: {
        get: function() {
            return this.firstName + " " + this.lastName;
        }
    },
    handleEvent: {
        value: function(event) {
            console.log("fullName changed to " + this.fullName);
        }
    },
    deserializedFromTemplate: {
        value: function() {
            Montage.addDependencyToProperty(this, "firstName", "fullName");
            Montage.addDependencyToProperty(this, "lastName", "fullName");
            // Create a change@ event listener, 
            this.addEventListener("change@fullName", this);
            // And modify the value of firstName. 
            this.firstName = "John";
        }
    }
});
```

### Data binding and dependent properties
Dependent properties are especially useful when combined with data binding. A data binding in Montage is, essentially, a special purpose property change observer that keeps the observed property in sync with the property of another object. So if you define a data binding on a property that has dependencies, the data binding will execute whenever one of the dependencies has changed.

The following example demonstrates how this works. It consists of two Textfield components (`<input>` text fields) in which the user enters a first and last name, and a DynamicText component (a `<p>` element) that displays the result. The HTML for the application contains the required markup, and a `<link>` element that includes the serialization from an external file named index.json:
```html
// index.html
<!doctype html>
<html>
<head>
    <title>Data binding and dependent properties</title>
    <script src="../montage/montage.js"></script>
    <link rel="serialization" type="text/montage-serialization" href="index.json">
</head>
<body>
    <input type="text" id="fname" placeholder="Enter first name...">
    <input type="text" id="lname" placeholder="Enter last name...">
    <p id="fullName"></p>
</body>
</html>
```

The controller code is almost identical to the previous example, but the event handling code can be removed since the data binding will handle that for us.

```js
// controller.js
var Montage = require("montage/core/core").Montage;

exports.Controller = Montage.create(Montage, {
    firstName: {
        value: null
    },
    lastName: {
        value: "Thomas"
    },
    fullName: {
        dependencies: ["firstName", "lastName"],
        get: function() {
            return this.firstName + " " + this.lastName;
        }
    }
});
```

The serialization declares all the components being used. It also binds the values of the `<input>` elements to the `firstName` and `lastName` properties in the controller object. The value of the DynamicText field is bound to the `fullName` property, whose accessor method returns the concatenated values of the two strings.

```json
// index.json
{
    "fullName" : {
        "name": "DynamicText",
        "module": "montage/ui/dynamic-text.reel",
        "properties": {
            "element": {"#": "fullName"}
        },
        "bindings": {
            "value": {
                "boundObject": {"@": "controller"},
                "boundObjectPropertyPath": "fullName"
            }
        }
    },

    "fname_input" : {
        "name": "Textfield",
        "module": "montage/ui/textfield.reel",
        "properties": {
            "element": {"#": "fname"}
        },
        "bindings": {
            "value": {
                "boundObject": {"@": "controller"},
                "boundObjectPropertyPath": "firstName"
            }
        }
    },

    "lname_input" : {
        "name": "Textfield",
        "module": "montage/ui/textfield.reel",
        "properties": {
            "element": {"#": "lname"}
        },
        "bindings": {
            "value": {
                "boundObject": {"@": "controller"},
                "boundObjectPropertyPath": "lastName"
            }
        }
    },

    "controller": {
        "name": "Controller",
        "module": "controller-change"
    }
}
```
