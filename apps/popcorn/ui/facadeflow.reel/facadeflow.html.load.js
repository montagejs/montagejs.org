montageDefine("68ab44f","ui/facadeflow.reel/facadeflow.html",{text:'<!DOCTYPE html>\n\n<html>\n    <head>\n        <meta http-equiv=content-type content="text/html; charset=utf-8">\n        <link rel=stylesheet type="text/css" href=facadeflow.css>\n        <script type="text/montage-serialization">{"flow":{"prototype":"montage/ui/flow.reel","properties":{"element":{"#":"flow"},"isSelectionEnabled":false,"cameraFov":36.99,"cameraTargetPoint":[0,0,0],"stride":1},"bindings":{"contentController":{"<-":"@owner.buttonController"}}},"image":{"prototype":"ui/image.reel","properties":{"element":{"#":"image"}},"bindings":{"src":{"<-":"@flow.objectAtCurrentIteration.posters.detailed"}}},"details":{"prototype":"ui/details.reel","properties":{"element":{"#":"details"}},"bindings":{"data":{"<-":"@owner.selectedMovie"}}},"owner":{"properties":{"element":{"#":"facade-flow"}},"bindings":{"scroll":{"<-":"@flow.scroll"}}}}</script>\n    </head>\n\n    <body>\n        <div data-montage-id=facade-flow class=facade-flow>\n            <div data-montage-id=flow class="flow flow-fade-out" style="width: 1024px; height: 420px">\n                <div data-montage-id=image class=Image></div>\n            </div>\n            <div class=film></div>\n            <div data-montage-id=details class="details details-fade-out"></div>\n        </div>\n    </body>\n\n</html>'})