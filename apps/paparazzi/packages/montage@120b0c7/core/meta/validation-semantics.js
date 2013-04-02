"use strict";var Montage=require("montage").Montage,Semantics=require("core/selector/semantics").Semantics,logger=require("core/logger").logger("blueprint"),PropertyValidationSemantics=exports.PropertyValidationSemantics=Semantics.create(Semantics,{initWithBlueprint:{value:function(e){return this._blueprint=e,this}},_blueprint:{value:null},blueprint:{get:function(){return this._blueprint}},compile:{value:function(e,t){Semantics.compile.call(this,e,t)}},operators:{value:{isBound:function(e){return!e}}},evaluators:{value:{isBound:function(e,t){var n=this;return function(r,i){return r=n.count(e(r,i)),t(r,i)}}}}});for(var operator in Semantics.operators)PropertyValidationSemantics.operators[operator]=Semantics.operators[operator];for(var evaluator in Semantics.evaluators)PropertyValidationSemantics.evaluators[evaluator]=Semantics.evaluators[evaluator]