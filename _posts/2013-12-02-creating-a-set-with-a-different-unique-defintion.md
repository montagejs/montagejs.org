---

layout: blog
title: Creating a Set with a different "unique" definition
author: Stuart Knightley
author_url: http://github.com/Stuk/

---

Often you want a collection of items with no duplicates. This a perfect use for a [Set](http://documentup.com/montagejs/collections/#collections/set-values-equals-hash-getdefault), and if you are storing primitive values like strings or numbers, or don't want the exact same object, then it's very straight forward

```javascript
var Set = require("collections/set");

var set = Set();
set.add("one");
set.add("two");
set.add("one");

console.log(set.toArray());
// [ "one", "two" ]
```

But what if you want to store objects which are unique based on some other measure? Then you need to give `equals` and `hash` functions.

## How

You change how Set identifies identical objects by providing `hash` and `equals` functions to the Set constructor.

To only allow objects with a unique `name` property, you can use the following functions:

```javascript
function equals(a, b) {
    return a.name === b.name;
}

function hash(value) {
    return value.name;
}

var a = {name: "a", data: 123},
    b = {name: "b", data: 456},
    a2 = {name: "a", data: 789};

var set = new Set(undefined, equals, hash);

set.add(a);
set.add(b);
set.add(a2);

console.log(set.toArray());
// [ { name: "a", data: 123 }, { name: "b", data: 456 } ]
```

## Why

Internally the Set is implemented using a [FastSet](http://documentup.com/montagejs/collections/#collections/fastset-values-equals-hash-getdefault). This uses the `hash` function to put the items into "buckets". Because two different objects may hash to the same value each bucket contains a list. The `equals` function is used to check if the bucket contains the value. In pesudo-code, adding an item to a Set looks like this:

```
function add(object) {
    var h = hash(object);
    var bucket = this.buckets[h];

    for (item of bucket) {
        if (equals(item, object)) {
            return false; // the object already exists in the set
        }
    }

    bucket.push(object);

    return true;
}
```

From this you can see that if you provide just the `equals` function, then every object will get a different hash (from [`Object.hash`]()), and so the Set will never discover that they are equal.

If you just provide just the `hash` function, then when checking the bucket to find existing items (using [`Object.equals`]()) two different objects will not be strictly (`===`) equal, and so the Set will never discover that they are equal.

## Conclusion

Hopefully you now understand how to change the definition of uniqueness for a Set, and why both `equals` and `hash` need to be provided.
