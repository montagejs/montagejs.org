montageDefine("1d1016a","core/meta/association-blueprint",{dependencies:["montage","core/meta/blueprint-reference","core/meta/property-blueprint","core/logger"],factory:function(e,t,n){"use strict";var r=e("montage").Montage,i=e("core/meta/blueprint-reference").BlueprintReference,s=e("core/meta/property-blueprint").PropertyBlueprint,o=e("core/logger").logger("blueprint");t.AssociationBlueprint=r.create(s,{serializeSelf:{value:function(e){e.setProperty("targetBlueprint",this._targetBlueprintReference),s.serializeSelf.call(this,e)}},deserializeSelf:{value:function(e){s.deserializeSelf.call(this,e),this._targetBlueprintReference=e.getProperty("targetBlueprint")}},_targetBlueprintReference:{value:null},targetBlueprint:{serializable:!1,get:function(){return this._targetBlueprintReference.promise(this.require)},set:function(e){this._targetBlueprintReference=i.create().initWithValue(e)}},isAssociationBlueprint:{get:function(){return!0}}})}})