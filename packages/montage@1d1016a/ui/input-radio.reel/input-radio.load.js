montageDefine("1d1016a","ui/input-radio.reel/input-radio",{dependencies:["montage","ui/component","ui/native/input-radio.reel"],factory:function(e,t,n){var r=e("montage").Montage,i=e("ui/component").Component,s=e("ui/native/input-radio.reel").InputRadio;t.InputRadio=r.create(s,{hasTemplate:{value:!0},willPrepareForDraw:{value:function(){s.willPrepareForDraw.call(this),this.element.classList.add("montage-InputRadio")}}})}})