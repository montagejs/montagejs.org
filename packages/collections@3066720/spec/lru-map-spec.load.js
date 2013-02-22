montageDefine("3066720","spec/lru-map-spec",{dependencies:["../lru-map","./dict","./map"],factory:function(e,t,n){var r=e("../lru-map"),i=e("./dict"),s=e("./map");describe("LruMap",function(){i(r),s(r),it("should remove stale items",function(){var e=r({a:10,b:20,c:30},3);e.get("b"),e.set("d",40),expect(e.keys()).toEqual(["c","b","d"]),expect(e.length).toBe(3)}),it("should not grow when re-adding",function(){var e=r({a:10,b:20,c:30},3);expect(e.keys()).toEqual(["a","b","c"]),expect(e.length).toBe(3),e.get("b"),expect(e.keys()).toEqual(["a","c","b"]),expect(e.length).toBe(3),e.set("c",40),expect(e.keys()).toEqual(["a","b","c"]),expect(e.length).toBe(3)}),it("should grow when adding new values",function(){var e=r({},3);expect(e.length).toBe(0),e.set("a",10),expect(e.length).toBe(1),e.set("a",10),expect(e.length).toBe(1),e.set("b",20),expect(e.length).toBe(2),e.set("b",20),expect(e.length).toBe(2),e.set("c",30),expect(e.length).toBe(3),e.set("c",30),expect(e.length).toBe(3),e.set("d",40),expect(e.length).toBe(3),e.set("d",40),expect(e.length).toBe(3),e.set("e",50),expect(e.length).toBe(3)})})}})