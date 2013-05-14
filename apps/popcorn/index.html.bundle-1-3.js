montageDefine("9d0f7db","ui/flow.reel/flow",{dependencies:["montage","ui/component","ui/flow-bezier-spline"],factory:function(e,t,n){var r=e("montage").Montage,i=e("ui/component").Component,s=e("ui/flow-bezier-spline").FlowBezierSpline,o=t.Flow=r.create(i,{didCreate:{value:function(){this._slideOffsets={}}},slotContent:{serializable:!0,value:null},_flowTranslateComposer:{value:null},_scrollingMode:{value:"linear"},scrollingMode:{serializable:!0,get:function(){return this._scrollingMode},set:function(e){switch(e){case"linear":case"drag":this._scrollingMode=e}}},_linearScrollingVector:{value:[-300,0]},linearScrollingVector:{seriazable:!0,get:function(){return this._linearScrollingVector},set:function(e){this._linearScrollingVector=e}},_repetition:{value:null},momentumDuration:{serializable:!0,value:650},_splinePaths:{value:null},splinePaths:{enumerable:!1,get:function(){return this._splinePaths||(this._splinePaths=[]),this._splinePaths},set:function(e){this._splinePaths=e}},appendPath:{value:function(e){var t=s.create(),n=e.knots,r=e.knots.length,i=[],o=[],u=[],a=[],f,l;t.parameters={};for(f in e.units)t.parameters[f]={data:[],units:e.units[f]};for(f=0;f<r;f++){i[f]=n[f].knotPosition,u[f]=n[f].previousHandlerPosition,o[f]=n[f].nextHandlerPosition,a[f]=n[f].previousDensity;for(l in e.units)t.parameters[l].data.push(n[f][l])}t.knots=i,t.previousHandlers=u,t.nextHandlers=o,t.densities=a,t._computeDensitySummation(),this.splinePaths.push(t),e.hasOwnProperty("headOffset")||(e.headOffset=0),e.hasOwnProperty("tailOffset")||(e.tailOffset=0),this._paths.push(e),this._updateLength()}},_paths:{value:null},paths:{get:function(){var e=this.splinePaths.length,t=[],n,r,i,s,o,u,a;for(o=0;o<e;o++){r=this.splinePaths[o].knots.length,n={knots:[],units:{}};for(u=0;u<r;u++)s={knotPosition:this.splinePaths[o].knots[u]},this.splinePaths[o].nextHandlers&&this.splinePaths[o].nextHandlers[u]&&(s.nextHandlerPosition=this.splinePaths[o].nextHandlers[u]),this.splinePaths[o].previousHandlers&&this.splinePaths[o].previousHandlers[u]&&(s.previousHandlerPosition=this.splinePaths[o].previousHandlers[u]),this.splinePaths[o].densities&&this.splinePaths[o].densities[u]&&(s.previousDensity=this.splinePaths[o].densities[u],s.nextDensity=this.splinePaths[o].densities[u]),n.knots.push(s);for(u in this.splinePaths[o].parameters){n.units[u]=this.splinePaths[o].parameters[u].units,i=this.splinePaths[o].parameters[u].data.length;for(a=0;a<i;a++)n.knots[a][u]=this.splinePaths[o].parameters[u].data[a]}this._paths[o].hasOwnProperty("headOffset")?n.headOffset=this._paths[o].headOffset:n.headOffset=0,this._paths[o].hasOwnProperty("tailOffset")?n.tailOffset=this._paths[o].tailOffset:n.tailOffset=0,t.push(n)}return t},set:function(e){var t=e.length,n;this._splinePaths=[],this._paths=[];for(n=0;n<t;n++)this.appendPath(e[n]);this.needsDraw=!0}},_cameraElement:{value:null},_cameraPosition:{value:[0,0,800]},_cameraTargetPoint:{value:[0,0,0]},_cameraFov:{value:50},_cameraRoll:{value:0},cameraPosition:{get:function(){return this._cameraPosition},set:function(e){this._cameraPosition=e,this._isCameraUpdated=!0,this.needsDraw=!0}},cameraTargetPoint:{get:function(){return this._cameraTargetPoint},set:function(e){this._cameraTargetPoint=e,this._isCameraUpdated=!0,this.needsDraw=!0}},cameraFov:{get:function(){return this._cameraFov},set:function(e){this._cameraFov=e,this._isCameraUpdated=!0,this.needsDraw=!0}},cameraRoll:{get:function(){return this._cameraRoll},set:function(e){this._cameraRoll=e,this._isCameraUpdated=!0,this.needsDraw=!0}},_stride:{value:0},stride:{get:function(){return this._stride},set:function(e){this._stride=e}},_scrollingTransitionDurationMiliseconds:{value:500},_scrollingTransitionDuration:{value:"500ms"},scrollingTransitionDuration:{get:function(){return this._scrollingTransitionDuration},set:function(e){var t=e+"",n=t.length,r;n>=2&&t[n-1]==="s"?n>=3&&t[n-2]==="m"?r=t.substr(0,n-2)-0:r=t.substr(0,n-1)*1e3:(r=t-0,t+="ms"),!isNaN(r)&&this._scrollingTransitionDurationMiliseconds!==r&&(this._scrollingTransitionDurationMiliseconds=r,this._scrollingTransitionDuration=t)}},_scrollingTransitionTimingFunctionBezier:{value:[.25,.1,.25,1]},_scrollingTransitionTimingFunction:{value:"ease"},hasSelectedIndexScrolling:{value:!1},selectedIndexScrollingOffset:{value:0},_handleSelectedIndexesChange:{value:function(e){this.hasSelectedIndexScrolling&&e.plus&&this.startScrollingIndexToOffset(e.plus[0],this.selectedIndexScrollingOffset)}},_timingFunctions:{value:{ease:[.25,.1,.25,1],linear:[0,0,1,1],"ease-in":[.42,0,1,1],"ease-out":[0,0,.58,1],"ease-in-out":[.42,0,.58,1]}},scrollingTransitionTimingFunction:{get:function(){return this._scrollingTransitionTimingFunction},set:function(e){var t=e+"",n,r;if(this._timingFunctions.hasOwnProperty(t))this._scrollingTransitionTimingFunction=t,this._scrollingTransitionTimingFunctionBezier=this._timingFunctions[t];else if(t.substr(0,13)==="cubic-bezier("&&t.substr(t.length-1,1)===")"){n=t.substr(13,t.length-14).split(",");if(n.length===4){for(r=0;r<4;r++){n[r]-=0;if(isNaN(n[r]))return}n[0]<0?n[0]=0:n[0]>1&&(n[0]=1),n[2]<0?n[2]=0:n[2]>1&&(n[2]=1),this._scrollingTransitionTimingFunction="cubic-bezier("+n+")",this._scrollingTransitionTimingFunctionBezier=n}}}},_computeCssCubicBezierValue:{value:function(e,t){var n=.5,r=.25,i,s,o;for(o=0;o<20;o++)i=n*n,s=1-n,3*(s*s*n*t[0]+s*i*t[2])+i*n>e?n-=r:n+=r,r*=.5;return i=n*n,s=1-n,3*(s*s*n*t[1]+s*i*t[3])+i*n}},_isTransitioningScroll:{value:!1},stopScrolling:{value:function(){this._isTransitioningScroll=!1}},startScrollingIndexToOffset:{value:function(e,t){this._scrollingOrigin=this.scroll,this._scrollingDestination=e-t,this._scrollingDestination>this._length?this._scrollingDestination=this._length:this._scrollingDestination<0&&(this._scrollingDestination=0),this._isScrolling=!0,this._scrollingStartTime=Date.now(),this._isTransitioningScroll=!0,this.needsDraw=!0}},_isCameraUpdated:{value:!0},_width:{value:null},_height:{value:null},_repetitionComponents:{value:null},_boundingBoxSize:{value:[200,200,0]},boundingBoxSize:{serializable:!0,get:function(){return this._boundingBoxSize},set:function(e){this._boundingBoxSize=e,this.elementsBoundingSphereRadius=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2])*.5}},_elementsBoundingSphereRadius:{value:283},elementsBoundingSphereRadius:{get:function(){return this._elementsBoundingSphereRadius},set:function(e){this._elementsBoundingSphereRadius!==e&&(this._elementsBoundingSphereRadius=e,this.needsDraw=!0)}},_halfPI:{value:Math.PI*.5},_doublePI:{value:Math.PI*2},_computeFrustumNormals:{value:function(){var e=this.cameraFov*.5*this._doublePI/360,t=Math.sin(e),n=Math.cos(e),r=t*this._width/this._height,i=this.cameraTargetPoint[0]-this.cameraPosition[0],s=this.cameraTargetPoint[1]-this.cameraPosition[1],o=this.cameraTargetPoint[2]-this.cameraPosition[2],u=this._halfPI-Math.atan2(o,i),a=i*Math.sin(u)+o*Math.cos(u),f,l,c,h,p,d,v=this._halfPI-Math.atan2(a,s),m,g=[[n,0,r],[-n,0,r],[0,n,t],[0,-n,t]],y,b=[],w;for(w=0;w<4;w++)y=g[w],f=y[0],l=y[1]*Math.cos(-v)-y[2]*Math.sin(-v),c=y[1]*Math.sin(-v)+y[2]*Math.cos(-v),h=f*Math.cos(-u)-c*Math.sin(-u),p=l,d=f*Math.sin(-u)+c*Math.cos(-u),m=1/Math.sqrt(h*h+p*p+d*d),b.push([h*m,p*m,d*m]);return b}},_segmentsIntersection:{value:function(e,t){var n=0,r=0,i,s,o=[];while(n<e.length&&r<t.length)e[n][0]>=t[r][1]?r++:e[n][1]<=t[r][0]?n++:(e[n][0]>=t[r][0]?i=e[n][0]:i=t[r][0],e[n][1]<=t[r][1]?s=e[n][1]:s=t[r][1],o.push([i,s]),e[n][1]<t[r][1]?n++:e[n][1]>t[r][1]?r++:(n++,r++));return o}},_computeVisibleRange:{value:function(e){var t=e._knots.length-1,n=this._cameraPosition[0],r=this._cameraPosition[1],i=this._cameraPosition[2],s=this._computeFrustumNormals(),o,u=[],a=[],f=[],l,c,h,p=this._elementsBoundingSphereRadius,d=e._knots,v=e._nextHandlers,m=e._previousHandlers,g=[],y=[];for(c=0;c<t;c++){o=s[0],u=e.directedPlaneBezierIntersection(n-o[0]*p,r-o[1]*p,i-o[2]*p,s[0],d[c],v[c],m[c+1],d[c+1],g);if(u.length){o=s[1],a=e.directedPlaneBezierIntersection(n-o[0]*p,r-o[1]*p,i-o[2]*p,s[1],d[c],v[c],m[c+1],d[c+1],g);if(a.length){l=this._segmentsIntersection(u,a);if(l.length){o=s[2],u=e.directedPlaneBezierIntersection(n-o[0]*p,r-o[1]*p,i-o[2]*p,s[2],d[c],v[c],m[c+1],d[c+1],g),l=this._segmentsIntersection(u,l);if(l.length){o=s[3],u=e.directedPlaneBezierIntersection(n-o[0]*p,r-o[1]*p,i-o[2]*p,s[3],d[c],v[c],m[c+1],d[c+1],g),l=this._segmentsIntersection(u,l);for(h=0;h<l.length;h++)f.push([c,l[h][0],l[h][1]])}}}}}var b=e._densities,w,E,S,x,T,N,C;for(c=0;c<f.length;c++)w=b[f[c][0]],E=b[f[c][0]+1],S=f[c][0]?e._densitySummation[f[c][0]-1]:0,x=f[c][1],T=f[c][2],N=(E-w)*x*x*.5+x*w+S,C=(E-w)*T*T*.5+T*w+S,y.push([N,C]);return y}},prepareForDraw:{value:function(){var e=this,t;this._repetitionComponents=this._repetition._childComponents,window.addEventListener("resize",function(){e._isCameraUpdated=!0,e.needsDraw=!0},!1)}},_updateIndexMap:{value:function(e,t){var n=this._repetition.indexMap,r=[],i,s,o=n&&!isNaN(n.length)?n.length:0;for(s=0;s<o;s++)typeof t[n[s]]=="number"?e[t[n[s]]]=null:r.push(s);for(s=i=0;i<r.length&&s<e.length;s++)e[s]!==null&&(this._repetition.mapIndexToIndex(r[i],e[s],!1),i++);for(i=o;s<e.length;s++)e[s]!==null&&(this._repetition.mapIndexToIndex(i,e[s],!1),i++);this._repetition.refreshIndexMap()}},willDraw:{value:function(){var e,t,n,r,i,s,o,u,a,f,l,c=[],h,p,d={},v=this._paths,m=v.length,g=this.splinePaths;this._isTransitioningScroll&&(h=(Date.now()-this._scrollingStartTime)/this._scrollingTransitionDurationMiliseconds,p=this._computeCssCubicBezierValue(h,this._scrollingTransitionTimingFunctionBezier),h<1?this.scroll=this._scrollingOrigin+(this._scrollingDestination-this._scrollingOrigin)*p:(this.scroll=this._scrollingDestination,this._isTransitioningScroll=!1)),this._width=this._element.clientWidth,this._height=this._element.clientHeight;if(g.length){a=this._numberOfIterations%m,f=(this._numberOfIterations-a)/m;for(i=0;i<m;i++){l=f+(i<a?1:0),e=this._computeVisibleRange(g[i]),g[i]._computeDensitySummation(),s=this._scroll-v[i].headOffset;for(n=0;n<e.length;n++){o=Math.ceil(e[n][0]+s),u=Math.ceil(e[n][1]+s),o<0&&(o=0),u>l&&(u=l);for(r=o;r<u;r++)t=r*m+i,typeof d[t]=="undefined"&&(d[t]=c.length,c.push(t))}}}this._updateIndexMap(c,d)}},draw:{value:function(){var e,t=this._repetitionComponents.length,n,r,i,s,o,u=this._paths.length,a,f,l,c,h,p,d=this._repetition._indexMap,v,m,g,y,b=1e-5,w=Date.now(),E=6,S=this.lastDrawTime?(w-this.lastDrawTime)*.018*this._elasticScrollingSpeed:0,x=1-S/E,T,N,C,k=this._minSlideOffsetIndex,L=this._maxSlideOffsetIndex;this.lastDrawTime=w;for(s=0;s<E;s++){for(e=this._draggedSlideIndex-1;e>=k;e--)T=this._getSlideOffset(e),N=this._getSlideOffset(e+1),C=(T-N)*x+N,C>0&&(C=0),this._updateSlideOffset(e,C);for(e=this._draggedSlideIndex+1;e<=L;e++)T=this._getSlideOffset(e),N=this._getSlideOffset(e-1),C=(T-N)*x+N,C<0&&(C=0),this._updateSlideOffset(e,C)}this._isTransitioningScroll&&(this.needsDraw=!0);if(this._isCameraUpdated){var A=Math.tan((90-this.cameraFov*.5)*this._doublePI/360)*this._height*.5,O=this.cameraTargetPoint[0]-this.cameraPosition[0],M=this.cameraTargetPoint[1]-this.cameraPosition[1],_=this.cameraTargetPoint[2]-this.cameraPosition[2],D=Math.atan2(-O,-_),P,H;P=O*-Math.sin(-D)+_*Math.cos(-D),H=Math.atan2(-M,-P),this._element.style.webkitPerspective=A+"px",this._cameraElement.style.webkitTransform="translate3d(0,0,"+A+"px)rotateX("+H+"rad)rotateY("+ -D+"rad)"+"translate3d("+ -this.cameraPosition[0]+"px,"+ -this.cameraPosition[1]+"px,"+ -this.cameraPosition[2]+"px)",this._isCameraUpdated=!1}if(this.splinePaths.length)for(e=0;e<t;e++)y=this.offset(d[e]),a=y.pathIndex,r=y.slideTime,m=this._splinePaths[a]._convertSplineTimeToBezierIndexTime(r),o=this._repetitionComponents[e].element.parentNode,m!==null?(f=this._splinePaths[a].getPositionAtIndexTime(m),g=this._splinePaths[a].getRotationAtIndexTime(m),i="-webkit-transform:translate3d("+(f[0]*1e5>>0)*1e-5+"px,"+(f[1]*1e5>>0)*1e-5+"px,"+(f[2]*1e5>>0)*1e-5+"px)"+(g[2]?"rotateZ("+(g[2]*1e5>>0)*1e-5+"rad)":"")+(g[1]?"rotateY("+(g[1]*1e5>>0)*1e-5+"rad)":"")+(g[0]?"rotateX("+(g[0]*1e5>>0)*1e-5+"rad)":"")+";"+this._splinePaths[a].getStyleAtIndexTime(m),o.setAttribute("style",i)):o.setAttribute("style","-webkit-transform:scale3d(0,0,0);opacity:0");else for(e=0;e<t;e++)o=this._repetitionComponents[e].element.parentNode,o.setAttribute("style","-webkit-transform:scale3d(0,0,0);opacity:0");this.needsDraw=!0}},_updateLength:{value:function(){if(this._paths){var e,t=this._paths.length,n,r,i=0,s,o,u;if(t>0){o=this._numberOfIterations%t,s=(this._numberOfIterations-o)/t;for(u=0;u<t;u++)e=this._paths[u],n=s+(u<o?1:0),r=n-e.tailOffset+e.headOffset-1,r>i&&(i=r);this.length=i}this.needsDraw=!0}}},_numberOfIterations:{value:0},numberOfIterations:{get:function(){return this._numberOfIterations},set:function(e){this._numberOfIterations!==e&&(this._numberOfIterations=e,this._updateLength())}},_objects:{value:null},objects:{get:function(){return this._objects},set:function(e){this._objects=e,this.needsDraw=!0}},contentController:{value:null},isSelectionEnabled:{value:null},selectedIndexes:{serializable:!1,value:null},activeIndexes:{serializable:!1,value:null},propertyChangeBindingListener:{value:function(e,t,n,r,i,s,o){return o.boundObjectPropertyPath.match(/objectAtCurrentIteration/)?this._repetition?(o.boundObject=this._repetition,this._repetition.propertyChangeBindingListener.apply(this._repetition,arguments)):null:Object.prototype.propertyChangeBindingListener.apply(this,arguments)}},_orphanedChildren:{value:null},deserializedFromTemplate:{value:function(){this._orphanedChildren=this.childComponents,this.childComponents=null}},templateDidLoad:{value:function(){var e,t=this.element.ownerDocument.createRange(),n,r=this;t.selectNodeContents(this.element),e=t.extractContents(),n=this._repetition.element.appendChild(document.createElement("div")),n.appendChild(e),n.setAttribute("data-montage-id","wrapper"),this._repetition.indexMapEnabled=!0,this._repetition.childComponents=this._orphanedChildren,this._repetition.willDraw=function(){r.needsDraw=!0},Object.defineBinding(this,"numberOfIterations",{boundObject:this._repetition,boundObjectPropertyPath:"_objects.count()",oneway:"true"})}},_length:{value:0},length:{get:function(){return this._length},set:function(e){e<0?this._length=0:this._length=e}},_scroll:{value:0},_range:{value:20},_hasElasticScrolling:{value:!1},hasElasticScrolling:{get:function(){return this._hasElasticScrolling},set:function(e){e?this._hasElasticScrolling=!0:this._hasElasticScrolling=!1}},_slideOffsets:{value:null},_slideOffsetsLength:{value:0},_maxSlideOffsetIndex:{value:-1},_minSlideOffsetIndex:{value:2e9},_updateSlideOffset:{value:function(e,t){var n=1e-4;e>=0&&(t<-n||t>n?(typeof this._slideOffsets[e]=="undefined"&&(this._slideOffsetsLength++,e<this._minSlideOffsetIndex&&(this._minSlideOffsetIndex=e),e>this._maxSlideOffsetIndex&&(this._maxSlideOffsetIndex=e)),this._slideOffsets[e]=t):this._removeSlideOffset(e))}},_incrementSlideOffset:{value:function(e,t){this._updateSlideOffset(e,this._getSlideOffset(e)+t)}},_removeSlideOffset:{value:function(e){if(typeof this._slideOffsets[e]!="undefined"){var t,n,r;delete this._slideOffsets[e],this._slideOffsetsLength--;if(e===this._minSlideOffsetIndex){t=Object.keys(this._slideOffsets),this._minSlideOffsetIndex=2e9;for(n=0;n<t.length;n++)r=t[n]|0,r<this._minSlideOffsetIndex&&(this._minSlideOffsetIndex=r)}if(e===this._maxSlideOffsetIndex){typeof t=="undefined"&&(t=Object.keys(this._slideOffsets)),this._maxSlideOffsetIndex=-1;for(n=0;n<t.length;n++)r=t[n]|0,r>this._maxSlideOffsetIndex&&(this._maxSlideOffsetIndex=r)}}}},_getSlideOffset:{value:function(e){return e<this._minSlideOffsetIndex?this._minSlideOffsetIndex>this._draggedSlideIndex?e=this._draggedSlideIndex:e=this._minSlideOffsetIndex:e>this._maxSlideOffsetIndex&&(this._maxSlideOffsetIndex<this._draggedSlideIndex?e=this._draggedSlideIndex:e=this._maxSlideOffsetIndex),typeof this._slideOffsets[e]!="undefined"?this._slideOffsets[e]:0}},scroll:{get:function(){return this._scroll},set:function(e){e<0&&(e=0),e>this.length&&(e=this.length);if(this._hasElasticScrolling&&this._draggedSlideIndex!==null){var t,n,r=this._draggedSlideIndex-this._range,i=this._draggedSlideIndex+this._range,s,o,u;r>this._minSlideOffsetIndex&&(r=this._minSlideOffsetIndex),i<this._maxSlideOffsetIndex&&(i=this._maxSlideOffsetIndex),s=e-this._scroll,r<0&&(r=0);for(t=r;t<=i;t++)t!==this._draggedSlideIndex?this._incrementSlideOffset(t,s):this._removeSlideOffset(t);this._scroll=e}else this._scroll=e;this.needsDraw=!0}},_isInputEnabled:{value:!0},isInputEnabled:{get:function(){return this._isInputEnabled},set:function(e){e?this._isInputEnabled=!0:this._isInputEnabled=!1}},_draggedSlideIndex:{value:0},draggedSlideIndex:{get:function(){return this._draggedSlideIndex},set:function(e){if(e!==this._draggedSlideIndex){if(e!==null){var t=this._getSlideOffset(e),n=this._minSlideOffsetIndex,r=this._maxSlideOffsetIndex,i;this._incrementSlideOffset(this._draggedSlideIndex,-t);for(i=n;i<=r;i++)i!==this._draggedSlideIndex&&this._incrementSlideOffset(i,-t);this._removeSlideOffset(e),this._scroll-=t,this._flowTranslateComposer._scroll=this._scroll}this._draggedSlideIndex=e,this.needsDraw=!0}}},_elasticScrollingSpeed:{value:1},lastDrawTime:{value:null},offset:{enumerable:!1,value:function(e){var t=this._paths.length,n=e%t,r=Math.floor(e/t)-this._scroll+this._paths[n].headOffset;return{pathIndex:n,slideTime:r+this._getSlideOffset(e)}}},serializeSelf:{value:function(e){e.setProperties();var t=this.originalContent;for(var n=0,r;r=t[n];n++)r.controller&&e.addObject(r.controller)}}})}}),montageDefine("9d0f7db","ui/flow-bezier-spline",{dependencies:["montage"],factory:function(e,t,n){var r=e("montage").Montage,i=t.FlowBezierSpline=r.create(r,{didCreate:{value:function(){this._knots=[],this._densities=[]}},knots:{get:function(){return this._knots},set:function(e){this._knots=e}},previousHandlers:{get:function(){return this._previousHandlers||(this._previousHandlers=[]),this._previousHandlers},set:function(e){this._previousHandlers=e}},nextHandlers:{get:function(){return this._nextHandlers||(this._nextHandlers=[]),this._nextHandlers},set:function(e){this._nextHandlers=e}},densities:{get:function(){return this._densities},set:function(e){this._densities=e,this._densitiesLength=this._densities.length,this._maxTime=null}},_parameters:{value:{}},parameters:{get:function(){return this._parameters||(this._parameters={}),this._parameters},set:function(e){this._parameters=e,this._parametersLength=this._parameters.length}},_maxTime:{enumerable:!1,value:null},computeMaxTime:{value:function(){return this._computeDensitySummation(),this._densitySummation.length?this._maxTime=this._densitySummation[this._densitySummation.length-1]:this._maxTime=0,this._maxTime}},_densitySummation:{enumerable:!1,value:null},_computeDensitySummation:{enumerable:!1,value:function(){var e=this.densities,t=e.length-1,n=0,r;this._densitySummation=[];for(r=0;r<t;r++)n+=(e[r]+e[r+1])/2,this._densitySummation[r]=n;this._maxTime=null}},_convertSplineTimeToBezierIndexTime:{enumerable:!1,value:function(e){if(e<0)return null;this._maxTime===null&&this.computeMaxTime();if(e>=this._maxTime)return null;var t=this._densitySummation,n=t.length,r=n-1,i=n>>1,s,o,u,a,f;while(i)r-i>=0&&t[r-i]>e?r-=i:i>>=1;return s=e-(r?t[r-1]:0),u=this._densities[r],a=this._densities[r+1],f=u-a,f<-1e-10||f>1e-10?o=(u-Math.sqrt(u*u+(a-u)*2*s))/f:o=s/u,[r,o]}},getPositionAtIndexTime:{value:function(e){var t=e[0],n=e[1],r=this._knots[t],i=this._nextHandlers[t],s=this._previousHandlers[t+1],o=this._knots[t+1],u=1-n,a=u*u*u,f=u*u*n*3,l=u*n*n*3,c=n*n*n;return[r[0]*a+i[0]*f+s[0]*l+o[0]*c,r[1]*a+i[1]*f+s[1]*l+o[1]*c,r[2]*a+i[2]*f+s[2]*l+o[2]*c]}},getRotationAtIndexTime:{value:function(e){var t=e[0],n=e[1],r,i,s,o=1-n,u=this._parameters;return typeof u.rotateX!="undefined"?r=u.rotateX.data[t]*o+u.rotateX.data[t+1]*n:r=0,typeof u.rotateY!="undefined"?i=u.rotateY.data[t]*o+u.rotateY.data[t+1]*n:i=0,typeof u.rotateZ!="undefined"?s=u.rotateZ.data[t]*o+u.rotateZ.data[t+1]*n:s=0,[r,i,s]}},getStyleAtIndexTime:{value:function(e){var t=e[0],n=e[1],r=this._parameters,i=1-n,s,o,u="";parameterKeys=Object.keys(r),parameterKeyCount=parameterKeys.length;for(s=0;s<parameterKeyCount;s++)o=parameterKeys[s],jParameter=r[o],jParameterData=jParameter.data,o!=="rotateX"&&o!=="rotateY"&&o!=="rotateZ"&&typeof jParameterData[t]!="undefined"&&typeof jParameterData[t+1]!="undefined"&&(u+=o+":"+((jParameterData[t]*i+jParameterData[t+1]*n)*1e5>>0)*1e-5+jParameter.units+";");return u}},transformVectorArray:{value:function(e,t){var n=e.length,r=[],i,s;for(s=0;s<n;s++)i=e[s],i&&(r[s]=[i[0]*t[0]+i[1]*t[4]+i[2]*t[8]+t[12],i[0]*t[1]+i[1]*t[5]+i[2]*t[9]+t[13],i[0]*t[2]+i[1]*t[6]+i[2]*t[10]+t[14]]);return r}},transform:{value:function(e){var t=i.create();return t._densities=this._densities,t._densitySummation=this._densitySummation,t._knots=this.transformVectorArray(this.knots,e),t._previousHandlers=this.transformVectorArray(this.previousHandlers,e),t._nextHandlers=this.transformVectorArray(this.nextHandlers,e),t}},deCasteljau:{value:function(e,t,n,r,i){var s=1-i,o=s*e[0]+i*t[0],u=s*t[0]+i*n[0],a=s*n[0]+i*r[0],f=s*o+i*u,l=s*u+i*a,c=s*f+i*l,h=s*e[1]+i*t[1],p=s*t[1]+i*n[1],d=s*n[1]+i*r[1],v=s*h+i*p,m=s*p+i*d,g=s*v+i*m,y=s*e[2]+i*t[2],b=s*t[2]+i*n[2],w=s*n[2]+i*r[2],E=s*y+i*b,S=s*b+i*w,x=s*E+i*S;return[[e,[o,h,y],[f,v,E],[c,g,x]],[[c,g,x],[l,m,S],[a,d,w],r]]}},cubic:{enumerable:!1,value:function(e,t,n,r,i){return((e*i+t)*i+n)*i+r}},cubeRoot:{enumerable:!1,value:function(e){return e>0?Math.pow(e,1/3):-Math.pow(-e,1/3)}},cubicRealRoots:{enumerable:!1,value:function(e,t,n,r){var i=1e-100,s=Math;if(e<-i||e>i){var o=1/e,u=t*o,a=n*o,f=(3*a-u*u)*(1/9),l=(4.5*u*a-13.5*r*o-u*u*u)*(1/27),c=f*f*f+l*l;if(c>i){var h=s.sqrt(c);return[this.cubeRoot(l+h)+this.cubeRoot(l-h)+u*(-1/3)]}if(c>-i){if(l<-i||l>i){var p=this.cubeRoot(l),d=p*2+u*(-1/3),v=u*(-1/3)-p;return d<v?[d,v]:[v,d]}return[u*(-1/3)]}var m=s.acos(l/s.sqrt(-f*f*f))*(1/3),g=s.sqrt(-f),y=g*s.sin(m)*1.7320508075688772,b=u*(-1/3);return g*=s.cos(m),[b-g-y,b-g+y,b+g*2]}if(t<-i||t>i){var w=n*n-4*t*r;return w>=0?(w=s.sqrt(w),[(-n-w)/(2*t),(w-n)/(2*t)]):[]}return n<-i||n>i?[-r/n]:[]}},_halfPI:{enumerable:!1,value:Math.PI*.5},reflectionMatrix:{enumerable:!1,value:function(e,t,n,r){var i=Math,s=this._halfPI-i.atan2(t,e),o=i.sin(s),u=i.cos(s),a=this._halfPI-i.atan2(n,e*o+t*u),f=i.sin(a);return r[0]=f*o,r[1]=u*f,r[2]=i.cos(a),r}},reflectedY:{enumerable:!1,value:function(e,t,n,r){return e*r[0]+t*r[1]+n*r[2]}},directedPlaneBezierIntersection:{enumerable:!1,value:function(e,t,n,r,i,s,o,u,a){var f=this.reflectionMatrix(r[0],r[1],r[2],a),l=this.reflectedY(i[0]-e,i[1]-t,i[2]-n,f),c=this.reflectedY(s[0]-e,s[1]-t,s[2]-n,f),h=this.reflectedY(o[0]-e,o[1]-t,o[2]-n,f),p=this.reflectedY(u[0]-e,u[1]-t,u[2]-n,f),d=(c-h)*3+p-l,v=(l+h)*3-6*c,m=(c-l)*3,g=this.cubicRealRoots(d,v,m,l),y,b=0,w,E=0,S=[];while(E<g.length&&g[E]<=0)E++;while(E<g.length&&g[E]<1)y=b,b=g[E],w=(y+b)*.5,this.cubic(d,v,m,l,w)>=0&&S.push([y,b]),E++;return w=(b+1)*.5,this.cubic(d,v,m,l,w)>=0&&S.push([b,1]),S}}})}}),montageDefine("9d0f7db","ui/scroller.reel/scroller",{dependencies:["montage","ui/component"],factory:function(e,t,n){var r=e("montage").Montage,i=e("ui/component").Component;t.Scroller=r.create(i,{_scrollX:{value:0},scrollX:{get:function(){return this._scrollX},set:function(e){this._scrollX!==e&&(this._scrollX=e,this.needsDraw=!0)}},_scrollY:{value:0},scrollY:{get:function(){return this._scrollY},set:function(e){this._scrollY!==e&&(this._scrollY=e,this.needsDraw=!0)}},_maxTranslateX:{value:0},_maxTranslateY:{value:0},_axis:{value:"auto"},axis:{get:function(){return this._axis},set:function(e){this._axis=e,this.needsDraw=!0}},_displayScrollbars:{value:"auto"},displayScrollbars:{get:function(){return this._displayScrollbars},set:function(e){switch(e){case"vertical":case"horizontal":case"both":case"auto":this._displayScrollbars=e;break;default:this._displayScrollbars="none"}this.needsDraw=!0}},_hasMomentum:{value:!0},hasMomentum:{get:function(){return this._hasMomentum},set:function(e){this._hasMomentum=e}},_content:{value:null},_scrollBars:{value:null},handleTranslateStart:{value:function(e){this._scrollBars.opacity=.5}},handleTranslateEnd:{value:function(e){this._scrollBars.opacity=0}},canDraw:{value:function(){return this.needsDraw=!0,i.canDraw.apply(this,arguments)}},willDraw:{value:function(){this._left=this._element.offsetLeft,this._top=this._element.offsetTop,this._width=this._element.offsetWidth,this._height=this._element.offsetHeight,this._maxTranslateX=this._content.scrollWidth-this._width,this._maxTranslateX<0&&(this._maxTranslateX=0),this._maxTranslateY=this._content.offsetHeight-this._height,this._maxTranslateY<0&&(this._maxTranslateY=0);var e=this.callDelegateMethod("didSetMaxScroll",{x:this._maxTranslateX,y:this._maxTranslateY});e&&(this._maxTranslateX=e.x,this._maxTranslateY=e.y),this.scrollX=Math.min(this._scrollX,this._maxTranslateX),this.scrollY=Math.min(this._scrollY,this._maxTranslateY);switch(this._displayScrollbars){case"horizontal":this._scrollBars.displayHorizontal=!0,this._scrollBars.displayVertical=!1;break;case"vertical":this._scrollBars.displayHorizontal=!1,this._scrollBars.displayVertical=!0;break;case"both":this._scrollBars.displayHorizontal=!0,this._scrollBars.displayVertical=!0;break;case"auto":this._scrollBars.displayHorizontal=!!this._maxTranslateX,this._scrollBars.displayVertical=!!this._maxTranslateY;break;case"none":this._scrollBars.displayHorizontal=!1,this._scrollBars.displayVertical=!1}this._scrollBars.displayHorizontal&&(this._content.scrollWidth?(this._scrollBars.horizontalLength=this._width/this._content.scrollWidth,this._scrollBars.horizontalScroll=this._scrollX/this._content.scrollWidth):(this._scrollBars.horizontalLength=1,this._scrollBars.horizontalScroll=0)),this._scrollBars.displayVertical&&(this._content.offsetHeight?(this._scrollBars.verticalLength=this._height/this._content.offsetHeight,this._scrollBars.verticalScroll=this._scrollY/this._content.offsetHeight):(this._scrollBars.verticalLength=1,this._scrollBars.verticalScroll=0))}},draw:{value:function(){var e=-this._scrollX+"px, "+ -this._scrollY+"px";this._content.style.webkitTransform="translate3d("+e+", 0px)",this._content.style.MozTransform="translate("+e+")",this._content.style.transform="translate("+e+")"}}})}}),montageDefine("68ab44f","ui/main.reel/main.html",{text:'<!DOCTYPE html>\n\n<html>\n    <head>\n        <meta http-equiv=content-type content="text/html; charset=utf-8">\n\n        <link rel=stylesheet type="text/css" href=main.css>\n        <link href="http://fonts.googleapis.com/css?family=Nunito:400,700" rel=stylesheet type="text/css">\n        <script type="text/montage-serialization">{"owner":{"properties":{"element":{"#":"main"}}},"facadeflow":{"prototype":"ui/facadeflow.reel","properties":{"element":{"#":"facade-flow"}},"bindings":{"property":{"<-":"@label.path"},"latestBoxofficeMovies":{"<-":"@owner.appData.latestBoxofficeMovies"},"upcomingMovies":{"<-":"@owner.appData.upcomingMovies"},"topDvdRentals":{"<-":"@owner.appData.topDvdRentals"},"inTheaters":{"<-":"@owner.appData.inTheaters"},"categoryId":{"<-":"@owner.categoryId"}}},"latest":{"prototype":"montage/ui/toggle-button.reel","properties":{"element":{"#":"latest"},"identifier":"categoryButton","pressedClass":"selected","category":"latestBoxofficeMovies"},"listeners":[{"type":"action","listener":{"@":"owner"}}]},"theaters":{"prototype":"montage/ui/toggle-button.reel","properties":{"element":{"#":"theaters"},"identifier":"categoryButton","pressedClass":"selected","category":"inTheaters"},"listeners":[{"type":"action","listener":{"@":"owner"}}]},"dvd":{"prototype":"montage/ui/toggle-button.reel","properties":{"element":{"#":"dvd"},"identifier":"categoryButton","pressedClass":"selected","category":"topDvdRentals"},"listeners":[{"type":"action","listener":{"@":"owner"}}]},"upcoming":{"prototype":"montage/ui/toggle-button.reel","properties":{"element":{"#":"upcoming"},"identifier":"categoryButton","pressedClass":"selected","category":"upcomingMovies"},"listeners":[{"type":"action","listener":{"@":"owner"}}]},"popup":{"prototype":"ui/moviepopup.reel","properties":{"element":{"#":"popup"}}}}</script>\n\n    </head>\n\n    <body>\n        <div data-montage-id=main class=main>\n            <div data-montage-id=facade class=facade>\n                <header class=header>\n                    <img class=logo src="assets/image/logo.png" alt=logo>\n                    <div class="filter montage-ButtonGroup">\n                        <button data-montage-id=latest>Box Office</button>\n                        <button data-montage-id=theaters>In Theaters</button>\n                        <button data-montage-id=upcoming>Upcoming</button>\n                        <button data-montage-id=dvd>DVD Rentals</button>\n                    </div>\n                </header>\n                <div data-montage-id=facade-flow class=facade-flow></div>\n                <div data-montage-id=popup class=popup></div>\n            </div>\n        </div>\n    </body>\n\n</html>'}),montageDefine("9d0f7db","ui/scroller.reel/scroller.html",{text:'<!DOCTYPE html>\n\n<html>\n<head>\n    <meta charset=utf-8>\n    <link rel=stylesheet href=scroller.css>\n    <script type="text/montage-serialization">{"scrollbars":{"prototype":"ui/scroll-bars.reel","properties":{"element":{"#":"scrollbars"}}},"translateComposer1":{"prototype":"ui/composer/translate-composer","properties":{"component":{"@":"owner"},"minTranslateX":0,"minTranslateY":0,"invertAxis":true},"bindings":{"translateX":{"<->":"@owner.scrollX"},"translateY":{"<->":"@owner.scrollY"},"maxTranslateX":{"<-":"@owner._maxTranslateX"},"maxTranslateY":{"<-":"@owner._maxTranslateY"},"axis":{"<-":"@owner.axis"},"hasMomentum":{"<-":"@owner.hasMomentum"}},"listeners":[{"type":"translateStart","listener":{"@":"owner"}},{"type":"translateEnd","listener":{"@":"owner"}}]},"slot":{"prototype":"ui/slot.reel","properties":{"element":{"#":"content"}},"bindings":{"domContent":{"<-":"@owner.domContent"}}},"owner":{"prototype":"ui/scroller.reel","properties":{"_content":{"#":"content"},"element":{"#":"montage-scroller"},"_scrollBars":{"@":"scrollbars"}}}}</script>\n</head>\n<body>\n    <div data-montage-id=montage-scroller class=montage-Scroller>\n        <div data-montage-id=scrollbars></div>\n        <div data-montage-id=content class=montage-Scroller-content></div>\n    </div>\n</body>\n</html>'}),montageDefine("68ab44f","ui/moviepopup.reel/moviepopup.html",{text:'<!DOCTYPE html>\n\n<html>\n    <head>\n        <meta http-equiv=content-type content="text/html; charset=utf-8">\n        <link rel=stylesheet type="text/css" href=moviepopup.css>\n        <script src="http://www.youtube.com/player_api"></script>\n        <script type="text/montage-serialization">{"closeButton":{"prototype":"montage/ui/button.reel","properties":{"element":{"#":"close-button"}},"listeners":[{"type":"action","listener":{"@":"owner"}}]},"owner":{"properties":{"element":{"#":"moviepopup"},"player":{"#":"iframe"}}}}</script>\n    </head>\n\n    <body>\n        <div data-montage-id=moviepopup class=moviepopup>\n            <button data-montage-id=close-button class="button button-close">x</button>\n            <iframe data-montage-id=iframe class=montage-youtube-player type="text/html" width=1024 height=616 frameborder=0 allowfullscreen=allowfullscreen></iframe>​\n        </div>\n    </body>\n\n</html>'}),montageDefine("9d0f7db","ui/controller/object-controller",{dependencies:["montage"],factory:function(e,t,n){var r=e("montage").Montage,i=t.ObjectController=r.create(r,{objectPrototype:{enumerable:!1,value:null},newObject:{enumerable:!1,value:function(){return this.objectPrototype.create()}},initWithContent:{value:function(e){return this.content=e,this}},content:{enumerable:!1,value:null},blueprintModuleId:e("montage")._blueprintModuleIdDescriptor,blueprint:e("montage")._blueprintDescriptor})}}),montageDefine("68ab44f","ui/image.reel/image",{dependencies:["montage","montage/ui/component"],factory:function(e,t,n){var r=e("montage").Montage,i=e("montage/ui/component").Component,s=t.Image=r.create(i,{_src:{value:null},src:{set:function(e){e!==this._src&&(this._src=e,this.needsDraw=!0)}},draw:{value:function(){this._element.style.backgroundImage="url("+this._src+")"}}})}}),montageDefine("68ab44f","model/appdata",{dependencies:["montage"],factory:function(e,t,n){var r=e("montage").Montage;t.AppData=r.create(r,{latestBoxofficeMovies:{value:null},upcomingMovies:{value:null},topDvdRentals:{value:null},inTheaters:{value:null}})}})
bundleLoaded("index.html.bundle-1-3.js")