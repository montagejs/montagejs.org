---

layout: docs
title: Reddit Client with MontageJS - MontageJS Tutorial

this-page: tutorial-reddit-client-with-montagejs

---

# Building a Simple Reddit Client with MontageJS

Many data-driven web applications need to display sequences of objects, often with specialized presentation. Consider some common examples: an employee directory that shows a list of names and phone numbers, a photo gallery that shows image thumbnails with captions, or a group chat interface that shows a list of messages accompanied by senders and time stamps. The manner in which the information is presented differs in each of those cases, but they all represent the same underlying pattern: a repeating group of elements.

In MontageJS applications, a repeating group of elements  can be displayed with the prebuilt Repetition component. The component instructs an application to repeat a bit of HTML markup once for each item in the provided sequence. The Repetition component is an important building block in MontageJS development, serving a similar purpose to the loop expressions found in conventional template languages. Typical use cases include dynamic user interface elements, such as dynamically created lists.

This tutorial shows you how to build a simple reddit client using the Repetition component. The application consists of two lists (see Figure 1):  a list of stories (on the left) and a list of popular subreddits (on the right). When you click a subreddit, the application uses the reddit API to obtain the top stories from the selected category. Stories are displayed with title, submitter, and current score details.

<figure>
	<img src="/images/docs/tutorials/reddit-client/fig01.png" alt="The final application.">
	<figcaption><strong>Figure 1.</strong> A simple reddit client built on MontageJS.</figcaption>
</figure>

<a href="http://montagejs.github.io/mfiddle/preview/#!/7881457" target="_blank">View the demo</a>

# Requirements

To make the most of this tutorial, you should be familiar with the basics of MontageJS concepts and development. If you are new to the MontageJS framework, you might want to step through the MontageJS [Getting Started](http://montagejs.org/docs/montagejs-setup.html) guide first to get a feel for working with MontageJS components.

# Building the Application

For this tutorial, you do not have to set up a new MontageJS project. Instead, you can follow along using <a href="http://montagejs.github.io/mfiddle/" target="_blank">MFiddle</a>, the online MontageJS component editor: Each top-level section in this tutorial ends with a link to a saved MFiddle that includes the code for the current state of the application for you to explore.

>**Note:** If you wanted to follow along building the application from scratch, you would have to set up a new MontageJS project first (for details see the <a href="http://montagejs.org/docs/montagejs-setup.html" target="_blank">Setup guide</a>). Next, to follow best practice, you would create a new RedditClient component, and then link it to the Main component of your project. (Remember: Main is the main user interface component of the application. Think of it as the MontageJS equivalent of a website's index page or the principal screen of your single-page application: it can contain any number of subcomponents for the presentation and behavior of an application.)

This tutorial first explains how to build the subreddit navigation and populate it with live data, and then how to display the top stories in the application.

# Building the Navigation

Conceptually, the reddit client application consists of two user interface components: a list of subreddits (labeled navigation) and a list of top stories. For this tutorial, start by building the subbredit navigation sidebar.

## Displaying a Simple Repeating List

The list of subreddits is, strictly speaking, a group of repeating elements that is declared in your component's HTML file (AKA template). To display this list, you need to edit your template's markup and declaration:

1. To your template's markup, add the following two elements:
    * An unordered list element. 
    * A single list item.

    ```html
    <ul data-montage-id="items">
        <li data-montage-id="item"></li>
    </ul>
    ```

2. In your template's declaration, add two objects and then map them to the DOM elements in your template's markup. In this example:
    * `rep` uses the Repetition component and maps to the `ul` element; the component's `content` property is used to populate the repetition with a series of values.
    * `item` uses a Text component and maps to the `li` element; its `content` property declares the value of each item listed in the repetition.

    ```json
    {
        "owner": {
            "properties": {
                "element": {"#": "component"}
            }
        },
        "rep": {
            "prototype": "montage/ui/repetition.reel",
            "properties": {
                "element": { "#": "items" },
                "content": [ 1, 2, 3, 4, 5 ]
            }
        },
        "item": {
            "prototype": "montage/ui/text.reel",
            "properties": {
                "element": { "#": "item" },
                "value": "I am a list item."
            }
        }
    }
    ```

At this point, the application displays a bulleted list of five items with the same text value: `I am a list item`. The `li` element that is nested within the repetition repeats once for every item in the repetition's content array. (Imagine the repetition as a `for` loop: every component inside of the repetition spawns a separate instance for each iteration of the loop.)

### Binding a List Item to the Current Iteration

Next, modify the `item` object so that each list item element displays the actual value of the underlying array item. The Repetition component has a special property called `objectAtCurrentIteration` that is used to access the value from the array. To make each item in the list display its number, bind the value of the `item` object to the `rep`'s `objectAtCurrentIteration` property.

>**Note:** MontageJS uses <a href="https://github.com/montagejs/frb/blob/master/README.md" target="_blank">functional reactive bindings</a> (FRB) to help keep user interface and model data in sync. FRB is a declarative language for binding properties and querying collections, to keep them in sync incrementally. 

```json
"item": {
    "prototype": "montage/ui/text.reel",
    "properties": {
        "element": { "#": "item" },
    },
    "bindings": {
        "value": {"<-": "@rep.objectAtCurrentIteration"}
    }
}
```

In this example, the repetition is populated with a static array of numbers. In practice, you will want to use the binding system to connect a repetition to an application's data model&#8212;typically a data structure that is exposed as a property of your component.

Note that the content array also can contain complex objects, not just simple values like the numbers used in the previous example. The objects nested inside the repetition can bind to the properties of the objects within the array. Any modification made to the underlying data in the array is automatically reflected in the application's user interface.

### Binding a Repetition to a Component Property

To bind a repetition to a component property, you need to add some JavaScript code to your component's JS file. This example uses a property called `subs`, which exposes an array of objects that represent subreddits. Each object in the array has two properties: `display_name` and `url`.

* `display_name` is the text that will show in the application's list of subreddits, AKA navigation sidebar.
* `url` contains the path for the individual subreddit:

```javascript
var Component = require("montage/ui/component").Component;

exports.Owner = Component.specialize({
    subs: {
        value: [
            { display_name: "HTML", url: "/r/html5" },
            { display_name: "Programming", url: "/r/programming" },
            { display_name: "Coding", url: "/r/coding" },
            { display_name: "Comp Sci", url: "/r/compsci" },
            { display_name: "Web Dev", url: "/r/webdev" },
            { display_name: "Startups", url: "/r/startups" }
        ]
      }
});
```

Next, you need to update the `bindings` properties in your template's declaration:

* Replace the static value of the `rep` object's `content` property with a binding that pulls in the owner's `subs` property. 
* Edit the `item` object's `value` binding so that it attaches to the `display_name` property of the current iteration object.

```json
"rep": {
    "prototype": "montage/ui/repetition.reel",
    "properties": {
        "element": {"#": "items"}
    },
    "bindings": {
        "content": {"<-": "@owner.subs"}
    }
},
"item": {
    "prototype": "montage/ui/text.reel",
    "properties": {
        "element": {"#": "item"}
    },
    "bindings": {
        "value": {"<-": "@rep.objectAtCurrentIteration.display_name"}
    }
}
```

At this point, the application displays a bulleted list that shows the name of the specified subreddits.

<a href="http://montagejs.github.io/mfiddle/#!/7745939" target="_blank">View source on MFiddle</a>

## Selecting Items in a Repeating Group of Elements

The Repetition component has built-in support for item selection. With this feature enabled, users can click an item in the repetition to mark it as selected. The component has a selection property (`isSelectionEnabled`) that can be used to access the current selection, either programmatically or through bindings. The component will also automatically apply the `selected` CSS class to the selected items, which makes it easy to customize how they are presented.

### Setting the isSelectionEnabled Property

When the selection property is enabled, the default behavior is single selection, meaning only one item can be selected at a time. The component will automatically clear the previous selection when setting a new one. To support item selection, update the `rep` object's properties:

1. In the template's declartion, set the value of the `isSelectionEnabled` property to `true`:

    ```json
    "rep": {
        "prototype": "montage/ui/repetition.reel",
        "properties": {
            "element": {"#": "items"},
            "isSelectionEnabled": true
        },
        "bindings": {
            "content": {"<-": "@owner.subs"}
        }
    }
    ```

2. Add a simple CSS rule to highlight the selected item:

    ```css
    .selected { color: red; }
    ```

At this point, clicking an item in the bulleted list selects the item. When selected, the item turns red.

### Displaying the Name of Selected Items

Next, add a text header that uses bindings to show the name of the selected item. (This header will be displayed above the list of top stories in the final application.)

1. To your template's markup, add an `h1` element:

    ```html
    <div data-montage-id="component">
        <h1 data-montage-id="currentsub"></h1>
        
        <ul data-montage-id="items">
            <li data-montage-id="item"></li>
        </ul>
    </div>
    ```

2. In your template's declaration, add a new object called `currentsub` and attach it to the `h1` element. The object's `value` property is bound to the selected object's `display_name` property:

    ```json
    "currentsub": {
        "prototype": "montage/ui/text.reel",
        "properties": {
            "element": {"#": "currentsub"}
        },
        "bindings": {
            "value": {"<-": "@rep.selection.0.display_name ?? 'Please Select a Sub'"}
        }
    }
    ```

Note the use of `0` and `??` in the object's `value` bindings expression. 

* The Repetition component is designed to support scenarios in which users can select multiple items at once (even though this example only uses single selection). To handle these use cases, the selection property returns an array.  `0` tells the binding system to use the first item in the array, which is the selected object. (Unlike JavaScript, the FRB syntax doesn't require brackets when accessing an array index. FRB )

    >**Note:** Using an array index to access the first item will only work when the data structure is an array. You could use the FRB `one()` function instead to access the first item in a generic way.

* The `??` operator is used to determine whether to use the value before or after the operator, based on whether the value on the left is defined. If defined, the value before the `??` operator will be used. If null or undefined, the value after the operator will be used.
    
In this example, if no selection has been made yet, the `??` operator causes the `h1` element to prompt users when no list item is selected. Once a selection has been made, the `h1` element will display the value of the selected item.

<a href="http://montagejs.github.io/mfiddle/#!/7746328" target="_blank">View source on MFiddle</a>

## Populating the Application with Live Data

So far, you have learned how to use the Repetition component to display a list of static data. What you really want, though, is to populate the list with live data from the reddit API. The reddit API optionally provides JSONP output, which makes it easy to pull in data and display it in web applications.

### Passing Data to the Application

To pass data from the reddit server into the application, follow these steps:

1. In your component's JS file, remove the dummy data so that the value of the `subs` property starts out as an empty array (`subs: { value: [] }`).
2. Add a `templateDidLoad` method. This method executes automatically when the framework has finished loading the component, so it's the ideal place to populate the list with data.

    Using the `templateDidLoad` method, the application obtains a list of popular subreddits from the reddit server. The JSON data is passed into the callback function, which extracts the list and assigns it to the `subs` property. The binding system observes the change and propagates the data into the repetition.

    ```javascript
    var Component = require("montage/ui/component").Component;
    
    exports.Owner = Component.specialize({
        templateDidLoad: {
            value: function() {
                var script = document.createElement("script");
                script.src = "http://www.reddit.com/reddits.json?jsonp=subfn";
    
                var component = this;
                window["subfn"] = function(jsonData) {
                    component.subs = jsonData.data.children;
                };
                
                document.head.appendChild(script);
            }
        },
        
        subs: { value: [] }
    });
    ```

In this example, raw JSON data is passed from a remote API directly into the application. The binding system ensures that the desired values from the JSON data are displayed in the application, and that the application is updated when the data changes. If the application were to poll the API repeatedly, assigning the returned list to the `subs` property each time, the binding system would automatically propagate any changes that appear in the data.

### Consuming Live Data

Unlike many other JavaScript MVC frameworks, MontageJS doesn't require developers to peel apart the data and wrap values with special functions in order to make them observable; instead it operates directly on conventional JavaScript data structures. Naturally, the data that is consumed from the API looks a bit different from the dummy data used earlier. Each item in the list returned by the reddit API looks a bit like this:

```json
{
    "kind": "t5",
    "data": {
        "id": "2qh33",
        "submit_text": "",
        "display_name": "funny",
        "header_img": "http://f.thumbs.redditmedia.com/CzqvfNUiQGzmMIOw.png",
        "description_html": "...",
        "title": "funny",
        "header_title": "Brought to you by Team Coco",
        "description": "...",
        "header_size": [ 160, 64 ],
        "subscribers": 4842178,
        "name": "t5_2qh33",
        "created": 1201246556,
        "url": "/r/funny/",
        "created_utc": 1201242956,
        "subreddit_type": "public",
        "submission_type": "any"
    }
}
```

In the JSON emitted by the reddit API, each item in the list of subreddits is wrapped inside of a `data` property. For this data to show in the application, you have to update the value of the `bindings` properties of the `item` and `currentsub` objects in your template's declaration:

* For `item`, change the binding expression `@rep.objectAtCurrentIteration.display_name` to `"@rep.objectAtCurrentIteration.data.display_name"`
* For `currentsub`, change `"@rep.selection.0.display_name ?? 'Please Select a Sub'"` to `"@rep.selection.0.data.display_name ?? 'Please Select a Sub'"`

Your template's declaration now looks like this:

```json
{
    "owner": {
        "properties": {
            "element": {"#": "component"}
        }
    },
    "rep": {
        "prototype": "montage/ui/repetition.reel",
        "properties": {
            "element": {"#": "items"},
            "isSelectionEnabled": true
        },
        "bindings": {
            "content": {"<-": "@owner.subs"}
        }
    },
    "item": {
        "prototype": "montage/ui/text.reel",
        "properties": {
            "element": {"#": "item"}
        },
        "bindings": {
            "value": {"<-": "@rep.objectAtCurrentIteration.data.display_name"}
        }
    },
    "currentsub": {
        "prototype": "montage/ui/text.reel",
        "properties": {
            "element": {"#": "currentsub"}
        },
        "bindings": {
            "value": {"<-": "@rep.selection.0.data.display_name ?? 'Please Select a Sub'"}
        }
    }
}
```

At this point, the application displays a list of actual subreddits.

### Sorting a List

To make things a little more interesting, try sorting the list of subreddits so that they are listed in descending order by the number of subscribers. 

The data returned by the reddit API includes a `subscriber` property for each subreddit that can be used as a sorting key. FRB provides a convenient `sorted` method that allows you to order the sequence using a specific property:

```json
"rep": {
    "prototype": "montage/ui/repetition.reel",
    "properties": {
        "element": {"#": "items"},
        "isSelectionEnabled": true
    },
    "bindings": {
        "content": {"<-": "@owner.subs.sorted{-data.subscribers}"}
    }
},
```

The `-` operator, which appears in front of the property name in the binding expression, tells FRB that the sequence should be sorted in reverse order: from highest to lowest. The `-` operator works as expected in this case, because the values are simple numbers. You could also use FRB's `reversed` method instead. FRB makes it easy to manipulate bound values in interesting ways. If more objects were added to the `subs` array or the value of a subreddit object's `subscribers` property was programmatically altered, the binding system would automatically update the sort order to reflect the changes.

<a href="http://montagejs.github.io/mfiddle/#!/7747359" target="_blank">View source on MFiddle</a>

# Displaying the Top Stories

Now that the navigation is finished, it's time to add support for displaying the actual posts from selected subreddits. 
To obtain and display the reddit posts you use the same approach you used for the subreddit list: grab some JSON data from the reddit API and put it into a repetition.

1. Start by adding the necessary markup to your component's template. 

    For this example, the application will display the reddit stories in a table with two columns: the first column displays a post's current score; the second column shows the title and author.

    ```html
    <div data-montage-id="component">
        <h1 data-montage-id="currentsub"></h1>
        
        <ul data-montage-id="items">
            <li data-montage-id="item"></li>
        </ul>
        
        <table data-montage-id="stories">
            <tr>
                <td data-montage-id="score"></td>
                <td>
                    <p><a data-montage-id="title"></a></p>
                    <p>Posted by <span data-montage-id="author"></span></p>
                </td>
            </tr>
        </table>
    </div>
    ```
    * The `table` element is where the application attaches the repetition that contains the stories.
    * The `tr` element, including its contents, will repeat for each iteration in the repetition.
    * The `score` and `author` elements inside of the table are both attached to Text components. 
    * The `title` element, which is inside an `a` tag, is handled by an Anchor component.

2. Update the template's declaration with four new objects: `stories`, `title`, `author`, and `score`.

    ```json
    "stories": {
        "prototype": "montage/ui/repetition.reel",
        "properties": {
            "element": { "#": "stories" }
        },
        "bindings": {
            "content": { "<-": "@owner.stories" }
        }
    },
    "title": {
        "prototype": "matte/ui/anchor.reel",
        "properties": {
            "element": { "#": "title" }
        },
        "bindings": {
            "textContent": { "<-": "@stories.objectAtCurrentIteration.data.title" },
            "href": { "<-": "@stories.objectAtCurrentIteration.data.url" }
        }
    },
    "author": {
        "prototype": "montage/ui/text.reel",
        "properties": {
            "element": { "#": "author" }
        },
        "bindings": {
            "value": { "<-": "@stories.objectAtCurrentIteration.data.author" }
        }
    },
    "score": {
        "prototype": "montage/ui/text.reel",
        "properties": {
            "element": { "#": "score" }
        },
        "bindings": {
            "value": { "<-": "@stories.objectAtCurrentIteration.data.score" }
        }
    }
    ```

    The application needs to repopulate the list of stories every time a different subreddit is selected. The best way to accomplish that is by adding a change listener, a mechansim that automatically calls a function every time the value of a specified property is updated. 
    
3. In the component's JS file, at the beginning of the `templateDidLoad` function, add a line that configures a change listener for the navigation selection:

    ```javascript
    this.addPathChangeListener("templateObjects.rep.selection.0.data",
                               this, "handleSelection");
    ```

4. Next, create a new function called `handleSelection`. This function is responsible for loading the new stories and putting them into the `stories` property:

    ```javascript
    handleSelection: {
        value: function(selected) {
            if (selected) {
                var script = document.createElement("script");
                script.src = "http://www.reddit.com/" + selected.url + ".json?sort=top&t=month&jsonp=storyfn";
    
                var component = this;
                window["storyfn"] = function(jsonData) {
                    component.stories = jsonData.data.children;
                };
            
                document.head.appendChild(script);
            }
        }
    },
        
    stories: { value: [] }
    ```

    Note that the code used in the `handleSelection` function is similar to the code used to populate the subreddit list. It calls an API on the reddit servers and assigns data from the returned JSON to a `stories` property on the component. Note also that the `stories` property starts out as an empty array, like the `subs` property in the subreddit code.

At this point, the functional part of the application is complete. When users click a subreddit, the selected category is passed to the `handleSelection` function, which then loads the stories from that subreddit and puts them in the component's `stories` property. When the stories are placed in the `stories` property, the bound repetition will automatically display the stories in the page.

<a href="http://montagejs.github.io/mfiddle/#!/7881445" target="_blank">View source on MFiddle</a>

# Styling the Application

MontageJS components are built from standard HTML markup, which means that developers can use the power of CSS to prettify applications. This example uses light text on a dark backround, with a light font weight and purple highlighting for the list item selection.

First, add some `class` attributes to your markup. A few minor structural changes, such as moving the score text into a paragraph tag, might help as well. The following snippet shows the final markup:

```html
<div data-montage-id="component">
    <h1 data-montage-id="currentsub"></h1>
    
    <div class="navigation">
        <div class="header">Navigation</div>
        <ul data-montage-id="items">
            <li data-montage-id="item"></li>
        </ul>
    </div>
    
    <table data-montage-id="stories">
        <tbody><tr>
            <td>
                <p class="score" data-montage-id="score"></p>
            </td>
            <td>
                <p class="title"><a data-montage-id="title"></a></p>
                <p class="author">Posted by <span data-montage-id="author"></span></p>
            </td>
        </tr></tbody>
    </table>
</div>
```

After modifying your markup, you specify the CSS rules in your component's CSS file. For the sake of brevity, you can inspect the application's stylesheet on <a href="https://gist.github.com/anonymous/7766077#file-component-css" target="_blank">GitHub</a>.

<a href="http://montagejs.github.io/mfiddle/#!/7881457" target="_blank">View source on MFiddle</a>

## Next Steps

The flexible component architecture and powerful MontageJS binding system reduce the amount of code that you need to write when building applications. You can use simple, declarative bindings to define relatively complex behaviors.

For more information about the reddit client and developing applications with MontageJS, refer to the following resources:

* <a href="https://github.com/segphault/mjs-reddit-viewer" target="_blank">Source code of the reddit client application</a>
* [MontageJS Documentation](http://montagejs.org/docs/)
* <a href="http://seg.phault.net/montage/cookbook/" target="_blank">MontageJS Cookbook</a>
* [Getting Started with MontageJS](http://montagejs.org/docs/montagejs-setup.html) steps you through the process of setting up your MontageJS development environment. 
