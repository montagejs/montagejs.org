montageDefine("ed2cab6","docs/Montage-♥-FRB.html",{text:'<!doctype html>\n<html>\n<head>\n    <meta charset=utf-8>\n    <meta name=viewport content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">\n    <meta http-equiv=X-UA-Compatible content="chrome=1">\n\n    <title>Montage ♥ FRB - Montage Docs</title>\n\n    <link rel=stylesheet href="http://fonts.googleapis.com/css?family=Open+Sans:400,700">\n    <link rel=stylesheet href="../stylesheets/normalize.css">\n    <link rel=stylesheet href="../stylesheets/base.css">\n    <link rel=stylesheet href="../stylesheets/pages.css">\n    <link rel=stylesheet href="../stylesheets/solarized.css">\n\n    <!--[if lt IE 9]><script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->\n</head>\n<body class=docs>\n\n    <header class="header header-pages pushed">\n        <div class=header-container>\n            <a href="/"><img class=logo src="../images/logo-pages.png" alt=Montage></a>\n            <nav class=nav>\n                <a class=nav-item href="/apps">Apps</a>\n                <a class="nav-item active" href="/docs">Docs</a>\n                <a class=nav-item href="/apis">APIs</a>\n            </nav>\n        </div>\n    </header>\n\n    <section id=docs>\n        <article>\n            <div class=markdown-body>\n\n<h1>FAQ for the FRB Transition<a class=anchor id=FAQ-for-the-FRB-Transition href="#FAQ-for-the-FRB-Transition"></a>\n</h1>\n\n<h2>How do I observe a path from my object for changes after they\'ve happened?<a class=anchor id="How-do-I-observe-a-path-from-my-object-for-changes-after-they\'ve-happened?" href="#How-do-I-observe-a-path-from-my-object-for-changes-after-they\'ve-happened?"></a>\n</h2>\n\n<p>Before\n</p><div class=highlight><pre><span class=nx>myObject</span><span class=p>.</span><span class=nx>addPropertyChangeListener</span><span class=p>(</span><span class=s2>"path"</span><span class=p>,</span> <span class=nx>handler</span><span class=p>)</span>\n</pre></div>\n\n<p>When the path changes <code>myObject.handleChange(notification)</code> will be called</p>\n\n<p>After\n</p><div class=highlight><pre><span class=nx>aMontageObject</span><span class=p>.</span><span class=nx>addPathChangeListener</span><span class=p>(</span><span class=s2>"path"</span><span class=p>,</span> <span class=nx>handler</span><span class=p>,</span> <span class=nx>opt_methodName</span><span class=p>)</span>\n</pre></div>\nor\n<div class=highlight><pre><span class=nx>Montage</span><span class=p>.</span><span class=nx>addPathChangeListener</span><span class=p>.</span><span class=nx>call</span><span class=p>(</span><span class=nx>myObject</span><span class=p>,</span> <span class=s2>"path"</span><span class=p>,</span> <span class=nx>handler</span><span class=p>,</span> <span class=nx>opt_methodName</span><span class=p>)</span>\n</pre></div>\n\n<p><code>aMontageObject</code> is an object that has <code>Montage</code> in its prototype chain: <code>Montage.isPrototypeOf(aMontageObject) === true</code> holds.</p>\n\n<p>When the value at the path changes (not the content of the value), the first function in this list gets called with the <code>newValue</code>, <code>path</code>, and <code>myObject</code>.</p>\n\n<ul>\n<li><code>handler[methodName]</code></li>\n<li><code>handler.handlePathChange</code></li>\n<li><code>handler</code></li>\n</ul><h2>How do I observe a path from my object for changes before they happen?<a class=anchor id="How-do-I-observe-a-path-from-my-object-for-changes-before-they-happen?" href="#How-do-I-observe-a-path-from-my-object-for-changes-before-they-happen?"></a>\n</h2>\n\n<p>Before\n</p><div class=highlight><pre><span class=nx>myObject</span><span class=p>.</span><span class=nx>addPropertyChangeListener</span><span class=p>(</span><span class=s2>"path"</span><span class=p>,</span> <span class=nx>handler</span><span class=p>,</span> <span class=kc>true</span><span class=p>)</span>\n</pre></div>\n\n<p>After\n</p><div class=highlight><pre><span class=nx>aMontageObject</span><span class=p>.</span><span class=nx>addPathChangeListener</span><span class=p>(</span><span class=s2>"path"</span><span class=p>,</span> <span class=nx>handler</span><span class=p>,</span> <span class=s2>"handleMethodName"</span><span class=p>,</span> <span class=kc>true</span><span class=p>)</span>\n</pre></div>\nor\n<div class=highlight><pre><span class=nx>Montage</span><span class=p>.</span><span class=nx>addPathChangeListener</span><span class=p>.</span><span class=nx>call</span><span class=p>(</span><span class=nx>myObject</span><span class=p>,</span> <span class=s2>"path"</span><span class=p>,</span> <span class=nx>handler</span><span class=p>,</span> <span class=s2>"handleMethodName"</span><span class=p>,</span> <span class=kc>true</span><span class=p>)</span>\n</pre></div>\n\n<h2>How do I bind a property of my object to a property of another object such that they are always the same?<a class=anchor id="How-do-I-bind-a-property-of-my-object-to-a-property-of-another-object-such-that-they-are-always-the-same?" href="#How-do-I-bind-a-property-of-my-object-to-a-property-of-another-object-such-that-they-are-always-the-same?"></a>\n</h2>\n\n<p>Before\n</p><div class=highlight><pre><span class=nb>Object</span><span class=p>.</span><span class=nx>defineBinding</span><span class=p>(</span><span class=nx>myObject</span><span class=p>,</span> <span class=s2>"myProperty"</span><span class=p>,</span> <span class=p>{</span>\n    <span class=nx>boundObject</span><span class=o>:</span> <span class=nx>anotherObject</span><span class=p>,</span>\n    <span class=nx>boundObjectPropertyPath</span><span class=o>:</span> <span class=s2>"foo.bar"</span>\n<span class=p>});</span>\n</pre></div>\n\n<p>After\n</p><div class=highlight><pre><span class=nx>aMontageObject</span><span class=p>.</span><span class=nx>defineBinding</span><span class=p>(</span><span class=s2>"myProperty"</span><span class=p>,</span> <span class=p>{</span><span class=s2>"&lt;-&gt;"</span><span class=o>:</span> <span class=s2>"foo.bar"</span><span class=p>,</span> <span class=nx>source</span><span class=o>:</span> <span class=nx>anotherObject</span><span class=p>});</span>\n</pre></div>\nor\n<div class=highlight><pre><span class=kd>var</span> <span class=nx>Bindings</span> <span class=o>=</span> <span class=nx>require</span><span class=p>(</span><span class=s2>"montage/core/bindings"</span><span class=p>).</span><span class=nx>Bindings</span><span class=p>;</span>\n<span class=nx>Bindings</span><span class=p>.</span><span class=nx>defineBinding</span><span class=p>(</span><span class=nx>myObject</span><span class=p>,</span> <span class=s2>"myProperty"</span><span class=p>,</span> <span class=p>{</span><span class=s2>"&lt;-&gt;"</span><span class=o>:</span> <span class=s2>"foo.bar"</span><span class=p>,</span> <span class=nx>source</span><span class=o>:</span> <span class=nx>anotherObject</span><span class=p>});</span>\n</pre></div>\n\n<h2>How do I bind a property of my object to a property of another object such that changes to myProperty do not affect the otherObject\'s property?<a class=anchor id="How-do-I-bind-a-property-of-my-object-to-a-property-of-another-object-such-that-changes-to-myProperty-do-not-affect-the-otherObject\'s-property?" href="#How-do-I-bind-a-property-of-my-object-to-a-property-of-another-object-such-that-changes-to-myProperty-do-not-affect-the-otherObject\'s-property?"></a>\n</h2>\n\n<p>Before\n</p><div class=highlight><pre><span class=nb>Object</span><span class=p>.</span><span class=nx>defineBinding</span><span class=p>(</span><span class=nx>myObject</span><span class=p>,</span> <span class=s2>"myProperty"</span><span class=p>,</span> <span class=p>{</span>\n    <span class=nx>boundObject</span><span class=o>:</span> <span class=nx>anotherObject</span><span class=p>,</span>\n    <span class=nx>boundObjectPropertyPath</span><span class=o>:</span> <span class=s2>"foo.bar"</span><span class=p>,</span>\n    <span class=nx>oneway</span><span class=o>:</span> <span class=kc>true</span>\n<span class=p>});</span>\n</pre></div>\n\n<p>After\n</p><div class=highlight><pre><span class=nx>aMontageObject</span><span class=p>.</span><span class=nx>defineBinding</span><span class=p>(</span><span class=s2>"myProperty"</span><span class=p>,</span> <span class=p>{</span><span class=s2>"&lt;-"</span><span class=o>:</span> <span class=s2>"foo.bar"</span><span class=p>,</span> <span class=nx>source</span><span class=o>:</span> <span class=nx>anotherObject</span><span class=p>});</span>\n</pre></div>\nor\n<div class=highlight><pre><span class=kd>var</span> <span class=nx>Bindings</span> <span class=o>=</span> <span class=nx>require</span><span class=p>(</span><span class=s2>"montage/core/bindings"</span><span class=p>).</span><span class=nx>Bindings</span><span class=p>;</span>\n<span class=nx>Bindings</span><span class=p>.</span><span class=nx>defineBinding</span><span class=p>(</span><span class=nx>myObject</span><span class=p>,</span> <span class=s2>"myProperty"</span><span class=p>,</span> <span class=p>{</span><span class=s2>"&lt;-"</span><span class=o>:</span> <span class=s2>"foo.bar"</span><span class=p>,</span> <span class=nx>source</span><span class=o>:</span> <span class=nx>anotherObject</span><span class=p>});</span>\n</pre></div>\n\n<h2>How do I watch changes to an array at the end of a property path so I know what\'s added and removed?<a class=anchor id="How-do-I-watch-changes-to-an-array-at-the-end-of-a-property-path-so-I-know-what\'s-added-and-removed?" href="#How-do-I-watch-changes-to-an-array-at-the-end-of-a-property-path-so-I-know-what\'s-added-and-removed?"></a>\n</h2>\n\n<p></p><div class=highlight><pre><span class=nx>aMontageObject</span><span class=p>.</span><span class=nx>addRangeAtPathChangeListener</span><span class=p>(</span><span class=s2>"array"</span><span class=p>,</span> <span class=nx>handler</span><span class=p>,</span> <span class=s2>"handleArrayRangeChange"</span><span class=p>);</span>\n</pre></div>\nor\n<div class=highlight><pre><span class=nx>Montage</span><span class=p>.</span><span class=nx>addRangeAtPathChangeListener</span><span class=p>(</span><span class=nx>myObject</span><span class=p>,</span> <span class=s2>"array"</span><span class=p>,</span> <span class=nx>handler</span><span class=p>,</span> <span class=s2>"handleArrayRangeChange"</span><span class=p>);</span>\n</pre></div>\n\n<p>Calls <code>handler.handleArrayRangeChange</code> with <code>plus</code>, <code>minus</code>, and <code>index</code>.</p>\n\n<h2>How do I change a private value and dispatch the change on an affected public property?<a class=anchor id="How-do-I-change-a-private-value-and-dispatch-the-change-on-an-affected-public-property?" href="#How-do-I-change-a-private-value-and-dispatch-the-change-on-an-affected-public-property?"></a>\n</h2>\n\n<p>Before\n</p><div class=highlight><pre><span class=nx>myObject</span><span class=p>.</span><span class=nx>dispatchPropertyChange</span><span class=p>(</span><span class=s2>"affectedProperty"</span><span class=p>,</span> <span class=s2>"anotherAffectProperty"</span><span class=p>,</span> <span class=kd>function</span> <span class=p>()</span> <span class=p>{</span>\n    <span class=nx>myObject</span><span class=p>.</span><span class=nx>_underlyingProperty</span> <span class=o>=</span> <span class=nx>newValue</span><span class=p>;</span>\n<span class=p>});</span>\n</pre></div>\n\n<p>After\n</p><div class=highlight><pre><span class=nx>myObject</span><span class=p>.</span><span class=nx>dispatchBeforeOwnPropertyChange</span><span class=p>(</span><span class=s2>"affectedProperty"</span><span class=p>,</span> <span class=nx>myObject</span><span class=p>.</span><span class=nx>affectedProperty</span><span class=p>);</span>\n<span class=nx>myObject</span><span class=p>.</span><span class=nx>dispatchBeforeOwnPropertyChange</span><span class=p>(</span><span class=s2>"anotherAffectedPropert"</span><span class=p>,</span> <span class=nx>myObject</span><span class=p>.</span><span class=nx>anotherAffectedProperty</span><span class=p>);</span>\n<span class=nx>myObject</span><span class=p>.</span><span class=nx>_underlyingProperty</span> <span class=o>=</span> <span class=nx>newValue</span><span class=p>;</span>\n<span class=nx>myObject</span><span class=p>.</span><span class=nx>dispatchOwnPropertyChange</span><span class=p>(</span><span class=s2>"affectedProperty"</span><span class=p>,</span> <span class=nx>myObject</span><span class=p>.</span><span class=nx>affectedProperty</span><span class=p>);</span>\n<span class=nx>myObject</span><span class=p>.</span><span class=nx>dispatchOwnPropertyChange</span><span class=p>(</span><span class=s2>"anotherAffectedProperty"</span><span class=p>,</span> <span class=nx>myObject</span><span class=p>.</span><span class=nx>anotherAffectedProperty</span><span class=p>);</span>\n</pre></div>\n\n                </div>\n        </article>\n    </section>\n\n    <section id=next class=next>\n        <article>\n            <h3 class=title>More help?</h3>\n            <div class=cols>\n                <div class="col col-1-2">\n                    <p>Can\'t find what you are looking for? Get in touch, we\'re more than happy in helping answer your questions.\n                    </p>\n                </div>\n                <aside class="col col-1-2">\n                    <p><strong>Have feedback or ideas?</strong> Let us know by creating a new <a href="https://github.com/montagejs/montage/issues" target=_blank>issue</a>, join us in <a href="http://webchat.freenode.net/?channels=montage" target=_blank>IRC</a> or post questions to our <a href="https://groups.google.com/forum/?fromgroups#!forum/montagejs" target=_blank>Google Group</a>. We\'re also on <a href="https://twitter.com/montage_js" target=_blank>Twitter</a> and <a href="https://plus.google.com/116915300739108010954/" target=_blank>Google+</a>.\n                    </p>\n                </aside>\n            </div>\n        </article>\n    </section>\n\n\n    <section id=social class=social>\n        <article>\n\n            <div class="button-group github">\n                <iframe src="http://ghbtns.com/github-btn.html?user=montagejs&amp;repo=montage&amp;type=watch&amp;count=true" allowtransparency=true frameborder=0 scrolling=0 width=90px height=20px></iframe>\n                <iframe src="http://ghbtns.com/github-btn.html?user=montagejs&amp;repo=montage&amp;type=fork&amp;count=true" allowtransparency=true frameborder=0 scrolling=0 width=90px height=20px></iframe>\n            </div>\n\n\n            <div class="button-group twitter">\n                <a href="https://twitter.com/share" class=twitter-share-button data-via=montage_js data-count=none>Tweet</a>\n                <script>!function(e,t,n){var r,i=e.getElementsByTagName(t)[0];e.getElementById(n)||(r=e.createElement(t),r.id=n,r.src="//platform.twitter.com/widgets.js",i.parentNode.insertBefore(r,i))}(document,"script","twitter-wjs")</script>\n                <a href="https://twitter.com/montage_js" class=twitter-follow-button data-show-count=false data-show-screen-name=false>Follow @montage_js</a>\n                <script>!function(e,t,n){var r,i=e.getElementsByTagName(t)[0];e.getElementById(n)||(r=e.createElement(t),r.id=n,r.src="//platform.twitter.com/widgets.js",i.parentNode.insertBefore(r,i))}(document,"script","twitter-wjs")</script>\n            </div>\n\n            <div class="button-group g-plus">\n                \n                <script src="https://apis.google.com/js/plusone.js">"explicit"</script>\n                \n                <div class=g-plusone data-size=medium data-annotation=inline data-width=200></div>\n                \n                <script>gapi.plusone.go()</script>\n            </div>\n\n        </article>\n    </section>\n\n\n    <footer class=footer>\n        2013 montagejs.org - <a href="https://github.com/montagejs/montagejs.org">Contributions</a> to this page are welcomed.\n    </footer>\n\n\n    \n    <script>var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-35717912-1"]),_gaq.push(["_trackPageview"]),function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}()</script>\n\n</body>\n</html>'})