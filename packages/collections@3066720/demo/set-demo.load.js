montageDefine("3066720","demo/set-demo",{dependencies:["../set","../iterator"],factory:function(e,t,n){function o(e,t){this.key=e,this.value=t}var r=e("../set"),i=e("../iterator");console.log("\nignore non-unique values");var s=new r([1,1,1,2,2,2,1,2]);console.log(s.toArray()),console.log("\nadd"),s.add(3),console.log(s.toArray()),console.log("\ndelete"),s.delete(1),console.log(s.toArray()),console.log("\nreducible"),console.log("length",s.length),console.log("min",s.min()),console.log("max",s.max()),console.log("sum",s.sum()),console.log("average",s.average()),console.log("\nmap"),console.log(s.map(function(e){return e+1})),console.log("\nhashable objects"),o.prototype.hash=function(){return""+this.key},console.log("\niterate"),console.log(i(s.iterate()).mapIterator(function(e){return e.value}).toArray()),console.log((new r([3,2,1])).concat([4,5,6]).toArray())}})