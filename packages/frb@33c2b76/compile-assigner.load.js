montageDefine("33c2b76","compile-assigner",{dependencies:["./compile-evaluator","./algebra","./scope"],factory:function(e,t,n){function a(e){return a.semantics.compile(e)}var s=e("./compile-evaluator"),i=e("./algebra"),r=e("./scope"),o={type:"value"},l={type:"literal",value:!0},c={type:"literal",value:!1};n.exports=a,a.semantics={compile:function(e){var t=this.compilers;if("equals"===e.type){var n=this.compile(e.args[0]),a=this.compileEvaluator(e.args[1]);return t.equals(n,a)}if("if"===e.type){var s=this.compileEvaluator(e.args[0]),r=this.compile(e.args[1]),l=this.compile(e.args[2]);return t["if"](s,r,l)}if("and"===e.type||"or"===e.type){var c=i(e.args[0],o),p=i(e.args[1],o),h=this.compileEvaluator(e.args[0]),a=this.compileEvaluator(e.args[1]),d=this.compileEvaluator(c[1]),u=this.compileEvaluator(p[1]),n=this.compile(c[0]),g=this.compile(p[0]);return t[e.type](n,g,h,a,d,u)}if("everyBlock"===e.type){var m=this.compileEvaluator(e.args[0]),f=i(e.args[1],{type:"literal",value:!0}),v=this.compile(f[0]),y=this.compileEvaluator(f[1]);return t.everyBlock(m,v,y)}if(t.hasOwnProperty(e.type)){var w=e.args.map(this.compileEvaluator,this.compileEvaluator.semantics);return t[e.type].apply(null,w)}throw Error("Can't compile assigner for "+JSON.stringify(e.type))},compileEvaluator:s,compilers:{property:function(e,t){return function(n,a){var s=e(a);if(s){var i=t(a);null!=i&&(Array.isArray(s)?s.set(i,n):s[i]=n)}}},get:function(e,t){return function(n,a){var s=e(a);if(s){var i=t(a);null!=i&&s.set(i,n)}}},has:function(e,t){return function(n,a){var s=e(a);if(s){var i=t(a);null!=n&&(n?(s.has||s.contains).call(s,i)||s.add(i):(s.has||s.contains).call(s,i)&&(s.remove||s["delete"]).call(s,i))}}},equals:function(e,t){return function(n,a){return n?e(t(a),a):void 0}},"if":function(e,t,n){return function(a,s){var i=e(s);if(null!=i)return i?t(a,s):n(a,s)}},and:function(e,t,n,a,s,i){return function(r,o){null!=r&&(r?(e(s(l),o),t(i(l),o)):e(n(o)&&!a(o),o))}},or:function(e,t,n,a,s,i){return function(r,o){null!=r&&(r?e(n(o)||!a(o),o):(e(s(c),o),t(i(c),o)))}},rangeContent:function(e){return function(t,n){var a=e(n);a&&(t?a.swap(0,a.length,t):a.clear())}},mapContent:function(e){return function(t,n){var a=e(n);a&&(a.clear(),n.value&&a.addEach(t))}},reversed:function(e){return function(t,n){var a=e(n);a&&a.swap(0,a.length,t.reversed())}},everyBlock:function(e,t,n){return function(a,s){if(a){var i=e(s),o=n(s);i.forEach(function(e){t(o,r.nest(s,e))})}}}}}}});