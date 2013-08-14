---

layout: docs
title: Overlay

prev-page: substitution
next-page: native-components

---

# Overlay

The `Overlay` positions content over the page.

## How to use
#### Template
```json
"overlayImage": {
    "prototype": "montage/ui/overlay.reel",
    "properties": {
        "element": {"#": "overlayImage"}
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

## Positioning
The Overlay supports three types of positioning:
- Specific coordinates with the "position" property:
```javascript
"position": {left: 100, top: 50}
```
    ([Example](https://gist.github.com/anonymous/6005026))

- Anchored to an element or component's element:
```javascript
"anchor": {"#": "icon"}
```
```javascript
"anchor": {"@": "owner"}
```
    The overlay element is positioned right bellow the anchor and horizontally centered with it ([Example](https://gist.github.com/anonymous/6005017)).
- Screen centered.

    This is the default ([Example](https://gist.github.com/anonymous/6004971)).

## Delegate methods
- `willPositionOverlay(overlay, position)`

    Returning a new position will replace the calculated one.

## Events
- `dismiss`

    Fired when the user dismisses the overlay by clicking / touching outside of it.
