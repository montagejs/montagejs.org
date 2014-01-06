---

layout: docs
title: MontageJS FAQ

prev-page: overlay
this-page: faq
next-page: troubleshooting

---


# MontageJS FAQ

Get answers to frequently asked questions about MontageJS.

* [General Questions](#general)
* [Getting Started](#gs)
* [Licensing](#licensing)


## <a name="general"></a>General Questions

### What is MontageJS?
MontageJS is an open source, client-side MVC application framework powered by standards-based web technologies. With MontageJS, developers can use their existing HMTL, CSS, and JavaScript skills to assemble quickly single-page applications (SPAs) out of modular user interface components that encapsulate a declarative approach to DOM manipulation, logicless templates, and CSS directives.

### Why should I use MontageJS?
MontageJS was designed from the ground up to help developers build scalable and maintainable HTML5 applications optimized for today's and tomorrow's range of connected devices. The framework provides a simple, structured approach to building and maintaining ambitious single-page web applications or complex user interfaces by following proven software design patterns and promoting a clear separation of concerns. MontageJS provides reusable components, ubiquitous declarative bindings, functional reactive bindings (FRB), a managed draw cycle (to help minimize expensive browser reflow), and a separation of concerns that facilitates sharing and collaboration. This separation of concerns allows designers to use the technologies they are comfortable with, without having to dig into the JavaScript, and it allows developers to isolate and test individual components using familiar techniques.

### Who is using MontageJS?
MontageJS is still evolving, but it has been used to create the (temporarily suspended) ScratchPad Chrome browser extension app and the Tips and Tricks application you see when you start up a Chrome notebook for the first time. In addition, several businesses and consultants are currently evaluating MontageJS for their projects. However, not having powerful client portfolio yet should not keep you from taking a closer look at what you can do with MontageJS. On the contrary, go check it out, play with it, and let us know what you think. Others already have.

### Why can't I download MontageJS from your website?
Most framework developers provide you with a download link to code libraries. These code libraries are designed to make a web application developer's life easier. Unfortunately, they typically also include a lot more functionality than is needed for any given project. Consequently, most web applications tend to include massive libraries that have a lot more parts than the application requires.

MontageJS takes a different approach to developing web applications. With MontageJS, you don't download or link to a prebuilt, kitchensink-style solution in your application. MontageJS uses the CommonJS module system and is part of the npm package ecosystem. This makes it easy for developers to set up their client-side development environment and organize their code. In development, you supplement your code with the modules and components that provide just the functionality you need. Then, come production time, Mop (the MontageJS optimizer) sifts through your developer-optimzied experience and includes only those modules and components that are actually required in your final application.

## <a name="gs"></a>Getting Started

### What types of apps can I build with MontageJS?
MontageJS is best for building modular single-page “thick-client” web applications for mobile and tablet devices and desktop browsers. You can use MontageJS for building traditional websites, of course, but it may not be the best fit for that. For examples, check out the [sample apps](http://montagejs.org/apps/). You can also use MontageJS for building Chrome browser extensions and native applications that can embed a web component.

### How do I get started with MontageJS?
Check out our [Quick Start](http://montagejs.org/docs/montagejs-setup.html) to get a feel for how to set up your environment and assmeble MontageJS components into a rich user interface.

### What is the total size of the framework?
MontageJS is not your traditional framework library that you download or include in an app. Building MontageJS applications is divided into a development phase, during which you assemble your MontageJS application, and a production phase, during which you minify the app. Only the dependencies and components that you actually use will be optimized and included in the final page that makes up your app. In short: The size will depend on the complexity of your application.

### What browsers does MontageJS support?
MontageJS is designed to help you build rich and well-performing HTML5 applications that take full advantage of what the evolving web platform has to offer rather than make concessions to older browsers. For this reason, MontageJS works best in the latest versions of Google Chrome, Firefox, Safari, Chrome Android, Mobile Safari, and IE 10.

### Do you support unit testing?
Yes, in MontageJS we use some pure unit tests that are straighforward [Jasmine specs](https://github.com/montagejs/montage/blob/master/test/core/super-spec.js). To install the test code, run `npm install` in your project folder. You will need the file run-tests.html.

For an example of how we implement unit testing, see the [digit](https://github.com/montagejs/digit) repository. (Digit is our touch-optimzed widget set for mobile development.) We use the [run-tests](https://github.com/montagejs/digit/blob/master/run-tests.html) page to load our test environment; `data-module="test/all"` inside the final script tag tells the system to load [test/all.js](https://github.com/montagejs/digit/tree/master/test); all.js specifies a list of module ids for the runner to execute. Note that in this example, all the tests load a page in an iframe using `TestPageLoader.queueTest()`. These are akin to integration tests since they test the component in a real environment. This approach, however, although good for testing full widgets, can get slow when running lots of test pages.

We also test some components by [mocking their dependencies](https://github.com/montagejs/montage/blob/master/test/base/abstract-button-spec.js); note, however, that we don't support proper mock unit testing yet.

### Can I access the device from a Montage app?
You will be able to access a device when these capabilities are added to a browser. We are actively watching the browser community for such additions.

### Do you have release notes or changelogs for the project?
Yes! Please have a look at our archived [release notes](https://github.com/montagejs/montage/blob/master/CHANGES.md), which include changelogs and known issues.

### How can I file a bug or provide feedback?
You can file bugs in the MontageJS project on [GitHub](https://github.com/montagejs/montage/issues). For feedback or ideas, create a new [issue](https://github.com/montagejs/montage/issues) on GitHub, join us at #montage on [IRC](http://webchat.freenode.net/?channels=montage), or post questions to our [Google Group](https://groups.google.com/forum/?fromgroups#!forum/montagejs). You can also follow us on [Twitter](https://twitter.com/montage_js) and [Google+](https://plus.google.com/116915300739108010954/).


## <a name="licensing"></a>Licensing

### How is MontageJS licensed?
MontageJS is open source and released under the [BSD](https://github.com/montagejs/montage/blob/master/LICENSE.md) license.

### Can I use MontageJS for commercial projects? Do I need to release my MontageJS applications as open source?
Yes you can, and no you don't need to. That's the beauty of BSD-licensed software, you can use it to produce binary applications or services, without releasing the source code. You can modify the BSD-licensed code and use it as you like (redistribute the code in binary or source code format) without having to publish your modifications to anyone.

### Can I build and release MontageJS applications for free?
Of course, you can.


