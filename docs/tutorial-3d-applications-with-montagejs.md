---

layout: docs
title: Building 3D Applications with MontageJS - MontageJS Tutorial

this-page: tutorial-3d-applications-with-montagejs

---

# Building 3D Applications with MontageJS

Building browser-based 3D applications is no small feat. While <a href="http://www.khronos.org/webgl/" target="_blank">WebGL</a> brings plugin-free hardware-accelerated 3D graphics to the browser, its low-level API&mdash;well-suited for graphics programmers&mdash;sets a high entry bar for conventional front-end web developers.

To help simplify building interactive 3D experiences in the browser, the MontageJS framework provides the SceneView component. SceneView is a WebGL-based 3D component that makes manipulating the individual elements of a 3D scene just as easy as manipulating conventional HTML elements in the DOM.

To get a feel for what you can do with this component (and some minimal coding), open the <a href="http://montagejs.github.io/beachplanetblog/" target="_blank">Beach Planet demo</a> in a WebGL-enabled browser. Beach Planet is a simple hidden-object game that demonstrates the principles described in this tutorial. The objective of the game is to find four MontageJS logos by selecting different locations and clicking objects to reveal the hidden logos. The demo uses viewpoints, animated 3D transformations, and event handlers.

<figure>
    <img src="/images/docs/tutorials/3d-apps/fig01.jpg" alt="The Beach Planet MontageJS and WebGL demo." style="width: 451px;">
    <figcaption><strong>Figure 1.</strong> Uncover four hidden logos—and experience the MontageJS 3D component in action.</figcaption>
</figure>

This tutorial introduces the basic principles of building interactive 3D applications on MontageJS. It explains how to:

* Set up MontageJS 3D project
* Import a 3D scene in a MontageJS project
* Manipulate a 3D scene (using CSS and bindings)

# Requirements

To make the most of this tutorial, you should be familiar with the basics of MontageJS development. If you are new to the MontageJS framework, you might want to step through our [Getting Started](http://montagejs.org/docs/montagejs-setup.html) guide first.

Also, the tutorial includes detailed code examples to demonstrate the principles of how to use the SceneView component. To view the examples in context, refer to the Beach Planet <a href="https://github.com/montagejs/beachplanetblog" target="_blank">source code</a> on GitHub; all examples are accompanied by links to the source files. Alternatively, you can install and explore the Beach Planet demo locally, following the instructions provided in the demo's <a href="https://github.com/montagejs/beachplanetblog" target="_blank">readme</a> file.

# Introducing the SceneView Component

The SceneView component is part of the <a href="https://github.com/fabrobinet/mjs-volume" target="_blank">mjs-volume</a> module maintained by Fabrice Robinet. The component is designed to help front-end web developers and designers build interactive 3D experiences in the browser using their existing HTML, CSS, and JavaScript skills. Using the component, you can: 

* Integrate a 3D scene in a MontageJS web application.
* Manipulate individual elements of a 3D scene using CSS.
* Animate elements of a 3D scene using the same method that you would use to perform CSS transitions. 

For all this to be possible, however, your 3D content has to be in a format that the SceneView component recognizes.

## Introducing the glTF Asset Format

The SceneView component displays content in a JSON-based runtime asset format called <a href="http://www.khronos.org/gltf" target="_blank">OpenGL Transmission Format</a> (glTF). Proposed by the Khronos Group consortium&mdash;the organization behind the popular <a href="http://www.khronos.org/collada/" target="_blank">COLLADA</a> interchange file format for digital assets&mdash;as an open standard for optimized rendering of 3D content on the Web, glTF can handle mesh data, animations, textures, and shaders. More specifically, a glTF asset provides a compact representation of a 3D scene using the following files:

* A JSON file that contains the node hierarchy, materials, and cameras.
* Binary (BIN) files that contain geometry and animations.
* Image (JPG, PNG, etc.) files for textures.
* GLSL text files for GLSL source code for individual stages.

Any 3D assets you want to use in a MontageJS 3D application have to be converted to the glTF format.

## Converting 3D Assets to glTF

To convert 3D assets you can use the 3D-Asset-to-glTF toolchain provided by the COLLADA working group.

In outline, converting 3D assets to glTF is a two-step process:

1. Export assets from a 3D authoring tool to the COLLADA interchange file format (which results in a DAE file).
2. Use the open source <a href="http://www.khronos.org/gltf" target="_blank">COLLADA-to-glTF</a> command line tool to convert the DAE file to a glTF model (which results in a JSON file and various associated binary and text files that represent the 3D scene).

The COLLADA-to-glTF converter works well with COLLADA files exported from <a href="http://www.sketchup.com/" target="_blank">SketchUp</a> and other <a href="http://collada.org/mediawiki/index.php/Portal:Products_directory" target="_blank">mainstream 3D authoring tools</a>.

For more information on how to use the COLLADA-to-glTF converter, see the section <a href="https://github.com/fabrobinet/mjs-volume/blob/master/README.md#converting-3d-assets-to-gltf" target="_blank">Converting 3D Assets to glTF</a> in the mjs-volume readme file.


For more details on the SceneView component, including API documentation, refer to the <a href="https://github.com/fabrobinet/mjs-volume" target="_blank">mjs-volume</a> repository on GitHub.

# Setting Up a MontageJS 3D Project

Building any type of 3D application requires a bit of preparation, and building 3D applications on MontageJS is no different: Not only do you have to convert the original 3D assets so they can be used by the SceneView component, you also have to set up a project and then add both the prepared assets and the mjs-volume package to your project. (The SceneView component currently is not part of the default dependencies installed when you create a new MontageJS project.)

>**Note:** You don't have to set up a project from scratch to follow along with this tutorial. You should be able to follow along by looking at the examples discussed in this tutorial and by referring to the source code linked off at the end of each example. 

To set up a MontageJS 3D project, you begin as you normally would, using the minit command line tool (for details see the <a href="http://montagejs.org/docs/montagejs-setup.html" target="_blank">Setup guide</a>); for example:

```text
minit create:app -n beachplanet
```

Then you add the mjs-volume package and the converted 3D assets to your project.

## Adding the SceneView Component

The SceneView component is not (yet) part of the dependencies installed when you create a new project using the minit command line tool. To use the component, you have to add it to your MontageJS project:

1. In your (beachplanet) project directory, open the package.json file.

2. Add the mjs-volume package to the list of dependencies:

    ```json
    ...
    "dependencies": {
        ...,
        "mjs-volume" : "git://github.com/fabrobinet/mjs-volume.git"
    },
    ...
    ``` 
3. At the command prompt, switch (cd) to your project directory, and type:

    ```text
    npm install
    ```
    
4. Press return to add the module.

## Adding 3D Assets to a Project

To add the converted 3D assets to your project, simply move the folder that contains the JSON, binary, and GLSL text files to the assets folder of your project. (For example, if you wanted to experiment with the assets of the Beach Planet demo in development, <a href="https://github.com/montagejs/beachplanetblog/archive/master.zip">download</a> and unzip the full Beach Planet source code from GitHub, and copy the 3d folder in the assets directory to the assets directory of your project.)

## Creating a Component for the 3D Scene

To follow best practice, you also want to create a new component for the 3D scene in the ui directory of your project, and then declare this component in the Main interface of your project. 

>**Note:** Main is the main user interface component of a MontageJS application. Think of it as the MontageJS equivalent of a website's index page or the principal screen of your single-page application: it can contain any number of subcomponents for the presentation and behavior of an application.

At this point your MontageJS 3D project is set up and you are ready to code.

# Importing a 3D Scene

A 3D scene consists of a node hierarchy and includes meshes to be rendered, geometry, lights, shaders, and so on. When building a 3D application with MontageJS, you need two components:

* The Scene runtime component, which is responsible for loading the JSON-based glTF asset.
* The SceneView user interface component, which is responsible for displaying the content in the browser.

To display a 3D scene, you assign an instance of the Scene component to the SceneView component in your component's template.

```json
...
"scene": {
    "prototype": "mjs-volume/runtime/scene",
    "properties": {
        "path": "models/beachplanet/beachplanet.json"
    }
},
"sceneView": {
    "prototype": "mjs-volume/ui/scene-view.reel",
    "properties": {
        "element": { "#": "sceneView" },
        "scene": { "@": "scene" }
    }
},
...
```

```html
<div data-montage-id="sceneView"></div>
```

For this demo:

* `scene` declares an instance of the scene.js runtime component from the mjs-volume/runtime directory. Its `path` property is set to the path of the glTF asset (here: beachplanet.json).
* `sceneView` declares an instance of the SceneView user interface component (scene-view.reel) of the mjs-volume module. Its `scene` property refers to the `scene` instance in the declaration (which is where it gets its data from). Its `element` propertery controls the HTML element with the `data-montage-id` custom attribute of `sceneView` (which is the "container" if you will that holds the scene for browser display).

That's all that is required to load a 3D scene. At this point, the 3D scene when rendered in a browser shows is a little planet with an ocean, a beach, some foliage, a few animals, and a small shack. You can use a mouse or familiar gestures to rotate and zoom in and out of the scene.

<figure>
    <img src="/images/docs/tutorials/3d-apps/fig02.jpg" alt="A basic 3D scene in the browser." style="width: 451px;">
    <figcaption><strong>Figure 2.</strong> Importing a basic 3D scene.</figcaption>
</figure>

>**Note:** By default, the SceneView component does not have any height, which is why you will see some additional classes in the markup of the linked component's source code. The SceneView component will automatically interpret certain CSS properties applied to its associated HTML element and adjust accordingly. You can use that feature to adjust the dimensions and background color of the SceneView.

View the full <a href="https://github.com/montagejs/beachplanetblog/tree/master/ui/planet.reel" target="_blank">source code</a> on GitHub.

#Manipulating a 3D Scene

Once you have a 3D scene in your project, you can manipulate it in a variety of ways. For example, you may want to animate individual elements, handle user interactions, and give users the option to switch between view points. Using the glTF runtime assets and the mjs-volume runtime components, you can easily achieve all of the above using CSS rules and the MontageJS binding system. To accomplish this, you first expose the node of the element you want to manipulate and then apply the desired effect.

## Exposing a 3D Node

In the beachplanet.json file, individual elements of a 3D scene are described in objects called _nodes_. Each node has an ID value that uniquely identifies it within the scene. To manipulate an individual element of a 3D scene in a MontageJS application, you need to expose the associated node from the glTF file.

For example, to manipulate the duck wader element (`buoy`) in the Beach Planet demo, you need to declare an instance of the node.js runtime component (which is part of the mjs-volume package) and associate its `id` property with the element's glTF node (here: `node_31`):

```json
"scene": {
    "prototype": "mjs-volume/runtime/scene",
    "properties": {
        "path": "models/beachplanet/beachplanet.json"
    }
},

"buoy": {
    "prototype": "mjs-volume/runtime/node",
    "properties": {
        "id": "node_31",
        "scene": { "@": "scene" }
    }
}

```

As this example demonstrates, designing 3D assets does require some advance planning. In your asset authoring tool, you have to assign (preferably easy-to-remember) entity names to the 3D elements that you want to expose in a MontageJS application. The name is preserved when the 3D scene is exported to a COLLADA (DAE) file and then converted to a glTF model. To find a node ID, do a simple text search for the name inside of the glTF JSON file (here: models/beachplanet/beachplanet.json).

Note that you can expose any individual material's properties in a 3D scene to MontageJS in much the same way that you expose a node, using the material.js runtime component.

## Manipulating a 3D Node with CSS

After declaring the element you want to manipulate in the component's template, you can apply CSS classes that manipulate it in various ways. 

The node.js runtime component currently supports the `visibility` property and 3D transforms. The material.js runtime component supports the `opacity` property. 

>**Note:** Additional functionality, including the ability to replace node textures and adjust node opacity, are planned for a future release (keep an eye on the commits for <a href="https://github.com/fabrobinet/mjs-volume" target="_blank">mjs-volume</a> for the latest improvements).

Both runtime components support the use of CSS transitions to animate property changes. The `active` and `hover` selectors are also supported, so you can easily apply click and rollover effects. A CSS class for a node can be defined like any other class in the component's CSS file, but it has to be applied through the MontageJS binding system.

<figure>
    <img src="/images/docs/tutorials/3d-apps/fig03.jpg" alt="Animating the duck in the Beach Planet MontageJS and WebGL demo." style="width: 451px;">
    <figcaption><strong>Figure 3.</strong> The duck wader grows in size when in focus.</figcaption>
</figure>

For this demo, the effect of seeing the duck wader (buoy) element grow in size when users leave their cursors over it is achieved using the following rules and declaration in the Buoy component (buoy.reel):

* The component's CSS file contains a CSS class called `animate` with a hover selector that performs a `scale3d` transformation.

    ```css
    .animate:hover {
        transform: scale3d(3, 3, 3);
        cursor: pointer;
    }
    .animate {
        transition-property: transform;
        transition-duration: 5s;
        -montage-transform-z-origin: 0%;
    }
    ```

    The `scale3d` transform increases the size of the object. The `transition` property is used to animate the change in appearance and its duration; in this example it takes five seconds for the wader to reach its full size. The animation is reversed when you move the cursor off of the element.

* The component's template uses the `classList.has` binding on the node (here `buoy`) to apply the CSS class.

    ```json
    "scene": {
        "prototype": "mjs-volume/runtime/scene",
        "properties": {
            "path": "models/beachplanet/beachplanet.json"
        }
    },
    "sceneView": {
        "prototype": "mjs-volume/ui/scene-view.reel",
        "properties": {
            "element": { "#": "sceneView" },
            "scene": { "@": "scene" }
        }
    },
    "buoy": {
        "prototype": "mjs-volume/runtime/node",
        "properties": {
            "id": "node_31",
            "scene": { "@": "scene" }
        },
        "bindings": {
            "classList.has('animate')": { "<-": "true" }
        }
    }
    ```
    
View the full <a href="https://github.com/montagejs/beachplanetblog/tree/master/ui/buoy.reel" target="_blank">source code</a> on GitHub.

## Adding a Listener to Handle Events

To build a truly interactive 3D experience, an application needs to be able to respond when users interact with an element in a scene. To trap an event, you can attach an event listener to a node and then implement a corresponding handler method.

Adding an event listener to handle, for example, clicks on a 3D node is just as easy as handling an event for a MontageJS button control. The following code causes the application to display an alert whenever a user clicks the door of the shack in the Beach Planet demo.

```json
...
"door": {
    "prototype": "mjs-volume/runtime/node",
    "properties": {
        "id": "node_6",
        "scene": { "@": "scene" }
    },
    "listeners": [{
        "type": "action",
        "listener": { "@": "owner" }
    }]
},
...
```

```javascript
var Component = require("montage/ui/component").Component;

exports.Door = Component.specialize({
  handleDoorAction: {
    value: function(event) {
        alert("The user clicked the door!");
    }
  }
});
```

Note that the `action` listener type works for clicks, but you could optionally use the `hover` type instead.

## Manipulating a 3D Node through Bindings

Building on the previous example, you may want to make the scene respond to a user's click (or tab) event. In the duck wader example, the binding that applies the CSS class to the 3D node is static, that is, the value is always `true`. But the real power of the MontageJS binding system comes into play when you use it to control whether the CSS class is applied.

The following snippet demonstrates how to make the door of the shack open and close when it is clicked. In the component's template, a `classList.has` expression is bound to a `doorOpen` property on the component that contains a Boolean value.

```json
"door": {
    "prototype": "mjs-volume/runtime/node",
    "properties": {
        "id": "node_6",
        "scene": { "@": "scene" }
    },
    "bindings": {
        "classList.has('animate')": { "<-": "true" },
        "classList.has('open')": { "<-": "@owner.doorOpen" }
    },
    "listeners": [{
        "type": "action",
        "listener": { "@": "owner" }
    }]
}
```

In the component's JS file, the event handler for the door inverts the value of the `doorOpen` property, ensuring that it will change between `true` and `false` every time the door is clicked.

```javascript
Component = require("montage/ui/component").Component;

exports.Door = Component.specialize({

  doorOpen: { value: false },
  
  handleDoorAction: {
    value: function(event) {
      this.doorOpen = ~this.doorOpen;
    }
  },
  . . .
});
```

In the component's CSS file, the `open` CSS class uses the `rotateZ` property to adjust the angle of the door, causing it to appear open. The `animate` CSS class uses a CSS transition to ensure that the transformation is animated.

```css
.open {
  transform: rotateZ(-130deg);
}
.animate {
  transition-property: transform;
  transition-duration: 5s;
  transform-origin: 0% 0%;
}
```

Note that the transition behavior is defined in a separate CSS class that is applied at all times rather than toggled; this ensures that the transition animation will work when the door is both opening and closing.

<figure>
    <img src="/images/docs/tutorials/3d-apps/fig04.jpg" alt="Animating the door in the Beach Planet MontageJS and WebGL demo." style="width: 451px;">
    <figcaption><strong>Figure 4.</strong> Use bindings to control whether CSS is applied on a node.</figcaption>
</figure>

Another feature that comes into play in this example is the `transform-origin` property. This property ensures that the left edge of the door will remain fixed in its position. If the origin was not set, the door would rotate from the center instead of swinging as though on a hinge. In many cases where transforms are used, setting an origin will ensure that the transformation behaves as expected.

View the full <a href="https://github.com/montagejs/beachplanetblog/tree/master/ui/door.reel" target="_blank">source code</a> on GitHub.

## Switching View Points

When presenting complex 3D scenes, you may want to control the user's perspective. The SceneView component makes it easy to switch between different view points within a 3D scene. A view point is a node that holds a camera. View points can be accessed in the binding definition just like any other scene node.

In the following example, the `sceneView` object has a `viewPoint` property that references the `planetVP` node:

```json
 "sceneView": {
    "prototype": "mjs-volume/ui/scene-view.reel",
    "properties": {
        "allowsViewPointControl" : false,
        "element": { "#": "sceneView" },
        "scene": { "@": "scene" },
        "viewPoint": { "@" : "planetVP" }
    }
},
"planetVP": {
    "prototype": "mjs-volume/runtime/node",
    "properties": {
        "id": "node-Camera_cabin",
        "scene": { "@": "scene" }
    }
}
```

The `allowsViewPointControl` property is used to control whether the user can drag to adjust the view. This feature is useful in cases where the application needs more control over what the user sees in the scene. A binding can be used with the `viewPoint` property to control the view programmatically.

The Beach Planet demo also provides a menu that helps users quickly choose the main Beach Planet detail views: planet, seagull, buoy (duck wader), cabin, and dolphins. The following snippet demonstrates how to choose between two different view points that are embedded in the Beach Planet scene. The `viewPoint` property is bound to the camera associated with the selected item in the menu.

```json
"planetVP": {
    "prototype": "mjs-volume/runtime/node",
    "properties": {
        "id": "node-Camera_cabin",
        "scene": { "@": "scene" }
    }
},
"cabinVP": {
    "prototype": "mjs-volume/runtime/node",
    "properties": {
        "id": "node-Camera_cabin",
        "scene": { "@": "scene" }
    }
},
"seaGullVP": {
    "prototype": "mjs-volume/runtime/node",
    "properties": {
        "id": "node-Camera_SeaGull",
        "scene": { "@": "scene" }
    }
},
"sceneView": {
    "prototype": "mjs-volume/ui/scene-view.reel",
    "properties": {
        "allowsViewPointControl" : false,
        "element": { "#": "sceneView" },
        "scene": { "@": "scene" },
        "viewPoint": { "@" : "planetVP" }
    }
},
"nav": {
    "prototype": "montage/ui/repetition.reel",
    "properties": {
        "element": { "#": "nav" },
        "content": [
            { "label": "Planet", "value": { "@": "planetVP" } },
            { "label": "Cabin", "value": { "@": "cabinVP" } },
            { "label": "Seagull", "value": { "@": "seaGullVP" } }
        ]
    }
}
```

View the full <a href="https://github.com/montagejs/beachplanetblog/tree/master/ui/menu.reel" target="_blank">source code</a> for this example on GitHub.

<figure>
    <img src="/images/docs/tutorials/3d-apps/fig05.jpg" alt="Switching view points in the Beach Planet MontageJS and WebGL demo." style="width: 451px;">
    <figcaption><strong>Figure 5.</strong> Control the user's perspective with the viewPoint property.</figcaption>
</figure>

Now that you know the basic principles of using the SceneView component, you can experiment with integrating interactive 3D experiences in your own web content (or grab some 3D models in the glTF format from <a href="http://sketchup.google.com/3dwarehouse/" target="_blank">3D Warehouse</a>). The component already offers enough features to build compelling experiences as the Beach Planet demo shows, but we have even more planned for the future.

# Next Steps

Explore the complete <a href="https://github.com/montagejs/beachplanetblog/tree/master/ui/beachplanet.reel" target="_blank">source code</a> for the Beach Planet demo on GitHub.

To keep up with the latest developments of the MontageJS 3D components, follow or star the <a href="https://github.com/fabrobinet/mjs-volume" target="_target">mjs-volume</a> repository on GitHub.

If you have ideas (or code) for improving the components, we'd love to hear from you. Get in touch by joining the <a href="https://groups.google.com/forum/?fromgroups#!forum/montagejs" target=_"blank">MontageJS mailing list</a> or contacting <a href="https://twitter.com/montagejs" target=_"blank">@MontageJS</a> on Twitter.

For more information about developing applications with MontageJS, refer to the following resources:

* [MontageJS Documentation](http://montagejs.org/docs/)
* <a href="http://seg.phault.net/montage/cookbook/" target="_blank">MontageJS Cookbook</a>
* [Getting Started with MontageJS](http://montagejs.org/docs/montagejs-setup.html) steps you through the process of setting up your MontageJS development environment.

