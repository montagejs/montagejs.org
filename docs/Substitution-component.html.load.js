montageDefine("62969ad","docs/Substitution-component.html",{text:'<!doctype html>\n<html>\n<head>\n    <meta charset=utf-8>\n    <meta name=viewport content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">\n    <meta http-equiv=X-UA-Compatible content="chrome=1">\n    \n    <title>Substitution component - Montage Docs</title>\n    \n    <link rel=stylesheet href="http://fonts.googleapis.com/css?family=Open+Sans:400,700">\n    <link rel=stylesheet href="../stylesheets/normalize.css">\n    <link rel=stylesheet href="../stylesheets/base.css">\n    <link rel=stylesheet href="../stylesheets/pages.css">\n    <link rel=stylesheet href="../stylesheets/solarized.css">\n        \n    <!--[if lt IE 9]><script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->    \n</head>\n<body class=docs>\n  \n    <header class="header header-pages pushed">\n        <div class=header-container>\n            <a href="/"><img class=logo src="../images/logo-pages.png" alt=Montage></a>\n            <nav class=nav>\n                <a class=nav-item href="/apps">Apps</a>\n                <a class="nav-item active" href="/docs">Docs</a>\n            </nav>\n        </div>\n    </header>\n    \n    <section id=docs>\n        <article>\n            <div class=markdown-body>\n\n<h1>Substitution component<a class=anchor id=Substitution-component href="#Substitution-component"></a>\n</h1>\n\n<p>The <code>Substitution</code> handles a group of elements and shows only one at a time.</p>\n\n<p>Each element has a key associated with it. The key is used to select which element the substitution should display, this is done by setting <code>switchValue</code>.</p>\n\n<p>The elements are set up in the substitution with DOM arguments. The name of each argument will be used as the key of that element.</p>\n\n<h2>Declarative API<a class=anchor id=Declarative-API href="#Declarative-API"></a>\n</h2>\n\n<h3>Example 1<a class=anchor id=Example-1 href="#Example-1"></a>\n</h3>\n\n<p></p><div class=highlight><pre><span class=s2>"substitution"</span><span class=err>:</span> <span class=p>{</span>\n    <span class=nt>"prototype"</span><span class=p>:</span> <span class=s2>"montage/ui/substitution.reel"</span><span class=p>,</span>\n    <span class=nt>"properties"</span><span class=p>:</span> <span class=p>{</span>\n        <span class=nt>"element"</span><span class=p>:</span> <span class=p>{</span><span class=nt>"#"</span><span class=p>:</span> <span class=s2>"substitution"</span><span class=p>},</span>\n        <span class=nt>"switchValue"</span><span class=p>:</span> <span class=s2>"profile"</span>\n    <span class=p>}</span>\n<span class=p>}</span>\n</pre></div>\n<div class=highlight><pre><span class=nt>&lt;div</span> <span class=na>data-montage-id=</span><span class=s>"substitution"</span><span class=nt>&gt;</span>\n    <span class=nt>&lt;div</span> <span class=na>data-arg=</span><span class=s>"profile"</span><span class=nt>&gt;</span>\n        First Name: Homer\n        Last Name: Simpson\n        Address: 742 Evergreen Terrace\n    <span class=nt>&lt;/div&gt;</span>\n    <span class=nt>&lt;div</span> <span class=na>data-arg=</span><span class=s>"contact"</span><span class=nt>&gt;</span>\n        Telephone: 555-3223\n        Email: homer@simpson.web\n    <span class=nt>&lt;/div&gt;</span>\n<span class=nt>&lt;/div&gt;</span>\n</pre></div>\n\n<h3>Example 2<a class=anchor id=Example-2 href="#Example-2"></a>\n</h3>\n\n<p>Dom arguments can also be elements of components:\n</p><div class=highlight><pre><span class=s2>"substitution"</span><span class=err>:</span> <span class=p>{</span>\n    <span class=nt>"prototype"</span><span class=p>:</span> <span class=s2>"montage/ui/substitution.reel"</span><span class=p>,</span>\n    <span class=nt>"properties"</span><span class=p>:</span> <span class=p>{</span>\n        <span class=nt>"element"</span><span class=p>:</span> <span class=p>{</span><span class=nt>"#"</span><span class=p>:</span> <span class=s2>"substitution"</span><span class=p>},</span>\n        <span class=nt>"switchValue"</span><span class=p>:</span> <span class=s2>"profile"</span>\n    <span class=p>}</span>\n<span class=p>}</span><span class=err>,</span>\n\n<span class=s2>"userProfile"</span><span class=err>:</span> <span class=p>{</span>\n    <span class=nt>"prototype"</span><span class=p>:</span> <span class=s2>"ui/user-profile.reel"</span><span class=p>,</span>\n    <span class=nt>"properties"</span><span class=p>:</span> <span class=p>{</span>\n        <span class=nt>"element"</span><span class=p>:</span> <span class=p>{</span><span class=nt>"#"</span><span class=p>:</span> <span class=s2>"userProfile"</span><span class=p>}</span>\n    <span class=p>}</span>\n<span class=p>}</span><span class=err>,</span>\n\n<span class=s2>"userContact"</span><span class=err>:</span> <span class=p>{</span>\n    <span class=nt>"prototype"</span><span class=p>:</span> <span class=s2>"ui/user-contact.reel"</span><span class=p>,</span>\n    <span class=nt>"properties"</span><span class=p>:</span> <span class=p>{</span>\n        <span class=nt>"element"</span><span class=p>:</span> <span class=p>{</span><span class=nt>"#"</span><span class=p>:</span> <span class=s2>"userContact"</span><span class=p>}</span>\n    <span class=p>}</span>\n<span class=p>}</span>\n</pre></div>\n<div class=highlight><pre><span class=nt>&lt;div</span> <span class=na>data-montage-id=</span><span class=s>"substitution"</span><span class=nt>&gt;</span>\n    <span class=nt>&lt;div</span> <span class=na>data-arg=</span><span class=s>"profile"</span> <span class=na>data-montage-id=</span><span class=s>"userProfile"</span><span class=nt>&gt;&lt;/div&gt;</span>\n    <span class=nt>&lt;div</span> <span class=na>data-arg=</span><span class=s>"contact"</span> <span class=na>data-montage-id=</span><span class=s>"userContact"</span><span class=nt>&gt;&lt;/div&gt;</span>\n<span class=nt>&lt;/div&gt;</span>\n</pre></div>\n\n<h2>Programmatic API<a class=anchor id=Programmatic-API href="#Programmatic-API"></a>\n</h2>\n\n<ul>\n<li>\n<code>addSwitchElement(key, element)</code> - Adds <code>element</code> with <code>key</code>. <code>element</code> needs to be a parentless node.</li>\n<li>\n<code>switchValue</code> - The <code>key</code> of the element to be shown.</li>\n</ul>\n\n                </div>\n        </article>\n    </section>\n\n    <section id=next class=next>\n        <article>\n            <h3 class=title>More help?</h3>\n            <div class=cols>\n                <div class="col col-1-2">\n                    <p>Can\'t find what you are looking for? Get in touch, we\'re more than happy in helping answer your questions.\n                    </p>\n                </div>\n                <aside class="col col-1-2">\n                    <p><strong>Have feedback or ideas?</strong> Let us know by creating a new <a href="https://github.com/montagejs/montage/issues" target=_blank>issue</a>, join us in <a href="http://webchat.freenode.net/?channels=montage" target=_blank>IRC</a> or post questions to our <a href="https://groups.google.com/forum/?fromgroups#!forum/montagejs" target=_blank>Google Group</a>. We\'re also on <a href="https://twitter.com/montage_js" target=_blank>Twitter</a> and <a href="https://plus.google.com/116915300739108010954/" target=_blank>Google+</a>.\n                    </p>\n                </aside>\n            </div>\n        </article>\n    </section>\n\n    \n    <section id=social class=social>\n        <article>\n            \n            <div class="button-group github">\n                <iframe src="http://ghbtns.com/github-btn.html?user=montagejs&amp;repo=montage&amp;type=watch&amp;count=true" allowtransparency=true frameborder=0 scrolling=0 width=90px height=20px></iframe>\n                <iframe src="http://ghbtns.com/github-btn.html?user=montagejs&amp;repo=montage&amp;type=fork&amp;count=true" allowtransparency=true frameborder=0 scrolling=0 width=90px height=20px></iframe>\n            </div>\n            \n            \n            <div class="button-group twitter">\n                <a href="https://twitter.com/share" class=twitter-share-button data-via=montage_js data-count=none>Tweet</a>\n                <script>!function(e,t,n){var r,i=e.getElementsByTagName(t)[0];e.getElementById(n)||(r=e.createElement(t),r.id=n,r.src="//platform.twitter.com/widgets.js",i.parentNode.insertBefore(r,i))}(document,"script","twitter-wjs")</script>\n                <a href="https://twitter.com/montage_js" class=twitter-follow-button data-show-count=false data-show-screen-name=false>Follow @montage_js</a>\n                <script>!function(e,t,n){var r,i=e.getElementsByTagName(t)[0];e.getElementById(n)||(r=e.createElement(t),r.id=n,r.src="//platform.twitter.com/widgets.js",i.parentNode.insertBefore(r,i))}(document,"script","twitter-wjs")</script>\n            </div>\n            \n            <div class="button-group g-plus">\n                \n                <script src="https://apis.google.com/js/plusone.js">"explicit"</script>\n                \n                <div class=g-plusone data-size=medium data-annotation=inline data-width=200></div>\n                \n                <script>gapi.plusone.go()</script>\n            </div>\n            \n        </article>\n    </section>\n        \n    \n    <footer class=footer>\n        2013 montagejs.org - <a href="https://github.com/montagejs/montagejs.org">Contributions</a> to this page are welcomed.\n    </footer>\n        \n    \n    \n    <script>var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-35717912-1"]),_gaq.push(["_trackPageview"]),function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}()</script>\n    \n</body>\n</html>'})