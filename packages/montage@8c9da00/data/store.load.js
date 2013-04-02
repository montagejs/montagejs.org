montageDefine("8c9da00","data/store",{dependencies:["montage","data/blueprint","data/mapping","data/store-connection-information","data/query","data/pledge","data/restriction","data/transaction-id","data/object-id","core/serializer","core/deserializer","core/promise","core/exception","core/logger"],factory:function(e,t,n){var r=e("montage").Montage,i=e("data/blueprint").Blueprint,s=e("data/blueprint").BlueprintBinder,o=e("data/mapping").BinderMapping,u=e("data/mapping").BlueprintMapping,a=e("data/mapping").AttributeMapping,f=e("data/mapping").AssociationMapping,l=e("data/store-connection-information").StoreConnectionInformation,c=e("data/query").Query,h=e("data/pledge").Pledge,p=e("data/pledge").PledgedSortedSet,d=e("data/restriction").Restriction,v=e("data/transaction-id").TransactionId,m=e("data/object-id").ObjectId,g=e("data/object-id").TemporaryObjectId,y=e("core/serializer").Serializer,b=e("core/deserializer").Deserializer,w=e("core/promise").Promise,E=e("core/exception").Exception,S=e("core/logger").logger("store"),x=null,T=t.Store=r.create(r,{_connectionInfo:{serializable:!0,enumerable:!1,value:null},connectionInfo:{get:function(){return this._connectionInfo},set:function(e){this._connectionInfo=e}},restrictions:{serializable:!0,writable:!1,distinct:!0,value:new Array(10)},_parent:{serializable:!0,enumerable:!1,value:null},parent:{get:function(){return this._parent}},defaultManager:{get:function(){return x===null&&(x=N.create().init()),x},set:function(e){x=e}},init:{serializable:!1,enumerable:!1,value:function(){return this.initWithParentAndRestrictions(null,null)}},initWithParent:{serializable:!1,enumerable:!1,value:function(e){return this.initWithParentAndRestrictions(e,null)}},initWithParentAndRestrictions:{serializable:!1,value:function(e,t){this.parent!==null&&this.parent.remove(this),this._parent=e!=null?e:T.defaultManager,this.parent.addStore(this);if(t!=null){var n,r;for(r=0;typeof (n=t[r])!="undefined";r++)this.restrictions.push(Object.freeze(n))}return this}},blueprintForPrototype:{value:function(e,t){return this.parent!==null?this.parent.blueprintForPrototype(e,t):null}},createBinderMapping:{get:function(){return o.create()}},createBlueprintMapping:{get:function(){return u.create()}},createAttributeMapping:{get:function(){return a.create()}},createAssociationMapping:{get:function(){return f.create()}},addStore:{value:function(e){return this.parent!==null?this.parent.addStore(e):e}},removeStore:{value:function(e){return this.parent!==null?this.parent.removeStore(e):e}},requireStoreForBlueprint:{value:function(e,t){if(this.parent!==null)return this.parent.requireStoreForBlueprint(e,t)}},canServiceBlueprint:{value:function(e,t){var n=e.mappingForName(t.mappingFolderName);if(!n)return!1;var i=n.parent;if(!i)return!1;var s=r.getInfoForObject(this);if(i.storePrototypeName===s.objectName&&i.storeModuleId===s.moduleId){if(this.connectionInfo){var o=i.connectionInformationForName(this.connectionInfo.name);return this.connectionInfo.equals(o)}return!0}return!1}},canServiceQuery:{value:function(e,t){return e!=null?this.canServiceBlueprint(e.blueprint,t):!1}},permanentIdForObjectId:{value:function(e,t,n,r){var i=n,s=!1;try{return i==null&&(s=v.manager.hasCurrentTransaction(),s?i=v.manager.currentTransaction():i=v.manager.startTransaction(r)),this.permanentIdForObjectId$Implementation(e,t,i)}finally{s||v.manager.closeTransaction(i)}}},permanentIdForObjectId$Implementation:{value:function(e,t,n){return typeof e.objectId!="undefined"?w.resolve(e.objectId):w.resolve(null)}},pledgeForObjectId:{value:function(e,t,n,r){var i=n,s=!1;try{return i==null&&(s=v.manager.hasCurrentTransaction(),s?i=v.manager.currentTransaction():i=v.manager.startTransaction(r)),this.pledgeForObjectId$Implementation(e,t,i)}finally{s||v.manager.closeTransaction(i)}}},pledgeForObjectId$Implementation:{value:function(e,t,n){return w.resolve(null)}},pledgeForSourceObjectAssociationNamed:{value:function(e,t,n,r,i){var s=r,o=!1;try{return s==null&&(o=v.manager.hasCurrentTransaction(),o?s=v.manager.currentTransaction():s=v.manager.startTransaction(i)),this.pledgeForSourceObjectAssociationNamed$Implementation(e,t,n,s)}finally{o||v.manager.closeTransaction(s)}}},pledgeForSourceObjectAssociationNamed$Implementation:{value:function(e,t,n,r){return this.parent!==null?this.parent.pledgeForSourceObjectAssociationNamed$Implementation(e,t,n,r):w.resolve(null)}},pledgeForSourceObjectAssociation:{value:function(e,t,n,r,i){var s=r,o=!1;try{return s==null&&(o=v.manager.hasCurrentTransaction(),o?s=v.manager.currentTransaction():s=v.manager.startTransaction(i)),this.pledgeForSourceObjectAssociation$Implementation(e,t,n,s)}finally{o||v.manager.closeTransaction(s)}}},pledgeForSourceObjectAssociation$Implementation:{value:function(e,t,n,r){if(this.parent!==null)return this.parent.pledgeForSourceObjectAssociation$Implementation(e,t,n,r)}},initializeObject:{value:function(e,t,n,r){var i=n,s=!1;try{return i==null&&(s=v.manager.hasCurrentTransaction(),s?i=v.manager.currentTransaction():i=v.manager.startTransaction(r)),this.initializeObject$Implementation(e,t,i)}finally{s||v.manager.closeTransaction(i)}}},initializeObject$Implementation:{value:function(e,t,n){return typeof e.objectId=="undefined"&&(e.objectId=g.create().init()),w.resolve(e)}},repledgeObject:{value:function(e,t,n,r){var i=n,s=!1;try{i==null&&(s=v.manager.hasCurrentTransaction(),s?i=v.manager.currentTransaction():i=v.manager.startTransaction(r));if(Array.isArray(e)){var o=new Array(e.length),u,a;for(a=0;typeof (u=e[a])!="undefined";a++)o[a]=this.repledgeObject$Implementation(u,t,i);return o}return this.repledgeObject$Implementation(e,t,i)}finally{s||v.manager.closeTransaction(i)}}},repledgeObject$Implementation:{value:function(e,t,n){return typeof e.objectId!="undefined"?this.pledgeForObjectId(e.objectId,t,n):w.resolve(e)}},saveChangesInContext:{value:function(e,t,n){var r=t,i=!1;try{r==null&&(i=v.manager.hasCurrentTransaction(),i?r=v.manager.currentTransaction():r=v.manager.startTransaction(n)),this.saveChangesInContext$Implementation(e,r)}finally{i||v.manager.closeTransaction(r)}}},saveChangesInContext$Implementation:{value:function(e,t){if(this.parent!==null)return this.parent.saveChangesInContext$Implementation(e,t)}},prepareToSaveChangesInContext$Implementation:{value:function(e,t){return w.resolve(!0)}},cancelSaveChangesInContext$Implementation:{value:function(e,t){return w.resolve(!0)}},commitChangesInContext$Implementation:{value:function(e,t){return w.resolve(!0)}},queryInContext:{value:function(e,t,n,r){var i=n,s=!1;try{return i==null&&(s=v.manager.hasCurrentTransaction(),s?i=v.manager.currentTransaction():i=v.manager.startTransaction(r)),this.queryInContext$Implementation(e,t,i)}finally{s||v.manager.closeTransaction(i)}}},queryInContext$Implementation:{value:function(e,t,n){return(new p.create).initWithQueryAndContext(e,t)}}}),N=t.StoreManager=r.create(T,{stores:{serializable:!0,writable:!1,distinct:!0,value:new Array(10)},parent:{get:function(){return this}},init:{serializable:!1,enumerable:!1,value:function(){return this}},addStore:{value:function(e){if(e!==null&&e!==this){var t=this.stores.indexOf(e);t<0&&this.stores.push(e)}return e}},removeStore:{value:function(e){if(e!==null){var t=this.stores.indexOf(e);t>=0&&(this.stores=this.stores.splice(t,1))}return e}},blueprintForPrototype:{value:function(e,t){return s.manager.blueprintForPrototype(e,t)}},storeForBlueprint:{value:function(e,t){var n,r;for(r=0;typeof (n=this.stores[r])!="undefined";r++)if(n.canServiceBlueprint(e,t))return n;return null}},findStoreForBlueprint:{value:function(e,t){var n=this._findStoreForBlueprint(e,t);return n==null&&(n=this.requireStoreForBlueprint(e,t)),w.resolve(n)}},_findStoreForBlueprint:{value:function(e,t){var n,r;for(r=0;typeof (n=this.stores[r])!="undefined";r++)if(n.canServiceBlueprint(e,t))return n;return null}},requireStoreForBlueprint:{value:function(e,t){return e===null||typeof e=="undefined"?w.resolve(null):this._requireStoreForBlueprint(e,t)}},_requireStoreForBlueprint:{value:function(t,n){if(t===null||typeof t=="undefined")return w.resolve(null);var r=null,i,s;for(s=0;typeof (i=this.stores[s])!="undefined";s++)i.canServiceBlueprint(t,n)&&(r=i);if(r==null){var o=t.mappingForName(n.mappingFolderName),u=o?o.parent:null;if(u){var a=w.defer();e.async(u.storeModuleId,function(e){a.resolve(e)});var f=this;return a.promise.then(function(e){var t=e[u.storePrototypeName],n;return typeof t=="undefined"||t===null?w.reject("No Store found "+u.storePrototypeName):(n=t.create().initWithParent(f),n.connectionInfo=u.defaultConnectionInformation,n)})}return w.resolve(r)}return w.resolve(r)}},storeForObjectId:{value:function(e,t){var n,r;for(r=0;typeof (n=this.stores[r])!="undefined";r++)if(n.canServiceBlueprint(e.blueprint,t))return n;return null}},pledgeForSourceObjectAssociationNamed$Implementation:{value:function(e,t,n,i){var s=null,o=null,u=r.getInfoForObject(e),a=this.blueprintForPrototype(u.objectName,u.moduleId);return a!==null&&(o=a.attributeForName(t),o!==null&&o.targetBlueprint!==null?s=this.storeForBlueprint(o.targetBlueprint,i):S.error("No relationship named "+t+" for "+e)),s!==null?s.pledgeForSourceObjectAssociation(e,o,n,i):w.resolve(null)}},pledgeForObjectId$Implementation:{value:function(e,t,n){var r=this.storeForObjectId(e,n);return r!==null?r.pledgeForObjectId$Implementation(e,t,n):w.resolve(null)}},pledgeForSourceObjectAssociation$Implementation:{value:function(e,t,n,r){return w.resolve(null)}},initializeObject$Implementation:{value:function(e,t,n){return typeof e.objectId=="undefined"&&(e.objectId=g.create().init()),w.resolve(e)}},repledgeObject$Implementation:{value:function(e,t,n){return typeof e.objectId!="undefined"?this.pledgeForObjectId(e.objectId,t,n):w.resolve(e)}},saveChangesInContext$Implementation:{value:function(e,t){var n,r,i=new Array(this.stores.length),s=new Array(this.stores.length);for(r=0;typeof (n=this.stores[r])!="undefined";r++)i[r]=n.prepareToSaveChangesInContext$Implementation(e,t);w.when(w.all(i),function(){for(r=0;typeof (n=this.stores[r])!="undefined";r++)s[r]=n.commitChangesInContext$Implementation(e,t);return w.when(w.all(s),function(){return w.resolve(!0)},function(){throw E.create().initWithMessageTargetAndMethod("Failed to revert prepare for save transaction: "+t,this,"saveChangesInContext")})},function(){for(r=0;typeof (n=this.stores[r])!="undefined";r++)s[r]=n.cancelSaveChangesInContext$Implementation(e,t);return w.when(w.all(s),function(){return w.reject("Could not save the transaction: "+t)},function(){throw E.create().initWithMessageTargetAndMethod("Commit failed for transaction: "+t,this,"saveChangesInContext")})})}},prepareToSaveChangesInContext$Implementation:{value:function(e,t){return w.resolve(!0)}},cancelSaveChangesInContext$Implementation:{value:function(e,t){return w.resolve(!0)}},commitChangesInContext$Implementation:{value:function(e,t){return w.resolve(!0)}},queryInContext$Implementation:{value:function(e,t,n){if(e==null||t==null)return w.resolve([]);var r=this.storeForBlueprint(e.blueprint,n);return r==null?w.resolve([]):r.queryInContext$Implementation(e,t,n)}}})}})