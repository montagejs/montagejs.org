---

layout: docs
title: Rich Text Editor

---

# Rich Text Editor

The `RichTextEditor` component recently debuted in Montage 0.8. This provides a way for the user to enter text that will be transformed to HTML and can have styles applied to it.

At its most basic level, the `RichTextEditor` is a wrapper around a `div` element with the HTML5 `contentEditable` attribute applied. There is no UI by default beyond the `div` for entering text, but an API is provided to allow you to hook up controls to enable the various styling options.

## Building a basic rich text editor
Creating a rich text editor with the very basic font and text styling controls can be done trivially with no JavaScript (beyond the JSON serialization) required! Lets make a quick example that allows us to make the text bold, italic and set an underline.

### Adding the markup
First of all we need to create a toolbar with buttons for each of the options, and an area to enter the text:
```html
<menu type="toolbar">
    <div class="montage-buttonGroup font-styles">
        <button data-montage-id="bold">B</button>
        <button data-montage-id="italic">I</button>
        <button data-montage-id="underline">U</button>        
    </div>
</menu>
<div data-montage-id="editor" class="montage-textarea">
    <h1>Hello RichText world!</h1>
</div>
```

The `menu` element holds the buttons we will use for styling the text. Montage doesn’t do anything special with this element; I’ve just included it for semantic value.

Inside the menu I’ve included a wrapper `div` to group together the three text controls. I’ve applied a class to it so that the stylesheet can visually display the buttons as a group.

Each button and the `div` element below the menu are given their own `data-montage-id` so we can hook them up to the serialization.

Lets also add a `data-auto-package` attribute to the Montage script element, so that we don’t need to create a package.json file. As this example has no external dependencies, it is ideal for this:
```
<script src="../montage/montage.js" data-auto-package></script>
```

### Hooking the toolbar and the editor to the serialization
Now to where the magic really happens. Lets hook up the rich text editor to our `div` in our serialization code:
```json
"editor": {
    "prototype": "montage/ui/rich-text-editor/rich-text-editor.reel",
    "properties": { "element": {"#": "editor" } }
}
```

Now you have a text area that you can type into, but you can’t apply any commands. For that we have to hook up the buttons. Lets try with the bold button first:
```json
"bold": {
    "prototype": "montage/ui/toggle-button.reel",
        "properties": {
            "element": {"#": "bold"},
            "pressedClass": "active"
        },
        "bindings": { "pressed": { "<->": "@editor.bold" }
    }
}
```

This sets the `bold` element to be a toggle button, and uses the `pressedClass` property to set a class of `active` when the button is pressed.

When then set a two way binding between the `pressed` property and the `bold` boolean property of the `RichTextEditor` component. When the pressed property is updated it will change the bold value between `true` and `false`, and thus bold or unbold the text. When some text is selected that is already bold, it will update the pressed property of the toggle to set it to true.

That is all there is to it for actions that update a boolean property such as bold, italic, and underline. Lets add the serialization for the other two buttons as well. They work in exactly the same way:
```json
"italic": {
    "prototype": "montage/ui/toggle-button.reel",
    "properties": {
        "element": {"#": "italic"},
        "pressedClass": "active"
    },
    "bindings": { "pressed": { "<->": "@editor.italic" } }
},
"underline": {
    "prototype": "montage/ui/toggle-button.reel",
    "properties": {
        "element": {"#": "underline"},
        "pressedClass": "active"
    },
    "bindings": { "pressed": { "<->": "@editor.underline" } }
}
```

## Getting a little more advanced
As you’ve just seen, setting boolean properties is a trivial affair. For properties that accept one of a number of predefined values, it becomes a little more complex, but wont be alien to those of you who know how Montage works.

I’ll show you how to set this up by creating three buttons to set the text alignment to either left, right, or center, by updating the `justify` property.

First of all we need to add the buttons to allow the user to specify the alignment. For this I added an additional button group. I’ve included the [Font Awesome](http://fortawesome.github.com/Font-Awesome/) font that was designed to be used with Twitter Bootstrap to display icons for each button:
```html
<div class="montage-buttonGroup alignment-styles">
    <button data-montage-id="left"><i class="icon-align-left" title="left align"></i></button>
    <button data-montage-id="center"><i class="icon-align-center" title="center align"></i></button>
    <button data-montage-id="right"><i class="icon-align-right" title="right align"></i></button>        
</div>
```

### Setting up the event listeners and controller
For this example we will need to add a controller object to the serialization, which will point to our `editor` object that we defined at the top of the serialization. This will give us access to this object when we need to use it in the controller object that we instantiate later in our JavaScript file.

```json
"controller": {
        "prototype": "Controller",
        "properties": {
            "editor": { "@": "editor"}
        }    
}
```

Now that we have a controller, we need to hook it up to the buttons that will handle the text alignment. All three serialization blocks are the same except the object name and the element they point to, so I’ll just include the serialization for the right button here. You can just repeat it for the other two buttons, editing the relevant values.

```json
"right": {
    "prototype": "montage/ui/toggle-button.reel",
        "properties": {
            "element": {"#": "right"},
            "preventFocus": true
        },
     "listeners": [
       {
         "type": "action",
         "listener": {"@": "controller"}
       }
     ]
}
```

Here we’re setting up an `action` listener, which will be handled via the controller object we just defined. As there is no `identifier` specified in the listener, the event listener will use the default name, which in this case is `handleRightListener`. This capitalizes the object name, and prefixes it with `handle`, and prepends it with `Action`.

We also need to include a `preventFocus` property. This stops the button from taking focus away from the selected text in the rich text area. If we allowed the button to steal focus, the alignment style wouldn’t apply as it wouldn’t know what text it should apply the style to.

### Handling the action events in JavaScript
Now all the wiring is complete, when a user clicks the button for right alignment, it will fire the `handleRightAction` event. Lets create a JavaScript file called controller.js. This is the same name as set up in the controller object.

Inside this file we first need to import Montage core, and create and export the `Controller` object. We also need to define the `editor` that we specified in our controller object in the serialization:
```js
var Montage = require("montage/core/core").Montage;

exports.Controller = Montage.create(Montage, {
    editor: {
        value: null
    }
})
```

Next we will define the `handleRightAction` method inside the same object. This sets the `editor.justify` property to right:
```js
handleRightAction: {
    value: function(event) {
        this.editor.justify = "right";
        this.setActive("right");
    }
}
```

All of the other handlers can be created in the same way. The valid values for the `editor.justify` property are left, right, center, and full.

As the active state for the left, right and center buttons should be mutually exclusive, I’ve also created an `setActive` method. This removes focus from the previously active button and adds focus to the currently selected button instead, rather than relying on the button’s inbuilt `pressedClass` property, like we did for the bold, italic and underline buttons.

## Wrap up
Armed with this knowledge, you should be able hook up controls for the other `RichTextEditor` properties yourself. Hopefully this post will inspire you to try out the rich text capabilities in Montage for yourself.
