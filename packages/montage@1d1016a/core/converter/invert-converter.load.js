montageDefine("1d1016a","core/converter/invert-converter",{dependencies:["montage","core/converter/converter"],factory:function(e,t,n){var r=e("montage").Montage,i=e("core/converter/converter").Converter,s=t.InvertConverter=r.create(i,{convert:{value:function(e){return!e}},revert:{value:function(e){return!e}}})}})