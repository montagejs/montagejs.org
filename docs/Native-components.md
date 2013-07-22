---
layout: docs
title: Native components

prev-page: Overlay
next-page: Extending-components
---

# Native components

Montage initially debuted with a set of custom touch friendly components, dubbed Bluemoon after their blue hue. Its also a name of a beer, but that had nothing to do with it. What so ever.

In the Montage 0.6 release we moved the Bluemoon components to their own folder, and introduced a set of native components. These components wrap elements found in HTML5, giving them access to Montage features such as data bindings and its event handling model. All styling is left to the user-agent/browser or to the author to apply.

## Advantages to native components
There are a number of advantages to using Montage native components over using custom Montage components (such as Bluemoon) or pure HTML5 elements.

### Size and weight
Custom components often include a number of elements to achieve the desired styling. In the case of the slider this can be quite heavy. In addition to the extra markup, the additional CSS also has to be downloaded.

### Styling
The Bluemoon components are beautiful, but offer their own distinct theme that is optimized for touch. It can look out of place on the desktop where components are often more compact. If you’d like to adjust these components to either fit a different theme or be optimized for typical desktop style applications, it requires you to download the component CSS then add additional styles to override and build upon the current styles.

With native components you start with almost a clean slate, with just the default user-agent/browser styles to override. If you want to build an app that fits into the Bluemoon look and feel then those components are way to go, but if you’d like to employ your own, or the platform’s look and feel, then native components are probably the way to go.

### More semantic elements
Bluemoon components such as the button or slider are often made up of `<div>` elements to facilitate their styling. The native elements just use the natural HTML5 element, so a `button` is a button (or a `input type="button"`) and a slider is a `input type="range"`.

### Keeps the power of Montage
While you lose the styling and extra elements associated with the Bluemoon components, you don’t lose anything else. You get to keep the same powerful event binding and event listener model as with the custom components. This means that you don’t have to handle keeping the view and model in sync yourself or write your own event listeners, so you can spend your development effort writing your application logic rather than doing the plumbing.

## The available native components
We went through the HTML5 elements and created an initial list of Montage components:

### Anchor
The [Anchor](http://montagejs.github.com/montage/samples/sink/#anchor) component provides hyperlink functionality. It acts as a wrapper around the a element.

### Button
The [Button](http://montagejs.github.com/montage/samples/sink/#button) component provides button functionality. It wraps either a `button` element or a `input` element with a type of button.

### Checkbox
The [Checkbox](http://montagejs.github.com/montage/samples/sink/#checkbox) component provides checkbox functionality. It wraps an `input` element with type of checkbox.

### Image
The [Image](http://montagejs.github.com/montage/samples/sink/#image) component provides functionality for displaying an image. It wraps the `img` element.

### NumberInput
The [NumberInput](http://montagejs.github.com/montage/samples/sink/#numberInput) component provides functionality for inputting a number in a text field. This typically includes a number spinner attached to a text field. It wraps the `input` element with a type of number.

### RadioButton
The [RadioButton](http://montagejs.github.com/montage/samples/sink/#radioButton) component provides radio button functionality. It wraps the `input` element with type of radio.

### RangeInput
The [RangeInput](http://montagejs.github.com/montage/samples/sink/#inputRange) component provides slider functionality. It wraps the `input` element with type of range.

### SelectInput
The [SelectInput](http://montagejs.github.com/montage/samples/sink/#selectInput) component provides drop down list functionality in Montage. It wraps the `input` element with type of select.

### TextArea
The [TextArea](http://montagejs.github.com/montage/samples/sink/#textarea) component provides functionality for a multi-line text field. It wraps the `textarea` element.

### Textfield
The [Textfield](http://montagejs.github.com/montage/samples/sink/#inputText) component provides functionality for a single line text field. It wraps the `input` element with a `type` of `text`.

Each component exposes a common set of properties which map to the common HTML attributes. Specialized components such as `RangeInput` and `NumberInput` also expose the specific attributes for that type of HTML element. For example the `RangeInput` component maps range specific attributes such as `step`, `min`, `max`, and so on to Montage properties.

When you wish to update the attributes of a component/element, the properties that Montage components expose should be manipulated, rather than editing the DOM attributes directly via DOM Mutation events or similar methods. Doing it this way will keep the internal state of the components in sync.

## Using native components
You can use a native component in almost the same way as the Montage specific components. The main differences are that you will provide the styling yourself (we used [Twitter’s Bootstrap](http://twitter.github.com/bootstrap/) in the Kitchen Sink examples, but you can style them which ever way you’d like in the regular place you provide your styling), and you need to specify the actual element in your HTML file, rather than using a placeholder element. The hooks for adding the serilization and so on are the same.

Lets look at some demos. It does nothing terribly exciting. In fact it does nothing at all. Its just a HTML button that I’ve hooked up as a Button component:

Relevant HTML:
```html
<button id="testButton">I’m a native button</button>
```

Serialization:
```json
{
  "button": {
    "module": "montage/ui/button.reel",
    "name": "Button",
    "properties": {
      "element": {
        "#": "testButton"
      }
    }
  }
}
```

I’ve not added any event listeners or bindings to it at all. That is where the interesting part comes in with Montage.

## Using bindings with native components
In this example I added a range slider which I hooked up to a RangeInput component, and an empty `output` element, which I hooked up to a DynamicText component. I then bind the DynamicText component to the slider and set its value to be the value of the slider. If you move the slider you’ll see that the value is put into the output element and kept in sync. The slider value will be initially set to 0 as the bindings are two way and the DynamicText component initializes it as 0.

The relevant HTML for this is as follows:
```
<h1>Pump up the volume</h1>
<form>
    <label for="testSlider">Volume</label>
    <input type="range" id="testSlider" min="0" max="11"/>
    <output for="testSlider" id="volume"></output>
</form>
```

and the Serialization:
```json
{
  "slider": {
     "module": "montage/ui/range-input.reel",
     "name": "RangeInput",
     "properties": {
         "element": {"#": "testSlider"}
     },
     "bindings": {
         "value": {
             "boundObject": {"@": "output"},
             "boundObjectPropertyPath": "value"
         }
     }
  },
  "output": {
     "module": "montage/ui/dynamic-text.reel",
     "name": "DynamicText",
     "properties": {
         "element": {"#": "volume"},
         "value": 0
     }
  }                
}
```

## Native component state
In the example above you will see that I set two attributes on the slider; min and max. These map to the min and max properties of the RangeInput component. All non-deprecated standard attributes map in this way to a component property. This includes the [global attributes](http://www.w3.org/TR/html5/elements.html#global-attributes), and those specific to each element. All of these properties can be used in bindings.

As these two attributes were specified in the original HTML (rather than with script later), they are available at serialization time and thus the values are stored in their equivalent Montage properties.

If the attributes are updated later after serialization takes place, the new values will not be synced with the Montage properties, and the model and view will get out of sync. As mentioned previously, it is better to update the component properties directly, rather than mutating the DOM, as this will keep things in sync. This potentially also gives you performance gains as DOM manipulation can be performance sensitive, and Montage can optimize how it interacts with the DOM.

I’ve rewritten the previous example to show how to set the properties in the serialization rather than using attributes in the HTML. In this particular case adding via HTML would be fine as they’re added before serialization happens, but it is worth showing how to set it in this manor.

In this example the HTML stays the same, except the range slider:
```
<input type="range" id="testSlider"/>
```

Then the properties section of the slider serialization is updated to add the two new min and max properties:
```json
…
"slider": {
    "module": "montage/ui/range-input.reel",
    "name": "RangeInput",
    "properties": {
        "element": {"#": "testSlider"},
        "min": 5,
        "max": 20
    },
…
```

## Handling events
As you saw previously, using bindings is no different to how they are used with other types of components. This also holds for for handling events. As such I wont talk about it here, but you can view our [comprehensive documentation](https://github.com/montagejs/montage/wiki/Event-handling) on events. If you follow the instructions there it will also work with your native components.

> This post was originally written by _David Storey_ and got changed a bit to fit the wiki.
