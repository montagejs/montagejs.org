---
layout: docs
title: FAQ for the FRB Transition
---

# FAQ for the FRB Transition

## How do I observe a path from my object for changes after they've happened?

Before
```javascript
myObject.addPropertyChangeListener("path", handler)
```

When the path changes ```myObject.handleChange(notification)``` will be called

After
```javascript
aMontageObject.addPathChangeListener("path", handler, opt_methodName)
```
or
```javascript
Montage.addPathChangeListener.call(myObject, "path", handler, opt_methodName)
```

`aMontageObject` is an object that has `Montage` in its prototype chain: `Montage.isPrototypeOf(aMontageObject) === true` holds.

When the value at the path changes (not the content of the value), the first function in this list gets called with the `newValue`, `path`, and `myObject`.

* `handler[methodName]`
* `handler.handlePathChange`
* `handler`

## How do I observe a path from my object for changes before they happen?

Before
```javascript
myObject.addPropertyChangeListener("path", handler, true)
```

After
```javascript
aMontageObject.addPathChangeListener("path", handler, "handleMethodName", true)
```
or
```javascript
Montage.addPathChangeListener.call(myObject, "path", handler, "handleMethodName", true)
```

## How do I bind a property of my object to a property of another object such that they are always the same?

Before
```javascript
Object.defineBinding(myObject, "myProperty", {
    boundObject: anotherObject,
    boundObjectPropertyPath: "foo.bar"
});
```

After
```javascript
aMontageObject.defineBinding("myProperty", {"<->": "foo.bar", source: anotherObject});
```
or
```javascript
var Bindings = require("montage/core/bindings").Bindings;
Bindings.defineBinding(myObject, "myProperty", {"<->": "foo.bar", source: anotherObject});
```

## How do I bind a property of my object to a property of another object such that changes to myProperty do not affect the otherObject's property?

Before
```javascript
Object.defineBinding(myObject, "myProperty", {
    boundObject: anotherObject,
    boundObjectPropertyPath: "foo.bar",
    oneway: true
});
```

After
```javascript
aMontageObject.defineBinding("myProperty", {"<-": "foo.bar", source: anotherObject});
```
or
```javascript
var Bindings = require("montage/core/bindings").Bindings;
Bindings.defineBinding(myObject, "myProperty", {"<-": "foo.bar", source: anotherObject});
```

## How do I watch changes to an array at the end of a property path so I know what's added and removed?

```javascript
aMontageObject.addRangeAtPathChangeListener("array", handler, "handleArrayRangeChange");
```
or
```javascript
Montage.addRangeAtPathChangeListener(myObject, "array", handler, "handleArrayRangeChange");
```

Calls `handler.handleArrayRangeChange` with `plus`, `minus`, and `index`.

## How do I change a private value and dispatch the change on an affected public property?
Before
```javascript
myObject.dispatchPropertyChange("affectedProperty", "anotherAffectProperty", function () {
    myObject._underlyingProperty = newValue;
});
```

After
```javascript
myObject.dispatchBeforeOwnPropertyChange("affectedProperty", myObject.affectedProperty);
myObject.dispatchBeforeOwnPropertyChange("anotherAffectedPropert", myObject.anotherAffectedProperty);
myObject._underlyingProperty = newValue;
myObject.dispatchOwnPropertyChange("affectedProperty", myObject.affectedProperty);
myObject.dispatchOwnPropertyChange("anotherAffectedProperty", myObject.anotherAffectedProperty);
```

## How do I make a checkbox automatically uncheck if it becomes disabled

```
checked <- checked && enabled
```

This will cause the checkbox to retain its state when it is enabled, but unchecks when it becomes disabled.

## How do I make a "select all" or "select none" checkboxes

The checkbox needs to be useful both for observing whether all the checkboxes are currently checked, none of them are checked, and also for forcing them all to become checked or unchecked.

```
checkboxes.every{checked} <-> allChecked
checkboxes.every{!checked} <-> noneChecked
```

FRB supports binding to "every" and "some" blocks.

### But what if the checkboxes can be disabled?

```
checkbox.checked <- checked && enabled
checkboxes.every{checked || !enabled} <-> allChecked
checkboxes.every{!checked} <-> noneChecked
```

The `|| !enabled` clause serves two purposes.  If a checkbox becomes disabled, the first binding will cause it to become unchecked.  Without the `|| !enabled` clause, this might cause `allChecked` to become false, even though the checkbox should not be participating.  With the `|| !enabled` clause, `checked || !enabled` is true so it effectively does not participate in determining whether `allChecked` should become false.

In the other direction, if `allChecked` becomes true, without the `|| !enabled` clause, it would cause all disabled checkboxes to become checked.  With it, `checked || !enabled` is already true so it does not force `checked` to become `true`.