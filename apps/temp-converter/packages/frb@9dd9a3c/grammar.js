module.exports=function(){function e(e,t){function n(){this.constructor=e}n.prototype=t.prototype,e.prototype=new n}function t(e,t,n,i,r){function a(e,t){function n(e){function t(e){return e.charCodeAt(0).toString(16).toUpperCase()}return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g,function(e){return"\\x0"+t(e)}).replace(/[\x10-\x1F\x80-\xFF]/g,function(e){return"\\x"+t(e)}).replace(/[\u0180-\u0FFF]/g,function(e){return"\\u0"+t(e)}).replace(/[\u1080-\uFFFF]/g,function(e){return"\\u"+t(e)})}var i,r;switch(e.length){case 0:i="end of input";break;case 1:i=e[0];break;default:i=e.slice(0,-1).join(", ")+" or "+e[e.length-1]}return r=t?'"'+n(t)+'"':"end of input","Expected "+i+" but "+r+" found."}this.expected=e,this.found=t,this.offset=n,this.line=i,this.column=r,this.name="SyntaxError",this.message=a(e,t)}function n(e){function n(t){function n(t,n,i){var r,a;for(r=n;i>r;r++)a=e.charAt(r),"\n"===a?(t.seenCR||t.line++,t.column=1,t.seenCR=!1):"\r"===a||"\u2028"===a||"\u2029"===a?(t.line++,t.column=1,t.seenCR=!0):(t.column++,t.seenCR=!1)}return Hr!==t&&(Hr>t&&(Hr=0,Yr={line:1,column:1,seenCR:!1}),n(Yr,Hr,t),Hr=t),Yr}function i(e){Gr>Ur||(Ur>Gr&&(Gr=Ur,Xr=[]),Xr.push(e))}function r(e){var t=0;for(e.sort();e.length>t;)e[t-1]===e[t]?e.splice(t,1):t++}function a(){var e,t;return Kr++,e=l(),Kr--,null===e&&(t=null,0===Kr&&i(Q)),e}function o(){var t,n,r,o,s,l,u;if(t=Ur,n=a(),null!==n){for(r=[],o=Ur,44===e.charCodeAt(Ur)?(s=tt,Ur++):(s=null,0===Kr&&i(nt)),null!==s?(l=F(),null!==l?(u=a(),null!==u?(s=[s,l,u],o=s):(Ur=o,o=et)):(Ur=o,o=et)):(Ur=o,o=et);null!==o;)r.push(o),o=Ur,44===e.charCodeAt(Ur)?(s=tt,Ur++):(s=null,0===Kr&&i(nt)),null!==s?(l=F(),null!==l?(u=a(),null!==u?(s=[s,l,u],o=s):(Ur=o,o=et)):(Ur=o,o=et)):(Ur=o,o=et);null!==r?(Wr=t,n=it(n,r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)}else Ur=t,t=et;return t}function s(){var t,n,r,a;return t=Ur,40===e.charCodeAt(Ur)?(n=rt,Ur++):(n=null,0===Kr&&i(at)),null!==n?(r=F(),null!==r?(41===e.charCodeAt(Ur)?(a=ot,Ur++):(a=null,0===Kr&&i(st)),null!==a?(Wr=t,n=lt(),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et),null===t&&(t=Ur,40===e.charCodeAt(Ur)?(n=rt,Ur++):(n=null,0===Kr&&i(at)),null!==n?(r=o(),null!==r?(41===e.charCodeAt(Ur)?(a=ot,Ur++):(a=null,0===Kr&&i(st)),null!==a?(Wr=t,n=ut(r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)),t}function l(){var t,n,r,o,s,l,c,h,d,p,f;return t=Ur,n=u(),null!==n?(r=F(),null!==r?(o=Ur,63===e.charCodeAt(Ur)?(s=ht,Ur++):(s=null,0===Kr&&i(dt)),null!==s?(l=F(),null!==l?(c=a(),null!==c?(h=F(),null!==h?(58===e.charCodeAt(Ur)?(d=pt,Ur++):(d=null,0===Kr&&i(ft)),null!==d?(p=F(),null!==p?(f=a(),null!==f?(s=[s,l,c,h,d,p,f],o=s):(Ur=o,o=et)):(Ur=o,o=et)):(Ur=o,o=et)):(Ur=o,o=et)):(Ur=o,o=et)):(Ur=o,o=et)):(Ur=o,o=et),null===o&&(o=ct),null!==o?(Wr=t,n=mt(n,o),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et),t}function u(){var t,n,r,a,o,s,l,u;if(t=Ur,n=c(),null!==n){for(r=[],a=Ur,o=F(),null!==o?(e.substr(Ur,2)===vt?(s=vt,Ur+=2):(s=null,0===Kr&&i(gt)),null!==s?(l=F(),null!==l?(u=c(),null!==u?(o=[o,s,l,u],a=o):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et);null!==a;)r.push(a),a=Ur,o=F(),null!==o?(e.substr(Ur,2)===vt?(s=vt,Ur+=2):(s=null,0===Kr&&i(gt)),null!==s?(l=F(),null!==l?(u=c(),null!==u?(o=[o,s,l,u],a=o):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et);null!==r?(Wr=t,n=_t(n,r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)}else Ur=t,t=et;return t}function c(){var t,n,r,a,o,s,l,u;if(t=Ur,n=h(),null!==n){for(r=[],a=Ur,o=F(),null!==o?(e.substr(Ur,2)===bt?(s=bt,Ur+=2):(s=null,0===Kr&&i(yt)),null!==s?(l=F(),null!==l?(u=h(),null!==u?(o=[o,s,l,u],a=o):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et);null!==a;)r.push(a),a=Ur,o=F(),null!==o?(e.substr(Ur,2)===bt?(s=bt,Ur+=2):(s=null,0===Kr&&i(yt)),null!==s?(l=F(),null!==l?(u=h(),null!==u?(o=[o,s,l,u],a=o):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et);null!==r?(Wr=t,n=_t(n,r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)}else Ur=t,t=et;return t}function h(){var t,n,r,a,o,s,l,u,c;return t=Ur,n=d(),null!==n?(r=Ur,a=F(),null!==a?(o=Ur,e.substr(Ur,3)===wt?(s=wt,Ur+=3):(s=null,0===Kr&&i(Et)),null===s&&(e.substr(Ur,2)===Ct?(s=Ct,Ur+=2):(s=null,0===Kr&&i(St)),null===s&&(e.substr(Ur,2)===Tt?(s=Tt,Ur+=2):(s=null,0===Kr&&i(xt)),null===s&&(s=Ur,60===e.charCodeAt(Ur)?(l=Ot,Ur++):(l=null,0===Kr&&i(Pt)),null!==l?(u=Ur,Kr++,45===e.charCodeAt(Ur)?(c=Mt,Ur++):(c=null,0===Kr&&i(Dt)),Kr--,null===c?u=ct:(Ur=u,u=et),null!==u?(l=[l,u],s=l):(Ur=s,s=et)):(Ur=s,s=et),null===s&&(62===e.charCodeAt(Ur)?(s=Lt,Ur++):(s=null,0===Kr&&i(At)),null===s&&(e.substr(Ur,2)===kt?(s=kt,Ur+=2):(s=null,0===Kr&&i(jt)),null===s&&(e.substr(Ur,2)===It?(s=It,Ur+=2):(s=null,0===Kr&&i(zt)))))))),null!==s&&(s=e.substring(o,Ur)),o=s,null!==o?(s=F(),null!==s?(l=d(),null!==l?(a=[a,o,s,l],r=a):(Ur=r,r=et)):(Ur=r,r=et)):(Ur=r,r=et)):(Ur=r,r=et),null===r&&(r=ct),null!==r?(Wr=t,n=Rt(n,r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et),t}function d(){var t,n,r,a,o,s,l,u;if(t=Ur,n=p(),null!==n){for(r=[],a=Ur,o=F(),null!==o?(s=Ur,43===e.charCodeAt(Ur)?(l=Bt,Ur++):(l=null,0===Kr&&i(Nt)),null===l&&(45===e.charCodeAt(Ur)?(l=Mt,Ur++):(l=null,0===Kr&&i(Dt))),null!==l&&(l=e.substring(s,Ur)),s=l,null!==s?(l=F(),null!==l?(u=p(),null!==u?(o=[o,s,l,u],a=o):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et);null!==a;)r.push(a),a=Ur,o=F(),null!==o?(s=Ur,43===e.charCodeAt(Ur)?(l=Bt,Ur++):(l=null,0===Kr&&i(Nt)),null===l&&(45===e.charCodeAt(Ur)?(l=Mt,Ur++):(l=null,0===Kr&&i(Dt))),null!==l&&(l=e.substring(s,Ur)),s=l,null!==s?(l=F(),null!==l?(u=p(),null!==u?(o=[o,s,l,u],a=o):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et);null!==r?(Wr=t,n=_t(n,r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)}else Ur=t,t=et;return t}function p(){var t,n,r,a,o,s,l,u;if(t=Ur,n=f(),null!==n){for(r=[],a=Ur,o=F(),null!==o?(s=Ur,42===e.charCodeAt(Ur)?(l=Ft,Ur++):(l=null,0===Kr&&i(qt)),null===l&&(47===e.charCodeAt(Ur)?(l=Vt,Ur++):(l=null,0===Kr&&i(Ut)),null===l&&(37===e.charCodeAt(Ur)?(l=Wt,Ur++):(l=null,0===Kr&&i(Ht)),null===l&&(e.substr(Ur,3)===Yt?(l=Yt,Ur+=3):(l=null,0===Kr&&i(Gt))))),null!==l&&(l=e.substring(s,Ur)),s=l,null!==s?(l=F(),null!==l?(u=f(),null!==u?(o=[o,s,l,u],a=o):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et);null!==a;)r.push(a),a=Ur,o=F(),null!==o?(s=Ur,42===e.charCodeAt(Ur)?(l=Ft,Ur++):(l=null,0===Kr&&i(qt)),null===l&&(47===e.charCodeAt(Ur)?(l=Vt,Ur++):(l=null,0===Kr&&i(Ut)),null===l&&(37===e.charCodeAt(Ur)?(l=Wt,Ur++):(l=null,0===Kr&&i(Ht)),null===l&&(e.substr(Ur,3)===Yt?(l=Yt,Ur+=3):(l=null,0===Kr&&i(Gt))))),null!==l&&(l=e.substring(s,Ur)),s=l,null!==s?(l=F(),null!==l?(u=f(),null!==u?(o=[o,s,l,u],a=o):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et);null!==r?(Wr=t,n=_t(n,r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)}else Ur=t,t=et;return t}function f(){var t,n,r,a,o,s,l,u;if(t=Ur,n=m(),null!==n){for(r=[],a=Ur,o=F(),null!==o?(s=Ur,e.substr(Ur,2)===Xt?(l=Xt,Ur+=2):(l=null,0===Kr&&i(Kt)),null===l&&(e.substr(Ur,2)===Jt?(l=Jt,Ur+=2):(l=null,0===Kr&&i($t)),null===l&&(e.substr(Ur,2)===Zt?(l=Zt,Ur+=2):(l=null,0===Kr&&i(Qt)))),null!==l&&(l=e.substring(s,Ur)),s=l,null!==s?(l=F(),null!==l?(u=m(),null!==u?(o=[o,s,l,u],a=o):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et);null!==a;)r.push(a),a=Ur,o=F(),null!==o?(s=Ur,e.substr(Ur,2)===Xt?(l=Xt,Ur+=2):(l=null,0===Kr&&i(Kt)),null===l&&(e.substr(Ur,2)===Jt?(l=Jt,Ur+=2):(l=null,0===Kr&&i($t)),null===l&&(e.substr(Ur,2)===Zt?(l=Zt,Ur+=2):(l=null,0===Kr&&i(Qt)))),null!==l&&(l=e.substring(s,Ur)),s=l,null!==s?(l=F(),null!==l?(u=m(),null!==u?(o=[o,s,l,u],a=o):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et);null!==r?(Wr=t,n=_t(n,r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)}else Ur=t,t=et;return t}function m(){var t,n,r,a,o,s,l,u;if(t=Ur,n=v(),null!==n){for(r=[],a=Ur,o=F(),null!==o?(e.substr(Ur,2)===en?(s=en,Ur+=2):(s=null,0===Kr&&i(tn)),null!==s?(l=F(),null!==l?(u=v(),null!==u?(o=[o,s,l,u],a=o):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et);null!==a;)r.push(a),a=Ur,o=F(),null!==o?(e.substr(Ur,2)===en?(s=en,Ur+=2):(s=null,0===Kr&&i(tn)),null!==s?(l=F(),null!==l?(u=v(),null!==u?(o=[o,s,l,u],a=o):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et);null!==r?(Wr=t,n=_t(n,r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)}else Ur=t,t=et;return t}function v(){var t,n,r;return t=Ur,n=Ur,33===e.charCodeAt(Ur)?(r=nn,Ur++):(r=null,0===Kr&&i(rn)),null===r&&(43===e.charCodeAt(Ur)?(r=Bt,Ur++):(r=null,0===Kr&&i(Nt)),null===r&&(45===e.charCodeAt(Ur)?(r=Mt,Ur++):(r=null,0===Kr&&i(Dt)))),null!==r&&(r=e.substring(n,Ur)),n=r,null!==n?(r=v(),null!==r?(Wr=t,n=an(n,r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et),null===t&&(t=g()),t}function g(){var e,t,n,i;if(e=Ur,t=y(),null!==t){for(n=[],i=_();null!==i;)n.push(i),i=_();null!==n?(Wr=e,t=on(t,n),null===t?(Ur=e,e=t):e=t):(Ur=e,e=et)}else Ur=e,e=et;return e}function _(){var t,n,r,o;return t=Ur,46===e.charCodeAt(Ur)?(n=sn,Ur++):(n=null,0===Kr&&i(ln)),null!==n?(r=b(),null!==r?(Wr=t,n=un(r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et),null===t&&(t=Ur,91===e.charCodeAt(Ur)?(n=cn,Ur++):(n=null,0===Kr&&i(hn)),null!==n?(r=a(),null!==r?(93===e.charCodeAt(Ur)?(o=dn,Ur++):(o=null,0===Kr&&i(pn)),null!==o?(Wr=t,n=fn(r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)),t}function b(){var t,n,r,o,l;return t=Ur,n=Ur,r=w(),null!==r&&(r=e.substring(n,Ur)),n=r,null!==n?(123===e.charCodeAt(Ur)?(r=mn,Ur++):(r=null,0===Kr&&i(vn)),null!==r?(o=a(),null!==o?(125===e.charCodeAt(Ur)?(l=gn,Ur++):(l=null,0===Kr&&i(_n)),null!==l?(Wr=t,n=bn(n,o),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et),null===t&&(t=Ur,n=Ur,r=w(),null!==r&&(r=e.substring(n,Ur)),n=r,null!==n?(r=s(),null!==r?(Wr=t,n=yn(n,r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et),null===t&&(t=Ur,n=z(),null!==n&&(Wr=t,n=wn(n)),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,n=Ur,r=w(),null!==r&&(r=e.substring(n,Ur)),n=r,null!==n&&(Wr=t,n=En(n)),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,n=O(),null!==n&&(Wr=t,n=Cn(n)),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,n=P(),null!==n&&(Wr=t,n=Cn(n)),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,40===e.charCodeAt(Ur)?(n=rt,Ur++):(n=null,0===Kr&&i(at)),null!==n?(r=a(),null!==r?(41===e.charCodeAt(Ur)?(o=ot,Ur++):(o=null,0===Kr&&i(st)),null!==o?(Wr=t,n=Cn(r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et))))))),t}function y(){var t,n,r,o;return t=O(),null===t&&(t=P(),null===t&&(t=E(),null===t&&(t=L(),null===t&&(t=Ur,e.substr(Ur,4)===Sn?(n=Sn,Ur+=4):(n=null,0===Kr&&i(Tn)),null!==n&&(Wr=t,n=xn()),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,e.substr(Ur,4)===On?(n=On,Ur+=4):(n=null,0===Kr&&i(Pn)),null!==n&&(Wr=t,n=Mn()),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,e.substr(Ur,5)===Dn?(n=Dn,Ur+=5):(n=null,0===Kr&&i(Ln)),null!==n&&(Wr=t,n=An()),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,e.substr(Ur,4)===kn?(n=kn,Ur+=4):(n=null,0===Kr&&i(jn)),null!==n&&(Wr=t,n=In()),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,64===e.charCodeAt(Ur)?(n=zn,Ur++):(n=null,0===Kr&&i(Rn)),null!==n?(r=Ur,o=Y(),null!==o&&(o=e.substring(r,Ur)),r=o,null!==r?(Wr=t,n=Bn(r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et),null===t&&(t=Ur,36===e.charCodeAt(Ur)?(n=Nn,Ur++):(n=null,0===Kr&&i(Fn)),null!==n?(r=Ur,o=w(),null!==o&&(o=e.substring(r,Ur)),r=o,null!==r?(Wr=t,n=qn(r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et),null===t&&(t=Ur,36===e.charCodeAt(Ur)?(n=Nn,Ur++):(n=null,0===Kr&&i(Fn)),null!==n&&(Wr=t,n=Vn()),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,35===e.charCodeAt(Ur)?(n=Un,Ur++):(n=null,0===Kr&&i(Wn)),null!==n?(r=Ur,o=w(),null!==o&&(o=e.substring(r,Ur)),r=o,null!==r?(Wr=t,n=Hn(r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et),null===t&&(t=Ur,38===e.charCodeAt(Ur)?(n=Yn,Ur++):(n=null,0===Kr&&i(Gn)),null!==n?(r=Ur,o=w(),null!==o&&(o=e.substring(r,Ur)),r=o,null!==r?(o=s(),null!==o?(Wr=t,n=Xn(r,o),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et),null===t&&(t=Ur,94===e.charCodeAt(Ur)?(n=Kn,Ur++):(n=null,0===Kr&&i(Jn)),null!==n?(r=y(),null!==r?(Wr=t,n=$n(r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et),null===t&&(t=Ur,40===e.charCodeAt(Ur)?(n=rt,Ur++):(n=null,0===Kr&&i(at)),null!==n?(r=a(),null!==r?(41===e.charCodeAt(Ur)?(o=ot,Ur++):(o=null,0===Kr&&i(st)),null!==o?(Wr=t,n=Zn(r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et),null===t&&(t=Ur,n=b(),null!==n&&(Wr=t,n=Qn(n)),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,n=[],null!==n&&(Wr=t,n=ei()),null===n?(Ur=t,t=n):t=n)))))))))))))))),t}function w(){var t,n;if(Kr++,t=[],ni.test(e.charAt(Ur))?(n=e.charAt(Ur),Ur++):(n=null,0===Kr&&i(ii)),null!==n)for(;null!==n;)t.push(n),ni.test(e.charAt(Ur))?(n=e.charAt(Ur),Ur++):(n=null,0===Kr&&i(ii));else t=et;return Kr--,null===t&&(n=null,0===Kr&&i(ti)),t}function E(){var t,n,r,a;if(Kr++,t=Ur,39===e.charCodeAt(Ur)?(n=ai,Ur++):(n=null,0===Kr&&i(oi)),null!==n){for(r=[],a=C();null!==a;)r.push(a),a=C();null!==r?(39===e.charCodeAt(Ur)?(a=ai,Ur++):(a=null,0===Kr&&i(oi)),null!==a?(Wr=t,n=si(r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)}else Ur=t,t=et;if(null===t)if(t=Ur,34===e.charCodeAt(Ur)?(n=li,Ur++):(n=null,0===Kr&&i(ui)),null!==n){for(r=[],a=S();null!==a;)r.push(a),a=S();null!==r?(34===e.charCodeAt(Ur)?(a=li,Ur++):(a=null,0===Kr&&i(ui)),null!==a?(Wr=t,n=si(r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)}else Ur=t,t=et;return Kr--,null===t&&(n=null,0===Kr&&i(ri)),t}function C(){var t,n;return ci.test(e.charAt(Ur))?(t=e.charAt(Ur),Ur++):(t=null,0===Kr&&i(hi)),null===t&&(t=Ur,e.substr(Ur,2)===di?(n=di,Ur+=2):(n=null,0===Kr&&i(pi)),null!==n&&(Wr=t,n=fi()),null===n?(Ur=t,t=n):t=n,null===t&&(t=T())),t}function S(){var t,n;return mi.test(e.charAt(Ur))?(t=e.charAt(Ur),Ur++):(t=null,0===Kr&&i(vi)),null===t&&(t=Ur,e.substr(Ur,2)===gi?(n=gi,Ur+=2):(n=null,0===Kr&&i(_i)),null!==n&&(Wr=t,n=bi()),null===n?(Ur=t,t=n):t=n,null===t&&(t=T())),t}function T(){var t,n,r,a,o,s,l,u;return t=Ur,e.substr(Ur,2)===yi?(n=yi,Ur+=2):(n=null,0===Kr&&i(wi)),null!==n&&(Wr=t,n=Ei()),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,e.substr(Ur,2)===Ci?(n=Ci,Ur+=2):(n=null,0===Kr&&i(Si)),null!==n&&(Wr=t,n=Ti()),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,e.substr(Ur,2)===xi?(n=xi,Ur+=2):(n=null,0===Kr&&i(Oi)),null!==n&&(Wr=t,n=Pi()),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,e.substr(Ur,2)===Mi?(n=Mi,Ur+=2):(n=null,0===Kr&&i(Di)),null!==n&&(Wr=t,n=Li()),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,e.substr(Ur,2)===Ai?(n=Ai,Ur+=2):(n=null,0===Kr&&i(ki)),null!==n&&(Wr=t,n=ji()),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,e.substr(Ur,2)===Ii?(n=Ii,Ur+=2):(n=null,0===Kr&&i(zi)),null!==n&&(Wr=t,n=Ri()),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,e.substr(Ur,2)===Bi?(n=Bi,Ur+=2):(n=null,0===Kr&&i(Ni)),null!==n&&(Wr=t,n=Fi()),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,e.substr(Ur,2)===qi?(n=qi,Ur+=2):(n=null,0===Kr&&i(Vi)),null!==n&&(Wr=t,n=Ui()),null===n?(Ur=t,t=n):t=n,null===t&&(t=Ur,e.substr(Ur,2)===Wi?(n=Wi,Ur+=2):(n=null,0===Kr&&i(Hi)),null!==n?(r=Ur,a=Ur,o=x(),null!==o?(s=x(),null!==s?(l=x(),null!==l?(u=x(),null!==u?(o=[o,s,l,u],a=o):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et),null!==a&&(a=e.substring(r,Ur)),r=a,null!==r?(Wr=t,n=Yi(r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et))))))))),t}function x(){var t;return Gi.test(e.charAt(Ur))?(t=e.charAt(Ur),Ur++):(t=null,0===Kr&&i(Xi)),t}function O(){var t,n,r,a;return t=Ur,91===e.charCodeAt(Ur)?(n=cn,Ur++):(n=null,0===Kr&&i(hn)),null!==n?(r=F(),null!==r?(93===e.charCodeAt(Ur)?(a=dn,Ur++):(a=null,0===Kr&&i(pn)),null!==a?(Wr=t,n=Ki(),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et),null===t&&(t=Ur,91===e.charCodeAt(Ur)?(n=cn,Ur++):(n=null,0===Kr&&i(hn)),null!==n?(r=o(),null!==r?(93===e.charCodeAt(Ur)?(a=dn,Ur++):(a=null,0===Kr&&i(pn)),null!==a?(Wr=t,n=Ji(r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)),t}function P(){var t,n,r,a,o,s;return t=Ur,123===e.charCodeAt(Ur)?(n=mn,Ur++):(n=null,0===Kr&&i(vn)),null!==n?(r=F(),null!==r?(125===e.charCodeAt(Ur)?(a=gn,Ur++):(a=null,0===Kr&&i(_n)),null!==a?(o=F(),null!==o?(Wr=t,n=$i(),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et),null===t&&(t=Ur,123===e.charCodeAt(Ur)?(n=mn,Ur++):(n=null,0===Kr&&i(vn)),null!==n?(r=F(),null!==r?(a=M(),null!==a?(125===e.charCodeAt(Ur)?(o=gn,Ur++):(o=null,0===Kr&&i(_n)),null!==o?(s=F(),null!==s?(Wr=t,n=Zi(a),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)),t}function M(){var t,n,r,a,o,s,l;if(t=Ur,n=D(),null!==n){for(r=[],a=Ur,44===e.charCodeAt(Ur)?(o=tt,Ur++):(o=null,0===Kr&&i(nt)),null!==o?(s=F(),null!==s?(l=D(),null!==l?(o=[o,s,l],a=o):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et);null!==a;)r.push(a),a=Ur,44===e.charCodeAt(Ur)?(o=tt,Ur++):(o=null,0===Kr&&i(nt)),null!==o?(s=F(),null!==s?(l=D(),null!==l?(o=[o,s,l],a=o):(Ur=a,a=et)):(Ur=a,a=et)):(Ur=a,a=et);null!==r?(Wr=t,n=Qi(n,r),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)}else Ur=t,t=et;return t}function D(){var t,n,r,o,s;return t=Ur,n=Ur,r=w(),null!==r&&(r=e.substring(n,Ur)),n=r,null!==n?(58===e.charCodeAt(Ur)?(r=pt,Ur++):(r=null,0===Kr&&i(ft)),null!==r?(o=F(),null!==o?(s=a(),null!==s?(Wr=t,n=er(n,s),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et),t}function L(){var t,n,r;return Kr++,t=Ur,n=Ur,r=A(),null!==r&&(r=e.substring(n,Ur)),n=r,null!==n&&(Wr=t,n=nr(n)),null===n?(Ur=t,t=n):t=n,Kr--,null===t&&(n=null,0===Kr&&i(tr)),t}function A(){var e,t,n,i;return e=Ur,t=k(),null!==t?(n=j(),null!==n?(i=I(),null!==i?(t=[t,n,i],e=t):(Ur=e,e=et)):(Ur=e,e=et)):(Ur=e,e=et),null===e&&(e=Ur,t=k(),null!==t?(n=j(),null!==n?(t=[t,n],e=t):(Ur=e,e=et)):(Ur=e,e=et),null===e&&(e=Ur,t=k(),null!==t?(n=I(),null!==n?(t=[t,n],e=t):(Ur=e,e=et)):(Ur=e,e=et),null===e&&(e=k()))),e}function k(){var t,n,r,a;return t=Ur,n=N(),null!==n?(r=z(),null!==r?(n=[n,r],t=n):(Ur=t,t=et)):(Ur=t,t=et),null===t&&(t=B(),null===t&&(t=Ur,45===e.charCodeAt(Ur)?(n=Mt,Ur++):(n=null,0===Kr&&i(Dt)),null!==n?(r=N(),null!==r?(a=z(),null!==a?(n=[n,r,a],t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et),null===t&&(t=Ur,45===e.charCodeAt(Ur)?(n=Mt,Ur++):(n=null,0===Kr&&i(Dt)),null!==n?(r=B(),null!==r?(n=[n,r],t=n):(Ur=t,t=et)):(Ur=t,t=et)))),t}function j(){var t,n,r;return t=Ur,46===e.charCodeAt(Ur)?(n=sn,Ur++):(n=null,0===Kr&&i(ln)),null!==n?(r=z(),null!==r?(n=[n,r],t=n):(Ur=t,t=et)):(Ur=t,t=et),t}function I(){var e,t,n;return e=Ur,t=R(),null!==t?(n=z(),null!==n?(t=[t,n],e=t):(Ur=e,e=et)):(Ur=e,e=et),e}function z(){var e,t;if(e=[],t=B(),null!==t)for(;null!==t;)e.push(t),t=B();else e=et;return e}function R(){var t,n,r;return t=Ur,ir.test(e.charAt(Ur))?(n=e.charAt(Ur),Ur++):(n=null,0===Kr&&i(rr)),null!==n?(ar.test(e.charAt(Ur))?(r=e.charAt(Ur),Ur++):(r=null,0===Kr&&i(or)),null===r&&(r=ct),null!==r?(n=[n,r],t=n):(Ur=t,t=et)):(Ur=t,t=et),t}function B(){var t;return sr.test(e.charAt(Ur))?(t=e.charAt(Ur),Ur++):(t=null,0===Kr&&i(lr)),t}function N(){var t;return ur.test(e.charAt(Ur))?(t=e.charAt(Ur),Ur++):(t=null,0===Kr&&i(cr)),t}function F(){var e,t;for(e=[],t=q(),null===t&&(t=V());null!==t;)e.push(t),t=q(),null===t&&(t=V());return e}function q(){var t,n;return Kr++,dr.test(e.charAt(Ur))?(t=e.charAt(Ur),Ur++):(t=null,0===Kr&&i(pr)),null===t&&(fr.test(e.charAt(Ur))?(t=e.charAt(Ur),Ur++):(t=null,0===Kr&&i(mr))),Kr--,null===t&&(n=null,0===Kr&&i(hr)),t}function V(){var t,n;return Kr++,gr.test(e.charAt(Ur))?(t=e.charAt(Ur),Ur++):(t=null,0===Kr&&i(_r)),Kr--,null===t&&(n=null,0===Kr&&i(vr)),t}function U(){var e,t,n,i;if(e=Ur,t=F(),null!==t){for(n=[],i=W();null!==i;)n.push(i),i=W();null!==n?(i=F(),null!==i?(Wr=e,t=br(n),null===t?(Ur=e,e=t):e=t):(Ur=e,e=et)):(Ur=e,e=et)}else Ur=e,e=et;return e}function W(){var t,n,r,a,o,s,l,u,c,h;return t=Ur,64===e.charCodeAt(Ur)?(n=zn,Ur++):(n=null,0===Kr&&i(Rn)),null!==n?(r=Ur,a=Y(),null!==a&&(a=e.substring(r,Ur)),r=a,null!==r?(a=F(),null!==a?(o=H(),null===o&&(o=ct),null!==o?(123===e.charCodeAt(Ur)?(s=mn,Ur++):(s=null,0===Kr&&i(vn)),null!==s?(l=F(),null!==l?(u=G(),null!==u?(125===e.charCodeAt(Ur)?(c=gn,Ur++):(c=null,0===Kr&&i(_n)),null!==c?(h=F(),null!==h?(Wr=t,n=yr(r,o,u),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et),t}function H(){var t,n,r,o,s,l,u,c;return t=Ur,60===e.charCodeAt(Ur)?(n=Ot,Ur++):(n=null,0===Kr&&i(Pt)),null===n&&(58===e.charCodeAt(Ur)?(n=pt,Ur++):(n=null,0===Kr&&i(ft))),null!==n?(r=F(),null!==r?(o=E(),null===o&&(o=ct),null!==o?(s=F(),null!==s?(l=Ur,u=Ur,Kr++,123===e.charCodeAt(Ur)?(c=mn,Ur++):(c=null,0===Kr&&i(vn)),Kr--,null===c?u=ct:(Ur=u,u=et),null!==u?(c=a(),null!==c?(u=[u,c],l=u):(Ur=l,l=et)):(Ur=l,l=et),null===l&&(l=ct),null!==l?(u=F(),null!==u?(Wr=t,n=wr(n,o,l),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et),null===t&&(t=Ur,n=F(),null!==n&&(Wr=t,n=Er()),null===n?(Ur=t,t=n):t=n),t}function Y(){var t,n,r,a,o,s,l;if(t=Ur,n=[],Cr.test(e.charAt(Ur))?(r=e.charAt(Ur),Ur++):(r=null,0===Kr&&i(Sr)),null!==r)for(;null!==r;)n.push(r),Cr.test(e.charAt(Ur))?(r=e.charAt(Ur),Ur++):(r=null,0===Kr&&i(Sr));else n=et;if(null!==n){if(r=[],a=Ur,58===e.charCodeAt(Ur)?(o=pt,Ur++):(o=null,0===Kr&&i(ft)),null!==o){if(s=[],Cr.test(e.charAt(Ur))?(l=e.charAt(Ur),Ur++):(l=null,0===Kr&&i(Sr)),null!==l)for(;null!==l;)s.push(l),Cr.test(e.charAt(Ur))?(l=e.charAt(Ur),Ur++):(l=null,0===Kr&&i(Sr));else s=et;null!==s?(o=[o,s],a=o):(Ur=a,a=et)}else Ur=a,a=et;for(;null!==a;)if(r.push(a),a=Ur,58===e.charCodeAt(Ur)?(o=pt,Ur++):(o=null,0===Kr&&i(ft)),null!==o){if(s=[],Cr.test(e.charAt(Ur))?(l=e.charAt(Ur),Ur++):(l=null,0===Kr&&i(Sr)),null!==l)for(;null!==l;)s.push(l),Cr.test(e.charAt(Ur))?(l=e.charAt(Ur),Ur++):(l=null,0===Kr&&i(Sr));else s=et;null!==s?(o=[o,s],a=o):(Ur=a,a=et)}else Ur=a,a=et;null!==r?(n=[n,r],t=n):(Ur=t,t=et)}else Ur=t,t=et;return t}function G(){var t,n,r,a,o,s,l,u,c;if(t=Ur,n=X(),null!==n)if(r=F(),null!==r){for(a=[],o=Ur,59===e.charCodeAt(Ur)?(s=Tr,Ur++):(s=null,0===Kr&&i(xr)),null!==s?(l=F(),null!==l?(u=X(),null!==u?(c=F(),null!==c?(s=[s,l,u,c],o=s):(Ur=o,o=et)):(Ur=o,o=et)):(Ur=o,o=et)):(Ur=o,o=et);null!==o;)a.push(o),o=Ur,59===e.charCodeAt(Ur)?(s=Tr,Ur++):(s=null,0===Kr&&i(xr)),null!==s?(l=F(),null!==l?(u=X(),null!==u?(c=F(),null!==c?(s=[s,l,u,c],o=s):(Ur=o,o=et)):(Ur=o,o=et)):(Ur=o,o=et)):(Ur=o,o=et);null!==a?(59===e.charCodeAt(Ur)?(o=Tr,Ur++):(o=null,0===Kr&&i(xr)),null===o&&(o=ct),null!==o?(s=F(),null!==s?(Wr=t,n=it(n,a),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)}else Ur=t,t=et;else Ur=t,t=et;return null===t&&(t=Ur,n=X(),null!==n?(r=F(),null!==r?(59===e.charCodeAt(Ur)?(a=Tr,Ur++):(a=null,0===Kr&&i(xr)),null===a&&(a=ct),null!==a?(o=F(),null!==o?(Wr=t,n=Or(n),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et),null===t&&(t=Ur,n=F(),null!==n&&(Wr=t,n=lt()),null===n?(Ur=t,t=n):t=n)),t}function X(){var t,n,r,o,s,l,u,c,h,d,p,f,m,v,g,_,b;if(t=Ur,e.substr(Ur,2)===Pr?(n=Pr,Ur+=2):(n=null,0===Kr&&i(Mr)),null===n&&(e.substr(Ur,6)===Dr?(n=Dr,Ur+=6):(n=null,0===Kr&&i(Lr))),null!==n?(32===e.charCodeAt(Ur)?(r=Ar,Ur++):(r=null,0===Kr&&i(kr)),null!==r?(o=F(),null!==o?(s=Ur,l=w(),null!==l&&(l=e.substring(s,Ur)),s=l,null!==s?(l=F(),null!==l?(e.substr(Ur,2)===jr?(u=jr,Ur+=2):(u=null,0===Kr&&i(Ir)),null!==u?(c=F(),null!==c?(h=a(),null!==h?(d=F(),null!==d?(Wr=t,n=zr(n,s,h),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et),null===t){if(t=Ur,n=a(),null!==n)if(r=F(),null!==r)if(58===e.charCodeAt(Ur)?(o=pt,Ur++):(o=null,0===Kr&&i(ft)),null===o&&(e.substr(Ur,3)===Rr?(o=Rr,Ur+=3):(o=null,0===Kr&&i(Br)),null===o&&(e.substr(Ur,2)===Nr?(o=Nr,Ur+=2):(o=null,0===Kr&&i(Fr)))),null!==o)if(s=F(),null!==s)if(l=a(),null!==l)if(u=F(),null!==u){for(c=[],h=Ur,44===e.charCodeAt(Ur)?(d=tt,Ur++):(d=null,0===Kr&&i(nt)),null!==d?(p=F(),null!==p?(f=Ur,m=w(),null!==m&&(m=e.substring(f,Ur)),f=m,null!==f?(m=F(),null!==m?(58===e.charCodeAt(Ur)?(v=pt,Ur++):(v=null,0===Kr&&i(ft)),null!==v?(g=F(),null!==g?(_=a(),null!==_?(b=F(),null!==b?(d=[d,p,f,m,v,g,_,b],h=d):(Ur=h,h=et)):(Ur=h,h=et)):(Ur=h,h=et)):(Ur=h,h=et)):(Ur=h,h=et)):(Ur=h,h=et)):(Ur=h,h=et)):(Ur=h,h=et);null!==h;)c.push(h),h=Ur,44===e.charCodeAt(Ur)?(d=tt,Ur++):(d=null,0===Kr&&i(nt)),null!==d?(p=F(),null!==p?(f=Ur,m=w(),null!==m&&(m=e.substring(f,Ur)),f=m,null!==f?(m=F(),null!==m?(58===e.charCodeAt(Ur)?(v=pt,Ur++):(v=null,0===Kr&&i(ft)),null!==v?(g=F(),null!==g?(_=a(),null!==_?(b=F(),null!==b?(d=[d,p,f,m,v,g,_,b],h=d):(Ur=h,h=et)):(Ur=h,h=et)):(Ur=h,h=et)):(Ur=h,h=et)):(Ur=h,h=et)):(Ur=h,h=et)):(Ur=h,h=et)):(Ur=h,h=et);null!==c?(Wr=t,n=qr(n,o,l,c),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)}else Ur=t,t=et;else Ur=t,t=et;else Ur=t,t=et;else Ur=t,t=et;else Ur=t,t=et;else Ur=t,t=et;null===t&&(t=Ur,n=Ur,r=w(),null!==r&&(r=e.substring(n,Ur)),n=r,null!==n?(r=F(),null!==r?(o=a(),null!==o?(s=F(),null!==s?(Wr=t,n=Vr(n,o),null===n?(Ur=t,t=n):t=n):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et)):(Ur=t,t=et))}return t}var K,J=arguments.length>1?arguments[1]:{},$={expression:a,sheet:U},Z=a,Q="expression",et=null,tt=",",nt='","',it=function(e,t){for(var n=[e],i=0;t.length>i;i++)n.push(t[i][2]);return n},rt="(",at='"("',ot=")",st='")"',lt=function(){return[]},ut=function(e){return e},ct="",ht="?",dt='"?"',pt=":",ft='":"',mt=function(e,t){if(t){var n=t[2],i=t[6];return{type:"if",args:[e,n,i]}}return e},vt="||",gt='"||"',_t=function(e,t){for(var n=0;t.length>n;n++)e={type:Jr[t[n][1]],args:[e,t[n][3]]};return e},bt="&&",yt='"&&"',wt="<=>",Et='"<=>"',Ct="<=",St='"<="',Tt=">=",xt='">="',Ot="<",Pt='"<"',Mt="-",Dt='"-"',Lt=">",At='">"',kt="==",jt='"=="',It="!=",zt='"!="',Rt=function(e,t){if(t){var n=t[1],i=t[3];return"!="===n?{type:"not",args:[{type:"equals",args:[e,i]}]}:{type:Jr[n],args:[e,i]}}return e},Bt="+",Nt='"+"',Ft="*",qt='"*"',Vt="/",Ut='"/"',Wt="%",Ht='"%"',Yt="rem",Gt='"rem"',Xt="**",Kt='"**"',Jt="//",$t='"//"',Zt="%%",Qt='"%%"',en="??",tn='"??"',nn="!",rn='"!"',an=function(e,t){return{type:$r[e],args:[t]}},on=function(e,t){for(var n=0;t.length>n;n++)e=t[n](e);return e},sn=".",ln='"."',un=function(e){return e},cn="[",hn='"["',dn="]",pn='"]"',fn=function(e){return function(t){return{type:"property",args:[t,e]}}},mn="{",vn='"{"',gn="}",_n='"}"',bn=function(e,t){return Zr[e]?function(n){return{type:Zr[e],args:[n,t]}}:"value"===t.type?function(t){return{type:e,args:[t]}}:function(n){return{type:e,args:[{type:"mapBlock",args:[n,t]}]}}},yn=function(e,t){return function(n){return{type:e,args:[n].concat(t)}}},wn=function(e){return function(t){return{type:"property",args:[t,{type:"literal",value:+e.join("")}]}}},En=function(e){return function(t){return{type:"property",args:[t,{type:"literal",value:e}]}}},Cn=function(e){return function(t){return{type:"with",args:[t,e]}}},Sn="this",Tn='"this"',xn=function(){return{type:"value"}},On="true",Pn='"true"',Mn=function(){return{type:"literal",value:!0}},Dn="false",Ln='"false"',An=function(){return{type:"literal",value:!1}},kn="null",jn='"null"',In=function(){return{type:"literal",value:null}},zn="@",Rn='"@"',Bn=function(e){return{type:"component",label:e}},Nn="$",Fn='"$"',qn=function(e){return{type:"property",args:[{type:"parameters"},{type:"literal",value:e}]}},Vn=function(){return{type:"parameters"}},Un="#",Wn='"#"',Hn=function(e){return{type:"element",id:e}},Yn="&",Gn='"&"',Xn=function(e,t){return{type:e,args:t,inline:!0}},Kn="^",Jn='"^"',$n=function(e){return{type:"parent",args:[e]}},Zn=function(e){return e},Qn=function(e){return e({type:"value"})},ei=function(){return{type:"value"}},ti="word",ni=/^[a-zA-Z_0-9\-]/,ii="[a-zA-Z_0-9\\-]",ri="string",ai="'",oi='"\'"',si=function(e){return{type:"literal",value:e.join("")}},li='"',ui='"\\""',ci=/^[^'\\\0-\x1F]/,hi="[^'\\\\\\0-\\x1F]",di="\\'",pi='"\\\\\'"',fi=function(){return"'"},mi=/^[^"\\\0-\x1F]/,vi='[^"\\\\\\0-\\x1F]',gi='\\"',_i='"\\\\\\""',bi=function(){return'"'},yi="\\\\",wi='"\\\\\\\\"',Ei=function(){return"\\"},Ci="\\/",Si='"\\\\/"',Ti=function(){return"/"},xi="\\b",Oi='"\\\\b"',Pi=function(){return"\b"},Mi="\\f",Di='"\\\\f"',Li=function(){return"\f"},Ai="\\n",ki='"\\\\n"',ji=function(){return"\n"},Ii="\\r",zi='"\\\\r"',Ri=function(){return"\r"},Bi="\\t",Ni='"\\\\t"',Fi=function(){return"	"},qi="\\0",Vi='"\\\\0"',Ui=function(){return"\0"},Wi="\\u",Hi='"\\\\u"',Yi=function(e){return String.fromCharCode(parseInt(e,16))},Gi=/^[0-9a-fA-F]/,Xi="[0-9a-fA-F]",Ki=function(){return{type:"tuple",args:[]}},Ji=function(e){return{type:"tuple",args:e}},$i=function(){return{type:"record",args:[]}},Zi=function(e){return{type:"record",args:e}},Qi=function(e,t){var n={};n[e[0]]=e[1];for(var i=0;t.length>i;i++)n[t[i][2][0]]=t[i][2][1];return n},er=function(e,t){return[e,t]},tr="number",nr=function(e){return{type:"literal",value:+e}},ir=/^[eE]/,rr="[eE]",ar=/^[+\-]/,or="[+\\-]",sr=/^[0-9]/,lr="[0-9]",ur=/^[1-9]/,cr="[1-9]",hr="whitespace",dr=/^[\t\x0B\f \xA0\uFEFF]/,pr="[\\t\\x0B\\f \\xA0\\uFEFF]",fr=/^[ \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000]/,mr="[ \\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000]",vr="line terminator",gr=/^[\n\r\u2028\u2029]/,_r="[\\n\\r\\u2028\\u2029]",br=function(e){return{type:"sheet",blocks:e}},yr=function(e,t,n){return{type:"block",connection:t.connection,module:t.module,exports:t.exports,label:e,statements:n}},wr=function(e,t,n){return{connection:{"<":"prototype",":":"object"}[e],module:t&&t.value,exports:""!==n?n[1]:void 0}},Er=function(){return{}},Cr=/^[a-zA-Z_0-9]/,Sr="[a-zA-Z_0-9]",Tr=";",xr='";"',Or=function(e){return[e]},Pr="on",Mr='"on"',Dr="before",Lr='"before"',Ar=" ",kr='" "',jr="->",Ir='"->"',zr=function(e,t,n){return{type:"event",when:e,event:t,listener:n}},Rr="<->",Br='"<->"',Nr="<-",Fr='"<-"',qr=function(e,t,n,i){var r={type:Qr[t],args:[e,n]};if(i.length){for(var a={},o=0;i.length>o;o++)a[i[o][2]]=i[o][6];r.descriptor=a}return r},Vr=function(e,t){return{type:"unit",name:e,value:t}},Ur=0,Wr=0,Hr=0,Yr={line:1,column:1,seenCR:!1},Gr=0,Xr=[],Kr=0;if("startRule"in J){if(!(J.startRule in $))throw Error("Can't start parsing from rule \""+J.startRule+'".');Z=$[J.startRule]}var Jr={"**":"pow","//":"root","%%":"log","*":"mul","/":"div","%":"mod",rem:"rem","+":"add","-":"sub","<":"lt",">":"gt","<=":"le",">=":"ge","==":"equals","<=>":"compare","??":"default","&&":"and","||":"or","<-":"bind","<->":"bind2",":":"assign"},$r={"+":"toNumber","-":"neg","!":"not","^":"parent"},Zr={map:"mapBlock",filter:"filterBlock",some:"someBlock",every:"everyBlock",sorted:"sortedBlock",sortedSet:"sortedSetBlock",group:"groupBlock",groupMap:"groupMapBlock",min:"minBlock",max:"maxBlock"},Qr={":":"assign","<-":"bind","<->":"bind2"};if(K=Z(),null!==K&&Ur===e.length)return K;throw r(Xr),Wr=Math.max(Ur,Gr),new t(Xr,e.length>Wr?e.charAt(Wr):null,Wr,n(Wr).line,n(Wr).column)}return e(t,Error),{SyntaxError:t,parse:n}}();