---

layout: docs
title: Blueprints

prev-page: gestures
next-page: troubleshooting

---

# Blueprints

Montage blueprints are a mechanism to add metadata about application objects. Currently, blueprints are supported for components and controllers. They will serve a leading role in the data layer (not yet available). A blueprint adds information about the object, its properties, and its associations with other objects.

Blueprints are grouped in binders. For components and controllers Montage creates a default blueprint that ensures uniqueness of the blueprints when deserialized. Blueprints are typically deserialized from a JSON file but can be created by code if necessary.

## Component or Controller Blueprints

The most common way to access a blueprint for a component or controller is by accessing the `blueprint` property of the component or controller directly. This returns a promise for the deserialized blueprint.

The blueprint for an object provides a list of property blueprints that describe each of the object's properties. Property blueprints can be logically grouped by functionality for convenience.
The blueprint also provides validation rules to govern optional and required bindings. These validation rules verify that the component or controller is bound correctly.

## Property Blueprints

A property blueprint describes a single property of an object. In addition to the name of a property the blueprint defines the cardinality, value type, and allowed values. The cardinality defines the number of values that can be associated to a property.

## Association Blueprints

An association is a property that defines a relation between two application objects. It defines the target blueprint of the association.

## Validation Rules Objects

TDB

## Creating Blueprints

Although most developers will only interact with pre-existing blueprints deserialized from a file, it is quite easy to create a blueprint in memory:


```javascript
            var companyBinder = BlueprintBinder.create().initWithName("CompanyBinder");

            var personBlueprint = companyBinder.addBlueprintNamed("Person", "meta/blueprint/person");
            personBlueprint.addToOnePropertyBlueprintNamed("name");
            personBlueprint.addToManyPropertyBlueprintNamed("phoneNumbers");

            var companyBlueprint = companyBinder.addBlueprintNamed("Company", "meta/blueprint/company");
            companyBlueprint.addToOnePropertyBlueprintNamed("name");

            companyBlueprint.addToManyAssociationBlueprintNamed("employees", personBlueprint.addToOneAssociationBlueprintNamed("employer"));

            var projectBlueprint = companyBinder.addBlueprintNamed("Project", "meta/blueprint/project");
            projectBlueprint.addToOnePropertyBlueprintNamed("name");
            projectBlueprint.addToOnePropertyBlueprintNamed("startDate");
            projectBlueprint.addToOnePropertyBlueprintNamed("endDate");

            companyBlueprint.addToManyAssociationBlueprintNamed("projects", personBlueprint.addToOneAssociationBlueprintNamed("company"));

            personBlueprint.addToManyAssociationBlueprintNamed("projects", projectBlueprint.addToManyAssociationBlueprintNamed("contributors"));

            BlueprintBinder.manager.addBlueprintBinder(companyBinder);
```

For components we can simplify. If we build the Button blueprint for example we can see how it flows.
```javascript
            var serializer = Serializer.create().initWithRequire(require);

            //Create a new empty blueprint with the button identifier as a name.
            var newBlueprint = Blueprint.create().initWithName(button.identifier);

            // Then creat all the property description we need
            var autofocus = newBlueprint.addToOnePropertyBlueprintNamed("autofocus");
            autofocus.valueType = "string";
            autofocus.helpKey = "Specifies that a button should automatically get focus when the page loads";

            var enabled = newBlueprint.addToOnePropertyBlueprintNamed("enabled");
            enabled.valueType = "boolean";
            enabled.helpKey = "Specifies that a button should be enabled";

            var form = newBlueprint.addToOnePropertyBlueprintNamed("form");
            form.valueType = "string";
            form.helpKey = "Specifies one or more forms the button belongs to";

            var formaction = newBlueprint.addToOnePropertyBlueprintNamed("formaction");
            formaction.valueType = "url";
            formaction.helpKey = "Specifies where to send the form-data when a form is submitted. Only for type='submit'";

            var formenctype = newBlueprint.addToOnePropertyBlueprintNamed("formenctype");
            formenctype.valueType = "enum";
            formenctype.enumValues = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"];
            formenctype.helpKey = "Specifies how form-data should be encoded before sending it to a server. Only for type='submit'";

            var formmethod = newBlueprint.addToOnePropertyBlueprintNamed("formmethod");
            formmethod.valueType = "enum";
            formmethod.enumValues = ["get", "post"];
            formmethod.helpKey = "Specifies how to send the form-data (which HTTP method to use). Only for type='submit'";

            var formnovalidate = newBlueprint.addToOnePropertyBlueprintNamed("formnovalidate");
            formnovalidate.valueType = "boolean";
            formnovalidate.helpKey = "Specifies that the form-data should not be validated on submission. Only for type='submit'";

            var formtarget = newBlueprint.addToOnePropertyBlueprintNamed("formtarget");
            formtarget.valueType = "string";
            formtarget.helpKey = "Specifies where to display the response after submitting the form. Only for type='submit'";

            var name = newBlueprint.addToOnePropertyBlueprintNamed("name");
            name.valueType = "string";
            name.helpKey = "Specifies a name for the button";

            var label = newBlueprint.addToOnePropertyBlueprintNamed("label");
            label.valueType = "string";
            label.helpKey = "";

            var type = newBlueprint.addToOnePropertyBlueprintNamed("type");
            type.valueType = "enum";
            type.enumValues = ["button", "reset", "submit"];
            type.helpKey = "Specifies the type of button";

            var value = newBlueprint.addToOnePropertyBlueprintNamed("value");
            value.valueType = "string";
            value.helpKey = "Specifies an initial value for the button";

            // And assign the property in groups following the logic for user presentation
            newBlueprint.addPropertyBlueprintToGroupNamed(newBlueprint.propertyBlueprintForName("label"), "base");
            newBlueprint.addPropertyBlueprintToGroupNamed(newBlueprint.propertyBlueprintForName("type"), "base");
            newBlueprint.addPropertyBlueprintToGroupNamed(newBlueprint.propertyBlueprintForName("name"), "base");
            newBlueprint.addPropertyBlueprintToGroupNamed(newBlueprint.propertyBlueprintForName("enabled"), "base");
            newBlueprint.addPropertyBlueprintToGroupNamed(newBlueprint.propertyBlueprintForName("autofocus"), "base");
            newBlueprint.addPropertyBlueprintToGroupNamed(newBlueprint.propertyBlueprintForName("form"), "form");
            newBlueprint.addPropertyBlueprintToGroupNamed(newBlueprint.propertyBlueprintForName("formaction"), "form");
            newBlueprint.addPropertyBlueprintToGroupNamed(newBlueprint.propertyBlueprintForName("formenctype"), "form");
            newBlueprint.addPropertyBlueprintToGroupNamed(newBlueprint.propertyBlueprintForName("formmethod"), "form");
            newBlueprint.addPropertyBlueprintToGroupNamed(newBlueprint.propertyBlueprintForName("formnovalidate"), "form");
            newBlueprint.addPropertyBlueprintToGroupNamed(newBlueprint.propertyBlueprintForName("formtarget"), "form");
            button.blueprint = newBlueprint;
            
            // Use the blueprint. 
            // Careful that the blueprint method return a promise.
            var blueprintPromise = button.blueprint;
            return blueprintPromise.then(function (blueprint) {
                var serializedDescription = serializer.serializeObject(blueprint);
                console.log(serializedDescription);
            });

```