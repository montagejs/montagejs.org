montageDefine("1d1016a","ui/native/textarea.reel/textarea",{dependencies:["montage","ui/component","ui/text-input"],factory:function(e,t,n){var r=e("montage").Montage,i=e("ui/component").Component,s=e("ui/text-input").TextInput,o=t.Textarea=r.create(s,{select:{value:function(){this._element.select()}},textContent:{get:function(){return this.value},set:function(e){this.value=e}},willPrepareForDraw:{value:function(){s.willPrepareForDraw.call(this),this.textContent===null&&(this.textContent=this.element.textContent)}}});o.addAttributes({autofocus:{dataType:"boolean"},cols:null,dirname:null,disabled:{dataType:"boolean"},form:null,maxlength:null,name:null,placeholder:null,readonly:{dataType:"boolean"},required:{dataType:"boolean"},rows:null,wrap:null})}})