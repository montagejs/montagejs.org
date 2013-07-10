---
layout: docs
title: Montage objects
---

# Montage objects
Montage objects are based on the [ECMAScript 5](http://ecma-international.org/ecma-262/5.1/#sec-8.6) object model, which uses `Object.create()` to define new objects. Montage provides a similar method called `Montage.create()` that serves two purposes: to define new Montage types that share a common interface, and to create new _instances_ from those types.

## Montage type definition and object creation
The `Montage.create()` method defined by the framework is used for two purposes:

* To define new (Montage) types—A Montage type is prototype for the purpose of providing a common interface shared by instances of that type. Types should only contain state if it is acceptable for all instances of that type and its descendant types to share that state. In this way, types are akin to classes in statically typed languages like Java.
* To create new instances—An instance is a prototype for the purpose of doing work. The properties of an instance have state which must not be shared by other objects. An instance must not be used as a type. This usage is analogous to `Object.create()`.

### Creating Montage types
To define a new Montage type, you call `Montage.create()` and pass it two parameters: the prototype object from which the new type will inherit, and a properties object. The properties object is an object literal whose own properties define the new properties and functions that the type will have.

`var type = Montage.create(Prototype, propertiesObject);`

For instance, the following defines a new Montage type named `Person` whose base prototype is the `Montage` object itself. The new type inherits all the properties of the base prototype. The properties object passed to `Montage.create()` defines three member properties: `_name`, `name`, and the function `sayHello()`.

```js
var Montage = require("montage").Montage;
var Person = exports.Person = Montage.create(Montage, {
    _name: {
        value: null,
    },
    sayHello: {
      value: function() {
        console.log("Hello, my name is " + this.name);
      }
    },
    name: {
      get: function() {
        return this._name; 
      },
      set: function(value) {
        this._name = value;
      }
    }
});
```

The properties object contains one or more _property descriptors_, object literals whose fields describe the property, including its value and other property _attributes_. There are two types of property descriptors: __data descriptors and accessor descriptors__.

A data descriptor contains a `value` field that specifies the property’s initial value. In the example above, the `_name` property’s is a defined by a data descriptor whose `value` field is set to `null`. The `sayHello()` function is also defined by a data descriptor; its `value` field is assigned the function definition.

```js
_name: {
    value: null,
    enumerable: false
},
sayHello: {
  value: function() {
    console.log("Hello, my name is " + this.name);
  }
}
```

An _accessor descriptor_ consists of one or two accessor functions named `get()` and `set()`. The accessor functions store or retrieve a JavaScript language value associated with the property. For example, above example the `name` property is assigned an accessor descriptor with `get()` and `set()` functions. These functions, respectively, retrieve the value of the object’s `_name` property, and stores a new value in the same property.

```js
name: {
    get: function() {
        return this._name; 
    },
    set: function(value) {
        this._name = value;
    }
}
```

Montage supports all the same property attributes defined by ECMAScript 5, and includes some custom attributes.

### Creating Montage instances
To create an instance of the `Person` prototype defined in "Creating Montage types", you can do either of the following:
* Call `Montage.create()` passing the `Person` prototype as the base:
```js
// require() Person prototype
// assumes person.js is in same folder
var Person = require("person").Person;
var p1 = Montage.create(Person);
p1.sayHello();
```
* Call `create()` directly on the `Person` prototype itself:
```js
var Person = require("person").Person;
var p2 = Person.create();
p2.sayHello();
```

You can call `create()` on any Montage type to return an instance of that type.

Note that instances should never be used as types. For example, the `p1` instance from the previous code sample should _not_ be used like this:
```js
var Montage = require("montage").Montage;
var Person = require("person").Person;
var p2 = Person.create();
// Don't do this (base a new type on an instance)
var p3 = Montage.create(p2, { 
    newProp: {
       value: null
    }
};
```

#### Initializing new objects
When you instantiate a Montage object the framework invokes `didCreate()` on the newly created object. This method is called before any properties in the serialization have been assigned to the new object, and it does not accept arguments; all parameterized initialization on the new object must occur as the result of observing setters on those properties.

For example, consider the following `Person` prototype that defines accessor methods for its name property. The `set()` method assigns the new value to the “backing” `_name` property, and then calls the object’s `sayHello()` function. The `didCreate()` method sets its creation date/time, and then accesses the `name` property, which returns `null` at initialization since the `name` property in the HTML page hasn’t been assigned at that point.

```js
// person.js
var Montage = require("montage").Montage;
var Person = exports.Person = Montage.create(Montage, {

    _name: {
        value: null
    },
    name: {
        set: function(value) {
            this._name = value;
            this.sayHello();    
        },
        get: function() {
            return this._name;
        }
    },
    sayHello: {
        value: function() {
            console.log(this.name + " was created at: " + this.timestamp);
        }
    },
    timestamp: {
        value: null
    },

    didCreate: {
        value: function() {
            this.timestamp = new Date();
            console.log("My name is: " + this.name); // this.name is still null at this point
        }
    }
});
```

And below is an HTML template whose serialization block declares a new `Person` object, and assigns the value “Steve” to the serialized object’s `name` property.

```html
<!-- index.html -->
<html>
<head>
  <script src="../montage/montage.js"></script>
  <script type="text/montage-serialization">
  {
    "a_person": {
      "prototype": "person",
      "properties": {
        "name": "Steve"
      }
    }
  }
  </script>
  <title>Main app</title>
</head>
<body>
</body>
</html>
```

At runtime, the following is displayed in the JavaScript console:

```
My name is: null
Steve was created at: Wed Jan 25 2012 17:33:07 GMT-0800 (PST)
```

The reason for this output is that, at initialization, the object’s `name` property hasn’t yet been set from the serialization, so its value is `null` when accessed inside `didCreate()`. The `name` property’s accessor `set` method is passed the property’s value during deserialization, which is then displayed by the `sayHello()` function.

## Property descriptor attributes and default values
In addition to the `value` attribute for data descriptors, and the `get`/`set` attributes for accessor descriptors, a property descriptor may also contain additional attributes that further describe or customize the property’s behavior. Montage supports all the standard ECMAScript property attributes, and also defines a few custom property attributes.

### Standard property descriptor attributes
A data property descriptor supports the following attributes:

* __value__ — The value retrieved by reading the property. Default is `true`.
* __writable__ — Boolean. If false, attempts by to change the property’s value attribute will not succeed. Default is `true`.
* __enumerable__ — Boolean. If true, the property will be enumerated by a for-in loop. Otherwise, the property is said to be non-enumerable. Default is `true` for non-function properties, and `false` for function properties.
* __configurable__ — Boolean. If false, attempts to delete the property, change the property to be an accessor property, or change its attributes (other than `value`) will fail. Default is `true`.

An accessor property descriptor supports the following attributes:

* __get__ — A function that’s called to return a property value. Default is `null`.
* __set__ — A function that’s called to set a a property value. The assigned value is provided as the sole function argument. Default is `null`.
* __enumerable__ — Boolean. If true, the property will be enumerated by a for-in loop. Otherwise, the property is said to be non-enumerable. Default is `true`.
* __configurable__ — Boolean. If false, attempts to delete the property, change the property to be a data property, or change its attributes will fail. Default is `true`.

### Montage property descriptor attributes
In addition to the standard ECMAScript property attributes, Montage objects also support the following custom attributes:

* __serializable__: A string that controls how the property is serialized. Valid values are:
    * “reference”: Stores a reference to the property.
    * “value”: Stores the property’s value.
    * “auto”: Determines whether to store either a value or a reference based on if a value was already serialized (default).
* __dependencies__: A collection of properties that this property relies on. Default is `null`.
* __modify__: A function that is called when this property is modified as a result of a data binding with another property. For example, if `obj.prop1` defines a binding with `obj2.prop2`, then whenever the value of `obj2.prop2` changes Montage will call `obj1.prop1.modify()`.
* __distinct__: A boolean that, when true, indicates that each new instance should receive a copy of the property’s value. Valid values for are:
    * “Shallow” object literals, or object literals that only contain primitive values: booleans, numbers, strings; no objects or arrays.
    * Array literals
    * JavaScript objects that can be copied by calling their constructor function with no arguments and copying their enumerable properties.

### Default property attribute values
The following table lists the default values of property descriptor attributes in Montage. Note that some attributes do not have the same default values as `Object.create()`.

<table>
<tbody><tr>
   <th>Attribute</th>
   <th>Type</th>
   <th>Default value</th>
</tr>
<tr>
    <td><code>value</code></td>
    <td>Object</td>
    <td><code>null</code></td>
</tr>
<tr>
    <td><code>get</code></td>
    <td>Function</td>
    <td><code>null</code></td>
</tr>
<tr>
   <td><code>set</code></td>
   <td>Function</td>
   <td><code>null</code></td>
</tr>
<tr>
   <td><code>enumerable</code></td>
    <td>Boolean</td>
   <td><code>true</code> for non-function values and accessor properties; <code>false</code> for function values.</td>
</tr>
<tr>
   <td><code>configurable</code></td>
   <td>Boolean</td>
   <td><code>true</code></td>
</tr>
<tr>
    <td><code>serializable</code></td>
    <td>String. Valid values:
         <ul>
             <li><code>"value"</code></li>
             <li><code>"reference"</code></li>
             <li><code>"auto"</code></li>
         </ul>
    </td>
    <td><code>"auto"</code></td>
</tr>
<tr>
   <td><code>dependencies</code></td>
   <td>Array</td>
   <td><code>null</code></td>
</tr>
<tr>
   <td><code>modify</code></td>
   <td>function</td>
   <td><code>null</code></td>
</tr>
<tr>
   <td><code>distinct</code></td>
   <td>Boolean</td>
   <td><code>false</code></td>
</tr>
</tbody></table>

## Terminology
Below are some definitions to help with the discussion.

__prototype__
(noun): As used in JavaScript, a prototype is an object that shares its interface through “prototypical inheritance”. Both Montage instances and types (see below) have prototypes.

__create__
(verb) To create a new prototype from a base prototype. In Montage, creation is used for both “type inheritance” and “instantiation”.

__(Montage) type__
(noun) A prototype for the purpose of inheriting a common interface. Montage types are always defined by rich property descriptors that extend ECMAScript 5 property descriptors, but have slightly different default attribute values. Creating descriptors has some overhead, which is acceptable for types because they are never “hot” code.

__(Montage) instance__
(noun): A prototype for the purpose of doing work. The properties of an instance have state which must not be shared by other objects. An instance must not be used as a type.

__inherit__
(verb): To create a new type, based on another type. Types can be used to create instances or types. Types should only have state if it is acceptable for all instances of that type and its descendant types to share that state. Shared state cannot be serialized.

__instantiate__
(verb) To create a new instance from a type.

__initialize__
(verb) To set up an initial, consistent state for an instance. Objects that have been deserialized are not initialized: it’s assumed that they were serialized with a consistent internal state.

__state__
(noun) The properties owned by an instance. Some state can be serialized and deserialized.
