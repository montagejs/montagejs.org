montageDefine("1d1016a","ui/native/anchor.reel/anchor",{dependencies:["montage","ui/component","ui/native-control"],factory:function(e,t,n){var r=e("montage").Montage,i=e("ui/component").Component,s=e("ui/native-control").NativeControl,o=t.Anchor=r.create(s,{blur:{value:function(){this._element.blur()}},focus:{value:function(){this._element.focus()}}});o.addAttributes({textContent:null,href:null,hreflang:null,media:null,rel:null,target:null,type:null})}})