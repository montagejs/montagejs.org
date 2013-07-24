---
layout: docs
title: Getting Started

prev-page: index
next-page: examples
---

# Getting Started

This tutorial will show you how to assemble a simple MontageJS application. The goal is to quickly familiarize you with the basic building blocks of Montage. It should take no more than fifteen minutes for you to complete. To make the most of this tutorial, you should have a basic understanding of HTML, CSS, and JavaScript and some familiarity with working in a command-line environment.

##Set Up MontageJS Development
MontageJS application development is divided into a development (creating the app) and a production (compiling the app) process, each has its own tools and requirements. For the development process (which is the focus of this tutorial) you need:

* Node.js and npm.
* A recent stable release of Chrome, Safari, or Firefox.

###Step 1: Install Node and npm
MontageJS application development depends on npm, the Node package manager, which is distributed with Node.js.

If you haven't already, be sure to [download](http://nodejs.org/download/) and run the prebuilt installer for your platform from the Node.js website before proceeding.

###Step 2: Install the MontageJS Initializer
Next, you will need to install `minit`, the MontageJS Initializer.

`minit` is a command line utility that will help you kickstart your MontageJS project by generating prebuilt MontageJS application templates and components and placing the associated files inside the proper directories of your project. 

> **Note**: You don't have to use `minit` to build MontageJS application; you can just use a GIT client and start from scratch. However, using `minit` makes the development process a lot easier.

Open a Terminal window and install the latest version of `minit`:

**Mac OS X**

```
$ mkdir -p ~/.npm
$ sudo npm install -gq minit@latest
```
> **Note**: `minit` does not need sudo access; this is a workaround due to a current [issue](https://github.com/joyent/node/issues/3821) with the OS X node installer package.

**Windows**

Run the Node.js command prompt.

```
$ npm install -gq minit@latest
``` 
###Step 3: Create the default application template
You are now ready to create your first MontageJS application.

1. Use `minit` to create a MontageJS application named hello.

    ```
    $ minit create:app -n hello
    ```

    > **Note**: If you get an EACCES warning when trying to run `minit:create`, use `sudo chown -R <username> ~/.npm` and then use `$ minit create:app -n hello`. This is a workaround due to a bug in npm.

    This generates the hello directory—which contains the default MontageJS application template, including the production dependencies—in your current directory.

2. To verify your installation, switch to the hello directory and serve your new MontageJS project using `minit`:

    ```
    $ cd hello
    $ minit serve &
    ```

3. Finally, point your browser to http://localhost:8083/.

Voilà—you are looking at your first MontageJS application. More precisely, you are looking at the contents of the Welcome component, which is explicitly loaded for no other reason than to accompany this tutorial and help kickstart your MontageJS application development skills. Think of this app and what follows as an expanded version of your standard "Hello World" application.

![GS_Figure1](/images/docs/gs_tut_fig_01.png)

In the remaining part of this tutorial, you will learn how to assemble MontageJS components into a user interface, surface and synchronize data between MontageJS objects and the user interface, and listen for and react to events.

##Say Hello to MontageJS

MontageJS applications consist of a model layer that handles the data and a view layer that reads from the models and handles user input and rendering. Components make up the view portion of a MontageJS application. As a rule, these components are stored in the ui directory of your MontageJS application and identified by a .reel suffix (which has the benefit that you can use any MontageJS package and easily locate the user interface components it provides).

Check it out: In your file browser go to the hello/ui directory; inside you’ll find two components—main.reel and welcome.reel.

A .reel suffix identifies a self-contained MontageJS component that encapsulates the structure (HTML), appearance (CSS), and behavior (JavaScript) of the component. 

See for yourself: Open the welcome.reel directory and you will spot an HTML, a CSS, and a JS file. 

The welcome.html (or template) file contains the text and graphic that are rendered in the browser, the welcome.css file controls the appearance of the contents in welcome.html, and welcome.js controls its behavior (of which, frankly, there is not much at this point).

> **Note**: For more details on the anatomy and key features of MontageJS components, refer to the MontageJS Basics document (coming soon).

###Create a Custom UI Component
Let's dress up the Welcome component by adding a user interface component. First, you will create and add a new component that spells "Hello World" and insert it in the Welcome component.

1. Open a new Terminal window, switch to the hello directory, and run the `minit` command to create a new component named hello-world:

    ```
    $ cd hello
    $ minit create:component -n hello-world
    ```
    `minit` creates the hello-world.reel directory in the ui directory of your hello app installation, complete with a default set of HTML, CSS, and JS files. Next, you need to add content to your new component that can be rendered inside the browser.

2. Go to the hello/ui/hello-world.reel directory, open the hello-world.html template in your preferred text editor, and put "Hello World" inside the HTML body div:

    ```
    <div data-montage-id="helloWorld" class="HelloWorld">Hello World</div>
    ```
3. Save the hello-world.html template.

    Next, you need to tell the Welcome component to use your new component inside its template.

4. Open the welcome.html template file located in the hello/ui/welcome.reel directory.

    In the head section, inside the `montage-serialization` script block, you'll find a serialized object graph, which describes all the objects used in the document. (For more details on serialization in MontageJS refer to [MontageJS Serialization Format](http://montagejs.org/docs/montage-serialization-format.html) document.)

5. Insert the following `helloWorld` label following the `owner` label (**don't forget the trailing comma, which is required to separate the objects in the object graph**):

    ```
    "helloWorld": {
        "prototype": "ui/hello-world.reel",
        "properties": {
            "element": {"#": "helloWorld"}
        }
    },
    ```

    This declares an instance of the HelloWorld component with an object label of `helloWorld` as a child of the Welcome component: The component's module ID ("/ui/hello-world.reel") allows MontageJS to recreate the component from its serialized form at runtime. The component's `element` property, which corresponds to the associated HTML element on which the component operates, is set to the HTML body div with the `data-montage-id` attribute of `hello-world`.

6. Refresh the page.

You should see the contents of the HelloWorld component—a simple "Hello World" surrounded by a dotted outline (styled courtesy of the predefined rules in hello/ui/welcome.reel/welcome.css)—rendered inside this simple single-page application.

> **Note**: You may have to clear your browser's cache for the change to appear.

![GS_Figure1](/images/docs/gs_tut_fig_02.png)

That's how you build MontageJS applications—you assemble user interface components.

###Modify a UI Component

Now suppose you wanted to dynamically change the contents of the HelloWorld component, say you wanted to replace the general word "World" in "Hello World" with a personal name based on user input, and, just to mix things up, you want that name to show in a different color. In broad strokes, here's how you would go about architecting this part of your application:

1. Create the component responsible for the replacement text.
2. Instruct the HelloWorld component to use the replacement text.
3. Provide an input component for user's to enter text.
4. Bind the components together so the contents of HelloWorld change in real time based on user input.

Follow these steps:

1. At the command prompt run `minit` in your hello directory to create a new component called name-tag:

    ```
    $ minit create:component -n name-tag
    ```

    As you'd expect, `minit` creates the name-tag.reel directory complete with the associated files in the hello/ui directory. Next, you need to add the placeholder content that is to replace "World" in "Hello World."

2. Go to the hello/ui/name-tag.reel directory, open the name-tag.html file, and replace the default HTML body div with the following span:

    ```
    <span data-montage-id="nameTag" class="NameTag">Name</span> 
    ```
3. Save and close name-tag.html.

4. To have the content in this template appear in a different color, open the name-tag.css file and add the following rule:  

    ```
    .NameTag {
        color: red;
    }
    ```
    > **Note**: Style sheets for newly created components only contain the class name of the root element. It's up to you to populate them with your meticulously crafted rules. Note also that the CSS class name is a CamelCase version of the component’s name. This is part of our [CSS naming convention](https://github.com/montagejs/montage/wiki/naming-conventions); it allows us to scope each component's CSS so that it doesn't "leak out" and accidentally style other components.

    Next, you need to instruct the HelloWorld component to use the NameTag component.

5. Go to hello/ui/hello-world.reel and open the hello-world.html template.

    In the head section, in the montage-serialization script block, following the "owner" property, add the serialization entry for the NameTag component ( **don't forget to add a comma following the “owner” entry to separate the objects** ):

    ```
    "nameTag": {
        "prototype": "ui/name-tag.reel",
        "properties": {
            "element": {"#": "nameTag"}
        }
    }
    ```

6. In the HTML body, inside the div, replace "World" with the following span:

    ```
    <div data-montage-id="main" class="Main">Hello <span data-montage-id="nameTag"></span>
    </div>
    ```
7. Refresh the browser and enjoy the fancy red Name tag: The contents of the NameTag component are rendered using the `name-tag` element from its included HTML template and styled using its included CSS.

![GS_Figure1](/images/docs/gs_tut_fig_03.png)

You now have a pretty respectable component tree. But you're not done yet. All you've done so far is assemble your visual component tree through the power of declarative programming. You have yet to connect its parts to an underlying model. For simplicity's sake, we'll let our components serve as the model.

###Assign Value Through Bindings

Your next task in your goal to create a more personalized greeting is to instruct the NameTag component on how to behave; more specifically, you want to pin a value on its name. Follow these steps:
 
1. Add a `name` property to the NameTag component's implementation at ui/name-tag.reel/name-tag.js: 

    ```
    exports.NameTag = Component.specialize(/** @lends NameTag# */ {
        constructor: {
            value: function NameTag() {
                this.super();
            }
        },
        name: {
            value: "Alice"
        }
    });
    ```

2. Add a Montage-provided Text component to name-tag.html. In the head section, in the object graph, following the `owner` property, add the following serialization entry for the name object (remember to separate the objects in the object graph with a comma):

    ```
    "name": {
        "prototype": "montage/ui/text.reel",
        "properties": {
            "element": {"#": "name"}
        },
        "bindings": {
            "value": {"<-": "@owner.name"}
        }
    }
    ```

3. In the HTML body, inside the span, replace the "Name" text with the following span:
   
    ```
    <span data-montage-id="name"></span>
    ```
    
    This specifies that the `value` property of the Text component you create will be the same as the owner's `name` property (here: name-tag.html). Anytime the `owner.name` property changes, so will the value you see in the rendered view.

4. Refresh the page. Instead of a red Name tag you should now see a red Alice.

![GS_Figure1](/images/docs/gs_tut_fig_04.png)

Bindings are among the pinnacle of declarative bliss. After declaring the binding between the two properties—`value` and `name`—you don't need to do anything else to make it happen.

But wait, there's more. So far you have created only a placeholder for the replacement text and assigned a value to it. To complete your goal, you need to provide and hook up an input component.

###Drive Changes Through Bindings

Conveniently, MontageJS provides a TextField component. First, however, you need to determine where to put it. Here's where you start architecting your application: As long as your application is small where to place your component is an easy decision to make; as your application expands, however, it's important to keep components, and all other objects, loosely coupled and highly cohesive to aid in determining where responsibilities live.

For the purpose of this example, you want NameTag to be a read-only component, so you'll make editing the job of the HelloWorld component.

1. Add a Montage-provided TextField component to the template of your HelloWorld component at ui/hello-world.reel/hello-world.html; you know the drill by now:

    **Serialization**

    ```
    "nameField": {
        "prototype": "digit/ui/text-field.reel",
        "properties": {
            "element": {"#": "nameField"}
        },
        "bindings": {
            "value": {"<->": "@nameTag.name"}
        }
    }
    ```
    **HTML body**

    ```
    <div data-montage-id="main" class="Main">
        Hello <span data-montage-id="nameTag"></span>
        <div><input type="text" data-montage-id="nameField"></div>
    </div>
    ```

    This binds the `value` property of the TextField component to the NameTag's `name` property, effectively making it a two-way binding as indicated by the double-headed arrow; changes on either side of this binding propagate to the other side. (In addition to deciding where components should live, you also have to decide which side to establish a binding on; but that's a topic for another tutorial.)

2. Refresh the page and give it a try.

    As you type in the text field, the Name tag should update in real time.

![GS_Figure1](/images/docs/gs_tut_fig_05.png)

You're almost done. Just one more thing.

###Listen for Events

Components can emit events in the same sense that DOM elements emit events. A MontageJS Button component, for example, dispatches an action event with itself as the target. This event is synthesized from a sequence of mouse or touch events that the button component itself observes on its own element. Here’s how you handle a button’s action event.

1. Add the Button component to the Hello-World component's template at ui/hello-world.reel/hello-world.html:

    **Serialization** 

    ```
    "greetButton": {
        "prototype": "digit/ui/button.reel",
        "properties": {
            "element": {"#": "greetButton"}
        },
        "bindings": {
            "label": {"<-": "@nameTag.name"}
        },
        "listeners": [
            {
                "type": "action",
                "listener": {"@": "owner"}
            }
        ]
    }
    ```

    **HTML body**

    ```
    <div data-montage-id="main" class="Main">Hello
     <span data-montage-id="nameTag"></span>
     <div><input type="text" data-montage-id="nameField"></div>
     <button data-montage-id="greetButton"></button>
    </div>
    ```
    For the sake of showing off bindings we use one here to bind the label of the `greetButton` element to the `nameTag.name` property. The listeners object contains an array (indicated by the square brackets: [ … ]) of listener entries that specify the event type being observed by name and the listener interested in handling the event. Of course, you can register many different listeners here.

2. Refresh the page. You should see a button whose label matches the current name.

    ![GS_Figure1](/images/docs/gs_tut_fig_06.png)


    Behold the joy of code-free declarative binding: change the name in the TextField component and see it reflected in both the `nameTag` and the `greetButton` component instances.

3. To make the button do something, add some code to the listener object you specified (here: HelloWorld), inside ui/hello-world.reel/hello-world.js:

    ```
    exports.HelloWorld = Component.specialize(/** @lends HelloWorld# */ {
    
        handleGreetButtonAction: {
            value: function (event) {
                this.classList.toggle("flip");
            }
        }
    
    });
    ```
    
    Note the specifics here: While the standard JavaScript `addEventListener` either expects a function reference or an eventHandler object that implements a `handleEvent` method, MontageJS helps direct an event to a more specific handler method on a listener if implemented.

    In this case you've implemented `handleGreetButtonAction`, which describes that this method will handle action events emitted from a target with an identifier of `greetButton` during the bubble phase of event distribution. This is the most specific handler possible (less specific alternatives would have been: `handleAction` and `handleEvent`). It reduces the need for inspecting each event in a generic `handleEvent` method to determine what the event was and how it should be handled.

    The `classList` property manipulates the CSS classes applied to the HelloWorld component's element.

4. Refresh the browser and click the button. If everything works as expected, you should see the background color of the the Welcome component change color and flip diagonally.

    ![GS_Figure1](/images/docs/gs_tut_fig_07.png)

##Take Off the Training Wheels

Although it has served you well so far, it's time to ditch the default Welcome component.

1. Inside index.html remove the explicit loading of the Welcome component from the owner entry:

    ```
    "owner": {
        "prototype": "montage/ui/loader.reel"

    }
    ```

2. Refresh the browser and note that the Welcome component is no longer present, leaving nothing but a blank page for you to start your own project. With the Welcome component gone, the MontageJS loader component automatically loads the Main component (part of the default MontageJS application installation), which now awaits your assembly instructions.

You have barely scratched the surface of what MontageJS can do. What you should take away from this tutorial is how simple things are with a declarative framework that embraces components and bindings.

For more information on MontageJS components, bindings, event handling, serialization etc. refer to the [documentation](http://montagejs.org/docs/) (be patient: we are currently in the process of updating the docs).
