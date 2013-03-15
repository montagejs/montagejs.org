montageDefine("62969ad","docs/Spec:-KeyComposer-&-KeyManager.html",{text:'<!doctype html>\n<html>\n<head>\n    <meta charset=utf-8>\n    <meta name=viewport content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">\n    <meta http-equiv=X-UA-Compatible content="chrome=1">\n    \n    <title>Spec: KeyComposer &amp; KeyManager - Montage Docs</title>\n    \n    <link rel=stylesheet href="http://fonts.googleapis.com/css?family=Open+Sans:400,700">\n    <link rel=stylesheet href="../stylesheets/normalize.css">\n    <link rel=stylesheet href="../stylesheets/base.css">\n    <link rel=stylesheet href="../stylesheets/pages.css">\n    <link rel=stylesheet href="../stylesheets/solarized.css">\n        \n    <!--[if lt IE 9]><script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->    \n</head>\n<body class=docs>\n  \n    <header class="header header-pages pushed">\n        <div class=header-container>\n            <a href="/"><img class=logo src="../images/logo-pages.png" alt=Montage></a>\n            <nav class=nav>\n                <a class=nav-item href="/apps">Apps</a>\n                <a class="nav-item active" href="/docs">Docs</a>\n            </nav>\n        </div>\n    </header>\n    \n    <section id=docs>\n        <article>\n            <div class=markdown-body>\n\n<h2>Introduction<a class=anchor id=Introduction href="#Introduction"></a>\n</h2>\n\n<p>A desktop application would not be complete without shortcuts, usually menu shortcuts. There is no difference with a web application, Montage needs to provides support for shortcuts.</p>\n\n<p>At the time this specs is written, Montage does not offer a menu component, however shortcut could be used by an application event without menus.</p>\n\n<p>There is two types of key sequences: shortcuts and hotkeys. A shortcut consists of multiple keys pressed at the same time, usually including at least one modifier key such as command, alt, control, meta or shift (i.e: CMD+Z, CTRL+X, CMD+SHIFT+TAB). A Hotkey consists of only one key (i.e: TAB, ENTER, ESC).</p>\n\n<p>In the context of Montage, there is no reason to differentiate hotkeys from shortcuts, therefore when this document uses the term shortcuts, it means shortcuts and hotkeys, unless say otherwise.</p>\n\n<p>Due to the complex disparity in handling key events across browsers, platform and keyboard layout (l10n), shortcuts needs to stay simple in order to be compatible as much as possible, ideally shortcut should uses only letters A to Z, numbers 0 to 9 and some punctuation. Even so, it would be hard to guarantee that a specific shortcut would work everywhere.</p>\n\n<p>Another limitation is that a shortcut can only consists of none or several modifiers and one other key. Montage will not support shortcut such as CMD+P+R. Hotkeys by definition are only one key.</p>\n\n<h2>Mac versus the rest of the world!<a class=anchor id="Mac-versus-the-rest-of-the-world!" href="#Mac-versus-the-rest-of-the-world!"></a>\n</h2>\n\n<p>Macintosh uses the Command key (⌘) while other vendors (including iOS) uses the control key for standard shortcuts modifier. ⌘+Z on Mac is the equivalent of Control+Z on Windows and Unix. The ⌘ key correspond to the DOM META modifier key.</p>\n\n<p>By using the term CMD or COMMAND in a shortcut, it will be interpreted internally as META on Mac and CTRL elsewhere. However, if you specify CTRL or META in the shortcut sequence, it will be interpreted as is on all platforms.</p>\n\n<h2>Solution<a class=anchor id=Solution href="#Solution"></a>\n</h2>\n\n<p>The solution retained consists of KeyComposers and a KeyManager.</p>\n\n<p>If you want to provide a shortcut for your component, let say command+z for undo, you first need to create a key (KeyComposer) and add an event listener on that key:</p>\n\n<p></p><div class=highlight><pre><span class=kd>var</span> <span class=nx>KeyComposer</span> <span class=o>=</span> <span class=nx>require</span><span class=p>(</span><span class=s2>"montage/ui/composer/key-composer"</span><span class=p>).</span><span class=nx>KeyComposer</span><span class=p>;</span>\n</pre></div>\n\n<p>// short way\n</p><div class=highlight><pre><span class=nx>KeyComposer</span><span class=p>.</span><span class=nx>createKey</span><span class=p>(</span><span class=k>this</span><span class=p>,</span> <span class=s2>"command+z"</span><span class=p>,</span> <span class=s2>"undo"</span><span class=p>).</span><span class=nx>addEventListener</span><span class=p>(</span><span class=s2>"keyPress"</span><span class=p>,</span> <span class=k>this</span><span class=p>);</span>\n</pre></div>\n\n<p>// long way\n</p><div class=highlight><pre><span class=kd>var</span> <span class=nx>undoKeyComposer</span> <span class=o>=</span> <span class=nx>KeyComposer</span><span class=p>.</span><span class=nx>create</span><span class=p>();</span>\n<span class=nx>undoKeyComposer</span><span class=p>.</span><span class=nx>keys</span> <span class=o>=</span> <span class=s2>"command+z"</span><span class=p>;</span>\n<span class=nx>undoKeyComposer</span><span class=p>.</span><span class=nx>identifier</span> <span class=o>=</span> <span class=s2>"undo"</span><span class=p>;</span>\n<span class=k>this</span><span class=p>.</span><span class=nx>addComposer</span><span class=p>(</span><span class=nx>undoKeyComposer</span><span class=p>);</span>\n<span class=nx>undoKeyComposer</span><span class=p>.</span><span class=nx>addEventListener</span><span class=p>(</span><span class=s2>"keyPress"</span><span class=p>,</span> <span class=k>this</span><span class=p>);</span>\n</pre></div>\n\n<p>then you need to define an listener handler (unless you provided a function  when adding the listener), here are the different handler possibilities for the undo key above:</p>\n\n<p></p><div class=highlight><pre><span class=nx>handleEvent</span><span class=o>:</span> <span class=p>{</span><span class=nx>value</span><span class=o>:</span> <span class=kd>function</span><span class=p>(</span><span class=nx>event</span><span class=p>)</span> <span class=p>{...}}</span>\n<span class=nx>handleKeyPress</span> <span class=p>{</span><span class=nx>value</span><span class=o>:</span> <span class=kd>function</span><span class=p>(</span><span class=nx>event</span><span class=p>)</span> <span class=p>{...}}</span>\n<span class=nx>handleUndoKeyPress</span><span class=o>:</span> <span class=p>{</span><span class=nx>value</span><span class=o>:</span> <span class=kd>function</span><span class=p>(</span><span class=nx>event</span><span class=p>)</span> <span class=p>{...}}</span>\n<span class=nx>captureKeyPress</span> <span class=p>{</span><span class=nx>value</span><span class=o>:</span> <span class=kd>function</span><span class=p>(</span><span class=nx>event</span><span class=p>)</span> <span class=p>{...}}</span>\n<span class=nx>captureUndoKeyPress</span><span class=o>:</span> <span class=p>{</span><span class=nx>value</span><span class=o>:</span> <span class=kd>function</span><span class=p>(</span><span class=nx>event</span><span class=p>)</span> <span class=p>{...}}</span>\n</pre></div>\n\n<p>The target property of the event is the KeyComposer object that triggered the event. The activeElement property represents the element who received the keyboard event, could be the keyComposer\'s element or one of its descendant:</p>\n\n<p></p><div class=highlight><pre><span class=nx>handleKeyPress</span><span class=o>:</span> <span class=p>{</span><span class=nx>value</span><span class=o>:</span> <span class=kd>function</span><span class=p>(</span><span class=nx>event</span><span class=p>)</span> <span class=p>{</span>\n	<span class=kd>var</span> <span class=nx>keyComposer</span> <span class=o>=</span> <span class=nx>event</span><span class=p>.</span><span class=nx>target</span><span class=p>,</span>\n    <span class=nx>activeElement</span> <span class=o>=</span> <span class=nx>event</span><span class=p>.</span><span class=nx>activeElement</span><span class=p>;</span>\n\n	<span class=k>if</span> <span class=p>(</span><span class=nx>keyComposer</span><span class=p>.</span><span class=nx>identifier</span> <span class=o>===</span> <span class=s2>"undo"</span><span class=p>)</span> <span class=p>{</span>\n		<span class=p>...</span>\n	<span class=p>}</span>\n<span class=p>}}</span>\n</pre></div>\n\n<p>You can also instantiate and configure a KeyComposer directly from a template:</p>\n\n<p></p><div class=highlight><pre><span class=p>{</span>\n    <span class=nt>"myShortcut"</span><span class=p>:</span> <span class=p>{</span>\n        <span class=nt>"prototype"</span><span class=p>:</span> <span class=s2>"montage/ui/composer/key-composer"</span><span class=p>,</span>\n        <span class=nt>"properties"</span><span class=p>:</span> <span class=p>{</span>\n            <span class=nt>"keys"</span><span class=p>:</span> <span class=s2>"command+z"</span><span class=p>,</span>\n            <span class=nt>"identifier"</span><span class=p>:</span> <span class=s2>"undo"</span><span class=p>,</span>\n            <span class=nt>"component"</span><span class=p>:</span> <span class=p>{</span><span class=nt>"@"</span><span class=p>:</span> <span class=s2>"example"</span><span class=p>}</span>\n        <span class=p>},</span>\n        <span class=nt>"listeners"</span><span class=p>:</span> <span class=p>[</span>\n            <span class=p>{</span>\n                <span class=nt>"type"</span><span class=p>:</span> <span class=s2>"keyPress"</span><span class=p>,</span>\n                <span class=nt>"listener"</span><span class=p>:</span> <span class=p>{</span><span class=nt>"@"</span><span class=p>:</span> <span class=s2>"delegate"</span><span class=p>}</span>\n            <span class=p>}</span>\n        <span class=p>]</span>\n    <span class=p>}</span>\n<span class=p>}</span>\n</pre></div>\n\n<p>While a Composer can only be associated with a Montage UI Component, the KeyComposer accept to be attached to any Montage Object. If the component does not have an element property, the scope of the ComposerKey will be the window itself.</p>\n\n<p>Behind the scene, the KeyComposer will instantiate the defaultKeyManager and register the key with the manager. This is done only once the composer has been loaded and that at least one event listener has been added. To prevent loading the KeyManager code when not needed, the KeyComposer uses a KeyManagerProxy. The KeyManager itself will be loaded asynchronously after most components of the application has been already loaded.</p>\n\n<p>The KeyManager will listen for native key events (keydown, keypress and keyup) on behalf of all the KeyComposer objects and detect if any composed key has been pressed or released and dispatch keyPress, longKeyPress (must be pressed for at least 1 second) and keyRelease custom events on the corresponding KeyComposer object using the composer\'s element as target.</p>\n\n<p>If you need a shortcut which is not depending on a specific target, you can either set the element of the KeyComposer object to the window element or just use the KeyComposer.createGlobalKey method.</p>\n\n<p>The developer should not have to interact directly with the KeyManager but only with the KeyComposer. The only reason to access the KeyManager would be to adjust the threshold of long key presses:</p>\n\n<p>var defaultKeyManger = require("core/event/key-manager").defaultKeyManager;\ndefaultKeyManger.longPressThreshold = 500;\nKey sequence</p>\n\n<p>A key sequences (keys) consists of a list of modifier\'s names followed by one character or key name separated by the + character. Capitalization in the sequence as well spaces are ignored. Order of the modifiers does not matter. Here are some valid key sequences:</p>\n\n<p><code>enter</code>\n<code>command+Z</code>\n<code>shift + cmd + z</code>\n<code>ctrl+alt</code>  (in that case, <code>alt</code> is considered as the key and <code>ctrl</code> as the modifier)</p>\n\n<p>A modifier could be any of the following:\n<code>shift</code>\n<code>control</code> or <code>ctl</code>, <code>ctrl</code>\n<code>alt</code>or <code>opt</code>, <code>option</code>\n<code>meta</code> or <code>win</code>, <code>windows</code>\nThe following key names are accepted in key sequence (note: not all name will work on every device of browser):</p>\n\n<p><code>\n    backspace\n    tab\n    enter\n    capslock\n    escape\n    space\n    pageup\n    pagedown\n    end\n    home\n    left\n    up\n    right\n    down\n    delete\n    semicolumn\n    column\n    equal\n    plus\n    comma\n    less\n    minus\n    underscore\n    period\n    greater\n    slash\n    questionmark\n    backtick\n    tilde\n    openingsquarebracket\n    openingcurlybracket\n    backslash\n    pipe\n    closingsquarebracket\n    closingcurlybracket\n    singlequote\n    doublequote\n    clear\n    numpad0 to numpad9\n    multiply\n    add\n    subtract\n    decimal\n    divide\n    f1 to f24\n</code></p>\n\n<h1>KeyComposer API<a class=anchor id=KeyComposer-API href="#KeyComposer-API"></a>\n</h1>\n\n<p><code>montage/ui/composer/key-composer.KeyComposer</code></p>\n\n<p>Create a virtual key composed of none or several key modifiers (shift, control, alt and meta) and one native key.</p>\n\n<h3>Properties summary<a class=anchor id=Properties-summary href="#Properties-summary"></a>\n</h3>\n\n<p><code>identifier</code>    The keyComposer\'s identifier.</p>\n\n<p><code>keys</code>  The sequence of keys to compose.</p>\n\n<h3>Method summary<a class=anchor id=Method-summary href="#Method-summary"></a>\n</h3>\n\n<p><code>addEventListener</code>  Add an event listener to the composerKey.</p>\n\n<p><code>createGlobalKey</code>   Create a global composerKey. A global key will dispatch events without requiring the component\'s element be in the native key event target path If no identifier is provided, the keys and component\'s identifier will be used to generate an identifier. Note: You do not have to call KeyComposer.create() before calling this method.</p>\n\n<p><code>createKey</code> Create a ComposerKey. The key will only dispatch events when the component\'s element is in the native key event target path. If no identifier is provided, the keys and component\'s identifier will be used to generate an identifier. Note: You do not have to call KeyComposer.create() before calling this method.</p>\n\n<p><strong>Extends</strong></p>\n\n<p><code>module:montage/ui/composer/composer.Composer</code></p>\n\n<h2>Members<a class=anchor id=Members href="#Members"></a>\n</h2>\n\n<h3>\n<code>identifier</code> :string<a class=anchor id=identifier-:string href="#identifier-:string"></a>\n</h3>\n\n<p>The keyComposer\'s identifier.\nDefault Value: null</p>\n\n<h3>\n<code>keys</code> :string<a class=anchor id=keys-:string href="#keys-:string"></a>\n</h3>\n\n<p>The sequence of keys to compose.\nDefault Value: null</p>\n\n<h2>Methods<a class=anchor id=Methods href="#Methods"></a>\n</h2>\n\n<h3>\n<code>addEventListener()</code><a class=anchor id="addEventListener()" href="#addEventListener()"></a>\n</h3>\n\n<p>Add an event listener to the composerKey.</p>\n\n<p><strong>Parameters:</strong></p>\n\n<p><code>type</code>          string               Any of the following types: keyPress, longKeyPress and keyRelease.</p>\n\n<p><code>listener</code>  Object | function    The listener object or function to call when dispatching the event.</p>\n\n<p><code>useCapture</code>    boolean              Specify if the listener want to be called during the capture phase of the event.</p>\n\n<h3>\n<code>createGlobalKey()</code> → {Object}<a class=anchor id="createGlobalKey()-→-{Object}" href="#createGlobalKey()-%E2%86%92-%7BObject%7D"></a>\n</h3>\n\n<p>Create a global composerKey. A global key will dispatch events without requiring the component\'s element be in the native key event target path If no identifier is provided, the keys and component\'s identifier will be used to generate an identifier. Note: You do not have to call KeyComposer.create() before calling this method.</p>\n\n<p><strong>Parameters:</strong></p>\n\n<p><code>component</code> Object     The component to attach the keyComposer to.</p>\n\n<p><code>keys</code>          Object     The key sequence.</p>\n\n<p><code>identifier</code>    Object     The identifier.</p>\n\n<p><strong>Returns:</strong> the newly created KeyComposer Object - TypeObject</p>\n\n<h3>\n<code>createKey()</code> → {Object}<a class=anchor id="createKey()-→-{Object}" href="#createKey()-%E2%86%92-%7BObject%7D"></a>\n</h3>\n\n<p>Create a ComposerKey. The key will only dispatch events when the component\'s element is in the native key event target path. If no identifier is provided, the keys and component\'s identifier will be used to generate an identifier. Note: You do not have to call KeyComposer.create() before calling this method.</p>\n\n<p><strong>Parameters</strong>:</p>\n\n<p><code>component</code> Object  The component to attach the keyComposer to.</p>\n\n<p><code>keys</code>  Object  The key sequence.</p>\n\n<p><code>identifier</code>    Object  The identifier.</p>\n\n<p><strong>Returns:</strong> the newly created KeyComposer Object - TypeObject</p>\n\n<h2>Events:<a class=anchor id=Events: href="#Events:"></a>\n</h2>\n\n<p><code>keyPress</code>  Triggered when a composerKey is pressed</p>\n\n<p><code>longKeyPress</code>  Triggered when a composerKey is presses for long period of time (see KeyManager.longPressThreshold)</p>\n\n<p><code>keyRelease</code>    Triggered when a keyComposer is released</p>\n\n<p>Each Events has a target property who represents a keyComposer and an activeElement property who represents the DOM element who received the keyboard event. activeElement could be the composerKey\'s element or one of its descendant.</p>\n\n<h1>KeyManager API<a class=anchor id=KeyManager-API href="#KeyManager-API"></a>\n</h1>\n\n<p><code>montage/core/event/key-manager.KeyManager</code></p>\n\n<p>The KeyManager dispatches KeyComposer events when it detects a keyComposer has been pressed or released. Do not create a KeyManager directly but instead require for the defaultKeyManager: require("core/event/key-manager").defaultKeyManager</p>\n\n<h3>Properties summary<a class=anchor id=Properties-summary href="#Properties-summary"></a>\n</h3>\n\n<p><code>longPressThreshold</code>    The number of milliseconds a key must be pressed in order to dispatch a longKeyPress event.</p>\n\n<h3>Method summary<a class=anchor id=Method-summary href="#Method-summary"></a>\n</h3>\n\n<p><code>registerKey</code>   Register a composerKey.</p>\n\n<p><code>unregisterKey</code> Unregister a composerKey. if a key has been registered multiple time, unregister must be called the same amount of time before the key is actually unregistered.</p>\n\n<p><strong>Extends</strong> <code>module:montage/core/core.Montage</code></p>\n\n<h2>Members<a class=anchor id=Members href="#Members"></a>\n</h2>\n\n<h3>\n<code>longPressThreshold</code> :number<a class=anchor id=longPressThreshold-:number href="#longPressThreshold-:number"></a>\n</h3>\n\n<p>The number of milliseconds a key must be pressed in order to dispatch a longKeyPress event.\nDefault Value: 1000</p>\n\n<h2>Methods<a class=anchor id=Methods href="#Methods"></a>\n</h2>\n\n<h3>\n<code>registerKey()</code><a class=anchor id="registerKey()" href="#registerKey()"></a>\n</h3>\n\n<p>Register a composerKey.</p>\n\n<p><strong>Parameters:</strong></p>\n\n<p><code>keyComposer</code>   Object  The key to register.</p>\n\n<h3>\n<code>unregisterKey()</code><a class=anchor id="unregisterKey()" href="#unregisterKey()"></a>\n</h3>\n\n<p>Unregister a composerKey. if a key has been registered multiple time, unregister must be called the same amount of time before the key is actually unregistered.\nParameters:</p>\n\n<p><code>keyComposer</code>   Object  The key to unregister.</p>\n\n                </div>\n        </article>\n    </section>\n\n    <section id=next class=next>\n        <article>\n            <h3 class=title>More help?</h3>\n            <div class=cols>\n                <div class="col col-1-2">\n                    <p>Can\'t find what you are looking for? Get in touch, we\'re more than happy in helping answer your questions.\n                    </p>\n                </div>\n                <aside class="col col-1-2">\n                    <p><strong>Have feedback or ideas?</strong> Let us know by creating a new <a href="https://github.com/montagejs/montage/issues" target=_blank>issue</a>, join us in <a href="http://webchat.freenode.net/?channels=montage" target=_blank>IRC</a> or post questions to our <a href="https://groups.google.com/forum/?fromgroups#!forum/montagejs" target=_blank>Google Group</a>. We\'re also on <a href="https://twitter.com/montage_js" target=_blank>Twitter</a> and <a href="https://plus.google.com/116915300739108010954/" target=_blank>Google+</a>.\n                    </p>\n                </aside>\n            </div>\n        </article>\n    </section>\n\n    \n    <section id=social class=social>\n        <article>\n            \n            <div class="button-group github">\n                <iframe src="http://ghbtns.com/github-btn.html?user=montagejs&amp;repo=montage&amp;type=watch&amp;count=true" allowtransparency=true frameborder=0 scrolling=0 width=90px height=20px></iframe>\n                <iframe src="http://ghbtns.com/github-btn.html?user=montagejs&amp;repo=montage&amp;type=fork&amp;count=true" allowtransparency=true frameborder=0 scrolling=0 width=90px height=20px></iframe>\n            </div>\n            \n            \n            <div class="button-group twitter">\n                <a href="https://twitter.com/share" class=twitter-share-button data-via=montage_js data-count=none>Tweet</a>\n                <script>!function(e,t,n){var r,i=e.getElementsByTagName(t)[0];e.getElementById(n)||(r=e.createElement(t),r.id=n,r.src="//platform.twitter.com/widgets.js",i.parentNode.insertBefore(r,i))}(document,"script","twitter-wjs")</script>\n                <a href="https://twitter.com/montage_js" class=twitter-follow-button data-show-count=false data-show-screen-name=false>Follow @montage_js</a>\n                <script>!function(e,t,n){var r,i=e.getElementsByTagName(t)[0];e.getElementById(n)||(r=e.createElement(t),r.id=n,r.src="//platform.twitter.com/widgets.js",i.parentNode.insertBefore(r,i))}(document,"script","twitter-wjs")</script>\n            </div>\n            \n            <div class="button-group g-plus">\n                \n                <script src="https://apis.google.com/js/plusone.js">"explicit"</script>\n                \n                <div class=g-plusone data-size=medium data-annotation=inline data-width=200></div>\n                \n                <script>gapi.plusone.go()</script>\n            </div>\n            \n        </article>\n    </section>\n        \n    \n    <footer class=footer>\n        2013 montagejs.org - <a href="https://github.com/montagejs/montagejs.org">Contributions</a> to this page are welcomed.\n    </footer>\n        \n    \n    \n    <script>var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-35717912-1"]),_gaq.push(["_trackPageview"]),function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}()</script>\n    \n</body>\n</html>'})