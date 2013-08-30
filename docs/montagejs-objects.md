---

layout: docs
title: MontageJS Objects

prev-page: serialization-format
this-page: montagejs-objects
next-page: data-binding

---

# Montage Objects

Montage provides a thin veneer over JavaScript’s object model.  Types are represented by constructor functions.  Constructor functions have a `prototype`.  The `prototype` has a `constructor`.  `instanceof` and `new` work as you would expect.

For a succinct comparision, the following examples are equivalent:

```javascript
function Constructor() {
    ParentConstructor.call(this);
}

Constructor.prototype = Object.create(ParentConstructor.prototype);

Constructor.prototype.constructor = Constructor;

Constructor.prototype.method = function () {
    return ParentConstructor.prototype.method.call(this);
};

Object.defineProperty(Constructor.prototype, "property", {
    get: function () {
        return this._property;
    },
    set: function (value) {
        this._property = value;
    }
});

Constructor.staticMethod = function () {
};
```

```javascript
var Constructor = ParentConstructor.specialize({
    constructor: {
        value: function Constructor() {
            this.super();
        }
    },
    method: {
        value: function () {
            return this.super();
        },
        enumerable: true
    },
    property: {
        get: function () {
            return value;
        },
        set: function (value) {
            this._property = value;
        }
    }
}, {
    staticMethod: {
        value: function () {
        },
        enumerable: true
    }
});
```

The `Montage` constructor has a `specialize` method that accepts [ECMAScript 5][] property descriptors for the new prototype and another optional set of descriptors for properties of its constructor.  It uses `Object.create` to extend the parent’s prototype, and `Object.defineProperty` to apply the property descriptors.  For the most part, this just provides a convenient and error-resistant way to declare new types, reinforcing the existing JavaScript conventions.

[ECMAScript 5]: http://ecma-international.org/ecma-262/5.1/#sec-8.6

However, Montage does go on to provide some additional features.  Within any `Montage` method, `super(...args)` will call the eponymous method of the parent prototype.  Likewise, `super()` within a getter will get a property according to the parent prototype, and `super(value)` within a setter will set a property according to the parent prototype.

In this example, the `Type` implements an `id` getter, where identifiers are granted in the order of first access.  `Subtype` overrides the identifier property such that the identifier is a string with an underscore prefix.

```javascript
var ids = new WeakMap();
var nextId = 0;
var Type = Montage.specialize({
    id: {
        get: function () {
            if (!ids.has(this)) {
                ids.set(this, nextId++);
            }
            return ids.get(this);
        }
    }
});

var Subtype = Montage.specialize({
    id: {
        get: function () {
            return "_" + this.super();
        }
    }
});
```

Montage also supports a small number of extensions to the [ES5 property-descriptor][Property Descriptors].  Montage alters the defaults for `writable` and `configurable`—properties are both writable and configurable unless you specify otherwise.  Properties continue to be non-`enumerable` by default.

[Property Descriptors]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

There is also a `distinct` flag that will ensure that every intance will receive a fresh clone of the given `value`, allowing you to move imperative property initialization in your constructor, into the declaration of that property on the prototype.

```javascript
// before
var Type = Montage.specialize({
    constructor: {
        value: function Type() {
            this.super();
            this.x = [1, 2, 3];
        }
    }
});
```

```javascript
// after
var Type = Montage.specialize({
    x: {
        value: [1, 2, 3],
        distinct: true
    }
});
```

Perhaps the most subtle and interesting way that `Montage.specialize` extends the JavaScript object model is that it causes constructor functions to inherit from their parent constructor, in parallel the prototype chain.  This makes it possible to use or override `Montage.specialize`, `defineProperties`, and `defineProperty` for subtrees of your object model.  Montage implements `specialize` and `defineProperties` such that an overridden `defineProperty` is sufficient to specialize the property descriptor protocol for all descendent types.  Overriding `specialize` gives you a hook to decorate the constructor for all descendent types.

```javascript
var Type = Montage.specialize({
}, {
    specialize: {
        value: function () {
            return this.super();
        }
    },
    defineProperty: {
        value: function (object, descriptor) {
            return this.super(object, descriptor);
        }
    }
});
```

For debugging, it is best to give your constructor a name.  `Montage.specialize` permits a specialization to  provide the constructor among the `prototype` property descriptors.  It lifts this property out instead of providing a default, anonymous constructor function then goes on to set up its prototype and inheritance chain as normal.

```javascript
var Type = Montage.specialize({
    constructor: {
        value: function Type() {
            this.super();
        }
    }
});

var Subtype = Type.specialize({
    constructor: {
        value: function Subtype() {
            return this.super();
        }
    }
});
```

