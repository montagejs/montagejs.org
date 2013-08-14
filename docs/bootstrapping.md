---

layout: docs
title: Montage Bootstrapping

---

# Montage Bootstrapping

This document will describe the bootstrapping process for Montage.

After setting up some variables `exports.initMontage` is called. This calls `getPlatform` which returns an object with platform specific functions (currently the browser and node are supported).

## browser, in development mode, non-optimized (un-mopped)

### platform.bootstrap

`platform.bootstrap` is called with a callback to use when the initial bootstraping has finished. This kicks off the browser process. The parameters are retrieved from the `data-` attributes of the script tag that loads `montage.js`. A "resolve" function is also created that will return an absolute path from a given relative path, using the location of the document as the base. This is implemented by using `<base>` and `<a>` elements, and using the interaction of these elements in the browser to do the actual resolution.

Next we add a listener for `DOMContentLoaded`, which will call `callbackIfReady` when done.

Montage needs 3 files for further bootstrapping: `require.js` and `browser.js` from Mr to set up the CommonJS module system in the browser and `q.js` to add support for promises. These are loaded by injecting script tags. We know when they are loaded because each of the files call a global `bootstrap` function with their id and a function that returns their exports when ready. **Mopped**: If the package is Mopped then these files will be available in the bootstrapping bundle, and so no script tags are injected.

The global `bootstrap` function keeps track of the 3 files and once all three have loaded calls the `allModulesLoaded` function.

`allModulesLoaded` uses a miniature `require` implementation called `bootRequire` to set up the promise and require/browser modules. Finally it calls `callbackIfReady`.

`callbackIfReady` checks that both the DOM and the modules are loaded, and if so calls the callback given to this function.

### callback

First we set up the config object to load the Montage package. This involves setting up the loader that lets the us load ".reel" files directly (e.g. `require("montage/ui/text.reel")`), and compilers that attach Montage metadata to the exports of any loaded module (`SerializationCompiler`) and export the HTML of loaded HTML files as `content` (`TemplateCompiler`).

<a id="un-mopped-load-montage" href="#mopped-callback">If mopped, bundles are loaded at this point.</a>

We then use `Require` to load the Montage package. Once this promise has completed we have the require function for Montage, `montageRequire`. We use this to load the Q (Promise) package so that we have complete information about the Promise package. We then insert the already loaded promise module into it, so that it isn't requested again. We set up the linter, to give us informative errors when there's a syntax error in a loaded file.

At this point there is code to handle controlling the Montage bootstrapper from a remote frame, for example for testing. This won't be covered here.

If there was a `data-auto-package` attribute we create inject a fake package description so that a package.json is not needed, otherwise we check if location is a json file (set through a `data-package` attribute) and if so inject it directly. Finally, we load the application package.

Once this is complete we have the `montageRequire` and the `applicationRequire` and we use these to finish initializing Montage in `initMontage`

### initMontage

Here we load the last of Montage's essential dependencies and once they have completed we configure the application. This involves setting up the stack trace length (set to 0 for optimization), event manager and calling `montageWillLoad`, again for testing.

Next we check to see if the `package.json` specified an application prototype to use, otherwise we use "core/application". Once this is loaded will call `_load` on the application object which in the default implementation loads the Montage component and template modules, and causes any serialization in this HTML page to be parsed.

Finally, we check if a `data-module` attribute was given and if so load this module.

The bootstrapping is complete. The serialization has created components for the user to interact with, or the loaded module is doing its thing.

## browser, in deployment mode, optimized (mopped)

When Mopped the bootstrapping bundle defines a global `BUNDLE` array, which contains a list of bundle filenames to load.

### platform.bootstrap

As the normal bootstrap, except the 3 bootstrapping modules needed will be available in the bootstrapping bundle, and so no script tags are injected.

### callback <a id="mopped-callback"></a>

Before loading the Montage package the `BUNDLE` variable is checked. If it exists then a script tag is injected for each of the filenames in the array. Each bundle calls a global `bundleLoaded` function with its name. A `preloaded` promise is added to the config object that is resolved once all of the bundles have loaded. Mr waits on this promise before proceeding, which means that the Montage package is not loaded until all the bundles have loaded.

This is where the differences in un-mopped and mopped bootstrapping end.

<a href="#un-mopped-load-montage">Return to regular bootstrapping</a>

## Node

To do.