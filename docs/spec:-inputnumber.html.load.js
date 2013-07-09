montageDefine("28f0767","docs/spec:-inputnumber.html",{text:'<!DOCTYPE html>\n<html>\n<head>\n    <meta charset=utf-8>\n    <meta name=viewport content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">\n    <meta http-equiv=X-UA-Compatible content="chrome=1">\n\n    <title>Spec: InputNumber - Montage Docs</title>\n\n    <link rel=stylesheet href="http://fonts.googleapis.com/css?family=Open+Sans:400,700">\n    <link rel=stylesheet href="../stylesheets/normalize.css">\n    <link rel=stylesheet href="../stylesheets/base.css">\n    <link rel=stylesheet href="../stylesheets/pages.css">\n    <link rel=stylesheet href="../stylesheets/solarized.css">\n\n    <!--[if lt IE 9]><script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->\n</head>\n<body class=docs>\n\n    <header class="header header-pages pushed">\n        <div class=header-container>\n            <a href="/"><img class=logo src="../images/logo-pages.png" alt=Montage></a>\n            <nav class=nav>\n                <a class=nav-item href="/apps">Apps</a>\n                <a class="nav-item active" href="/docs">Docs</a>\n                <a class=nav-item href="/apis">APIs</a>\n            </nav>\n        </div>\n    </header>\n\n    <section id=docs>\n        <article>\n            <div class=markdown-body>\n\n<p>NumberInput Component</p>\n\n<p>NumberInput is a Component wrapper for the <input type="”number”"> HTMLElement. The HTML markup for the NumberInput is the same as the standard HTML5 markup (<input>). Wrapping the <input> HTMLElement as a Montage NumberInput component adds Data Binding support for all writable attributes of this element.</p>\n\n<p>It supports all (most?) standard attributes of the <input> HTMLElement as specified here - <a href="http://www.w3.org/TR/html5/the-input-element.html#the-input-element">http://www.w3.org/TR/html5/the-input-element.html#the-input-element</a></p>\n\n<p>Properties</p>\n\n<p>value</p>\n\n<p>Type: string\nDefault: \nText to be displayed in this component</p>\n\n<p>converter</p>\n\n<p>Type: Object instance\nDefault: null\nOptional. If provided, the converter will be used to convert the value before the value is displayed.</p>\n\n<p>updateOnInput\nType: boolean\nDefault: true\nThis property allows the App developer to force the conversion and setting of the “value” property “on change” instead of “on input”.</p>\n\n<p>Some converters like the  DateConverter do not support partial conversion (eg: as the user is typing in) and therefore the converter is called only when the user has finished typing and tabs out of the field. By setting this flag to false, the converter will be invoked only on “change” and not on “input” regardless of the type of converter.</p>\n\n<p>errorMessage\nData Type = String, Default value = null (if there is no error)</p>\n\n<p>// Standard HTML5 Attributes</p>\n\n<p>autocomplete\nData Type = Boolean, Default value = false\naccept string: “on”, “off”</p>\n\n<p>disabled\nData Type = boolean, Default value = false</p>\n\n<p>list\nData Type = String, Default value = false</p>\n\n<p>maxlength\nData Type = Number, Default value = false</p>\n\n<p>min\nData Type = Number, Default value =  null</p>\n\n<p>max\nData Type = Number, Default value = null</p>\n\n<p>multiple\nData Type = Number, Default value = null</p>\n\n<p>name\nData Type = String, Default value = null</p>\n\n<p>placeholder\nData Type = String, Default value = null</p>\n\n<p>pattern\nData Type = String, Default value = null</p>\n\n<p>readonly\nData Type = Boolean, Default value = null</p>\n\n<p>required\nData Type = Boolean, Default value = null</p>\n\n<p>step\nData Type = Number, Default value = null</p>\n\n<p>size\nData Type = Number, Default value = null</p>\n\n<p>title\nData Type = String, Default value = null</p>\n\n<p>Markup &amp; Serialization</p>\n\n<p>Textfield with input type=”number”</p>\n\n<pre><code>&lt;input type="number" id="number1" step="10" max="1000" min="0"  /&gt;\n</code></pre>\n\n<p>with Serialization. The ‘value’ and ‘max’ attributes are bound.</p>\n\n<pre><code>   "number1": {\n       "module": "montage/ui/textfield.reel",\n       "name": "Textfield",\n       "properties": {\n           "element": {"#": "number1"}\n       },\n       "bindings": {\n           "value": {\n               "boundObject": {"@": "range1"},\n               "boundObjectPropertyPath": "value",\n               "oneway": false\n           },\n           "max": {\n               "boundObject": {"@": "limit-max"},\n               "boundObjectPropertyPath": "value",\n               "oneway": true\n           }\n       }\n   },\n</code></pre>\n\n<p>Unit Tests: test/ui/number-input-spec.js</p>\n\n                </div>\n        </article>\n    </section>\n\n    <section id=next class=next>\n        <article>\n            <h3 class=title>More help?</h3>\n            <div class=cols>\n                <div class="col col-1-2">\n                    <p>Can\'t find what you are looking for? Get in touch, we\'re more than happy in helping answer your questions.\n                    </p>\n                </div>\n                <aside class="col col-1-2">\n                    <p><strong>Have feedback or ideas?</strong> Let us know by creating a new <a href="https://github.com/montagejs/montage/issues" target=_blank>issue</a>, join us in <a href="http://webchat.freenode.net/?channels=montage" target=_blank>IRC</a> or post questions to our <a href="https://groups.google.com/forum/?fromgroups#!forum/montagejs" target=_blank>Google Group</a>. We\'re also on <a href="https://twitter.com/montagejs" target=_blank>Twitter</a> and <a href="https://plus.google.com/116915300739108010954/" target=_blank>Google+</a>.\n                    </p>\n                </aside>\n            </div>\n        </article>\n    </section>\n\n\n    <section id=social class=social>\n        <article>\n\n            <div class="button-group github">\n                <iframe src="http://ghbtns.com/github-btn.html?user=montagejs&amp;repo=montage&amp;type=watch&amp;count=true" allowtransparency=true frameborder=0 scrolling=0 width=90px height=20px></iframe>\n                <iframe src="http://ghbtns.com/github-btn.html?user=montagejs&amp;repo=montage&amp;type=fork&amp;count=true" allowtransparency=true frameborder=0 scrolling=0 width=90px height=20px></iframe>\n            </div>\n\n\n            <div class="button-group twitter">\n                <a href="https://twitter.com/share" class=twitter-share-button data-via=montagejs data-count=none>Tweet</a>\n                <script>!function(s,n,a){var e,t=s.getElementsByTagName(n)[0];s.getElementById(a)||(e=s.createElement(n),e.id=a,e.src="//platform.twitter.com/widgets.js",t.parentNode.insertBefore(e,t))}(document,"script","twitter-wjs");</script>\n                <a href="https://twitter.com/montagejs" class=twitter-follow-button data-show-count=false data-show-screen-name=false>Follow @montagejs</a>\n                <script>!function(s,n,a){var e,t=s.getElementsByTagName(n)[0];s.getElementById(a)||(e=s.createElement(n),e.id=a,e.src="//platform.twitter.com/widgets.js",t.parentNode.insertBefore(e,t))}(document,"script","twitter-wjs");</script>\n            </div>\n\n            <div class="button-group g-plus">\n                \n                <script src="https://apis.google.com/js/plusone.js"></script>\n                \n                <div class=g-plusone data-size=medium data-annotation=inline data-width=200></div>\n                \n                <script>gapi.plusone.go();</script>\n            </div>\n\n        </article>\n    </section>\n\n\n    <footer class=footer>\n        2013 montagejs.org - <a href="https://github.com/montagejs/montagejs.org">Contributions</a> to this page are welcomed.\n    </footer>\n\n\n    \n    <script>var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-35717912-1"]),_gaq.push(["_trackPageview"]),function(){var s=document.createElement("script");s.type="text/javascript",s.async=!0,s.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(s,n)}();</script>\n\n</body>\n</html>'});