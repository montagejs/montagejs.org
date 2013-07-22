---
layout: docs
title: Overlay

prev-page: Substitution
next-page: Native-components
---

# Overlay 
## ["edge" branch only]

The `Overlay` component positions content over the page in a modal or non-modal way.

## How to use
#### Template
```json
"overlayImage": {
    "prototype": "montage/ui/overlay.reel",
    "properties": {
        "element": {"#": "overlayImage"},
        "isModal": true
    }
}
```
```html
<div data-montage-id="overlayImage">
    <img src="http://montagejs.org/images/logo-montage.png">
</div>
```
#### JavaScript
```javascript
overlayImage.show();
```

When an overlay is defined to be Modal a mask is rendered between the page and the contents of the overlay.

## Positioning
The Overlay supports three types of positioning:
- Specific coordinates with the "position" property:
```javascript
"position": {left: 100, top: 50}
```
- Anchored to an element or component's element:
```javascript
"anchor": {"#": "icon"}
```
```javascript
"anchor": {"@": "owner"}
```
    The overlay element is positioned right bellow the anchor and horizontally centered with it.
- Screen centered.

    This is the default.

## Delegate methods
- `willPositionOverlay(overlay, position)`

    Returning a new position will replace the calculated one.

## Events
- `dismiss`

    Fired when the user dismisses the overlay by clicking / touching outside of it.