montageDefine("68ab44f","ui/moviepopup.reel/moviepopup.html",{text:'<!DOCTYPE html>\n\n<html>\n    <head>\n        <meta http-equiv=content-type content="text/html; charset=utf-8">\n        <link rel=stylesheet type="text/css" href=moviepopup.css>\n        <script src="http://www.youtube.com/player_api"></script>\n        <script type="text/montage-serialization">{"closeButton":{"prototype":"montage/ui/button.reel","properties":{"element":{"#":"close-button"}},"listeners":[{"type":"action","listener":{"@":"owner"}}]},"owner":{"properties":{"element":{"#":"moviepopup"},"player":{"#":"iframe"}}}}</script>\n    </head>\n\n    <body>\n        <div data-montage-id=moviepopup class=moviepopup>\n            <button data-montage-id=close-button class="button button-close">x</button>\n            <iframe data-montage-id=iframe class=montage-youtube-player type="text/html" width=1024 height=616 frameborder=0 allowfullscreen=allowfullscreen></iframe>​\n        </div>\n    </body>\n\n</html>'})