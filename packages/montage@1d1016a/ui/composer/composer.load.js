montageDefine("1d1016a","ui/composer/composer",{dependencies:["montage"],factory:function(e,t,n){var r=e("montage").Montage;t.Composer=r.create(r,{_component:{value:null},component:{get:function(){return this._component},set:function(e){this._component=e}},_element:{value:null},element:{get:function(){return this._element},set:function(e){this._element=e}},lazyLoad:{value:!1},_needsFrame:{value:!1},needsFrame:{set:function(e){this._needsFrame!==e&&(this._needsFrame=e,this._component&&e&&this._component.scheduleComposer(this))},get:function(){return this._needsFrame}},frame:{value:function(e){}},_resolveDefaults:{value:function(){this.element==null&&this.component!=null&&(this.element=this.component.element)}},_load:{value:function(){this.element||this._resolveDefaults(),this.load()}},load:{value:function(){}},unload:{value:function(){}},deserializedFromTemplate:{value:function(){this.component&&this.component.addComposer(this)}}})}})