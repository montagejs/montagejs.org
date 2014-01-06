---

layout: docs
title: MontageJS Objects

prev-page: serialization-format
this-page: montagejs-objects
next-page: data-binding

---

# MontageJS Objects

MontageJS provides a thin veneer over the JavaScript object model: Types are represented by constructor functions. Constructor functions have a `prototype`. The `prototype` has a `constructor`. `instanceof` and `new` work as you would expect.

For a succinct comparison, the following examples A and B are equivalent:

### Example A: JavaScript (ECMAScript 5)

```javascript
function Penguin() {
    Bird.call(this);
}

Penguin.prototype = Object.create(Bird.prototype);

Penguin.prototype.constructor = Penguin;

Penguin.prototype.fly = function () {
    return Bird.prototype.fly.call(this);
};

Object.defineProperty(Penguin.prototype, "habitat", {
    get: function () {
        return this._habitat;
    },
    set: function (value) {
        this._habitat = value;
    }
});

Penguin.staticMethod = function () {
};
```

### Example B: MontageJS

```javascript
var Penguin = Bird.specialize({
    constructor: {
        value: function Penguin() {
            this.super();
        }
    },
    fly: {
        value: function () {
            return this.super();
        }
    },
    habitat: {
        get: function () {
            return this._habitat;
        },
        set: function (value) {
            this._habitat = value;
        }
    }
}, {
    staticMethod: {
        value: function () {
        }
    }
});
```

The MontageJS constructor has a `specialize` method that accepts <a href="http://ecma-international.org/ecma-262/5.1/#sec-8.6" target="_blank">ECMAScript 5</a> property descriptors for the new prototype and another optional set of descriptors for properties of its constructor. It uses `Object.create` to extend the parent's prototype, and `Object.defineProperty` to apply the property descriptors. For the most part, this just provides a convenient and error-resistant way to declare new types, reinforcing the existing JavaScript conventions.

## MontageJS Methods
However, MontageJS does provide some additional features. Within any `Montage` method, `super(...args)` will call the eponymous method of the parent prototype. Likewise, `super()` within a getter will get a property according to the parent prototype, and `super(value)` within a setter will set a property according to the parent prototype.

In this example, the `Type` implements an `id` getter, where identifiers are granted in the order of first access. `Subtype` overrides the identifier property such that the identifier is a string with an underscore prefix.

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

var Subtype = Type.specialize({
    id: {
        get: function () {
            return "_" + this.super();
        }
    }
});
```

MontageJS also supports a small number of modifications to the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" target="_blank">ES5 property-descriptor</a>. Montage alters the defaults for `writable` and `configurable`—properties are both writable and configurable unless you specify otherwise. In general properties continue are `enumerable` by default. The default is changed for properterties with names that start with `_` or where the value is a function (methods).

## Extending the JavaScript Object Model
Perhaps the most subtle and interesting way that `Montage.specialize` extends the JavaScript object model is that it causes constructor functions to inherit from their parent constructor, in parallel the prototype chain. This makes it possible to use or override `Montage.specialize`, `defineProperties`, and `defineProperty` for subtrees of your object model. Montage implements `specialize` and `defineProperties` such that an overridden `defineProperty` is sufficient to specialize the property descriptor protocol for all descendent types. Overriding `specialize` gives you a hook to decorate the constructor for all descendent types.

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

For debugging, it is best to give your constructor a name. `Montage.specialize` permits a specialization to  provide the constructor among the `prototype` property descriptors. It lifts this property out instead of providing a default, anonymous constructor function then goes on to set up its prototype and inheritance chain as normal.

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

