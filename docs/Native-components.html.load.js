montageDefine("e28e77c","docs/Native-components.html",{text:'<!DOCTYPE html>\n<html>\n<head>\n    <meta charset=utf-8>\n    <meta name=viewport content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">\n    <meta http-equiv=X-UA-Compatible content="chrome=1">\n\n    <title>Native components - Montage Docs</title>\n\n    <link rel=stylesheet href="http://fonts.googleapis.com/css?family=Open+Sans:400,700">\n    <link rel=stylesheet href="../stylesheets/normalize.css">\n    <link rel=stylesheet href="../stylesheets/base.css">\n    <link rel=stylesheet href="../stylesheets/pages.css">\n    <link rel=stylesheet href="../stylesheets/solarized.css">\n\n    <!--[if lt IE 9]><script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->\n</head>\n<body class=docs>\n\n    <header class="header header-pages pushed">\n        <div class=header-container>\n            <a href="/"><img class=logo src="../images/logo-pages.png" alt=Montage></a>\n            <nav class=nav>\n                <a class=nav-item href="/apps">Apps</a>\n                <a class="nav-item active" href="/docs">Docs</a>\n                <a class=nav-item href="/apis">APIs</a>\n            </nav>\n        </div>\n    </header>\n\n    <section id=docs>\n        <article>\n            <div class=markdown-body>\n\n<h1>Native components<a class=anchor id=Native-components href="#Native-components"></a>\n</h1>\n\n<p>Montage initially debuted with a set of custom touch friendly components, dubbed Bluemoon after their blue hue. Its also a name of a beer, but that had nothing to do with it. What so ever.</p>\n\n<p>In the Montage 0.6 release we moved the Bluemoon components to their own folder, and introduced a set of native components. These components wrap elements found in HTML5, giving them access to Montage features such as data bindings and its event handling model. All styling is left to the user-agent/browser or to the author to apply.</p>\n\n<h2>Advantages to native components<a class=anchor id=Advantages-to-native-components href="#Advantages-to-native-components"></a>\n</h2>\n\n<p>There are a number of advantages to using Montage native components over using custom Montage components (such as Bluemoon) or pure HTML5 elements.</p>\n\n<h3>Size and weight<a class=anchor id=Size-and-weight href="#Size-and-weight"></a>\n</h3>\n\n<p>Custom components often include a number of elements to achieve the desired styling. In the case of the slider this can be quite heavy. In addition to the extra markup, the additional CSS also has to be downloaded.</p>\n\n<h3>Styling<a class=anchor id=Styling href="#Styling"></a>\n</h3>\n\n<p>The Bluemoon components are beautiful, but offer their own distinct theme that is optimized for touch. It can look out of place on the desktop where components are often more compact. If you’d like to adjust these components to either fit a different theme or be optimized for typical desktop style applications, it requires you to download the component CSS then add additional styles to override and build upon the current styles.</p>\n\n<p>With native components you start with almost a clean slate, with just the default user-agent/browser styles to override. If you want to build an app that fits into the Bluemoon look and feel then those components are way to go, but if you’d like to employ your own, or the platform’s look and feel, then native components are probably the way to go.</p>\n\n<h3>More semantic elements<a class=anchor id=More-semantic-elements href="#More-semantic-elements"></a>\n</h3>\n\n<p>Bluemoon components such as the button or slider are often made up of <code>&lt;div&gt;</code> elements to facilitate their styling. The native elements just use the natural HTML5 element, so a <code>button</code> is a button (or a <code>input type="button"</code>) and a slider is a <code>input type="range"</code>.</p>\n\n<h3>Keeps the power of Montage<a class=anchor id=Keeps-the-power-of-Montage href="#Keeps-the-power-of-Montage"></a>\n</h3>\n\n<p>While you lose the styling and extra elements associated with the Bluemoon components, you don’t lose anything else. You get to keep the same powerful event binding and event listener model as with the custom components. This means that you don’t have to handle keeping the view and model in sync yourself or write your own event listeners, so you can spend your development effort writing your application logic rather than doing the plumbing.</p>\n\n<h2>The available native components<a class=anchor id=The-available-native-components href="#The-available-native-components"></a>\n</h2>\n\n<p>We went through the HTML5 elements and created an initial list of Montage components:</p>\n\n<h3>Anchor<a class=anchor id=Anchor href="#Anchor"></a>\n</h3>\n\n<p>The <a href="http://montagejs.github.com/montage/samples/sink/#anchor">Anchor</a> component provides hyperlink functionality. It acts as a wrapper around the a element.</p>\n\n<h3>Button<a class=anchor id=Button href="#Button"></a>\n</h3>\n\n<p>The <a href="http://montagejs.github.com/montage/samples/sink/#button">Button</a> component provides button functionality. It wraps either a <code>button</code> element or a <code>input</code> element with a type of button.</p>\n\n<h3>Checkbox<a class=anchor id=Checkbox href="#Checkbox"></a>\n</h3>\n\n<p>The <a href="http://montagejs.github.com/montage/samples/sink/#checkbox">Checkbox</a> component provides checkbox functionality. It wraps an <code>input</code> element with type of checkbox.</p>\n\n<h3>Image<a class=anchor id=Image href="#Image"></a>\n</h3>\n\n<p>The <a href="http://montagejs.github.com/montage/samples/sink/#image">Image</a> component provides functionality for displaying an image. It wraps the <code>img</code> element.</p>\n\n<h3>NumberInput<a class=anchor id=NumberInput href="#NumberInput"></a>\n</h3>\n\n<p>The <a href="http://montagejs.github.com/montage/samples/sink/#numberInput">NumberInput</a> component provides functionality for inputting a number in a text field. This typically includes a number spinner attached to a text field. It wraps the <code>input</code> element with a type of number.</p>\n\n<h3>RadioButton<a class=anchor id=RadioButton href="#RadioButton"></a>\n</h3>\n\n<p>The <a href="http://montagejs.github.com/montage/samples/sink/#radioButton">RadioButton</a> component provides radio button functionality. It wraps the <code>input</code> element with type of radio.</p>\n\n<h3>RangeInput<a class=anchor id=RangeInput href="#RangeInput"></a>\n</h3>\n\n<p>The <a href="http://montagejs.github.com/montage/samples/sink/#inputRange">RangeInput</a> component provides slider functionality. It wraps the <code>input</code> element with type of range.</p>\n\n<h3>SelectInput<a class=anchor id=SelectInput href="#SelectInput"></a>\n</h3>\n\n<p>The <a href="http://montagejs.github.com/montage/samples/sink/#selectInput">SelectInput</a> component provides drop down list functionality in Montage. It wraps the <code>input</code> element with type of select.</p>\n\n<h3>TextArea<a class=anchor id=TextArea href="#TextArea"></a>\n</h3>\n\n<p>The <a href="http://montagejs.github.com/montage/samples/sink/#textarea">TextArea</a> component provides functionality for a multi-line text field. It wraps the <code>textarea</code> element.</p>\n\n<h3>Textfield<a class=anchor id=Textfield href="#Textfield"></a>\n</h3>\n\n<p>The <a href="http://montagejs.github.com/montage/samples/sink/#inputText">Textfield</a> component provides functionality for a single line text field. It wraps the <code>input</code> element with a <code>type</code> of <code>text</code>.</p>\n\n<p>Each component exposes a common set of properties which map to the common HTML attributes. Specialized components such as <code>RangeInput</code> and <code>NumberInput</code> also expose the specific attributes for that type of HTML element. For example the <code>RangeInput</code> component maps range specific attributes such as <code>step</code>, <code>min</code>, <code>max</code>, and so on to Montage properties.</p>\n\n<p>When you wish to update the attributes of a component/element, the properties that Montage components expose should be manipulated, rather than editing the DOM attributes directly via DOM Mutation events or similar methods. Doing it this way will keep the internal state of the components in sync.</p>\n\n<h2>Using native components<a class=anchor id=Using-native-components href="#Using-native-components"></a>\n</h2>\n\n<p>You can use a native component in almost the same way as the Montage specific components. The main differences are that you will provide the styling yourself (we used <a href="http://twitter.github.com/bootstrap/">Twitter’s Bootstrap</a> in the Kitchen Sink examples, but you can style them which ever way you’d like in the regular place you provide your styling), and you need to specify the actual element in your HTML file, rather than using a placeholder element. The hooks for adding the serilization and so on are the same.</p>\n\n<p>Lets look at some demos. It does nothing terribly exciting. In fact it does nothing at all. Its just a HTML button that I’ve hooked up as a Button component:</p>\n\n<p>Relevant HTML:\n</p><div class=highlight><pre><span class=nt>&lt;button</span> <span class=na>id=</span><span class=s>"testButton"</span><span class=nt>&gt;</span>I’m a native button<span class=nt>&lt;/button&gt;</span>\n</pre></div>\n\n<p>Serialization:\n</p><div class=highlight><pre><span class=p>{</span>\n  <span class=nt>"button"</span><span class=p>:</span> <span class=p>{</span>\n    <span class=nt>"module"</span><span class=p>:</span> <span class=s2>"montage/ui/button.reel"</span><span class=p>,</span>\n    <span class=nt>"name"</span><span class=p>:</span> <span class=s2>"Button"</span><span class=p>,</span>\n    <span class=nt>"properties"</span><span class=p>:</span> <span class=p>{</span>\n      <span class=nt>"element"</span><span class=p>:</span> <span class=p>{</span>\n        <span class=nt>"#"</span><span class=p>:</span> <span class=s2>"testButton"</span>\n      <span class=p>}</span>\n    <span class=p>}</span>\n  <span class=p>}</span>\n<span class=p>}</span>\n</pre></div>\n\n<p>I’ve not added any event listeners or bindings to it at all. That is where the interesting part comes in with Montage.</p>\n\n<h2>Using bindings with native components<a class=anchor id=Using-bindings-with-native-components href="#Using-bindings-with-native-components"></a>\n</h2>\n\n<p>In this example I added a range slider which I hooked up to a RangeInput component, and an empty <code>output</code> element, which I hooked up to a DynamicText component. I then bind the DynamicText component to the slider and set its value to be the value of the slider. If you move the slider you’ll see that the value is put into the output element and kept in sync. The slider value will be initially set to 0 as the bindings are two way and the DynamicText component initializes it as 0.</p>\n\n<p>The relevant HTML for this is as follows:\n</p><div class=highlight><pre><span class=nt>&lt;h1&gt;</span>Pump up the volume<span class=nt>&lt;/h1&gt;</span>\n<span class=nt>&lt;form&gt;</span>\n    <span class=nt>&lt;label</span> <span class=na>for=</span><span class=s>"testSlider"</span><span class=nt>&gt;</span>Volume<span class=nt>&lt;/label&gt;</span>\n    <span class=nt>&lt;input</span> <span class=na>type=</span><span class=s>"range"</span> <span class=na>id=</span><span class=s>"testSlider"</span> <span class=na>min=</span><span class=s>"0"</span> <span class=na>max=</span><span class=s>"11"</span><span class=nt>/&gt;</span>\n    <span class=nt>&lt;output</span> <span class=na>for=</span><span class=s>"testSlider"</span> <span class=na>id=</span><span class=s>"volume"</span><span class=nt>&gt;&lt;/output&gt;</span>\n<span class=nt>&lt;/form&gt;</span>\n</pre></div>\n\n<p>and the Serialization:\n</p><div class=highlight><pre><span class=p>{</span>\n  <span class=nt>"slider"</span><span class=p>:</span> <span class=p>{</span>\n     <span class=nt>"module"</span><span class=p>:</span> <span class=s2>"montage/ui/range-input.reel"</span><span class=p>,</span>\n     <span class=nt>"name"</span><span class=p>:</span> <span class=s2>"RangeInput"</span><span class=p>,</span>\n     <span class=nt>"properties"</span><span class=p>:</span> <span class=p>{</span>\n         <span class=nt>"element"</span><span class=p>:</span> <span class=p>{</span><span class=nt>"#"</span><span class=p>:</span> <span class=s2>"testSlider"</span><span class=p>}</span>\n     <span class=p>},</span>\n     <span class=nt>"bindings"</span><span class=p>:</span> <span class=p>{</span>\n         <span class=nt>"value"</span><span class=p>:</span> <span class=p>{</span>\n             <span class=nt>"boundObject"</span><span class=p>:</span> <span class=p>{</span><span class=nt>"@"</span><span class=p>:</span> <span class=s2>"output"</span><span class=p>},</span>\n             <span class=nt>"boundObjectPropertyPath"</span><span class=p>:</span> <span class=s2>"value"</span>\n         <span class=p>}</span>\n     <span class=p>}</span>\n  <span class=p>},</span>\n  <span class=nt>"output"</span><span class=p>:</span> <span class=p>{</span>\n     <span class=nt>"module"</span><span class=p>:</span> <span class=s2>"montage/ui/dynamic-text.reel"</span><span class=p>,</span>\n     <span class=nt>"name"</span><span class=p>:</span> <span class=s2>"DynamicText"</span><span class=p>,</span>\n     <span class=nt>"properties"</span><span class=p>:</span> <span class=p>{</span>\n         <span class=nt>"element"</span><span class=p>:</span> <span class=p>{</span><span class=nt>"#"</span><span class=p>:</span> <span class=s2>"volume"</span><span class=p>},</span>\n         <span class=nt>"value"</span><span class=p>:</span> <span class=mi>0</span>\n     <span class=p>}</span>\n  <span class=p>}</span>                \n<span class=p>}</span>\n</pre></div>\n\n<h2>Native component state<a class=anchor id=Native-component-state href="#Native-component-state"></a>\n</h2>\n\n<p>In the example above you will see that I set two attributes on the slider; min and max. These map to the min and max properties of the RangeInput component. All non-deprecated standard attributes map in this way to a component property. This includes the <a href="http://www.w3.org/TR/html5/elements.html#global-attributes">global attributes</a>, and those specific to each element. All of these properties can be used in bindings.</p>\n\n<p>As these two attributes were specified in the original HTML (rather than with script later), they are available at serialization time and thus the values are stored in their equivalent Montage properties.</p>\n\n<p>If the attributes are updated later after serialization takes place, the new values will not be synced with the Montage properties, and the model and view will get out of sync. As mentioned previously, it is better to update the component properties directly, rather than mutating the DOM, as this will keep things in sync. This potentially also gives you performance gains as DOM manipulation can be performance sensitive, and Montage can optimize how it interacts with the DOM.</p>\n\n<p>I’ve rewritten the previous example to show how to set the properties in the serialization rather than using attributes in the HTML. In this particular case adding via HTML would be fine as they’re added before serialization happens, but it is worth showing how to set it in this manor.</p>\n\n<p>In this example the HTML stays the same, except the range slider:\n</p><div class=highlight><pre><span class=o>&lt;</span><span class=n>input</span> <span class=n>type</span><span class=o>=</span><span class=s>"range"</span> <span class=n>id</span><span class=o>=</span><span class=s>"testSlider"</span><span class=o>/&gt;</span>\n</pre></div>\n\n<p>Then the properties section of the slider serialization is updated to add the two new min and max properties:\n</p><div class=highlight><pre><span class=err>…</span>\n<span class=s2>"slider"</span><span class=err>:</span> <span class=p>{</span>\n    <span class=nt>"module"</span><span class=p>:</span> <span class=s2>"montage/ui/range-input.reel"</span><span class=p>,</span>\n    <span class=nt>"name"</span><span class=p>:</span> <span class=s2>"RangeInput"</span><span class=p>,</span>\n    <span class=nt>"properties"</span><span class=p>:</span> <span class=p>{</span>\n        <span class=nt>"element"</span><span class=p>:</span> <span class=p>{</span><span class=nt>"#"</span><span class=p>:</span> <span class=s2>"testSlider"</span><span class=p>},</span>\n        <span class=nt>"min"</span><span class=p>:</span> <span class=mi>5</span><span class=p>,</span>\n        <span class=nt>"max"</span><span class=p>:</span> <span class=mi>20</span>\n    <span class=p>},</span>\n<span class=err>…</span>\n</pre></div>\n\n<h2>Handling events<a class=anchor id=Handling-events href="#Handling-events"></a>\n</h2>\n\n<p>As you saw previously, using bindings is no different to how they are used with other types of components. This also holds for for handling events. As such I wont talk about it here, but you can view our <a href=Event-handling.html>comprehensive documentation</a> on events. If you follow the instructions there it will also work with your native components.</p>\n\n<blockquote>\n<p>This post was originally written by <em>David Storey</em> and got changed a bit to fit the wiki.</p>\n</blockquote>\n\n                </div>\n        </article>\n    </section>\n\n    <section id=next class=next>\n        <article>\n            <h3 class=title>More help?</h3>\n            <div class=cols>\n                <div class="col col-1-2">\n                    <p>Can\'t find what you are looking for? Get in touch, we\'re more than happy in helping answer your questions.\n                    </p>\n                </div>\n                <aside class="col col-1-2">\n                    <p><strong>Have feedback or ideas?</strong> Let us know by creating a new <a href="https://github.com/montagejs/montage/issues" target=_blank>issue</a>, join us in <a href="http://webchat.freenode.net/?channels=montage" target=_blank>IRC</a> or post questions to our <a href="https://groups.google.com/forum/?fromgroups#!forum/montagejs" target=_blank>Google Group</a>. We\'re also on <a href="https://twitter.com/montagejs" target=_blank>Twitter</a> and <a href="https://plus.google.com/116915300739108010954/" target=_blank>Google+</a>.\n                    </p>\n                </aside>\n            </div>\n        </article>\n    </section>\n\n\n    <section id=social class=social>\n        <article>\n\n            <div class="button-group github">\n                <iframe src="http://ghbtns.com/github-btn.html?user=montagejs&amp;repo=montage&amp;type=watch&amp;count=true" allowtransparency=true frameborder=0 scrolling=0 width=90px height=20px></iframe>\n                <iframe src="http://ghbtns.com/github-btn.html?user=montagejs&amp;repo=montage&amp;type=fork&amp;count=true" allowtransparency=true frameborder=0 scrolling=0 width=90px height=20px></iframe>\n            </div>\n\n\n            <div class="button-group twitter">\n                <a href="https://twitter.com/share" class=twitter-share-button data-via=montagejs data-count=none>Tweet</a>\n                <script>!function(e,t,n){var r,i=e.getElementsByTagName(t)[0];e.getElementById(n)||(r=e.createElement(t),r.id=n,r.src="//platform.twitter.com/widgets.js",i.parentNode.insertBefore(r,i))}(document,"script","twitter-wjs")</script>\n                <a href="https://twitter.com/montagejs" class=twitter-follow-button data-show-count=false data-show-screen-name=false>Follow @montagejs</a>\n                <script>!function(e,t,n){var r,i=e.getElementsByTagName(t)[0];e.getElementById(n)||(r=e.createElement(t),r.id=n,r.src="//platform.twitter.com/widgets.js",i.parentNode.insertBefore(r,i))}(document,"script","twitter-wjs")</script>\n            </div>\n\n            <div class="button-group g-plus">\n                \n                <script src="https://apis.google.com/js/plusone.js">"explicit"</script>\n                \n                <div class=g-plusone data-size=medium data-annotation=inline data-width=200></div>\n                \n                <script>gapi.plusone.go()</script>\n            </div>\n\n        </article>\n    </section>\n\n\n    <footer class=footer>\n        2013 montagejs.org - <a href="https://github.com/montagejs/montagejs.org">Contributions</a> to this page are welcomed.\n    </footer>\n\n\n    \n    <script>var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-35717912-1"]),_gaq.push(["_trackPageview"]),function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}()</script>\n\n</body>\n</html>'})