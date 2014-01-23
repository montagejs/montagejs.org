---
layout: blog
title: Build 3D applications with the WebGL-based MontageJS 3D component
author: Ryan Paul
author_url: http://twitter.com/segphault
---

WebGL, the standard that defines JavaScript APIs for performing hardware-accelerated 3D rendering in the HTML Canvas element, is gaining considerable momentum. It looks like 2014 will be the year that WebGL enters the mainstream, emerging from laboratory prototypes and demos to take its rightful place in real-world applications.

WebGL's low-level APIs are well-suited for graphics programmers, but set a high barrier to entry for conventional frontend web developers. Using WebGL to build interactive 3D experiences for the web currently requires intensive programming and a great deal of specialized expertise. To help simplify WebGL adoption for web designers, the MontageJS team is very excited to share a new WebGL-based component for the MontageJS framework. The component will make it easier for frontend web developers to integrate interactive 3D experiences.

The new 3D view component for MontageJS offers a unique kind of abstraction layer for WebGL, one that truly elevates 3D graphics to the status of a first class citizen on the web. It aims to make the individual elements of a 3D scene just as easy to manipulate as conventional HTML elements in the page DOM. If your browser has WebGL enabled, you can see a [full version of the demo here](http://montagejs.github.io/beachplanetblog/).

[![Beach Planet](./PlanetBlog.jpg)](http://montagejs.github.io/beachplanetblog/)

The component provides a bridge between WebGL and the MontageJS data binding system, extending the model/view/controller paradigm to the world of 3D graphics. The bridge makes it easy to integrate a 3D scene that serves as a view, reacting to changes in an underlying data model. The component  gives developers the ability to manipulate individual parts of a 3D scene in WebGL using CSS, making it exceptionally easy to accomplish with a syntax that is already widely known. The component will even let you animate elements of a 3D scene using the exact same method that you would use to perform CSS transitions.

This tutorial demonstrates how to use the component to build interactive 3D applications with MontageJS. It will describe how to load a 3D model, expose model nodes to the MontageJS binding system, manipulate model nodes with CSS, and make model nodes respond to user interaction. Just like MontageJS, the new 3D view component is open source software: we publish the source code on GitHub under the BSD license. You can download it yourself and follow along with the steps in this tutorial.

## What is MontageJS?

[MontageJS](http://montagejs.org/) is an open source framework that bridges the gap between structured markup and interactive experiences, addressing many of the longstanding challenges faced by frontend Web developers. MontageJS applications are built with components, modular units of functionality that consist of HTML markup, CSS style directives, and a declarative set of component definitions and data bindings written in JSON. The framework's [functional reactive binding](https://github.com/montagejs/frb) (FRB) system maps the application's underlying data model to component properties.

This tutorial assumes that the reader already has a basic familiarity with the principles of MontageJS development. If you are completely new to the framework and would like to start from the beginning, you might want to check out the [Getting Started](http://montagejs.org/docs/montagejs-setup.html) guide.

## Convert a COLLADA model to glTF

There are standard data formats for conveying audio, video, images, and other kinds of media across the Internet, so why not a format for 3D graphics? Instead of building 3D web content programmatically, the developer should be able to export a scene from a 3D design tool and load it into a web page.

Khronos, the organization that maintains the WebGL and OpenGL standards, is also home to a standard called COLLADA that defines a data interchange format for 3D graphics. COLLADA makes it easy for artists to move their 3D content between authoring tools. The COLLADA working group is drafting a specification for a new JSON-based 3D runtime asset format, called the OpenGL Transmission Format (glTF), that is well-suited for rapid delivery and loading of 3D content on the web.

The MontageJS 3D view component is designed to load and display glTF content. To use the component, you will first need to convert your content into the glTF format. The COLLADA working group provides an [open source converter](https://github.com/KhronosGroup/glTF) that can be used at the command line to translate COLLADA files into glTF. You can download the command line converter from he COLLADA website: the Mac binary is [here](http://collada.org/public_files/glTF/77abd641d1fb1105da6172f039e2007999a6c47d/collada2gltf) and the Windows binary is [here](http://collada.org/public_files/glTF/77abd641d1fb1105da6172f039e2007999a6c47d/collada2gltf.exe). The converter works well with COLLADA files exported from [SketchUp](http://www.sketchup.com/) and other mainstream 3D authoring tools. You can also download our 3D assets in the glTF format so that you can follow the examples in this blog post.

## Load a 3D scene

When building a 3D application with Montage, you will use a Scene component to load your glTF file. The Scene is then attached to a View component, which is responsible for displaying the content on the screen. The Scene and View components are available from our [`mjs-volume`](https://github.com/fabrobinet/mjs-volume) module, which you will need to add to your project before you proceed. Add the following to a component definition in your application to add Scene and Viewer components:

```json
"scene": {
    "prototype": "mjs-volume/runtime/scene",
    "properties": {
        "path": "models/beachplanet/beachplanet.json"
    }
},
"viewer": {
    "prototype": "mjs-volume/ui/view.reel",
    "properties": {
        "element": { "#": "viewer" },
        "scene": { "@": "scene" }
    }
}
```

The `path` property of the Scene component points to the relative path of the JSON file with the glTF data. The `scene` property of the View component refers to the Scene instance in the component definition. Now that the Scene and View have entries in the component definition, add an HTML element to represent the View:

```html
<div data-montage-id="viewer"></div>
```

That's all you have to do to load the scene. The application will now show the 3D content from the glTF file. For the purposes of this blog post, our 3D scene is a little planet with an ocean, a beach, some foliage, a few animals, and a small shack. The user will be able to click and drag the scene to rotate it on the screen. A scrollwheel (or equivalent trackpad gesture) can be used to zoom in and out. Before continuing, you might want to add a CSS class to the `div` element and use it to set a default width and height for the View. The View component will automatically interpret certain CSS properties applied to its associated HTML element and adjust accordingly. You can use that feature to adjust the dimensions and background color of the View.

## Expose a 3D node to the binding system

In a glTF file, individual elements of the 3D scene are described in objects called nodes. Each node has an ID value that uniquely identifies it within the scene. To manipulate an individual piece of the 3D scene in a MontageJS application, you need to expose the associated node from the glTF file in a component definition. The `mjs-volume` module includes a Node component that you can use to access a 3D element:

```json
"node": {
    "prototype": "mjs-volume/runtime/node",
    "properties": {
        "id": "node_31",
        "scene": { "@": "scene" }
    }
}
```

The code above demonstrates how to instantiate a Node component and associate it with the duck wader that is floating on the surface of the ocean in the 3D scene. The `id` property of the Node component specifies which individual glTF node should be associated with the object.

When I'm working with a model in SketchUp, I typically assign a memorable entity name to the 3D elements that I want to be able to access in MontageJS. The name is preserved when the 3D scene is exported to a COLLADA file and then converted to glTF. To find the node ID, I can just do a simple text search for the name inside of the glTF JSON file.

It's worth noting that you can expose an individual material from the scene to MontageJS in much the same way that you expose a node. There is a corresponding Material component with an ID property that works just like the Node component.

## Manipulate a 3D node with CSS

After creating the Node object in the component definition, you can apply CSS classes that manipulate it in a number of ways. At the present time, the Node component supports the `visibility` property and 3D transforms. The Material component supports the `opacity` property. Additional functionality, including the ability to replace node textures and adjust node opacity, will arrive in the future--keep an eye on the commits to see the latest improvements.

Both components support the use of CSS transitions to animate property changes. The `active` and `hover` selectors are also supported, making it easy to apply click and rollover effects. A CSS class for a Node can be defined like any other class in your component's CSS file, but it has to be applied through the MontageJS binding system.

![Duck Wader](./duckwader.jpg)

For this example, we want to make the duck wader grow when the user hovers over it with their cursor. Create a CSS class called `animate` with a hover selector that performs a `scale3d` transformation. Next, use the `classList.has` binding on the Node component to apply the CSS class:

```json
"scene": {
    "prototype": "mjs-volume/runtime/scene",
    "properties": {
        "path": "models/beachplanet/beachplanet.json"
    }
},
"viewer": {
    "prototype": "mjs-volume/ui/view.reel",
    "properties": {
        "element": { "#": "viewer" },
        "scene": { "@": "scene" }
    }
}

"duck": {
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

In the example above, the `scale3d` transform increases the size of the object. The `transition` property is used to animate the growth, making it take five seconds for the wader to reach its full size. The animation is reversed when the user moves their cursor off of the duck. You can find [source code](https://github.com/montagejs/beachplanetblog/tree/master/ui/buoy.reel) for the complete example on GitHub.

## Add a listener to handle click events

To build a truly interactive 3D experience, the application needs to be able to respond when the user clicks an element in the scene. To trap a click event, you can attach an event listener to a Node component and then implement a corresponding handler method:

```json
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
}
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

Adding an event listener to handle clicks on a 3D node works exactly as one would expect: it's just as easy as handling a click event for a MontageJS button control. Using the code above, the application will display an alert message whenever the user clicks on the door of the shack in the beach planet scene. The `action` listener type works for clicks, but you could optionally use the `hover` type instead.


## Manipulate a 3D node through bindings

Building on that example, the next step is to make the scene respond to the user's click event. In the example with the duck wader, the binding that applies the CSS class to the 3D node is static: the value is always `true`. But the real power of the binding system comes into play when you use it to control whether the CSS class is applied.

This example will demonstrate how to make the door of the shack on the beach planet open and close when it is clicked by the user. In the component definition, a `classList.has` expression is bound to a `doorOpen` property on the component that contains a boolean value. The click event handler for the door inverts the value of the `doorOpen` property, ensuring that it will change between `true` and `false` every time the door is clicked.

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

```javascript
Component = require("montage/ui/component").Component;

exports.Door = Component.specialize({
  doorOpen: { value: false },
  handleDoorAction: {
    value: function(event) {
      this.doorOpen = ~this.doorOpen;
    }
  }
});
```

The `open` CSS class uses the `rotateZ` property to adjust the angle of the door, causing it to appear open. The `animate` CSS class uses a CSS transition to ensure that the transformation is animated. It's important to note that the transition behavior is defined in a separate CSS class that is applied at all times rather than toggled, guaranteeing that the transition animation will work when the door is both opening and closing.

![Door](./DoorBlog.jpg)

Another useful feature that comes into play in this example is the `transform-origin` property, which is used to make sure that the left edge of the door will remain fixed in its position. If the origin wasn't set, the door would rotate from the center instead of swinging as though on a hinge. In many cases where transforms are used, setting an origin will ensure that the transformation behaves as expected. The complete [source code](https://github.com/montagejs/beachplanetblog/tree/master/ui/door.reel) of the door example can be found on GitHub.

## Switch between cameras in a 3D scene

When presenting complex 3D scenes, an application might want to control the user's perspective. The MontageJS 3D view component makes it easy to switch between different cameras that are defined within the 3D scene. Cameras can be accessed in the binding definition just like any other scene node. The Viewer component has a `viewPoint` property that can be given a reference to a camera node:

```json
"doorViewPoint": {
    "prototype": "mjs-volume/runtime/node",
    "properties": {
        "id": "node-Camera_cabin",
        "scene": { "@": "scene" }
    }
},
 "viewer": {
    "prototype": "mjs-volume/ui/view.reel",
    "properties": {
        "allowsViewPointControl" : false,
        "element": { "#": "viewer" },
        "scene": { "@": "scene" },
        "viewPoint": { "@" : "doorViewPoint" }
    }
}
```

The `allowsViewPointControl` property is used to control whether the user can click and drag to adjust the view, a feature that is often useful in cases where the application needs more control over what the user is seeing in the scene. A binding can be used with the `viewPoint` property to programmatically control the view. You can provide a user interface that guides the user around the scene:

```json
"doorView": {
    "prototype": "mjs-volume/runtime/node",
    "properties": {
        "id": "node-Camera_cabin",
        "scene": { "@": "scene" }
    }
},
"gullView": {
    "prototype": "mjs-volume/runtime/node",
    "properties": {
        "id": "node-Camera_SeaGull",
        "scene": { "@": "scene" }
    }
},
"viewer": {
    "prototype": "mjs-volume/ui/view.reel",
    "properties": {
        "allowsViewPointControl" : false,
        "element": { "#": "viewer" },
        "scene": { "@": "scene" }
    },
    "bindings": {
        "viewPoint": { "<-" : "@cameras.value.cam" }
    }
},
"cameras": {
    "prototype": "digit/ui/select.reel",
    "properties": {
        "element": { "#": "cameras" },
        "content": [
            { "label": "Cabin", "cam": { "@": "doorView" } },
            { "label": "Seagull", "cam": { "@": "gullView" } },
        ]
    }
}
```

The example above provides the user with a dropdown menu that they can use to choose between two different cameras that are embedded in the beach planet scene. The `viewPoint` property is bound to the camera associated with the selected item in the dropdown.

## Next steps

Putting together a complete demo with the features described in this tutorial, we built a simple hidden object game that takes place on the beach planet. The player selects different locations on the planet and then clicks objects in order to find the hidden MontageJS logos. The application will keep track of the user's score and increment it as they find each logo. The demo uses viewpoints, animated 3D transformations, and click event handlers. Be sure to check out the complete code [on GitHub](https://github.com/montagejs/beachplanetblog) to see how it works.

![Game](./PlanetOverview.jpg)

Now that we have introduced you to the basic principles of using the MontageJS 3D view component, you can integrate interactive 3D experiences in your own web content. The component already offers enough capabilities to build compelling experiences like the beach planet demo, but we have even more planned for the future. If you'd like to keep up with the latest developments, consider following or starring the `mjs-volume` repository on GitHub. If you have some ideas (or code!) for improving the component, we'd love to hear from you. You can get in touch by joining the [MontageJS mailing list](https://groups.google.com/forum/?fromgroups#!forum/montagejs) or contacting [@MontageJS](https://twitter.com/montagejs) on Twitter.
