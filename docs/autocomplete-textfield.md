---

layout: docs
title: Autocomplete textfield

---

# Autocomplete textfield

It is becoming increasingly common for apps to offer predictive suggestions as the user types in a text field. One example of this is a search field suggesting results that match the text that the user has already typed.

This capability is coming soon to Montage with the Autocomplete component. This has just landed in Montage master, and will likely be included in the next stable release.

The Autocomplete component extends the Textfield native control, and inherits all its capabilities, such as data binding support for all writable attributes of the `input` element. It adds the capability to define a list of values that will be contextually displayed as suggestions based on the search term. As the user types the search results are updated to reflect the new term.

## Using a Autocomplete component
As with any component, you first need to hook up your HTML element to the required component via the JSON serialization. In the case of Autocomplete, the module can be found at montage/ui/autocomplete/autocomplete.reel.

### Specifying the options
The component has a number of options that can be set using the corresponding properties.

### Setting the response time
There is a default 500ms delay before a suggestion is requested. This can be specified by setting the delay property to an integer value. The following will set a delay of 300ms:
```json
"delay": "300"
```

### Number of characters before searching
By default a suggestion is not requested until two characters are entered by the user. This can be set using the minLength property. The following example sets it to 4 characters:
```json
"minLength": "4"
```

### Search term delimiter
Individual search terms are separated by the comma character ,. When the user types a comma, the autocomplete will reset and will start matching the next term. The delimiter can be specified using the `separator` property. The following sample sets it to a space instead:
```json
"separator": " "
```

### Hooking up to a data source
To auto-suggest values a data source is needed. To supply a data source you must point to a Delegate object using the delegate property in your JSON serialization:
```json
"delegate": {"@": "owner"}
```

The `Delegate` object is a Montage object that implements a method that returns the auto-complete suggestion(s). The method name is `ShouldGetSuggestions`, prefixed by the `identifier` of the Autocomplete component (which defaults to the label of the JSON object if it is not defined).

This is probably easier understood with an example. Suppose we have an autocomplete component with the label of `foo`, as defined below:
```json
"foo": {
    "prototype": "montage/ui/autocomplete/autocomplete.reel",
    "properties": {
        "element": {"#": "component"},
        "delay": "300",
        "delegate": {"@": "owner"}
    },
    "bindings": {
        "value": {"<->": "@montageComponents"}
    }
},
"owner": {
    "prototype": "montage-components",
    "properties": {
    "element": {"#": "autocomplete-example"}
}
```

The method name used for returning the autocomplete data would be called `fooShouldGetSuggestions`. In the above example we would define this method in the montage-components.js file (pointed to by the prototype of the owner object, which is hooked up to foo’s `delegate` property).

If the foo object had a `identifier` property with a value of bar, the method name would become `barShouldGetSuggestions`.

### Implementing the *ShouldGetSuggestions method
This method requires two parameters. The `autocomplete` parameter is the autocomplete component instance that is requesting the suggestion data. The second parameter, `searchTerm` is the term that the user has entered into the autocomplete textfield.

It is up to you as the developer as to how you get the suggestions. This could be from an XHR or JSONP call, a predefined list in memory, or so on. What matters is that once you get the results that match the search term, you need to set the `suggestions` property of the autocomplete instance to point it to the return results. These results will then be displayed as a drop down list for the user to select the desired result.

The following is an example with the logic for getting the results omitted:
```js
fooShouldGetSuggestions: {
    value: function(autocomplete, searchTerm) {
        // do some processing such as fetching data via XHR
        autocomplete.suggestions =  result;
    }
}
```

## A quick autocomplete example
I’ve created a quick example based off the one in the Kitchen Sink. You can start typing the name of a Montage component, and it will return any component names that match after you have typed two or more characters.

The serialization code is the same as in the above example, except the label is `montageComponents` rather than `foo`. The HTML that is required is just a simple form with a label and a text field:
```html
<form>
     <label for="component">Montage component:</label>
     <input id="montageComponents" data-montage-id="montageComponents" type="text" placeholder="Component name" />
</form>
```

All the JavasScript that is required can be found in the montage-components.js file, pointed to by the `owner` object.

Behind the scenes the components are stored in an array with a key of `name`. The `montageComponentsShouldGetSuggestions` method checks to see if there are any cached results matching the search term. If so the cached result is returned, otherwise it filters the array to find and return the result, and caches the result so that the search doesn’t have to be performed again for the same search term. Finally, the `suggestions` property of the passed autocomplete object is set to the result so that it can be displayed to the user.

You can also check out the KitchenSink for [additional examples](http://montagejs.github.com/montage/samples/sink/#autocomplete), such as fetching data from an external source via XHR.
