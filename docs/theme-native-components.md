---

layout: docs
title: Native - MontageJS Theme

prev-page: theme-matte-components
this-page: theme-native-components
next-page: repetition

---


# Native Theme

The Native set uses the browser's default styles. Use this set if you want to custom design your user interface components yet still gain access to Montage features such as data binding and the Montage event handling model.

![Native](/images/themes/native.png)

## Benefits
Using Montage native components has several advantages over using custom Montage components or pure HTML5 elements.

* **Smaller footprint**: Custom components often include a number of elements to achieve the desired styling, resulting in much heavier components. In addition to the extra markup, the additional component CSS also has to be downloaded.

* **Simpler styling**: Custom components may have a certain look and feel, but if you would like to adjust these components to either fit a different theme or be optimized for typical desktop-style applications, it requires you to download the component CSS and then add additional styles to override and build upon the current styles. With native components you only have to override the default user-agent/browser styles.

* **Keeps the power of Montage**: Although you don't have the styling and extra elements associated with custom components, you still have access to the same powerful event binding and event listener model as with the custom components. This means that you don't have to handle keeping the view and model in sync yourself or write your own event listeners, so you can spend your development effort writing your application logic rather than doing the plumbing.

## Available Components
The following list summarizes the UI components that are currently part of the Native widget set:

Component | Description
------------ | -------------
Anchor | Provides hyperlink functionality. It acts as a wrapper around the `a` element.
Button | Provides button functionality. It wraps either a `button` element or an `input` element with type of `button`.
Image | Provides functionality for displaying an image. It wraps the `img` element.
InputCheckbox | Provides checkbox functionality. It wraps an `input` element with type of `checkbox`.
InputDate | Provides date functionality. It wraps a `input` element with type of `date`.
InputNumber | Provides functionality for entering a number in a text field. This typically includes a spinner control attached to the text field. It wraps the `input` element with type of `number`.
InputRadio | Provides radio button functionality. It wraps the `input` element with type of `radio`.
InputRange | Provides slider functionality. It wraps the `input` element with type of `range`.
InputText | Provides functionality for a single-line text field. It wraps the `input` element with a type of `text`.
Progress | Provides progress bar functionality. It wraps the `progress` element.
Select | Provides drop-down list functionality in Montage. It wraps the `input` element with type of `select`.
TextArea | Provides functionality for a multiline text field. It wraps the `textarea` element.


## Installing the Native Theme

The Native set is not included in the default application template. To use the Native components in your project, you have to install it first:

1. Use your command line tool to switch to your project directory.

    ```
    cd yourpojectfolder
    ```
    
2. At the prompt, enter:

    ```
    $ npm install native@latest --save
    ```
    
    The `--save` flag ensures that the matte package is automatically added as a dependency to the package.json file of your application code.

## Using the Native Theme

You can use Native components in almost the same way as the Digit and Matte components. The main differences are: you will have to provide the styling yourself and you need to specify the actual element in your HTML file, rather than using a placeholder element. The hooks for adding the serialization and so on are the same.

For example, here is an HTML button hooked up as a Button component:

**HTML body**

```html
<button data-montage-id="button">I'm a native button</button>
```

**Serialization**

```json
"button": {
    "prototype": "montage/ui/button.reel",
    "properties": {
        "element": { "#": "button"}
    }
}
```

### Using Bindings
The following example adds a range slider that is hooked up to an InputRange component, and an empty `output` element, which is hooked up to a Text component. The Text component is bound to the slider and its value is set to be the value of the slider. If you move the slider you'll see that the value is put into the output element and kept in sync. The slider value is initially set to 0 as the bindings are two-way and the Text component initializes it as 0.

**HTML body**

```html
<h1>Pump up the volume</h1>
<form>
    <label for="slider1">Volume</label>
    <input type="range" data-montage-id="slider1" min="0" max="11"/>
    <output for="slider1" data-montage-id="volume"></output>
</form>
```

**Serialization**

```json
"slider": {
    "module": "montage/ui/input-range.reel",
    "name": "InputRange",
    "properties": {
        "element": {"#": "slider1"}
    },
    "bindings": {
        "value": {
            "boundObject": {"@": "output"},
            "boundObjectPropertyPath": "value"
        }
    }
},
"output": {
    "module": "montage/ui/text.reel",
    "name": "Text",
    "properties": {
        "element": {"#": "volume"},
        "value": 0
    }
}                
```

## Native Component State
In the example above two attributes are set on the slider; `min` and `max`. These map to the `min` and `max` properties of the InputRange component. All nondeprecated standard attributes map in this way to a component property. This includes [global attributes](http://www.w3.org/TR/html5/elements.html#global-attributes) as well as attributes specific to each element. All of these properties can be used in bindings.

As these two attributes were specified in the original HTML (rather than with a script later), they are available at serialization time and thus the values are stored in their equivalent Montage properties.

If the attributes are updated later, after serialization takes place, the new values will not be synced with the Montage properties and the model and view will get out of sync. To avoid expensive reflow, it is better to update the component properties directly, rather than mutating the DOM, as this will keep things in sync. This potentially also gives you performance gains as DOM manipulation can be performance sensitive, and Montage can optimize how it interacts with the DOM.

The following example shows how to set the `min` and `max` properties in the serialization rather than using attributes in the HTML. In this particular case adding via HTML would be fine as they're added before serialization happens, but it is worth showing how to set it in this manor.

In this example the HTML stays the same, except the range slider:

```html
<input type="range" data-montage-id="testSlider"/>
```

Then the properties section of the slider serialization is updated to add the two new min and max properties:

```json
…
"slider": {
    "module": "montage/ui/input-range.reel",
    "name": "InputRange",
    "properties": {
        "element": {"#": "testSlider"},
        "min": 5,
        "max": 20
    },
…
```

## Handling Events
As shown above, using bindings with Native components is no different from how they are used with other types of components. This also holds true for handling events. As such I wont talk about it here, but you can view our [comprehensive documentation](https://github.com/montagejs/montage/wiki/Event-handling) on events. If you follow the instructions there it will also work with your native components.
