montageDefine("1245296","runtime/projection",{dependencies:["runtime/dependencies/gl-matrix","runtime/base"],factory:function(e,t,n){e("runtime/dependencies/gl-matrix");var r=e("runtime/base").Base;t.Projection=Object.create(r,{_matrix:{value:null,writable:!0},_type:{value:null,writable:!0},_xfov:{value:0,writable:!0},_yfov:{value:0,writable:!0},_xmag:{value:0,writable:!0},_ymag:{value:0,writable:!0},_znear:{value:0,writable:!0},_zfar:{value:0,writable:!0},_aspectRatio:{value:0,writable:!0},_dirtyFlag:{value:!1,writable:!0},projection:{get:function(){return this._type},set:function(e){this._type!==e&&(this._type=e,this._dirtyFlag=!0)}},xfov:{get:function(){return this._xfov},set:function(e){this._xfov!==e&&(this._xfov=e,this._dirtyFlag=!0)}},yfov:{get:function(){return this._yfov},set:function(e){this._yfov!==e&&(this._yfov=e,this._dirtyFlag=!0)}},xmag:{get:function(){return this._xmag},set:function(e){this._xmag!==e&&(this._xmag=e,this._dirtyFlag=!0)}},ymag:{get:function(){return this._ymag},set:function(e){this._ymag!==e&&(this._ymag=e,this._dirtyFlag=!0)}},znear:{get:function(){return this._znear},set:function(e){this._znear!==e&&(this._znear=e,this._dirtyFlag=!0)}},zfar:{get:function(){return this._zfar},set:function(e){this._zfar!==e&&(this._zfar=e,this._dirtyFlag=!0)}},aspectRatio:{get:function(){return this._aspectRatio},set:function(e){this._aspectRatio!==e&&(this._aspectRatio=e,this._dirtyFlag=!0)}},matrix:{get:function(){if(this._dirtyFlag){if(this.projection==="perspective"){var e=this.yfov;e===0&&(e=this.aspectRatio*this.xfov),this.aspectRatio!==0?aspectRatio=this.aspectRatio:this.xfov!==0&&this.yfov!==0&&(aspectRatio=this.xfov/this.yfov),this._matrix=mat4.perspective(e,aspectRatio,this.znear,this.zfar)}else type!="orthographic"&&console.log("WARNING: unhandled camera type:"+type);this._dirtyFlag=!1}return this._matrix},set:function(e){this._matrix=e}},initWithDescription:{value:function(e){this.__Base_init(),this.projection=e.projection?e.projection:null,this.xfov=e.xfov?e.xfov:0,this.yfov=e.yfov?e.yfov:0,this.xmag=e.xmag?e.xmag:0,this.ymag=e.ymag?e.ymag:0,this.znear=e.znear?e.znear:1,this.zfar=e.zfar?e.zfar:100,this.aspectRatio=e.aspect_ratio?e.aspect_ratio:0,this.aspectRatio||(this.aspectRatio=e.aspectRatio?e.aspectRatio:0),this._dirtyFlag=!0}},init:{value:function(e){this.__Base_init(),this.projection=null,this.xfov=0,this.yfov=0,this.xmag=0,this.ymag=0,this.znear=1,this.zfar=100,this.aspectRatio=4/3,this._dirtyFlag=!0}}})}})