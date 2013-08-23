---

layout: docs
title: MontageJS Substitution UI Container

prev-page: repetition
this-page: substitution
next-page: overlay

---


# Substitution

The Substitution component handles a group of elements and shows only one element at a time.

Each element has a key associated with it. The key is used to select which element the substitution should display, this is done by setting `switchValue`.

The elements are set up in the substitution with DOM arguments. The name of each argument will be used as the key of that element.

## Declarative API

### Example 1

```json
"substitution": {
    "prototype": "montage/ui/substitution.reel",
    "properties": {
        "element": {"#": "substitution"},
        "switchValue": "profile"
    }
}
```

```html
<div data-montage-id="substitution">
    <div data-arg="profile">
        First Name: Homer
        Last Name: Simpson
        Address: 742 Evergreen Terrace
    </div>
    <div data-arg="contact">
        Telephone: 555-3223
        Email: homer@simpson.web
    </div>
</div>
```

### Example 2
Dom arguments can also be elements of components:

```json
"substitution": {
    "prototype": "montage/ui/substitution.reel",
    "properties": {
        "element": {"#": "substitution"},
        "switchValue": "profile"
    }
},

"userProfile": {
    "prototype": "ui/user-profile.reel",
    "properties": {
        "element": {"#": "userProfile"}
    }
},

"userContact": {
    "prototype": "ui/user-contact.reel",
    "properties": {
        "element": {"#": "userContact"}
    }
}
```

```html
<div data-montage-id="substitution">
    <div data-arg="profile" data-montage-id="userProfile"></div>
    <div data-arg="contact" data-montage-id="userContact"></div>
</div>
```

## Programmatic API
 - `addSwitchElement(key, element)` - Adds `element` with `key`. `element` needs to be a parentless node.
 - `switchValue` - The `key` of the element to be shown.
