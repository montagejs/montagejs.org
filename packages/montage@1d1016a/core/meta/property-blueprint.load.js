montageDefine("1d1016a","core/meta/property-blueprint",{dependencies:["montage","core/logger"],factory:function(e,t,n){"use strict";var r=e("montage").Montage,i=e("core/logger").logger("blueprint");t.PropertyBlueprint=r.create(r,{initWithNameBlueprintAndCardinality:{value:function(e,t,n){return this._name=e!==null?e:"default",this._blueprint=t,this._cardinality=n>0?n:1,this}},serializeSelf:{value:function(e){e.setProperty("name",this.name),e.setProperty("blueprint",this.blueprint,"reference"),this.cardinality===Infinity?e.setProperty("cardinality",-1):e.setProperty("cardinality",this.cardinality),e.setProperties()}},deserializeSelf:{value:function(e){this._name=e.getProperty("name"),this._blueprint=e.getProperty("blueprint");var t=e.getProperty("cardinality");t===-1?this._cardinality=Infinity:this._cardinality=t;var n=r.getSerializablePropertyNames(this);for(var i=0,s=n.length;i<s;i++){var o=n[i];this[o]=e.getProperty(o)}}},_blueprint:{value:null},blueprint:{get:function(){return this._blueprint}},_name:{value:null},name:{serializable:!1,get:function(){return this._name}},identifier:{get:function(){return[this.blueprint.identifier,this.name].join("_")}},_cardinality:{value:1},cardinality:{get:function(){return this._cardinality}},mandatory:{value:!1},denyDelete:{value:!1},readOnly:{value:!1},isAssociationBlueprint:{get:function(){return!1}},isToMany:{get:function(){return this.cardinality>1}},isDerived:{get:function(){return!1}},valueType:{value:"string"},valueObjectPrototypeName:{value:null},valueObjectModuleId:{value:null},_enumValues:{value:null},enumValues:{get:function(){return this._enumValues?this._enumValues_enumValues:[]},set:function(e){Array.isArray(e)&&(this._enumValues=e)}},helpKey:{value:""}})}})