---
layout: docs
title: Gestures

prev-page: draw-cycle
next-page: blueprints
---

# Gestures

Montage provides a composer API for supporting commonly used gestures. Typically DOM events are device specific such as click or touch events. The Composer API abstracts these into higher order events such as press, so that you can focus on handling a specific action rather than the multiple ways that action could be carried out. Montage currently supports press, long press, and swipe gestures. More will be added as Montage matures.

## Press composer
The Press Composer handles both press and long press gestures. These abstract mouse clicks and touch events into a common event. The events that are handled include:

### pressStart
This is the event that is dispatched when the mousedown or touchstart events are fired.

### press
After the pressStart event is fired, the press event will fire when releasing the mouse button (mouseup event) or lifting your finger (touchend event). This will also fire when a longPress event is fired, so can be cancelled with a pressCancel event.

### longPress
A press gesture becomes a longPress gesture when it is active for longer than the specified longPressTimeout duration. To avoid a press event firing after a longPress event, it should be cancelled in the longPressHandler by calling the cancelPress() method.

### pressCancel
The pressCancel event is fired when the press event is cancelled. This can either be because it was manually cancelled by the developer by calling `cancelPress()`, another element claims the pointer, or is automatically cancelled due to:

* the browser firing the touch cancel event
* the user cancels the event by moving away from the element when the mouseup event fires due to releasing the mouse button

### Using press and long press gestures
If you are familiar with how events are handled using Montage, you will be right at home using gestures. We will create a very simple example that handles a press event, changing the colour and text of the element, and shows a JavaScript alert when a longPress event is fired.

### Setting up your composers
As with anything in Montage, you first have import the module into your Javascript file. Both press and long press functionality can be found in the press-composer:
```js
var Montage = require("montage/core/core").Montage,
    Component = require("montage/ui/component").Component,
    PressComposer = require("montage/ui/composer/press-composer").PressComposer;
```

You then have to create and add the PressComposer:
```js
exports.PressExample = Montage.create(Component, {
     didCreate: {
        value: function() {
            this._pressComposer = PressComposer.create();
            this.addComposer(this._pressComposer);
        }
    }
});
```

### Handle the events
Once we have a press composer we can add the events we want to listen to. In this case both the press and longPress events:
```js
prepareForActivationEvents: {
        value: function() {
            this._pressComposer.addEventListener("press", this, false);
            this._pressComposer.addEventListener("longPress", this, false);
        }
    }
```

Finally we need to handle this events in the regular Montage way by implementing a method that prefixes the event name with “handle”.

For the press event, we add an additional class to the element so that we can style it differently after the user presses the button, and change the text using innerHTML:
```js
handlePress: {
    value: function(event) {
        this.element.classList.toggle("press-active");
        if (this.element.classList.contains("press-active")) {
            this.element.innerHTML = "I’m active!";
        } else {
            this.element.innerHTML = "Now deactivated";
        }
    }
}
```

For the longPress event we create a JavaScript alert, and also cancel the press event:
```js
handleLongPress: {
    value: function(event) {
        this._pressComposer.cancelPress();
        alert("Long press event fired. Handle this in a graceful way in a real app");
   }
}
```

In a real world app you may do something like creating a context menu with a number of items for the user to select.

### Hooking everything up
The only thing left is to hook the JavaScript up to some HTML using the Montage serialization, and add the styles using CSS:

HTML:
```html
<div data-montage-id="pressme" class="press-target">Click or long click me!</div>
```

Serialization:
```json
{
    "pressExample": {
        "prototype": "PressExample",
        "properties": {
            "element": {"#": "pressme"},
            "hasTemplate": false
        }
    }
}
```

If you click or touch the element for a short time the press composer will fire. If you keep the button pressed or your finger down the longPress event will fire.

## Swipe Composer
Montage currently supports swipe gestures only for touch screen enabled devices, excluding desktop platforms. The spec and implementation of the Swipe composer is currently being updated for a future release of Montage.

I hope this served as a useful introduction to composers and gestures in Montage. If you have any questions or comments we’d love to hear from you!
