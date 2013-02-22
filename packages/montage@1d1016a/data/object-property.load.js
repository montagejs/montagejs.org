montageDefine("1d1016a","data/object-property",{dependencies:["montage","core/exception","data/pledge","core/logger"],factory:function(e,t,n){var r=e("montage").Montage,i=e("core/exception").Exception,s=e("data/pledge").Pledge,o=e("data/pledge").PledgedSortedSet,u=e("data/pledge").Store,a=e("core/logger").logger("object-property"),f=null,l=t.ObjectProperty=r.create(r,{init:{serializable:!1,enumerable:!1,value:function(){return this}},apply:{value:function(e,t){if(!e.hasOwnProperty("blueprint")){var n;n=r.getInfoForObject(e);if(n!=null&&n.isInstance===!1){if(typeof t=="undefined")t=u.defaultManager.blueprintForPrototype(n.objectName,n.moduleId);else if(t.prototypeName!==n.objectName||t.moduleId!==n.moduleId)t=null;this.applyWithBlueprint(e,t)}}}},applyWithBlueprint:{value:function(e,t){t!=null&&(this.addProperties(e,t),t.parent!==null&&this.apply(Object.getPrototypeOf(e),t))}},addProperties:{value:function(e,t){var n,s;for(n=0;s=t.attributes[n];n++)s.isDerived?this.addDerivedProperty(e,s):s.isAssociation?this.addAssociation(e,s):this.addProperty(e,s);r.defineProperty(e,"context",{serializable:!1,enumerable:!0,value:null}),r.defineProperty(e,"_objectId",{serializable:!0,enumerable:!1,value:null}),r.defineProperty(e,"objectId",{enumerable:!0,serializable:!1,get:function(){return this._objectId===null&&(this._objectId=this.blueprint.objectId$Implementation),this._objectId},set:function(e){if(e===null)throw i.create().initWithMessageTargetAndMethod("Cannot set object Id to null",this,"objectId.set");this._objectId=e}}),r.defineProperty(e,"_blueprint",{serializable:!1,enumerable:!1,value:t}),r.defineProperty(e,"blueprint",{enumerable:!1,serializable:!1,get:function(){return this._blueprint}}),r.defineProperty(e,"isPledge",{serializable:!1,enumerable:!0,value:!1}),r.defineProperty(e,"withProperties",{serializable:!1,enumerable:!1,value:function(){return null}}),r.defineProperty(e,"willRead",{serializable:!1,enumerable:!1,value:this.willRead}),r.defineProperty(e,"willModify",{serializable:!1,enumerable:!1,value:this.willModify}),r.defineProperty(e,"blueprintGet",{serializable:!1,enumerable:!1,value:t.blueprintGet}),r.defineProperty(e,"blueprintSet",{serializable:!1,enumerable:!1,value:t.blueprintSet}),r.defineProperty(e,"_opaqueAccessState",{serializable:!1,enumerable:!1,value:null})}},addProperty:{value:function(e,t){this.addPropertyStorage(e,t),this.addPropertyDefinition(e,t),this.addPropertyStoredValue(e,t)}},addPropertyStorage:{value:function(e,t){var n="_"+t.name,i=null;e.hasOwnProperty(n)?a.isError&&a.error("We have an issue here. The developer should not override the storage value for "+n+"."):(t.isToMany?i={value:[],enumerable:!1,serializable:!0,distinct:!0}:i={value:null,enumerable:!1,serializable:!0},r.defineProperty(e,n,i))}},addPropertyDefinition:{value:function(e,t){var n=t.name,i=null;e.hasOwnProperty(n)?a.isDebug&&a.debug("The developer has already created the property "+n+" method do nothing."):(i={get:function(){return this.blueprintGet(n)},enumerable:!0,serializable:!1},t.readOnly||(i.set=function(e){return this.blueprintSet(n,e)}),r.defineProperty(e,n,i))}},addPropertyStoredValue:{value:function(e,t){var n=t.name+"$Storage",i=null;e.hasOwnProperty(n)?a.isError&&a.error("We have an issue here. The developer should not override the stored value for "+n+"."):(t.isToMany?i={value:[],enumerable:!1,serializable:!1,distinct:!0}:i={value:null,enumerable:!1,serializable:!1},r.defineProperty(e,n,i))}},addAssociation:{value:function(e,t){this.addPropertyStorage(e,t),this.addAssociationDefinition(e,t),this.addPropertyStoredValue(e,t)}},addAssociationDefinition:{value:function(e,t){t.isToMany?this.addToManyAssociationDefinition(e,t):this.addToOneAssociationDefinition(e,t)}},addToOneAssociationDefinition:{value:function(e,t){var n=t.name.toCapitalized(),i="addTo"+n;e.hasOwnProperty(i)?a.isError&&a.error("We have an issue here. The developer should not override the method "+i+"."):r.defineProperty(e,i,{serializable:!1,enumerable:!1,value:function(){return null}}),i="removeFrom"+n,e.hasOwnProperty(i)?a.isError&&a.error("We have an issue here. The developer should not override the method "+i+"."):r.defineProperty(e,i,{serializable:!1,enumerable:!1,value:function(){return null}}),i="clear"+n,e.hasOwnProperty(i)?a.isError&&a.error("We have an issue here. The developer should not override the method "+i+"."):r.defineProperty(e,i,{serializable:!1,enumerable:!1,value:function(){return null}})}},addToManyAssociationDefinition:{value:function(e,t){var n=t.name.toCapitalized(),i="addTo"+n;e.hasOwnProperty(i)?a.isError&&a.error("We have an issue here. The developer should not override the method "+i+"."):r.defineProperty(e,i,{serializable:!1,enumerable:!1,value:function(){return null}}),i="removeFrom"+n,e.hasOwnProperty(i)?a.isError&&a.error("We have an issue here. The developer should not override the method "+i+"."):r.defineProperty(e,i,{serializable:!1,enumerable:!1,value:function(){return null}}),i="clear"+n,e.hasOwnProperty(i)?a.isError&&a.error("We have an issue here. The developer should not override the method "+i+"."):r.defineProperty(e,i,{serializable:!1,enumerable:!1,value:function(){return null}})}},addDerivedProperty:{value:function(e,t){}},willRead:{value:function(e){var t="_"+e.name;if(typeof this[t]!="undefined")return;typeof this.context!="undefined"&&this.context!==null&&this.context.fulfillPropertyForInstance(e,this)}},willModify:{value:function(e,t){var n="_"+e.name,r=this[n];(typeof r=="undefined"||r!==t)&&typeof this.context!="undefined"&&this.context!==null&&this.context.willModifyPropertyForInstance(e,this,t)}},manager:{get:function(){return f===null&&(f=Object.freeze(l.create().init())),f}}})}})