montageDefine("1d1016a","data/restriction",{dependencies:["montage","core/logger"],factory:function(e,t,n){var r=e("montage").Montage,i=e("core/logger").logger("restrictions"),s=t.Restriction=r.create(r,{_name:{serializable:!0,enumerable:!0,value:""},name:{get:function(){return this._name}},_parameters:{value:{},serializable:!0,distinct:!0,enumerable:!1,writable:!1},parameters:{get:function(){return this._parameters}},initWithNameAndParameters:{enumerable:!1,value:function(e,t){this._name=e!=null?e:"default";if(t!=null){var n=Object.getOwnPropertyNames(t),r,i,s;for(s=0;typeof (i=n[s])!="undefined";s++)r=t[i],this._parameters[i]=r}return this}}})}})