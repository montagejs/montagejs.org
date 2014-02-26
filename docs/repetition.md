---

layout: docs
title: MontageJS Repetition UI Container

prev-page: native-components
this-page: repetition
next-page: substitution

---

# Using the Repetition Component

The Repetition component is used to produce a repeating group of elements based on an array of values. All elements nested inside of the Repetition element will repeat in each iteration. The content inside of a repetition is managed by a controller. You can set the Repetition component's `content` property manually with a standard array for a simple repetition. You can also expand the component's capabilities by assigning a RangeController component to its `contentController` property.

You can use the Repetition component as a building block to repeat any number of user interface components. (The MontageJS List component, for example, uses the Repetition component to support selection management.) All elements nested inside of the Repetition element will repeat in each iteration of the repetition. You can use the bindable `iteration.object` property to point to the current list item.

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
            "value": { "<-": "@items.iteration.object.quote" },
            "classList.has('highlight')": { "<-": "@items.iteration.object.important" }
        }
    }
```

```css
.highlight {
    font-weight: bold;
}
```

```javascript
var Component = require("montage/ui/component").Component;

exports.Content = Component.specialize({
    myListProperty: {
        value: [{
            "quote": "If music be the food of love, play on.",
            "important": false
        }, {
            "quote": "O Romeo, Romeo! wherefore art thou Romeo?",
            "important": true
        }, {
            "quote": "All that glitters is not gold.",
            "important": false
        }, {
            "quote": "I am amazed and know not what to say.",
            "important": false
        }]
    }
});
```

### Preview:
<iframe src="http://montagejs.github.io/mfiddle/preview/#!/7882151" style="border: 0; width: 100%; height: 110px"></iframe>
View in Mfiddle: [http://montagejs.github.io/mfiddle/#!/7882151](http://montagejs.github.io/mfiddle/#!/7882151)

## Using a RangeController with a Repetition

In this example:

* The Repetition component's `contentController` property is set to be a `RangeController` for managing some content.
* The `Text` component is a child of the Repetition and derives its `value` property from its `iteration.object` property.
* Clicking the Change Content button replaces the managed content with new random content.

```html
<div data-montage-id="component">
    <button data-montage-id="button"></button>
    <ul data-montage-id="repetition">
        <li data-montage-id="value"></li>
    </ul>
</div>
```

```json
"owner": {
    "properties": {
        "element": {"#": "component"}
    }
},
"repetition": {
    "prototype": "montage/ui/repetition.reel",
    "properties": {
        "element": {"#": "repetition"},
        "contentController": {"@": "rangeController"}
    }
},
"rangeController": {
    "prototype": "montage/core/range-controller"
},
"value": {
    "prototype": "montage/ui/text.reel",
    "properties": {
        "element": {"#": "value"}
    },
    "bindings": {
        "value": {"<-": "@repetition.iteration.object.quote"}
    }
},
"changeButton": {
    "prototype": "digit/ui/button.reel",
    "properties": {
        "element": {"#": "button"},
        "label": "Change Content"
    },
    "listeners": [
        {
            "type": "action",
            "listener": {"@": "owner"}
        }
    ]
}
```

```javascript
var Component = require("montage/ui/component").Component;

exports.Owner = Component.specialize({
    constructor: {
        value: function Owner() {
            this.content = [{
                "quote": "If music be the food of love, play on.",
                "important": false
            }, {
                "quote": "O Romeo, Romeo! wherefore art thou Romeo?",
                "important": true
            }, {
                "quote": "All that glitters is not gold.",
                "important": false
            }, {
                "quote": "I am amazed and know not what to say.",
                "important": false
            }];
        }
    },

    templateDidLoad: {
        value: function () {
            this.templateObjects.rangeController.content = this.content;
        }
    },

    handleChangeButtonAction: {
        value: function (evt) {
            var randomContentIndex = Math.floor(Math.random() * this.content.length);
            this.templateObjects.rangeController.add(this.content[randomContentIndex]);
        }
    }
});
```

### Preview:
<iframe src="http://montagejs.github.io/mfiddle/preview/#!/7883458" style="border: 0; width: 100%; height: 200px"></iframe>
View in Mfiddle: [http://montagejs.github.io/mfiddle/#!/7883458](http://montagejs.github.io/mfiddle/#!/7883458)

## Sorting and Filtering the Items in a Repetition

To sort and filter items in a repetition you can use use FRB expressions on the RangeController.

* Adding or removing items from the source collection automatically updates the returned items.
* When the value of the `filterPath` is `false`, the item will not be included in the repetition.
* Using `sortPath` returns the items in sequential order, sorted by the value of the `property` when the path is a single property.

You can also use complex expressions inside of sort and filter operations. For example, when the repetition's content has an index property that is a sequence of integers, you can filter out the odd numbers like this: `!(index%2)`.

```html
<div data-montage-id="component">
    <button data-montage-id="filterButton"></button>
    <button data-montage-id="sortButton"></button>

    <ul data-montage-id="repetition">
        <li data-montage-id="quote"></li>
    </ul>
</div>
```

```json
"owner": {
    "properties": {
        "element": {"#": "component"}
    }
},
"repetition": {
    "prototype": "montage/ui/repetition.reel",
    "properties": {
        "element": {"#": "repetition"},
        "contentController": {"@": "rangeController"}
    }
},
"rangeController": {
    "prototype": "montage/core/range-controller"
},

"quote": {
    "prototype": "montage/ui/text.reel",
    "properties": {
        "element": {"#": "quote"}
    },
    "bindings": {
        "value": {"<-": "@repetition.iteration.object.quote"}
    }
},

"filterButton": {
    "prototype": "digit/ui/button.reel",
    "properties": {
        "element": {"#": "filterButton"},
        "label": "Filter"
    },
    "listeners": [
        {
            "type": "action",
            "listener": {"@": "owner"}
        }
    ]
},

"sortButton": {
    "prototype": "digit/ui/button.reel",
    "properties": {
        "element": {"#": "sortButton"},
        "label": "Sort"
    },
    "listeners": [
        {
            "type": "action",
            "listener": {"@": "owner"}
        }
    ]
}
```

```javascript
var Component = require("montage/ui/component").Component;

exports.Owner = Component.specialize({
    constructor: {
        value: function Owner() {
            this.content = [{
                "quote": "If music be the food of love, play on.",
                "important": false
            }, {
                "quote": "O Romeo, Romeo! wherefore art thou Romeo?",
                "important": true
            }, {
                "quote": "All that glitters is not gold.",
                "important": false
            }, {
                "quote": "I am amazed and know not what to say.",
                "important": false
            }];
        }
    },

    templateDidLoad: {
        value: function () {
            this.templateObjects.rangeController.content = this.content;
        }
    },

    handleFilterButtonAction: {
        value: function () {
            var rangeController = this.templateObjects.rangeController;
            rangeController.filterPath = rangeController.filterPath ? "" : "important";
        }
    },

    handleSortButtonAction: {
        value: function () {
            var rangeController = this.templateObjects.rangeController;
            rangeController.sortPath = rangeController.sortPath ? "" : "quote" ;
        }
    }
});
```

### Preview:
<iframe src="http://montagejs.github.io/mfiddle/preview/#!/7884201" style="border: 0; width: 100%; height: 150px"></iframe>
View in Mfiddle: [http://montagejs.github.io/mfiddle/#!/7884201](http://montagejs.github.io/mfiddle/#!/7884201)

## Allowing Users to Select Repetition Items

To allow users to select an item in a repetition:

* Set the Repetition component's `isSelectionEnabled` property to `true`.
* The `selected` CSS rule is automatically applied to the selected item.

Note that users could select multiple items.

```html
<div data-montage-id="component">
    <div data-montage-id="repetition">
        <p data-montage-id="value"></p>
    </div>
    <select data-montage-id="select"></select>
    <p data-montage-id="log"></p>
</div>
```

```json
"owner": {
    "properties": {
        "element": {"#": "component"}
    }
},
"repetition": {
    "prototype": "montage/ui/repetition.reel",
    "properties": {
        "element": {"#": "repetition"},
        "isSelectionEnabled": true,
        "contentController": {"@": "rangeController"}
    }
},
"rangeController": {
    "prototype": "montage/core/range-controller",
    "properties": {
        "selection": []
    }
},

"value": {
    "prototype": "montage/ui/text.reel",
    "properties": {
        "element": {"#": "value"}
    },
    "bindings": {
        "value": {"<-": "@repetition.iteration.object.quote"}
    }
},

"select": {
    "prototype": "digit/ui/select.reel",
    "properties": {
        "element": {"#": "select"},
        "contentController": {"@": "rangeController"},
        "labelPropertyName": "quote"
    }
},
"log": {
   "prototype": "montage/ui/text.reel",
   "properties": {
       "element": {"#": "log"}
   },
   "bindings": {
       "value": {"<-": "@owner.message"}
   }
}
```

```css
.selected {
    color:red;
}
```

```javascript
var Component = require("montage/ui/component").Component;

exports.Owner = Component.specialize({
    constructor: {
        value: function Owner() {
            this.content = [{
                "quote": "If music be the food of love, play on.",
                "important": false
            }, {
                "quote": "O Romeo, Romeo! wherefore art thou Romeo?",
                "important": true
            }, {
                "quote": "All that glitters is not gold.",
                "important": false
            }, {
                "quote": "I am amazed and know not what to say.",
                "important": false
            }];
        }
    },

    templateDidLoad: {
        value: function () {
            this.templateObjects.rangeController.content = this.content;
            //Observe the selection for changes
            this.templateObjects.rangeController.addRangeAtPathChangeListener(
                "selection", this, "handleSelectionChange");
        }
    },

    handleSelectionChange: {
        value: function (plus, minus) {
           this.message = "Selection changed from: "
                + (minus[0] ? minus[0].quote : "nothing")
                + " -> "
                + (plus[0] ? plus[0].quote : "nothing");
        }
    }
});
```

### Preview:
<iframe src="http://montagejs.github.io/mfiddle/preview/#!/7884716" style="border: 0; width: 100%; height: 260px"></iframe>
View in Mfiddle: [http://montagejs.github.io/mfiddle/#!/7884716](http://montagejs.github.io/mfiddle/#!/7884716)
