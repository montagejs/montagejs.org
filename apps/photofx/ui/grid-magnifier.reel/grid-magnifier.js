var Montage=require("montage").Montage,Component=require("montage/ui/component").Component,dom=require("montage/ui/dom"),Point=require("montage/core/geometry/point").Point;exports.GridMagnifier=Montage.create(Component,{_loupe:{value:null,serializable:!0},_canvas:{value:null},_grid:{value:null},grid:{get:function(){return this._grid},set:function(e){if(e===this._grid)return;this._grid=e,this.needsDraw=!0}},_width:{value:null},_height:{value:null},_pageCenterX:{value:null},_pageCenterY:{value:null},x:{value:null},y:{value:null},color:{value:null},colorPickerEnabled:{value:!1},handleColorpick:{value:function(e){this._pageCenterX=e.pageX,this._pageCenterY=e.pageY,this.x=e.canvasX,this.y=e.canvasY,this.grid=e.focusGrid,this.color=e.color,document.application.addEventListener("colorpickend",this,!1)}},handleColorpickend:{value:function(){document.application.removeEventListener("colorpickend",this,!1),this._pageCenterX=null,this._pageCenterY=null,this.grid=null}},_followPointer:{value:!1,serializable:!0},followPointer:{get:function(){return this._followPointer},set:function(e){if(e===this._followPointer)return;this._followPointer=e,this.needsDraw=!0}},prepareForDraw:{value:function(){document.application.addEventListener("colorpick",this,!1);var e=this._canvas.cloneNode(!0);this._canvas.parentNode.replaceChild(e,this._canvas),this._canvas=e,this._context=this._canvas.getContext("2d")}},willDraw:{value:function(){this._width=this._loupe.offsetWidth,this._height=this._loupe.offsetHeight}},draw:{value:function(){if(!this._width||!this._height||!this.grid){this.element.classList.remove("active");return}this.element.classList.add("active"),this.followPointer?this.element.classList.remove("stationary"):this.element.classList.add("stationary");var e=10,t=this._pageCenterX-this._width/2-e/2,n=this._pageCenterY-this._height/2-e/2,r=dom.convertPointFromPageToNode(this.element.parentNode,Point.create().init(t,n)),i=this.grid.data,s=this._context,o,u,a=0,f=Math.floor(this._width/e),l=Math.floor(this._height/e);this.followPointer?this.element.style.webkitTransform="translate3d("+r.x+"px, "+r.y+"px , 0)":this.element.style.webkitTransform="translate3d(0, 0, 0)",s.clearRect(0,0,this._width,this._height);for(u=0;u<f;u++)for(o=0;o<l;o++)s.fillStyle="rgba("+i[a]+","+i[a+1]+","+i[a+2]+","+i[a+3]+")",s.fillRect(o*e,u*e,e,e),a+=4;s.globalAlpha=.1,s.globalCompositeOperation="xor",s.strokeStyle="#000",s.lineWidth=1,s.beginPath();for(o=0;o<=this._width;o+=e)s.moveTo(o,0),s.lineTo(o,this._height);for(u=0;u<=this._height;u+=e)s.moveTo(0,u),s.lineTo(this._width,u);s.stroke(),s.closePath(),s.globalAlpha=1,s.globalCompositeOperation="source-over",s.strokeRect(Math.floor(l/2)*e,Math.floor(f/2)*e,e,e)}}})