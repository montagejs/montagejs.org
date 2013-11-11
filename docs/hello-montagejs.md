---

layout: docs
title: Hello MontageJS - Getting Started Part 2

prev-page: index
this-page: hello-montagejs
next-page: TBD

---

# Hello MontageJS

You've just finished setting up and verifying your first MontageJS project, and you're staring at a blank page: Now what?

In this tutorial you will assemble a simple, mobile-friendly MontageJS application that converts degrees in Celsius to Fahrenheit and vice versa (see Figure 1). The application consists of three elements—two input fields and a slider—whose values are bound together. When you enter a numeric value in one input field, the numeric value in the other input field updates automatically and the slider moves to reflect the chosen value. Likewise, when you drag the slider, the numeric values in the input fields are updated to reflect the value of the slider at the current position.

<figure>
	<img class="img--66" src="/images/docs/hello-montagejs/fig01.png" alt="The final application.">
	<figcaption><strong>Figure 1.</strong>Your goal is to build this temperature converter application.</figcaption>
</figure>

To make the most of this tutorial, you should have a basic understanding of HTML, CSS, and JavaScript.

## Before You Begin

Be sure you have set up MontageJS development as instructed in ["Getting Started"](http://montagejs.org/docs/montagejs-setup.html) before continuing with this tutorial. You must have node.js, npm, and Minit, the MontageJS initilizer installed to complete this tutorial. You also need a a text editor and a recent stable release of Google Chrome, Safari, or Firefox.

## Create the Application Template

If you've already created a new project and your browser is currently pointing to localhost:8083, you can skip this section and continue with "MontageJS Bascis."

1. Open a Terminal window or Command Prompt and type:
    
    ```
    $ minit create:app -n temp-converter
    ```

2. Switch to the temp-converter directory and use Minit to serve your project:

    ```
    $ cd temp-converter
    $ minit serve &
    ```
    
3. Point your browser to http://localhost:8083/.

You should see a blank page with a version reference in the upper left corner of the page.
    
## MontageJS Basics

MontageJS application development is divided into a development (creating the app) phase and a production (compiling the app) phase. In development, you assemble the user interface of your application out of prebuilt, encapsulated MontageJS user interface components. 

MontageJS user interface components are reusable and consist of three files that control the component's structure (HTML), appearance (CSS), and behavior (JavaScript). These files are located in the same directory, identified with a .reel suffix (for example, the Main component, main.reel, consists of main.css, main.html, and main.js). When you assemble your MontageJS application, you modify the HTML documents or templates (in MontageJS speak) of the components in the ui directory of your project. To change the look and feel of the components that make up the application, you modify the components' CSS files.

The application you are about to build consists of three components: main.reel, converter.reel, and version.reel (see Figure 2). The Main component is the main user interface component of your application. Think of it as the MontageJS equivalent of a website's index page or the principal screen of your single-page application: it contains the key components that make up your application. Although you could conceivably build an entire application using only the Main component, you really want to architect your application in such a way that you can take advantage of the modular nature of MontageJS components.

<figure>
	<img src="/images/docs/hello-montagejs/fig02.png" alt="The components of the application.">
	<figcaption><strong>Figure 2.</strong> The components that make up the temperature converter application.</figcaption>
</figure>

The default application template includes two UI components: main.reel and version.reel (whose sole purpose is to inform you what version of Montage you are currently working with; you can easily remove it from your application). For this exercise, you also need a component that encapsulates the converter feature.

## Create the Converter Component

Follow these steps to add a new component to your project:

1. At the command prompt, enter:

    ```
    $ minit create:component -n converter
    ```
   This creates a new component, converter.reel, in the the UI directory of your MontageJS project.
   
2. In your MontageJS project folder, open ui/main.reel/main.html.
3. Following the owner object within the `<script>` tags, add the following snippet (don't forget the trailing comma; you need it to separate objects from each other):

    ```json
        "tempConverter": {
            "prototype": "ui/converter.reel",
            "properties": {
                "element": {"#": "tempConverter"}
            }
        },
    ```
    
4. Between the `<body>` tags, before `<div data-montage-id="montageVersion"></div>`, add the following:

    ```html
    <h1>Temperature Converter</h1>
    <div data-montage-id="tempConverter"></div>
    ```

    This adds the the title of the application and the converter.reel component to the main.reel component.
    
5. Save the changes and refresh your browser.

If all went well, you should still see the name and the Montage version number (see Figure 3). (If you only get a blank page, verify that the objects between the `<script>` tags are separated by commas.)

<figure>
	<img class="img--66" src="/images/docs/hello-montagejs/fig03.png" alt="The skeleton of the application.">
	<figcaption><strong>Figure 3.</strong> The key components of your application: main, version, and converter (which has no content yet, and hence is invisible).</figcaption>
</figure>

## Add the Semantic Markup

The application you are going to build has four elements—a title, two numeric input fields, and a slider—that need to be declared in your markup.

1. In your MontageJS project folder, open ui/converter.reel/converter.html.
2. Replace the HTML within the `<body>` tags with the following markup:

    ```html
    <div data-montage-id="converter" class="Converter">
        <div>
            <fieldset>
                <div>&deg;C
                   <input type="number"/>
                </div>
                <div>&deg;F
                   <input type="number"/>
                </div>
            </fieldset>
        </div>
            <fieldset>
               <input type="range"/>
            </fieldset>
    </div>
    ```

3. Save the changes and refresh your browser.

You should see two input fields for entering numbers and a slider control (see Figure 4). The controls are fully functional; however, since they are not bound together yet, numeric changes in one field will not be reflected in the value of the other nor the position of the slider.

<figure>
	<img class="img--66" src="/images/docs/hello-montagejs/fig04.png" alt="The basic elements of your application.">
	<figcaption><strong>Figure 4.</strong> The basic elements of your application rendered using the browser's default style sheet.</figcaption>
</figure>

Next, you will use MontageJS to update the view of these HTML elements.

## Add Some MontageJS "Magic"

In a MontageJS application, all UI-related information is contained in a script block in the `head` area of the HTML document. This is where you add the template-like MontageJS components that controll your HTML elements.

1. In ui/converter.reel/converter.html, replace the contents within the existing `<script>` tags with the following block:

    ```json
    <script type="text/montage-serialization">
        {
            "owner": {
                "properties": {
                    "element": {"#": "converter"}
                }
            },
            
            "celsiusNumberfield": {
                "prototype": "digit/ui/number-field.reel",
                "properties": {
                    "element": {"#": "celsius"}
                 }
            },
            
            "fahrenheitNumberfield": {
                "prototype": "digit/ui/number-field.reel",
                "properties": {
                    "element": {"#": "fahrenheit"}
                }
            },
            
            "thermometer": {
                "prototype": "digit/ui/slider.reel",
                "properties": {
                    "element": {"#": "thermometer"},
                    "axis": "vertical"
                }
            }
        }
    </script>
    ```

    Things to note:
    
        * The labels `celsiusNumberfield`, `fahrenheitNumberfield`, and `thermometer` identify the serialized objects that control the behavior of your HTML elements.
        * `prototype` identifies the directory that contains the code of that object's prototype (here you are using components from the Digit widget set that is part of your MontageJS project).
        * `properties` lists the values assigned to the properties of the current object. 
        * The `element` property refers to a DOM element in the markup, identified with a corresponding `data-montage-id` custom data attribute—which is what you will be adding next to your markup.
        * The `axis` property turns the horizontal slider into a vertical one.

    To control the behavior of the markup, you need to map the objects to their corresponding DOM elements. In MontageJS you identify the HTML elements with the [custom data attribute](http://www.whatwg.org/specs/web-apps/current-work/multipage/elements.html#custom-data-attribute) `data-montage-id` of `celsius`, `fahrenheit`, and `thermometer`. 
    
2. Within the `<body>` tags, replace the existing markup with the following update:

    ```html
    <div data-montage-id="converter" class="Converter">
        <div>
            <fieldset>
                <div>&deg;C
                   <input data-montage-id="celsius"/>
                </div>
                <div>&deg;F
                   <input data-montage-id="fahrenheit"/>
                </div>
            </fieldset>
        </div>
            <fieldset>
               <input data-montage-id="thermometer" type="range" />
            </fieldset>
    </div>
    ```

    Things to note:

    * The `<input type="number"/>` and `<input type="range"/>` elements have been updated with the  `data-montage-id` attributes of  `celsius`, `fahrenheit`, and `thermometer`.

3. Save your changes and refresh your browser.

    Setting the `data-montage-id` custom attribute now initializes your markup using the default styles of our mobile-optimized Digit user interface components (see Figure 5).

<figure>
	<img class="img--66" src="/images/docs/hello-montagejs/fig05.png" alt="The DOM elements extended with Digit components.">
	<figcaption><strong>Figure 5.</strong> The DOM elements extended with Digit components.</figcaption>
</figure>

Next, you will bind together the properties of the input fields and slider.

## Add Bindings

MontageJS uses functional reactive bindings (FRB), which you add to the objects in question (here: `celsiusNumberfield` and `thermometer`). 

1. To help speed thigns up, replace the existing `<script>` tag with the following:

    ```json
    <script type="text/montage-serialization">
        {
            "owner": {
                "properties": {
                    "element": {"#": "converter"}
                }
            },
            
            "celsiusNumberfield": {
                "prototype": "digit/ui/number-field.reel",
                "properties": {
                    "element": {"#": "celsius"}
                },
                "bindings": {
                    "value": {"<->": "(+@fahrenheitNumberfield.value - 32) / 1.8"}
                }
            },
            
            "fahrenheitNumberfield": {
                "prototype": "digit/ui/number-field.reel",
                "properties": {
                    "element": {"#": "fahrenheit"},
                    "value": "32"
                }
            },
            
            "thermometer": {
                "prototype": "digit/ui/slider.reel",
                "properties": {
                    "element": {"#": "thermometer"},
                    "axis": "vertical"
                },
                "bindings": {
                    "value": {"<->": "@fahrenheitNumberfield.value"}
                }
            }
        }
    </script>
    ```

    Things to note:

    * The property default value of the Fahrenheit field is set to 32; this is the initial state of the converter when first loaded in the browser.
    * Two-way bindings (<->) are established between:
        * The property value of the Celsius field (`(+@fahrenheitTextfield.value - 32) / 1.8`) and the value of the Fahrenheit field. (`(+@fahrenheitTextfield.value - 32) / 1.8` expresses the standard &deg;C to &deg;F conversion formula: &deg;C = (&deg;F - 32) * 5/9).)
        * The property of the slider (thermometer) and the value of the Fahrenheit field.

Now, when you modify any control, the others adjust accordingly. Give it a try. Enter a value in the Celsius field, use the spinner controls to increase or decrease the value in the Fahrenheit field, or drag the slider left or right.

## Make It Pretty

At this point, the application works as planned, but doesn't look as designed (see Figure 1). This can be easily changed by adding some CSS rules. First, you need to specify CSS class names in your markup.

1. In ui/converter.reel/converter.html, replace the content within the `<body>` tags with the following updated markup:

    ```html
<body>
    <div data-montage-id="converter" class="Converter">
        <div class="Controls">
            <fieldset class="Numbers">
                <div class="Label">&deg;C
                   <input data-montage-id="celsius">
                </div>
                <div class="Label">&deg;F
                   <input data-montage-id="fahrenheit">
                </div>
            </fieldset>
            <fieldset class="Slider">
               <input data-montage-id="thermometer" class="Slider-handle" type="range" min="-13" max="122">
            </fieldset>
        </div>
    </div>
</body>
    ```

    Things to note: 

    * Added class names to control the layout and appearance of the following elements:
         * Controls, includes Input fields and slider (`Controls`)
         * Input fields (`Numbers`)
         * Slider (`Slider`)
         * Slider knob (`Slider-handle`)
    * Set minimum (-13) and maxium (122) values allowed in the Fahrenheit field (the slider has two-way bindings with the Fahrenheit field, hence this setting is bound to the Fahrenheit field).
    
   Next you need to add the CSS rules to your component's style sheet.

2. Open ui/converter.reel/converter.css in your MontageJS project.

3. Replace the sparse contents of the file with the following rules:

    ```css
    .Converter {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
    .Controls {
        margin: 20px 0;
        padding: 20px;
        width: 100%;
        max-width: 260px;
        text-shadow: #fff 0 1px 0;
        border-radius: 10px;
        background-color: hsl(0,0%,98%);
        box-shadow: inset 0px 1px 2px 1px hsla(0,0%,100%,1), 
                    0px 2px 5px hsla(0,0%,0%,.1);
    }
    .Numbers {
        float: left;
        border: none;
        margin: 0;
        padding: 0;
    }
    .Label {
        display: block;
        margin: 15px 0;
        text-align: center;
        line-height: 40px;
        color: hsl(0,0%,60%);
        font-size: 1.2em;
    }
    .Label .digit-NumberField-input {
        width: 70px;
        vertical-align: middle;
    }
    .Slider {
        float: right;
        margin: 0;
        padding: 8px 4px;
        border-radius: 100px;
        border: none;
        box-shadow: inset 0px 1px 3px hsla(0,0%,0%,.3), 
                    0 2px 0 hsla(0,0%,100%,1);
        background: -webkit-linear-gradient(bottom, 
                             hsl(200,100%,50%),
                             hsl(200,100%,80%) 30%,
                             hsl(60,100%,65%) 50%,
                             hsl(0,100%,80%) 70%,
                             hsl(0,100%,50%) );
        background: linear-gradient(to top, 
                             hsl(200,100%,50%),
                             hsl(200,100%,80%) 30%,
                             hsl(60,100%,65%) 50%,
                             hsl(0,100%,80%) 70%,
                             hsl(0,100%,50%) );
    }
    .Slider-handle.digit-Slider.montage-Slider--vertical {
        height: 120px;
    }
    .Slider-handle.digit-Slider {
        background-color: transparent;
        border-color: transparent;
        box-shadow: none;
    }
    ```

4. Save your changes and refresh your browser.

At this point your application should look like the one shown in Figure 6.

<figure>
	<img class="img--66" src="/images/docs/hello-montagejs/fig06.png" alt="The styled Converter component.">
	<figcaption><strong>Figure 6.</strong> The application with the styled Converter component.</figcaption>
</figure>

Next you will add some CSS rules to control the appearance of the Main component.

1. Open ui/main.reel/main.html and replace the content within the `<body>` tags with the following updated markup:

    ```html
        <div data-montage-id="main" data-montage-skin="light" class="Main">
        
        <h1 data-montage-id="title" class="Title"></h1>
        <div data-montage-id="tempConverter"></div>

        <footer data-montage-id="montageVersion"></footer>
    </div>
    ```
    
    Things to note: 

    * The `<h1>` element has been updated with the  `data-montage-id` attribute of `title`.
    * The string "Temperature Converter" has been removed from the markup; the value of the `<h1>` element is now declared by the title object in the serialization (see the following step).
    * The Montage version div has been replaced with `footer` tags.

2. Following the tempConverter object within the `<script>` tags, add the following snippet (remember: don't forget the trailing comma; you need it to separate objects from each other):

    ```json
            "title": {
                "prototype": "digit/ui/title.reel",
                "properties": {
                    "element": {"#": "title"},
                    "value": "Temperature Converter"
                }
            },
    ```

    Things to note:
    
    * The value of the `h1` element is by the properties of the title object (`"value": "Temperature Converter"`).

3. Open ui/main.reel/main.css and replace the content the existing content with the following rules:

    ```css
.Main {
    height: 100%;
    padding: 20px;
    background-color: hsl(0,0%,90%);
    text-align: center;
    width: 100%;
    max-width: 320px;
    border-radius: 10px;
}
body {
    margin: 20px 0px;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    display: -moz-box;
    -moz-box-align: center;
    -moz-box-pack: center;
    background-color: hsl(0,0%,80%);
}
.Title {
    font-size: 1.6em;
    line-height: 1.2;
}
    ```
    
4. Save your changes and refresh your browser.

If all went well, your application should resemble the one shown in Figure 7.

<figure>
	<img class="img--66" src="/images/docs/hello-montagejs/fig07.png" alt="The styled Converter and Main components.">
	<figcaption><strong>Figure 7.</strong> The final application with the styled Converter and Main components.</figcaption>
</figure>


# Next Steps

Here are some links to help you continue your MontageJS learning experience:

* To learn how things work under the hood, continue with ["Templates and Components"](http://#).
* To learn how to prepare your application for production deployment, see ["Preparing for Deployment"](http://#).
* To learn more about our MontageJS-specific naming conventions, see ["Naming Conventions"](http://#).
* To learn more about how to troubleshoot your application in the browser, refer to ["Troubleshooting"](http://#).

