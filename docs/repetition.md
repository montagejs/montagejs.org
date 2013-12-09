---

layout: docs
title: MontageJS Repetition UI Container

prev-page: native-components
this-page: repetition
next-page: substitution

---


# Using the Repetition Component

The Repetition component is used to produce a repeating group of elements based on an array of values. All elements nested inside of the Repetition element will repeat in each iteration. The content inside of a repetition is managed by a controller. You can set the Repetition component's `content` property manually with a standard array for a simple repetition. You can also expand the component's capabilities by assigning a RangeController component to its `contentController` property. 

You can use the Repetition component as a building block to repeat any number of user interface components. (The MontageJS List component, for example, uses the Repetition component to support selection management.) All elements nested inside of the Repetition element will repeat in each iteration of the repetition. You can use the bindable `objectAtCurrentIteration` property to point to the current list item.

## A Simple Repetition

The following example shows a simple Repetition (`items`) that produces three text items. Each iteration is associated with a corresponding item in a source collection, which is populated through the Repetition component's `content` property.

```html
<div data-montage-id="content" class="Content">
    <ul data-montage-id="items">
        <li data-montage-id="item"></li>
    </ul>
</div>
```

```json
"owner": {
    "properties": {
        "element": { "#": "content" }
    }
},
"items": {
    "prototype": "montage/ui/repetition.reel",
    "properties": {
        "element": { "#": "items" }
    },
    "bindings": {
        "content": { "<-": "@owner.myListProperty" }
    }
},
"item": {
    "prototype": "montage/ui/text.reel",
    "properties": {
        "element": { "#": "item" }
    },
    "bindings": {
        "value": { "<-": "@items.objectAtCurrentIteration.value" },
        "title": { "<-": "@items.objectAtCurrentIteration.hoverText" }
    }
}
```

```javascript
var Component = require("montage/ui/component").Component;

exports.Content = Component.specialize({
    myListProperty: {
        value: [{
            "value": "Item 1",
            "hoverText": "One"
        }, {
            "value": "Item 1",
            "hoverText": "Two"
        }, {
            "value": "Item 1",
            "hoverText": "Three"
        }]
    }
});
```

## Adding Elements to a Repetition

The following example shows how to add a button element to a repetition; clicking the button adds a new item to the repetition.

```html
<div data-montage-id="content" class="Content">
    <ul data-montage-id="items">
        <li data-montage-id="item"></li>
    </ul>
    <button data-montage-id="button">Add Item</button>
</div>
```

```json
"owner": {
    "properties": {
        "element": { "#": "content" }
    }
},
"items": {
    "prototype": "montage/ui/repetition.reel",
    "properties": {
        "element": { "#": "items" }
    },
    "bindings": {
        "content": { "<-": "@owner.myListProperty" }
    }
},
"item": {
    "prototype": "montage/ui/text.reel",
    "properties": {
        "element": { "#": "item" }
    },
    "bindings": {
        "value": { "<-": "@items.objectAtCurrentIteration" }
    }
},
"myButton": {
    "prototype": "digit/ui/button.reel",
    "properties": {
        "element": { "#": "button" }
    },
    "listeners": [{
        "type": "action",
        "listener": { "@": "owner" }
    }]
}
```

```javascript
var Component = require("montage/ui/component").Component;

exports.Content = Component.specialize({
    handleMyButtonAction: {
        value: function() {
            this.myListProperty.push("New Item");
        }
    },
    myListProperty: {
        value: ["Item 1", "Item 2", "Item 3"]
    }
});
```

## Sorting and Filtering the Items in a Repetition

To sort and filter items in a repetition you can use use FRB expressions on the Repetition component's content binding. 

* Adding or removing items from the source collection automatically updates the returned items.
* When the value of `filter{property}` is `false`, the item will not be included in the repetition.
* Using `sorted{property}` returns the items in sequential order, sorted by the value of the property. 

You can also use complex expressions inside of sort and filter operations. For example, when the repetition source array is a sequence of integers, you can filter out the odd numbers like this: `filter{!(%2)}`.

```html
<div data-montage-id="content" class="Content">
    <ul data-montage-id="items">
        <li data-montage-id="item"></li>
    </ul>
</div>
```

```json
"owner": {
    "properties": {
        "element": { "#": "content" }
    }
},
"items": {
    "prototype": "montage/ui/repetition.reel",
    "properties": {
        "element": { "#": "items" }
    },
    "bindings": {
        "content": { "<-": "@owner.myListProperty.filter{shown}.sorted{order}" }
    }
},
"item": {
    "prototype": "montage/ui/text.reel",
    "properties": {
        "element": { "#": "item" }
    },
    "bindings": {
        "value": { "<-": "@items.objectAtCurrentIteration.name" }
    }
}
```

```javascript
exports.Content = Component.specialize({
    myListProperty: {
        value: [
            { name: "Item 1", shown: false, order: 3 },
            { name: "Item 2", shown: true, order: 4 },
            { name: "Item 3", shown: false, order: 2 },
            { name: "Item 4", shown: true, order: 1 },
            { name: "Item 5", shown: true, order: 0 }
        ]
    }
});
```

## Allowing Users to Select Repetition Items

To allow users to select an item in a repetition: 

* Set the Repetition component's `isSelectionEnabled` property to `true`. 
* The `selected` CSS rule is automatically applied to the selected item.

Note that users can select multiple items.

To access the value of selected iterations: 

* Use the repetition's `selection` property.
    * In the case of multiple selections, the `selection` property returns an array.
    * To access the array index, use dot notation (e.g., `selection.0`).
* Use the `selectedIndexes` property to access a numerical index.

```html
<div data-montage-id="content" class="Content">
    <ul data-montage-id="items">
        <li data-montage-id="item"></li>
    </ul>
    <h1 data-montage-id="selected"></h1>
</div>
```

```css
.selected { background-color: red; }
```

```json
"owner": {
    "properties": {
        "element": { "#": "content" }
    }
},
"items": {
    "prototype": "montage/ui/repetition.reel",
    "properties": {
        "element": { "#": "items" },
        "isSelectionEnabled": true
    },
    "bindings": {
        "content": { "<-": "@owner.myListProperty" }
    }
},
"item": {
    "prototype": "montage/ui/text.reel",
    "properties": {
        "element": { "#": "item" }
    },
    "bindings": {
        "value": { "<-": "@items.objectAtCurrentIteration" }
    }
},
"selected": {
    "prototype": "montage/ui/text.reel",
    "properties": {
        "element": { "#": "selected" }
    },
    "bindings": {
        "value": { "<-": "@items.selection.0" }
    }
}
```

```javascript
exports.Content = Component.specialize({
    myListProperty: {
        value: ["Item 1", "Item 2", "Item 3"]
    }
});
```

## Triggering a Function When the Selection Changes

To trigger a function when users select a different item in a repetition: 

* Bind the selection to a property of the component (here: `@owner.myListProperty`) and use a setter to intercept.

```html
<div data-montage-id="content" class="Content">
    <ul data-montage-id="items">
        <li data-montage-id="item"></li>
    </ul>
    <h1 data-montage-id="selected"></h1>
</div>
```

```css
.selected { background-color: red; }
```

```json
"owner": {
    "properties": {
        "element": { "#": "content" }
    },
    "bindings": {
        "currentSelection": { "<-": "@items.selection.0" }
    }
},
"items": {
    "prototype": "montage/ui/repetition.reel",
    "properties": {
        "element": { "#": "items" },
        "isSelectionEnabled": true
    },
    "bindings": {
        "content": { "<-": "@owner.myListProperty" }
    }
},
"item": {
    "prototype": "montage/ui/text.reel",
    "properties": {
        "element": { "#": "item" }
    },
    "bindings": {
        "value": { "<-": "@items.objectAtCurrentIteration" }
    }
},
"selected": {
    "prototype": "montage/ui/text.reel",
    "properties": {
        "element": { "#": "selected" }
    },
    "bindings": {
        "value": { "<-": "@items.selection.0" }
    }
}
```

```javascript
exports.Content = Component.specialize({
    currentSelection: {
        set: function(value) {
            console.log("Selection changed to: " + value);
        }
    },
    myListProperty: {
        value: ["Item 1", "Item 2", "Item 3"]
    }
});
```

## Using a RangeController Component in a Repetition

For an example of expanding the Repetition using a RangeController, refer to this <a href="http://montagejs.github.io/mfiddle/#!/7760932" target="_blank">MFiddle demo</a>

In this example:

* The Repetition component's `contentController` property is set to be a `RangeController` for managing some content.
* The `Text` component is a child of the Repetition and derives its `value` property from its `objectAtcurrentIteration` property.
* Clicking the Change Content button replaces the managed content with new random content.
