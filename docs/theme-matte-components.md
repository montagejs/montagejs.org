---

layout: docs
title: Matte - MontageJS Theme

prev-page: theme-digit-components
this-page: theme-matte-components
next-page: theme-native-components

---


# Matte Theme

Matte is a basic, neutral-looking theme for HTML5 controls and inputs. You can use it as a wireframe for prototypes or starting point for creating your own custom theme.

![Matte](/images/themes/matte.png)

## Available Components
The following list summarizes the UI components that are currently part of the Matte widget set:

Component | Description
------------ | -------------
Anchor | Provides hyperlink functionality.
Autocomplete | Provides suggestions while you type into a field.
Button | Provides button functionality.
ComponentGroup | 
DynamicElement | 
Image | Provides functionality for displaying an image.
InputCheckbox | Provides checkbox functionality.
InputDate | Provides date functionality.
InputNumber | Provides functionality for entering a number in a text field. This typically includes a spinner control attached to the text field.
InputRange | Provides slider functionality.
InputText | Provides functionality for a single-line text field.
List | 
LoadingPanel | Displays status of a determinate or indeterminate process.
Loading | Shows loading in progress indicator.
Popup | (Deprecated in favor of the new Overlay component.)
Progress | Provides progress bar functionality.
RadioButton | Provides radio button functionality.
RichTextEditor | Provides functioanlity for text entry and styling.
ScrollBars | Provides scrollbar functionality.
Scroller | Adds scollbars if there is too much content.
Select | Provides drop-down list functionality in Montage.
TextArea | Provides functionality for a multiline text field.
TextInput | Provides functionality for a singleline text field.
TextSlider | 
ToggleButton | Provides "on/off" button functionality.
ToggleSwitch | Provides "on/off" functionality.
TokenField | Adds text input for multiple items (e.g., tag list or to field in emails).
VideoPlayer | 


## Installing the Matte Theme

Matte is not included in the default application template. To use Matte in your projects, you have to install it first:

1. Use your command line tool to switch to your project directory.

    ```
    cd yourpojectfolder
    ```
    
2. At the prompt, enter:

    ```
    npm install matte@latest --save
    ```
    
    The `--save` flag ensures that the matte package is automatically added as a dependency to the package.json file of your application code.