---

layout: docs
title: Hello MontageJS - Getting Started Part 2

prev-page: montagejs-setup
this-page: hello-montagejs

---

# Hello MontageJS

You've just finished setting up and verifying your first MontageJS project, and you are staring at a blank page: Now what?

In this tutorial you will assemble and prepare for deployment a simple, mobile-friendly MontageJS application that converts degrees in Celsius to Fahrenheit and vice versa (see Figure 1). The application consists of three elements—two input fields and a slider—whose values are bound together. When you enter a numeric value in one input field, the numeric value in the other updates automatically and the slider moves to reflect the chosen value. Likewise, when you drag the slider, the numeric values in the input fields are updated to reflect the value of the slider at the current position.

<figure>
	<img class="img--66" src="/images/docs/hello-montagejs/fig01.jpg" alt="The final application." style="width: 380px;">
	<figcaption><strong>Figure 1.</strong> Your goal is to build this temperature converter application.</figcaption>
</figure>

To make the most of this tutorial, you should have a basic understanding of HTML, CSS, and JavaScript.

## Before You Begin

Be sure you have set up MontageJS development as instructed in [Getting Started with MontageJS](http://montagejs.org/docs/montagejs-setup.html). You must have node.js, npm, and minit (the MontageJS initializer command line tool) installed to complete this tutorial. You also need a text editor and a recent stable release of Google Chrome, Safari, or Firefox.

## Create a New Project

>**Note:** If you have already created a new project and are using minit to serve your project, you can skip this section and continue with "MontageJS Basics."

1. Open a Terminal window or Command Prompt and type:
    
    ```
    $ minit create:app -n temp-converter
    ```

2. Switch to the temp-converter directory and use minit to serve your project:

    ```
    $ cd temp-converter
    $ minit serve &
    ```
    
3. Point your browser to http://localhost:8083/.

You should see a blank page with a version reference in the upper left corner of the page.

## MontageJS Basics

MontageJS application development is divided into a development (creating the application) phase and a production (optimizing the application) phase. In development, you assemble an application out of encapsulated components. These components are stored in the ui directory of your project and identified by a .reel suffix (see Figure 2).

<figure>
	<img class="img--66" src="/images/docs/hello-montagejs/fig02.jpg" alt="Default application starter template." style="width: 380px;">
	<figcaption><strong>Figure 2.</strong> User interface components are stored in the ui directory of your application.</figcaption>
</figure>

When you assemble a MontageJS application, you modify the HTML documents (AKA templates in MontageJS speak) of the components in the ui directory. To change the look and feel of components, you modify the CSS files.

Figure 3 identifies the components that make up the view layer of the application that you are about to build. Main.reel is the main user interface component of the application. Think of it as the MontageJS equivalent of a website's index page or the principal screen of your single-page application: it can contain any number of subcomponents for the presentation and behavior of an application. The Converter component encapsulates the functionality of the application. The sole purpose of the Version component is to inform you of the MontageJS version you are using (it can be easily removed from the application). 

>**Note:** Although you could conceivably build an entire application using only the Main component, we recommend you assemble MontageJS applications out of individual components (just like you build a website out of individual pages)—to make the most of what MontageJS has to offer, including a modular architecture and encapsulated and reusable components. 

<figure>
	<img src="/images/docs/hello-montagejs/fig03.jpg" alt="The components of the application." style="width: 493px;">
	<figcaption><strong>Figure 3.</strong> The components that make up the temperature converter application.</figcaption>
</figure>

The Main and Version components are part of the default project; the Converter component you have to build yourself.

## Create the Converter Component

Follow these steps to add a new component to your project:

1. At the command prompt, enter:

    ```
    $ minit create:component -n converter
    ```

    This places a new component, converter.reel, in the ui directory of your project. To incorporate this component in your application, you need to declare it in the Main component.
   
2. In your project folder, open ui/main.reel/main.html.

3. Between the `<body>` tags, before `<div data-montage-id="montageVersion"></div>`, add the following markup:

    ```html
    <h1>Temperature Converter</h1>
    <div data-montage-id="tempConverter"></div>
    ```

    The `data-montage-id` <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/elements.html#custom-data-attribute" target="_blank">custom data attribute</a> is used to identify elements in the markup whose behavior you want to control. The objects that control these elements are located within the script block in the `head` area of the HTML document.
    
4. Within the `<script>` tags, after the owner object (and before the montageVersion object), add the following snippet (note the trailing comma; you need it to separate objects from each other or your application will not load):

    ```json
    "tempConverter": {
        "prototype": "ui/converter.reel",
        "properties": {
            "element": {"#": "tempConverter"}
        }
    },
    ```
    
    This declares an instance of the Converter component (`"prototype": "ui/converter.reel"`) with an object label of `tempConverter`. Its `element` property corresponds to the associated HTML element, which you added in the previous step (`<div data-montage-id="tempConverter"></div>`).
    
5. Save the changes and refresh your browser.

If all went well, you should see the title of the application and the Montage version number (see Figure 4). Since you have not specified any content in the Converter component yet, it remains invisible. (If you only get a blank page, verify that the objects between the `<script>` tags are separated by commas.)

<figure>
	<img src="/images/docs/hello-montagejs/fig04.jpg" alt="The skeleton of the application." style="width: 380px;">
	<figcaption><strong>Figure 4.</strong> The Main component with the title and MontageJS version number of the application.</figcaption>
</figure>

## Add the Markup

The application you are going to build has four elements—a title, two numeric input fields, and a slider—that need to be declared in your markup. You already declared the title of the application in main.html. Next, you declare the input fields and slider in converter.html.

1. Open ui/converter.reel/converter.html.
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

You should see two input fields and a slider control (see Figure 5).

<figure>
	<img src="/images/docs/hello-montagejs/fig05.jpg" alt="The basic elements of your application." style="width: 380px;">
	<figcaption><strong>Figure 5.</strong> The basic elements of your application rendered using the browser's default style sheet.</figcaption>
</figure>

Next, you will use MontageJS to update the view layer of these HTML elements.

## Define Your Template

First, update the markup of the HTML elements you want to control with a `data-montage-id` custom attribute.

1. In ui/converter.reel/converter.html, within the `<body>` tags, replace the existing markup with the following update:

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

    Next, add the components that control the behavior of these HTML elements.

2. Replace the contents within the existing `<script>` tags with the following block:

    ```json
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
    ```

    Things to note:
    * The labels `celsiusNumberfield`, `fahrenheitNumberfield`, and `thermometer` identify the serialized objects that control the behavior of the corresponding HTML elements.
    * `prototype` identifies the directory that contains the code of that object's prototype (here you are using components from the mobile-optimized Digit widget set that is part of the default MontageJS project).
    * `properties` lists the values assigned to the properties of the current object. 
    * The `element` property maps to the DOM elements you want to control, identified with the `data-montage-id` of `celsius`, `fahrenheit`, and `thermometer`.
    * The `axis` property replaces the horizontal slider with a vertical one.

3. Save the changes and refresh your browser.

Setting the `data-montage-id` custom data attribute now initializes your markup using the default styles of the mobile-optimized Digit user interface components (see Figure 6).

<figure>
	<img src="/images/docs/hello-montagejs/fig06.jpg" alt="The DOM elements extended with Digit components." style="width: 380px;">
	<figcaption><strong>Figure 6.</strong> The DOM elements extended with Digit components.</figcaption>
</figure>

Next, you will bind together the properties of the input fields and slider.

## Add Bindings

MontageJS uses functional reactive bindings (FRB), which you declare in the objects you want to bind together. 

1. To help speed things up, replace the contents between the existing `<script>` tags with the following:

    ```json
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
    ```

    Things to note:
    * The default value of the Fahrenheit field is set to 32; this is the initial state of the converter when loaded in the browser.
    * Two-way bindings (<->) are established between:
        * The value of the celsiusNumberfield object (`(+@fahrenheitTextfield.value - 32) / 1.8`) and the value of the fahrenheitNumberfield object (`32`).
        * The values of the thermometer and the fahrenheitNumberfield objects.

Now, when you modify any control, the others adjust accordingly. Give it a try. Enter a value in the Celsius field, use the spinner controls to increase or decrease the value in the Fahrenheit field, or drag the slider left or right.

## Make It Pretty

At this point, the application works as planned but doesn't look as designed (see Figure 1). This can be easily changed by adding some CSS rules. 

### Style the Converter Component

First, you need to specify CSS class names in the markup of your component.

1. In ui/converter.reel/converter.html, replace the content within the `<body>` tags with the following updated markup:

    ```html
    <div data-montage-id="converter" class="Converter">
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
    ```

    Things to note:
    * Added class names to control the layout and appearance of the input fields (`Numbers`), labels (`Label`), slider (`Slider`), and slider knob (`Slider-handle`).
    * Set minimum (`-13`) and maximum (`122`) values allowed in the Fahrenheit field (the slider has two-way bindings with the Fahrenheit field, hence this setting is bound to the Fahrenheit field).
    
   Next you need to add the CSS rules to the component's style sheet.

2. Open ui/converter.reel/converter.css in your MontageJS project.

3. Replace the sparse contents of the file with the following rules:

    ```css
    .Converter {
        margin: 20px auto;
        padding: 20px;
        width: 274px;
        border-radius: 10px;
        background-color: hsl(0,0%,98%);
        box-shadow: inset 0px 1px 2px 1px hsla(0,0%,100%,1), 0px 2px 5px hsla(0,0%,0%,.1);
    }
    
    .Converter:after {
        content: "";
        display: block;
        clear: both;
    }
    
    .Numbers {
        float: left;
        border: none;
        margin: 0;
        padding: 0;
    }
    
    .Label {
        margin: 15px 0;
        line-height: 40px;
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

4. Save the changes and refresh your browser.

At this point your application should look like Figure 7.

<figure>
	<img src="/images/docs/hello-montagejs/fig07.jpg" alt="The styled Converter component." style="width: 380px;">
	<figcaption><strong>Figure 7.</strong> The application with the styled Converter component.</figcaption>
</figure>

### Style the Main Component

Next, add some CSS rules to control the appearance of the Main component.

1. Switch to ui/main.reel/main.html and replace the content within the `<body>` tags with the following markup:

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
    * The Montage version div tags have been replaced with `footer` tags.

2. Following the tempConverter object within the `<script>` tags, add the following snippet (remember: you need the trailing comma to separate objects from each other):

    ```json
    "title": {
        "prototype": "digit/ui/title.reel",
        "properties": {
            "element": {"#": "title"},
            "value": "Temperature Converter"
        }
    },
    ```

    This declares an instance of the Title component and sets the value of the `h1` element to `Temperature Converter`.

3. Open ui/main.reel/main.css and replace the existing content with the following rules:

    ```css
    * {
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    
    body {
        margin: 0;
        font-family: "Lucida Grande", "Trebuchet MS", Verdana, sans-serif;
        color: hsl(0,0%,60%);
        background-color: hsl(0,0%,95%);
    }
    
    .Main {
        padding: 3em 1em;
        text-align: center;
    }
    
    .Title {
        font-size: 1.3em;
    }
    ```
    
4. Save the changes and refresh your browser.

If all went well, your application should resemble the one shown in Figure 8: a functional and pretty temperature converter.

<figure>
	<img src="/images/docs/hello-montagejs/fig08.jpg" alt="The styled Converter and Main components." style="width: 380px;">
	<figcaption><strong>Figure 8.</strong> The final application with the styled Converter and Main components.</figcaption>
</figure>

You're almost done; just one more thing.

## Prepare for Deployment

As mentioned earlier, building MontageJS applications is divided into a development phase and a production phase. When your application is finished, you need to get it ready for deployment. This is where mop, the MontageJS optimizer, comes in.

Mop is a simple command line tool that transforms a bulky application in development into an optimized application ready for deployment. In the process, mop also minifies your code to help speed up the loadtime of the application.

Mop is not part of the default MontageJS starter project; you have to install it separately. Follow these steps:

1. Open a Terminal window and at the prompt type:

    ```
    $ sudo npm install -g mop
    ```
    
    This installs mop globally so you can use it in the current and all future projects.
    
    >**Note:** npm uses `sudo` to make command line utilities such as mop available system wide.
    
2. Switch (`cd`) to the temp-converter project directory.
    
3. At the prompt enter `mop` and press Return.

    Mop analyzes the code dependencies, identifies the modules the application uses, and then adds a builds directory to your project directory that contains a minified version of your application.
 
4. Open the builds directory, double-click the symlink, and then double-click index.html.

    This opens the temperature converter application in the browser—without minit doubling as your on-demand web server (note the file URL in the browser's address bar).

To deploy the final application, all you have to do is copy the directory pointed to by the builds symlink to a web server.

That's it. You've built a simple MontageJS application and then optimized the source code ready for deployment. In the process you've discovered hands-on some of the benefits of working with MontageJS: Its declarative programming model lets you handle complex UI tasks with just a few lines of code; its modular approach to organizing code and components simplifies rich client development; and its clean separation of concerns makes it easy for developers and designers to collaborate on a project.

Yet, you've barely scratched the surface of what you can do with MontageJS.

# Next Steps

* To learn more about using MontageJS, see the guides and demos in the [Documentation](http://montagejs.org/docs/).
* For an overview of the MontageJS widget sets, check out the [Themes](http://montagejs.org/docs/themes.html) sections.
* To understand our MontageJS-specific naming patterns, see [Naming Conventions](http://montagejs.org/docs/naming-conventions.html).
* For more details on using mop and the contents of the builds directory, see [Using mop](http://montagejs.org/docs/tools-mop.html).

