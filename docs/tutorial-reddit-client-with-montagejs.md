---

layout: docs
title: Reddit Client with MontageJS - MontageJS Tutorial

this-page: tutorial-reddit-client-with-montagejs

---

# Build a Simple Reddit Client with MontageJS

Many data-driven web applications need to display sequences of objects, often with specialized presentation. Consider some common examples: an employee directory that shows a list of names and phone numbers, a photo gallery that shows image thumbnails with captions, or a group chat interface that shows a list of messages accompanied by senders and time stamps. The manner in which the information is presented differs in each of those cases, but they all represent the same underlying pattern.

In MontageJS applications, lists of items can be displayed with the built-in Repetition component. A repetition instructs the application to repeat a bit of HTML markup once for each item in the provided sequence. The Repetition component is one of the most important building blocks in MontageJS development, serving a similar purpose to the loop expressions found in conventional template languages.

This tutorial demonstrates how to build a very simple reddit client using the Repetition component. The client application includes a navigation sidebar, which uses a repetition to display a list of popular subreddits. When the user clicks an item in the list, the application uses the reddit API to obtain the top stories from the selected subreddit. The application uses a second repetition to display the list of stories, presenting each one with its title, score, and submitter.

<figure>
	<img src="/images/docs/tutorials/reddit-client/fig01.png" alt="The final application.">
	<figcaption><strong>Figure 1.</strong> The final reddit client on MontageJS.</figcaption>
</figure>

<a href="http://montagejs.github.io/mfiddle/preview/#!/7881457" target="_blank">View the demo</a>

You can use <a href="http://montagejs.github.io/mfiddle/" target="_blank">MFiddle</a>, the online MontageJS component editor, to follow along. At the end of each major section, there is a link to a saved MFiddle that includes the code so far.

This tutorial assumes a basic familiarity with the principles of MontageJS development. If you are completely new to the framework and would like to start from the beginning, you might want to check out the [Getting Started](http://montagejs.org/docs/montagejs-setup.html) guide.

## Display a Simple Repetition

Start by creating a repetition that displays a bulleted list of items. In the HTML markup, add an unordered list element to present the repetition. Inside of the unordered list, create a single list item element, which will automatically repeat for every value in the repetition.

```html
<ul data-montage-id="items">
    <li data-montage-id="item"></li>
</ul>
```
 
In the binding definition, connect the unordered list to a Repetition component named `rep`. The component's `content` property is used to populate the repetition with a series of values. Finally, create a simple Text component to attach to the `li` element.

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
            "value": "I am a list item"
        }
    }
}
```

In its current state, the application will display a bulleted list of five items&#8212;all with the same text. The `li` element that is nested within the repetition repeats once for each item in the repetition's content array. Imagine the repetition as a `for` loop: every component inside of the repetition spawns a separate instance for each iteration of the loop.

## Bind to the Current Iteration

The next step is modifying the text component so that each `li` element displays the actual value of the underlying array item. Each instance of the text component should display the value associated with its respective iteration. The repetition component has a special property called `objectAtCurrentIteration` that is used to access the value from the array.

To make each item in the list display its number, simply bind the value of the text component to the `objectAtCurrentIteration` property of the repetition:

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

In this example, the repetition is populated with a static array of numbers. In practice, a developer will generally want to use the binding system to connect a repetition to the application data model&#8212;typically a data structure that is exposed as a property of your component.

It's also worth noting that the content array can contain complex objects, not just simple values like the numbers used in the previous example. The components nested inside the repetition can bind to the properties of the objects within the array. Thanks to the power of FRB, any modification made to the underlying data in the array is automatically reflected in the application's user interface.

## Bind a Repetition to a Component Property

Next, add some JavaScript code to the component, introducing a property called `sub` that exposes an array of objects that represent subreddits. The objects in the array each have two properties: `display_name` and `url`. The display name is the text that will show in the navigation sidebar. The url property contains the path for the individual subreddit:

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

The next step is updating the bindings accordingly. First, replace the static value of the Repetition component's `content` property with a binding that pulls in the owner's `subs` property. Next, change the text component's `value` binding so that it attaches to the `display_name` property of the current iteration object:

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

After making those changes, the application will have a bulleted list that shows the display name of each subreddit.

<a href="http://montagejs.github.io/mfiddle/#!/7745939" target="_blank">View source on MFiddle</a>

## Allow Users to Select a Repetition Item

One of the repetition component's most useful capabilities is built-in support for item selection. When the feature is enabled, the user can click an item in the repetition to mark it as selected. The repetition has a `selection` property that can be used to access the current selection&#8212;either programmatically or through bindings. The component will also automatically apply the `selected` CSS class to the selected items, which makes it easy to customize how they are presented.

When selection is enabled, the default behavior is single selection&#8212;where only one item can be selected at a time. The component will automatically clear the previous selection when setting a new one. To make the repetition support selection, update the binding definition to set the value of the repetition's `isSelectionEnabled` property to `true`:

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

Add a little bit of simple CSS to highlight the selected item:

```css
.selected { color: red; }
```

After making those changes, the user should be able to click one of the items in the bulleted list to select it. When selected, the item will turn red. Just for fun, add a text header that uses bindings to show the name of the selected item. Start by adding an `h1` element to the HTML:

```html
<div data-montage-id="component">
    <h1 data-montage-id="currentsub"></h1>
    
    <ul data-montage-id="items">
        <li data-montage-id="item"></li>
    </ul>
</div>
```

Next, add a text component to the binding definition and attach it to the `h1` element. The new text component's `value` property is bound to the selected object's `display_name` property:

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

There are a few pieces of unusual syntax in the value binding above. Although the application is only using single selection, the repetition component's selection system is designed to support scenarios where the user can select multiple items at once. To handle those use cases, the selection property returns an array.

The `0` in the binding expression tells the binding system to use the first item in the array, which is the selected object. Unlike JavaScript, the FRB syntax doesn't require brackets when accessing an array index. It's worth noting that using an array index to access the first item will only work when the data structure is an array. You could use the FRB `one()` function instead to access the first item in a generic way.

The other interesting bit of syntax in the code above is the `??` operator. When the expression is evaluated, the value on the left-hand side of the operator will be used if it is defined. If the left-hand value is null or undefined, the expression will evaluate to the value on the right-hand side. In the `value` binding, the `??` operator is used to make the `h1` element prompt the user when no list item is selected.

<a href="http://montagejs.github.io/mfiddle/#!/7746328" target="_blank">View source on MFiddle</a>

## Populate the Repetition with Data from Reddit

The example has used static data up to this point, but now it is time to populate the repetition with real data from reddit's API. The reddit API optionally provides JSONP output, which makes it easy to pull in data and display it in web applications.

Start by removing the dummy data from the component, making the value of the `subs` property start out as an empty array. Next, add a `templateDidLoad` method to the component. The `templateDidLoad` method will execute automatically when the framework has finished loading the component, so it's the ideal place to populate the list with data.

In the `templateDidLoad` method, the application will obtain a list of popular subreddits from the reddit server. The JSON data is passed into the callback function, which extracts the list and assigns it to the `subs` property. The binding system will observe the change and propagate the data into the repetition.

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

It's important to understand that the code above passes raw JSON data from a remote API directly into the program. The binding system ensures that the desired values from the JSON data are displayed in the application&#8212;and that the application is updated when the data changes. If the application were to poll the API repeatedly, assigning the returned list to the `subs` property each time, the binding system would automatically propagate any changes that appear in the data.

Unlike many other JavaScript MVC frameworks, MontageJS doesn't require developers to peel apart the data and wrap values with special functions in order to make them observable&#8212;it operates directly on conventional JavaScript data structures. Of course, the data that is consumed from the API looks a little bit different from the dummy data used in previous examples. Each item in the list returned by the reddit API looks a bit like this:

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

In the JSON emitted by the reddit API, each item in the list of subreddits is wrapped inside of a `data` property. The bindings have to be updated accordingly:

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

At this point, the application will show a selectable list of actual subreddits. To make things a little more interesting, try sorting the list of subreddits so that they are ordered by the number of subscribers. The data returned by the reddit API includes a `subscriber` property for each subreddit, which can be used as a sorting key. FRB provides a convenient `sorted` method that allows us to order the sequence using a specific property:

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

The `-` operator, which appears in front of the property name in the binding expression, tells FRB that the sequence should be sorted in reverse&#8212;from highest to lowest. The `-` operator will work as expected in this case, because the values are simple numbers. You could also use FRB's `reversed` method instead. FRB makes it easy to manipulate bound values in all kinds of interesting ways. If more objects were added to the `subs` array or the value of a subreddit object's `subscribers` property was programmatically altered, the binding system would automatically update the sort order to correspond with the changes.

<a href="http://montagejs.github.io/mfiddle/#!/7747359" target="_blank">View source on MFiddle</a>

## Display Content from the Selected Subreddit

Now that the application has a navigation interface, it's time to add support for displaying the actual posts from the selected subreddit. The application will obtain and display the reddit posts using much the same approach used for the subreddit list: grab some JSON data from the reddit API and put it into a repetition.

Start by adding the necessary markup to the HTML template. The application will display the reddit stories in a table with two columns. The first column will show the post's current score, while the second column shows the title and author. The following is the component's updated HTML:

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

The `table` element is where the application attaches the repetition that contains the stories. Note that a complex hierarchy of nested tags is used within the repetition this time. The `tr` element, including its contents, will repeat for each iteration in the repetition. The score and author elements inside of the table are both attached to text components. The title, which is presented in an `a` tag, is handled by an anchor component. Add the following bindings to wire up those elements:

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

The application needs to repopulate the list of stories every time the user selects a different subreddit. The best way to accomplish that is with a change listener, a mechansim that automatically calls a function every time the value of a specified property is updated. At the beginning of the `templateDidLoad` function, add a line that configures a change listener for the navigation selection:

```javascript
this.addPathChangeListener("templateObjects.rep.selection.0.data",
                           this, "handleSelection");
```

The next step is to create the `handleSelection` function, which is responsible for loading the new stories and putting them into the `stories` property: 

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

The code used in the `handleSelection` function is very similar to the code that was used to populate the subreddit list. It calls an API on the reddit servers and assigns data from the returned JSON to a `stories` property on the component. Note that the stories property, which starts out as an empty array like the `subs` property, is also added in the code above.

That completes the functional part of the application. When the user clicks on a subreddit in the list, the desired subreddit is passed to the `handleSelection` function, which loads the stories from that subreddit and puts them in the component's `stories` property. When the stories are placed in the `stories` property, the bound repetition will automatically display the stories in the page.

<a href="http://montagejs.github.io/mfiddle/#!/7881445" target="_blank">View source on MFiddle</a>

## Use CSS to Style the Application

MontageJS components are built from standard HTML markup, which means that developers can use the power of CSS to make applications look great. This example uses light text on a dark backround, with a light font weight and purple highlighting for the list item selection. Start by adding a handful of `class` attributes to the HTML in order to accommodate easier styling. A few minor structural changes, like moving the score text into a paragraph tag, might also be helpful.

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

After modifying the HTML, the next step is writing the CSS. For the sake of brevity, the entire stylesheet isn't included here. It is available on <a href="https://gist.github.com/anonymous/7766077#file-component-css" target="_blank">on GitHub</a>.

<a href="http://montagejs.github.io/mfiddle/#!/7881457" target="_blank">View source on MFiddle</a>

## Conclusion

The powerful MontageJS binding system and flexible component architecture reduce the amount of code that developers need to write when building applications. Developers can use simple, declarative bindings to define relatively complex behaviors.

For more information about developing software with MontageJS, you can refer to the [documentation](http://montagejs.org/docs/). [Getting Started with MontageJS](http://montagejs.org/docs/montagejs-setup.html) steps you through the process of setting up your MontageJS development environment. You can also visit the <a href="http://seg.phault.net/montage/cookbook/" target="_blank">MontageJS Cookbook</a> for a handy assortment of concise examples. The full source code of the application featured in this tutorial is <a href="https://github.com/segphault/mjs-reddit-viewer" target="_blank">available on GitHub</a>.
