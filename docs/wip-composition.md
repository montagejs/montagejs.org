---

layout: docs
title: Component composition using Mod

---

# Component composition using Mod

The way to create and compose the ui for your application using montage is primarily by expressing this in the markup of your templates.


## The Repetition


```html
...
<script type="text/montage-serialization">{
    "repetition": {
        "prototype": "montage/ui/repetition.mod",
        "properties": {
            "element": {"#": "repetition"},
            "content": [1,2,3]
        }
    }
    "text": {
        "prototype": "montage/ui/dynamic-text.mod",
        "properties": {
            "element": {"#": "text"},
            "value": "hello"
        }
    }
}</script>
...
<body>
    <ul data-mod-id="repetition">
        <li data-mod-id="text"></li>
    </ul>
</body>
...
```
Via the markup we are passing a parameter to the Repetition (the li element) and this will tell the repetition to repeat the li and its associated DynamicText as many times as there are values in the content array. In this case three times.


## Similarly the Condition


```html
...
<script type="text/montage-serialization">{
    "condition": {
        "prototype": "montage/ui/condition.mod",
        "properties": {
            "element": {"#": "condition"},
            "condition": false
        }
    }
    "text": {
        "prototype": "montage/ui/dynamic-text.mod",
        "properties": {
            "element": {"#": "text"},
            "value": "This is the truth"
        }
    }
}</script>
...
<body>
    <div data-mod-id="condition">
        <span data-mod-id="text"></span>
    </div>
</body>
...
```
The span is a parameter to the Condition that tells it to show that element when the condition property is true. In this casse the condition will make sure the span is not visible on the screen.


## Implementing a custom component using the same pattern.


Given the desired usage for CustomComponent.
```html
...
<script type="text/montage-serialization">{
    "customComponent": {
        "prototype": "my/custom-component.mod",
        "properties": {
            "element": {"#": "customComponent"}
        }
    }
    "text": {
        "prototype": "montage/ui/dynamic-text.mod",
        "properties": {
            "element": {"#": "text"},
            "value": "I'm included."
        }
    }
}</script>
...
<body>
    <div data-mod-id="customComponent">
        <span data-mod-id="text"></span>         <- innerTemplate
    </div>
</body>
...
```
The CustomComponent can make use of a _template argument_ to include all the contents of it's _innerTemplate_. A template argument is an element that has the attribute data-arg. This marks the element as a placeholder that will replaced by the innerTemplate.

**my/custom-component.mod/custom-component.html**
```html
...
<script type="text/montage-serialization">{
    "owner": {
        "prototype": "my/custom-component.mod"
    }
}</script>
...
<body>
    <div class="my-CustomComponent--prettyFrame">
        <span data-arg="*"></span>
    </div>
</body>
...
```

## The Substitution 

The Substitution component allows you to branch the component tree based on a key in your data

```html
...
<script type="text/montage-serialization">{
    "customerNameSubstitution": {
        "prototype": "montage/ui/substitution.mod"
        "properties": {
            "element": {"#": "customerNameSubstitution"},
            "switchComponents": {
                "read" : "montage/ui/dynamic-text.mod"
                "edit" : "montage/ui/input-text.mod"
            }
            "switchValue": "read"
        },
        "bindings": {
            "value": {
                "<-": "@customer.name"
            }
        }
    }
}</script>
...
<body>
    Customer name: <div data-mod-id="customerNameSubstitution"></div>
</body>
...
```

## The Exposition

The Exposition component allows you to specify components that might or might not be related but need to occupy the same space in the dom.

```html
...
<script type="text/montage-serialization">{
    "preferences": {
        "prototype": "montage/ui/exposition.mod"
        "properties": {
            "element": {"#": "preferences"}
        },
        "bindings": {
            "value": {
                "<-": "@customer.name"
            }
        }
    },
    "displayPanel": {...},
    "networkPanel": {...},
    "usersPanel": {...}
}</script>
...
<body>
    <div data-mod-id="preferences">
        <div data-param="display"  data-mod-id="displayPanel"></div>
        <div data-param="network"  data-mod-id="networkPanel"></div>
        <div data-param="users"  data-mod-id="usersPanel"></div>
    </div>
</body>
...
```















