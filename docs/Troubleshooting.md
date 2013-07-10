---
layout: docs
title: Troubleshooting
---

# Troubleshooting

If your Montage application isn’t working as expected, you can use the JavaScript console available in modern web browsers to help diagnose the problem.

## JavaScript console
If you test a Montage application in the browser and don’t see what you expect, open the JavaScript console to look any for errors or warnings. Most modern web browsers include a JavaScript debugger, console, and related tools that can help debug problems with Montage applications. These tools are built-in to the latest versions of Chrome and Safari. You use the browser’s `console.log()` method to send output to the console.

* To open the console in Chrome, select View > Developer > JavaScript console.
* To open the console in Safari, first enable the Develop menu (Safari Preferences > Advanced > Show Develop menu in menu bar), then select Develop > Show Error Console.

## Serialization errors
One class of error you may encounter are those that occur during the deserialization process. During this process Montage parses the serialization block and attempts to resolve references to serialized objects and components, as well as to HTML elements in the HTML document.

### Invalid element reference
In the following abbreviated code, the ID of the <div> element referenced in the serialization (`"loginButton"`) does not match the element’s actual ID (`"loginBtn"`).

```
<script type="text/montage-serialization">
{
    "loginButton": {
        "name": "Button",
        "module": "montage/ui/button.reel",
        "properties": {
            "element": {"#": "loginButton"}
        }
    }
}
</script>
<body>
   <div id="loginBtn"/>
</body>
```

At runtime, this would generate the following error message in the JavaScript console:
```
Warning: Element "#loginButton" not found in template
http://localhost:8081/examples/myapp/mycomponent.reel/mycomponent.html
```

### Invalid module ID or symbol name
If you provide an invalid value for a serialized object’s “name” property, Montage will generate an error. For example, the following serialization will generate this error, since the symbol name is misspelled “Buttonn” instead of “Button”.
```
<script type="text/montage-serialization">
{
    "loginButton": {
        "name": "Buttonn",
        "module": "montage/ui/button.reel",
        "properties": {
            "element": {"#": "loginButton"}
        }
    }
}
</script>
```

This would result in the following runtime error:
```
Object “Buttonn” not found at “montage/ui/button.reel” referenced from
http://localhost:8081/examples/buttonerror/.
```

If you provide an invalid module ID in a serialization, then the console will report a 404 error “Can’t XHR _module-id_“. For example, consider the following serialization that defines a Textfield component but the module ID is misspelled as “montage/ui/textfld.reel”.
```
{
"emailInput": {
    "name": "Textfield",
    "module": "montage/ui/textfld.reel",
    "properties": {
        "element": {"#": "email"}
    }
},
```

In Chrome, this results in the following error:
```
GET http://localhost:8081/ui/textfeld.reel/textfld.js 404 (Not Found) browser.js:136
Can’t XHR “http://localhost:8081/ui/textfeld.reel/textfeld.js”
```

## JSON formatting errors
The JSON serialization block must be well-formed for Montage to successfully parse it. Montage uses JSLint to At runtime, any JSON formatting errors are reported in the JavaScript console.

### Serial commas
A common JSON formatting problem are “serial” commas. In valid JSON, commas are used to separate name/value pairs; a comma that follows the last (or serial) name/value pair of an object invalidates the JSON. For example, in the JSON snippet below the comma after the last name/value pair is invalid and would generate a JSON parsing errors.

```
{
   "name": "Tim",
   "name": "Jen",
   "name": "Frank",
}
```

As another example, in the Montage serialization block below notice the comma after the “passwordInput” JSON object. At runtime, this would generate an “Unexpected comma” error as the object is the last one in the serialization.

```
<script type="text/montage-serialization">
{
    "emailInput": {
        "name": "Textfield",
        "module": "montage/ui/textfield.reel",
        "properties": {
            "element": {"#": "email"}
        }
    },
    "passwordInput": {
        "name": "Textfield",
        "module": "montage/ui/textfield.reel",
        "properties": {
            "element": {"#": "password"}
        }
    },
}
</script>
```

```
Syntax error at line 16 from http://localhost:8081/examples/errors/:
    },
Unexpected comma.
    1 
    2 {
    3     "emailInput": {
    4         "name": "Textfield",
    5         "module": "montage/ui/textfield.reel",
    6         "properties": {
    7             "element": {"#": "email"}
    8         }
    9     },
   10     "passwordInput": {
   11         "name": "Textfield",
   12         "module": "montage/ui/textfield.reel",
   13         "properties": {
   14             "element": {"#": "password"}
   15         }
>>>16     },
   17 }
   18
```

Removing the trailing comma on line 16 fixes the error.
