montageDefine("99a0ca4","docs/spec:-theme-css-binding.html",{text:'<!DOCTYPE html>\n<html>\n<head>\n    <meta charset=utf-8>\n    <meta name=viewport content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">\n    <meta http-equiv=X-UA-Compatible content="chrome=1">\n\n    <title>Spec: Theme CSS Binding - Montage Docs</title>\n\n    <link rel=stylesheet href="http://fonts.googleapis.com/css?family=Open+Sans:400,700">\n    <link rel=stylesheet href="../stylesheets/normalize.css">\n    <link rel=stylesheet href="../stylesheets/base.css">\n    <link rel=stylesheet href="../stylesheets/pages.css">\n    <link rel=stylesheet href="../stylesheets/solarized.css">\n\n    <!--[if lt IE 9]><script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->\n</head>\n<body class=docs>\n\n    <header class="header header-pages pushed">\n        <div class=header-container>\n            <a href="/"><img class=logo src="../images/logo-pages.png" alt=Montage></a>\n            <nav class=nav>\n                <a class=nav-item href="/apps">Apps</a>\n                <a class="nav-item active" href="/docs">Docs</a>\n                <a class=nav-item href="/apis">APIs</a>\n            </nav>\n        </div>\n    </header>\n\n    <section id=docs>\n        <article>\n            <div class=markdown-body>\n\n<p>Component to an element with montage-data-id. Native component we map attributes to properties.</p>\n\n<p><strong>CSSDeclarationComponent</strong>: map to 1 CSS Rule:</p>\n\n<p>skeletonTheme.reel/</p>\n\n<p>skeleton-theme.css\nfont-family: and font-size:</p>\n\n<p></p><div class=highlight><pre><span class=s>"ui-backgound-color"</span><span class=o>:</span> <span class=p>{</span>\n	prototype<span class=o>:</span> <span class=s>"montage/ui/css-declaration-component"</span><span class=p>,</span>\n	properties<span class=o>:</span> <span class=p>{</span>\n		element<span class=o>:</span><span class=s>"$.ui-backgound-color{backgound-color}"</span>\n	<span class=p>},</span>\n	bindings<span class=o>:</span> <span class=p>{</span>\n		<span class=s>"background-color"</span><span class=o>:</span><span class=s>"&lt;-owner.contentColor"</span><span class=p>;</span>\n	<span class=p>}</span>\n<span class=p>},</span>\n\n<span class=s>"ui-border-color"</span><span class=o>:</span> <span class=p>{</span>\n	prototype<span class=o>:</span> <span class=s>"montage/ui/css-declaration-component"</span><span class=p>,</span>\n	properties<span class=o>:</span> <span class=p>{</span>\n		element<span class=o>:</span><span class=s>"$.ui-backgound-color"</span>\n	<span class=p>},</span>\n	bindings<span class=o>:</span> <span class=p>{</span>\n		<span class=s>"background-color"</span><span class=o>:</span><span class=s>"&lt;-owner.contentColor"</span><span class=p>,</span> <span class=s>"converter"</span><span class=o>:</span> <span class=p>{</span><span class=s>"@"</span><span class=o>:</span> <span class=s>"darkenConverter"</span><span class=p>};</span>\n	<span class=p>}</span>\n<span class=p>},</span>\n\n<span class=s>"darkenConverter"</span><span class=o>:</span> <span class=p>{</span> <span class=o>//</span>Same as Less .mixin <span class=p>(</span>dark<span class=p>,</span> <span class=o>@</span>color<span class=p>)</span> <span class=p>{</span> color<span class=o>:</span> darken<span class=p>(</span><span class=o>@</span>color<span class=p>,</span> <span class=m>10</span>%<span class=p>);}</span>\n\n	prototype<span class=o>:</span> <span class=s>"montage/core/converter/darken-converter"</span><span class=p>,</span>\n	properties<span class=o>:</span> <span class=p>{</span>\n		<span class=s>"percent"</span><span class=o>:</span> <span class=s>"10"</span>\n	<span class=p>}</span>\n<span class=p>}</span>\n</pre></div>\n\n<p><code>#.ui-widget</code> assign <code>CSSDeclarationComponent</code> to the .iu-widget selector</p>\n\n<p>skeleton-theme.html : just link skeleton-theme.css and the serialization instantiating the CSSComponentDeclaration</p>\n\n<p>skeleton-theme.js</p>\n\n<p>Property: contentColor\nfontFamily:</p>\n\n                </div>\n        </article>\n    </section>\n\n    <section id=next class=next>\n        <article>\n            <h3 class=title>More help?</h3>\n            <div class=cols>\n                <div class="col col-1-2">\n                    <p>Can\'t find what you are looking for? Get in touch, we\'re more than happy in helping answer your questions.\n                    </p>\n                </div>\n                <aside class="col col-1-2">\n                    <p><strong>Have feedback or ideas?</strong> Let us know by creating a new <a href="https://github.com/montagejs/montage/issues" target=_blank>issue</a>, join us in <a href="http://webchat.freenode.net/?channels=montage" target=_blank>IRC</a> or post questions to our <a href="https://groups.google.com/forum/?fromgroups#!forum/montagejs" target=_blank>Google Group</a>. We\'re also on <a href="https://twitter.com/montagejs" target=_blank>Twitter</a> and <a href="https://plus.google.com/116915300739108010954/" target=_blank>Google+</a>.\n                    </p>\n                </aside>\n            </div>\n        </article>\n    </section>\n\n\n    <section id=social class=social>\n        <article>\n\n            <div class="button-group github">\n                <iframe src="http://ghbtns.com/github-btn.html?user=montagejs&amp;repo=montage&amp;type=watch&amp;count=true" allowtransparency=true frameborder=0 scrolling=0 width=90px height=20px></iframe>\n                <iframe src="http://ghbtns.com/github-btn.html?user=montagejs&amp;repo=montage&amp;type=fork&amp;count=true" allowtransparency=true frameborder=0 scrolling=0 width=90px height=20px></iframe>\n            </div>\n\n\n            <div class="button-group twitter">\n                <a href="https://twitter.com/share" class=twitter-share-button data-via=montagejs data-count=none>Tweet</a>\n                <script>!function(s,n,a){var e,t=s.getElementsByTagName(n)[0];s.getElementById(a)||(e=s.createElement(n),e.id=a,e.src="//platform.twitter.com/widgets.js",t.parentNode.insertBefore(e,t))}(document,"script","twitter-wjs");</script>\n                <a href="https://twitter.com/montagejs" class=twitter-follow-button data-show-count=false data-show-screen-name=false>Follow @montagejs</a>\n                <script>!function(s,n,a){var e,t=s.getElementsByTagName(n)[0];s.getElementById(a)||(e=s.createElement(n),e.id=a,e.src="//platform.twitter.com/widgets.js",t.parentNode.insertBefore(e,t))}(document,"script","twitter-wjs");</script>\n            </div>\n\n            <div class="button-group g-plus">\n                \n                <script src="https://apis.google.com/js/plusone.js"></script>\n                \n                <div class=g-plusone data-size=medium data-annotation=inline data-width=200></div>\n                \n                <script>gapi.plusone.go();</script>\n            </div>\n\n        </article>\n    </section>\n\n\n    <footer class=footer>\n        2013 montagejs.org - <a href="https://github.com/montagejs/montagejs.org">Contributions</a> to this page are welcomed.\n    </footer>\n\n\n    \n    <script>var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-35717912-1"]),_gaq.push(["_trackPageview"]),function(){var s=document.createElement("script");s.type="text/javascript",s.async=!0,s.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(s,n)}();</script>\n\n</body>\n</html>'});