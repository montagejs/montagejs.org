montageDefine("87344ee","generic-order",{dependencies:["./shim-object"],factory:function(e,t,n){function i(){throw new Error("Can't construct. GenericOrder is a mixin.")}var r=e("./shim-object");n.exports=i,i.prototype.equals=function(e,t){t=t||this.contentEquals||r.equals;if(this===e)return!0;if(!e)return!1;var n=this;return this.length===e.length&&this.zip(e).every(function(e){return t(e[0],e[1])})},i.prototype.compare=function(e,t){t=t||this.contentCompare||r.compare;if(this===e)return 0;if(!e)return 1;var n=Math.min(this.length,e.length),i=this.zip(e).reduce(function(e,r,i){return e===0?i>=n?e:t(r[0],r[1]):e},0);return i===0?this.length-e.length:i}}})