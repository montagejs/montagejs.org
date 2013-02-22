montageDefine("5467433","ui/features.reel/features.html",{text:'<!doctype html>\n<html>\n<head>\n    <title></title>\n    <link rel=stylesheet href=features.css>\n    <script type="text/montage-serialization">{"owner":{"prototype":"ui/features.reel","properties":{"element":{"#":"component"}}},"number":{"prototype":"montage/ui/input-number.reel","properties":{"element":{"#":"number"},"min":0,"max":100},"bindings":{"value":{"<->":"@range.value","converter":{"@":"owner"}}}},"range":{"prototype":"montage/ui/input-range.reel","properties":{"element":{"#":"range"},"minValue":0,"maxValue":100,"value":50}},"numberValue":{"prototype":"montage/ui/dynamic-text.reel","properties":{"element":{"#":"numberValue"}},"bindings":{"value":{"<-":"@number.value","converter":{"@":"owner"}}}},"rangeValue":{"prototype":"montage/ui/dynamic-text.reel","properties":{"element":{"#":"rangeValue"}},"bindings":{"value":{"<-":"@number.value","converter":{"@":"owner"}}}}}</script>\n\n</head>\n<body>\n\n    <div data-montage-id=component>\n        <div class=cols>\n            <p class="col col-2-3">Montage data binding makes it easier to manage your application and UI state. A UI component or Montage object can establish one way or bi-directional binding with another component or object. The source object is kept in sync when you update the bound property of the bound object. Learn more about <a href="https://github.com/montagejs/montage/wiki/Data-binding" target=_blank>data binding</a>.</p>\n            <ul class="col col-1-3">\n                <li>\n                    <input data-montage-id=number type=number value=0>\n                </li>\n                <li class=arrow>↕</li>\n                <li>\n                    <input data-montage-id=range type=range value=0>\n                </li>\n            </ul>\n        </div>\n\n\n        <div class="block markup">\n<pre>\n&lt;input data-montage-id="<span class=hl-number>number</span>" type="number" value="<span data-montage-id=numberValue class=hl-value>0</span>" /&gt;\n&lt;input data-montage-id="<span class=hl-range>range</span>" type="range" value="<span data-montage-id=rangeValue class=hl-value>0</span>" /&gt;\n</pre>\n        </div>\n\n        <div class="block serialization">\n<pre>\n"number": {\n    "prototype": "montage/ui/input-number.reel",\n    "properties": { "element": {"#": "<span class=hl-number>number</span>"} }\n},\n"range": {\n    "prototype": "montage/ui/input-range.reel",\n    "properties": { "element": {"#": "<span class=hl-range>range</span>"} },\n    <span class=hl-bindings>"bindings": { "value": {"&lt;-&gt;": "@number.value"} }</span>\n}\n</pre>\n        </div>\n    </div>\n\n</body>\n</html>'})