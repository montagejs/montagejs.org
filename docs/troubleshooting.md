---

layout: docs
title: Troubleshooting

prev-page: faq
this-page: troubleshooting

---

# Troubleshooting


**My MontageJS application does not appear as expected in the browser.**

If you test a MontageJS application in the browser and don't see what you expect, open the JavaScript console to look for any errors or warnings. Most modern web browsers include a JavaScript debugger, console, and related tools that can help debug problems with MontageJS applications. These tools are built into the latest versions of Chrome and Safari. You use the browser's `console.log()` method to send output to the console.

* To open the console in Chrome, select View > Developer > JavaScript console.
* To open the console in Safari, first enable the Develop menu (Safari Preferences > Advanced > Show Develop menu in menu bar), then select Develop > Show Error Console.


**I get a "Warning: Element xxx not found in template" message when I try to run my MontageJS application.**

Invalid element references are usually the result of mismatched element IDs. For example, in the following abbreviated code, the ID of the <div> element referenced in the serialization (`"loginButton"`) does not match the element's actual ID (`"loginBtn"`).

```html
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

**I get an "Object "xxx" not found at "yyy"" error message.**

If you provide an invalid value for a serialized object's `"name"` property, MontageJS will generate an error. For example, the following serialization will generate this error, since the symbol name is misspelled `"Buttonn"` instead of `"Button"`.

```json
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
Object "Buttonn" not found at "montage/ui/button.reel" referenced from http://localhost:8081/examples/buttonerror/.
```

**I get a "Can't XHR "http://localhost: ..."" error message.**

If you provide an invalid module ID in a serialization, then the console will report a 404 error "Can't XHR _module-id_". For example, in the following serialization that defines a Textfield component, the module ID is misspelled as "montage/ui/textfld.reel".

```json
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
Can't XHR "http://localhost:8081/ui/textfield.reel/textfield.js"
```


**I get an "unexpected comma" error.**

Trailing "serial" commas are a common JSON formatting concern. The JSON serialization block must be well-formed for MontageJS to parse it successfully. A trailing comma after the last property in a JSON object or array generates runtime errors. In the following example, the comma that trails the `readyState` property would generate a parsing error:

```
"anObject": {
    "id": "123asd",
    "colors": ["red", "green", "blue"],
    "readystate": false,
}
```

Likewise, in the following MontageJS serialization block, the trailing comma after the `"passwordInput"` JSON object would generate an "unexpected comma" error at runtime. 

```json
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

```console
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
