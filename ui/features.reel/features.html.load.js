montageDefine("99a0ca4","ui/features.reel/features.html",{text:'<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <link rel=stylesheet href=features.css>\n    <script type="text/montage-serialization">{"owner":{"prototype":"ui/features.reel","properties":{"element":{"#":"component"}}},"number":{"prototype":"digit/ui/number-field.reel","properties":{"element":{"#":"number"},"min":0,"max":100,"step":1},"bindings":{"value":{"<->":"@slider.value"}}},"slider":{"prototype":"digit/ui/slider.reel","properties":{"element":{"#":"slider"},"min":0,"max":100,"step":1,"value":50}},"numberValue":{"prototype":"montage/ui/text.reel","properties":{"element":{"#":"numberValue"}},"bindings":{"value":{"<-":"@number.value","converter":{"@":"owner"}}}},"rangeValue":{"prototype":"montage/ui/text.reel","properties":{"element":{"#":"rangeValue"}},"bindings":{"value":{"<-":"@number.value","converter":{"@":"owner"}}}}}</script>\n\n</head>\n<body>\n\n    <div data-montage-id=component data-montage-skin=light>\n        <div class=cols>\n            <p class="col col-2-3">Montage data binding makes it easier to manage your application and UI state. A UI component or Montage object can establish one way or bi-directional binding with another component or object. The source object is kept in sync when you update the bound property of the bound object. Learn more about <a href="docs/Data-binding" target=_blank>data binding</a>.</p>\n            <ul class="col col-1-3">\n                <li>\n                    <input type=number data-montage-id=number value=50>\n                </li>\n                <li class=arrow>↕</li>\n                <li>\n                    <input type=range data-montage-id=slider value=50>\n                </li>\n            </ul>\n        </div>\n\n\n        <div class="block markup">\n<pre>\n&lt;input data-montage-id="<span class=hl-number>number</span>" type="number" value="<span data-montage-id=numberValue class=hl-value>0</span>" /&gt;\n&lt;input data-montage-id="<span class=hl-range>range</span>" type="range" value="<span data-montage-id=rangeValue class=hl-value>0</span>" /&gt;\n</pre>\n        </div>\n\n        <div class="block serialization">\n<pre>\n"number": {\n    "prototype": "digit/ui/number-field.reel",\n    "properties": { "element": {"#": "<span class=hl-number>number</span>"} }\n},\n"slider": {\n    "prototype": "digit/ui/slider.reel",\n    "properties": { "element": {"#": "<span class=hl-range>slider</span>"} },\n    <span class=hl-bindings>"bindings": { "value": {"&lt;-&gt;": "@number.value"} }</span>\n}\n</pre>\n        </div>\n    </div>\n\n</body>\n</html>'});