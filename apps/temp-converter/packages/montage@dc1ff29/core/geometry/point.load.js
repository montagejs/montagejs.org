montageDefine("dc1ff29","core/geometry/point",{dependencies:["montage"],factory:function(e,t){var n=e("montage").Montage;t.Point=n.specialize({init:{enumerable:!1,value:function(e,t){return this.x=null===e?0:e,this.y=null===t?0:t,this}},x:{enumerable:!0,value:0},y:{enumerable:!0,value:0}},{interpolate:{enumerable:!1,value:function(e,n,i,r){var o,a;return o=n.x+(i.x-n.x)*e,a=n.y+(i.y-n.y)*e,r>0&&(o=Math.round(o*r)/r,a=Math.round(a*r)/r),(new t.Point).init(o,a)}}})}});