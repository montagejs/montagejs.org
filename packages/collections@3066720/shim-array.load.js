montageDefine("3066720","shim-array",{dependencies:["./shim-function","./generic-collection","./generic-order","./weak-map"],factory:function(e,t,n){"use strict";function u(e,t){Object.defineProperty(Array.prototype,e,{value:t,writable:!0,configurable:!0,enumerable:!1})}function a(e,t,n){this.array=e,this.start=t==null?0:t,this.end=n}var r=e("./shim-function"),i=e("./generic-collection"),s=e("./generic-order"),o=e("./weak-map");n.exports=Array,Array.empty=[],Object.freeze&&Object.freeze(Array.empty),Array.from=function(e){var t=[];return t.addEach(e),t},Array.unzip=function(e){var t=[],n=Infinity;for(var r=0;r<e.length;r++){var i=e[r];e[r]=i.toArray(),i.length<n&&(n=i.length)}for(var r=0;r<e.length;r++){var i=e[r];for(var s=0;s<i.length;s++)s<n&&s in i&&(t[s]=t[s]||[],t[s][r]=i[s])}return t},u("addEach",i.prototype.addEach),u("deleteEach",i.prototype.deleteEach),u("toArray",i.prototype.toArray),u("toObject",i.prototype.toObject),u("all",i.prototype.all),u("any",i.prototype.any),u("min",i.prototype.min),u("max",i.prototype.max),u("sum",i.prototype.sum),u("average",i.prototype.average),u("only",i.prototype.only),u("flatten",i.prototype.flatten),u("zip",i.prototype.zip),u("enumerate",i.prototype.enumerate),u("group",i.prototype.group),u("sorted",i.prototype.sorted),u("reversed",i.prototype.reversed),u("constructClone",function(e){var t=new this.constructor;return t.addEach(e),t}),u("has",function(e,t){return this.find(e,t)!==-1}),u("get",function(e,t){if(+e!==e)throw new Error("Indicies must be numbers");return!e in this?t:this[e]}),u("set",function(e,t){return this.splice(e,1,t),!0}),u("add",function(e){return this.push(e),!0}),u("delete",function(e,t){var n=this.find(e,t);return n!==-1?(this.splice(n,1),!0):!1}),u("find",function(e,t){t=t||this.contentEquals||Object.equals;for(var n=0;n<this.length;n++)if(n in this&&t(this[n],e))return n;return-1}),u("findLast",function(e,t){t=t||this.contentEquals||Object.equals;var n=this.length;do{n--;if(n in this&&t(this[n],e))return n}while(n>0);return-1}),u("swap",function(e,t,n){var r=Array.prototype.slice.call(arguments,0,2);return n&&r.push.apply(r,n),this.splice.apply(this,r)}),u("one",function(){for(var e in this)if(Object.owns(this,e))return this[e]}),u("clear",function(){return this.length=0,this}),u("compare",function(e,t){t=t||Object.compare;var n,r,i,o,u;if(this===e)return 0;if(!e||!Array.isArray(e))return s.prototype.compare.call(this,e,t);r=Math.min(this.length,e.length);for(n=0;n<r;n++)if(n in this){if(!(n in e))return-1;i=this[n],o=e[n],u=t(i,o);if(u)return u}else if(n in e)return 1;return this.length-e.length}),u("equals",function(e,t){t=t||Object.equals;var n=0,r=this.length,i,o;if(this===e)return!0;if(!e||!Array.isArray(e))return s.prototype.equals.call(this,e);if(r!==e.length)return!1;for(;n<r;++n)if(n in this){i=this[n],o=e[n];if(i!==o&&i&&o&&!t(i,o))return!1}else if(n in e)return!1;return!0}),u("clone",function(e,t){if(e===undefined)e=Infinity;else if(e===0)return this;t=t||new o;var n=[];for(var r in this)Object.owns(this,r)&&(n[r]=Object.clone(this[r],e-1,t));return n}),u("iterate",function(e,t){return new a(this,e,t)}),u("Iterator",a),a.prototype.next=function(){if(this.start===(this.end==null?this.array.length:this.end))throw StopIteration;return this.array[this.start++]}}})