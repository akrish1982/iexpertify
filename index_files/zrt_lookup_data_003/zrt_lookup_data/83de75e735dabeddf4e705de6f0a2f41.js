(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var p=this||self;function aa(a){a=a.u;const b=encodeURIComponent;let c="";a.platform&&(c+="&uap="+b(a.platform));a.platformVersion&&(c+="&uapv="+b(a.platformVersion));a.uaFullVersion&&(c+="&uafv="+b(a.uaFullVersion));a.architecture&&(c+="&uaa="+b(a.architecture));a.model&&(c+="&uam="+b(a.model));a.bitness&&(c+="&uab="+b(a.bitness));a.fullVersionList&&(c+="&uafvl="+b(a.fullVersionList.map(d=>b(d.brand)+";"+b(d.version)).join("|")));"undefined"!==typeof a.wow64&&(c+="&uaw="+Number(a.wow64));return c}
function ba(a,b){return a.h?a.m.slice(0,a.h.index)+b+a.m.slice(a.h.index):a.m+b}function ca(a){let b="&act=1&ri=1";a.i&&a.u&&(b+=aa(a));return ba(a,b)}function da(a,b){return a.i&&a.j||a.s?1==b?a.i?a.j:ba(a,"&dct=1"):2==b?ba(a,"&ri=2"):ba(a,"&ri=16"):a.m}
var ea=class{constructor({url:a,V:b}){this.m=a;this.u=b;b=/[?&]dsh=1(&|$)/.test(a);this.i=!b&&/[?&]ae=1(&|$)/.test(a);this.s=!b&&/[?&]ae=2(&|$)/.test(a);if((this.h=/[?&]adurl=([^&]*)/.exec(a))&&this.h[1]){let c;try{c=decodeURIComponent(this.h[1])}catch(d){c=null}this.j=c}}};function r(a){var b;a:{if(b=p.navigator)if(b=b.userAgent)break a;b=""}return-1!=b.indexOf(a)};var t=class{constructor(a,b){this.h=b===fa?a:""}toString(){return this.h.toString()}};t.prototype.i=!0;var ha=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,fa={},ia=new t("about:invalid#zClosurez",fa);function ka(a,b){a:{const c=a.length,d="string"===typeof a?a.split(""):a;for(let f=0;f<c;f++)if(f in d&&b.call(void 0,d[f],f,a)){b=f;break a}b=-1}return 0>b?null:"string"===typeof a?a.charAt(b):a[b]};function ma(a){let b=!1,c;return function(){b||(c=a(),b=!0);return c}};function na(a,b){b instanceof t||b instanceof t||(b="object"==typeof b&&b.i?b.h.toString():String(b),ha.test(b)||(b="about:invalid#zClosurez"),b=new t(b,fa));a.href=b instanceof t&&b.constructor===t?b.h:"type_error:SafeUrl"};/*

 SPDX-License-Identifier: Apache-2.0
*/
class oa{constructor(a){this.da=a}}function u(a){return new oa(b=>b.substr(0,a.length+1).toLowerCase()===a+":")}const pa=new oa(a=>/^[^:]*([/?#]|$)/.test(a));var qa=u("http"),ra=u("https"),sa=u("ftp"),ta=u("mailto"),ua=u("intent"),va=u("market"),wa=u("itms"),xa=u("itms-appss");const ya=[u("data"),qa,ra,ta,sa,pa];function za(a,b=ya){for(let c=0;c<b.length;++c){const d=b[c];if(d instanceof oa&&d.da(a))return new t(a,fa)}}function Aa(a,b=ya){return za(a,b)||ia};function Ba(){return r("iPhone")&&!r("iPod")&&!r("iPad")};function Ca(a){Ca[" "](a);return a}Ca[" "]=function(){};var Da=Ba(),Ea=r("iPad");var Fa=Ba()||r("iPod"),Ha=r("iPad");var Ia={},Ja=null;
function Ka(a,b){void 0===b&&(b=0);if(!Ja){Ja={};for(var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),d=["+/=","+/","-_=","-_.","-_"],f=0;5>f;f++){var e=c.concat(d[f].split(""));Ia[f]=e;for(var g=0;g<e.length;g++){var h=e[g];void 0===Ja[h]&&(Ja[h]=g)}}}b=Ia[b];c=Array(Math.floor(a.length/3));d=b[64]||"";for(f=e=0;e<a.length-2;e+=3){var l=a[e],k=a[e+1];h=a[e+2];g=b[l>>2];l=b[(l&3)<<4|k>>4];k=b[(k&15)<<2|h>>6];h=b[h&63];c[f++]=g+l+k+h}g=0;h=d;switch(a.length-e){case 2:g=
a[e+1],h=b[(g&15)<<2]||d;case 1:a=a[e],c[f]=b[a>>2]+b[(a&3)<<4|g>>4]+h+d}return c.join("")};var La="undefined"!==typeof Uint8Array,Ma={};let Na;var Oa=class{constructor(a){if(Ma!==Ma)throw Error("illegal external caller");this.W=a;if(null!=a&&0===a.length)throw Error("ByteString should be constructed with non-empty values");}};const v=Symbol();function w(a,b){if(v)return a[v]|=b;if(void 0!==a.v)return a.v|=b;Object.defineProperties(a,{v:{value:b,configurable:!0,writable:!0,enumerable:!1}});return b}function Pa(a,b){v?a[v]&&(a[v]&=~b):void 0!==a.v&&(a.v&=~b)}function x(a){let b;v?b=a[v]:b=a.v;return null==b?0:b}function y(a,b){v?a[v]=b:void 0!==a.v?a.v=b:Object.defineProperties(a,{v:{value:b,configurable:!0,writable:!0,enumerable:!1}})}function Qa(a){w(a,1);return a}function z(a){return!!(x(a)&2)}
function A(a){w(a,2);return a}function B(a){w(a,16);return a}function Ra(a,b){y(b,(a|0)&-51)}function Sa(a,b){y(b,(a|18)&-41)};var Ta={};function Ua(a){return null!==a&&"object"===typeof a&&!Array.isArray(a)&&a.constructor===Object}let Va;var D;const Wa=[];y(Wa,23);D=Object.freeze(Wa);function Xa(a){if(z(a.l))throw Error("Cannot mutate an immutable Message");}var Ya=class{constructor(a){this.i=0;this.h=a}next(){return this.i<this.h.length?{done:!1,value:this.h[this.i++]}:{done:!0,value:void 0}}[Symbol.iterator](){return this}};function Za(a){var b=a.length;(b=b?a[b-1]:void 0)&&Ua(b)?b.g=1:a.push({g:1})};function $a(a,b,c){let d=!1;if(null!=a&&"object"===typeof a&&!(d=Array.isArray(a))&&a.D===Ta)return a;if(d)return new b(a);if(c)return new b}function ab(a,b,c=!1){if(Array.isArray(a))return new b(c?B(a):a)};function bb(a,b){return new E(b,a.m,a.j,a.u)}function cb(a){return Array.from(a.h.keys()).sort(db)}function eb(a,b=fb){const c=cb(a);for(let d=0;d<c.length;d++){const f=c[d],e=a.h.get(c[d]);c[d]=[b(f),b(e)]}return c}function gb(a,b=fb){const c=[];a=a.h.entries();for(var d;!(d=a.next()).done;)d=d.value,d[0]=b(d[0]),d[1]=b(d[1]),c.push(d);return c}
var E=class{constructor(a,b,c,d=ib){c=x(a);c|=32;y(a,c);this.i=c;this.j=(this.m=b)?jb:pb;this.u=d;this.h=b=new Map;for(d=0;d<a.length;d++)c=a[d],b.set(c[0],c[1]);this.size=b.size}entries(){const a=cb(this);for(let b=0;b<a.length;b++){const c=a[b];a[b]=[c,this.get(c)]}return new Ya(a)}keys(){const a=cb(this);return new Ya(a)}values(){const a=cb(this);for(let b=0;b<a.length;b++)a[b]=this.get(a[b]);return new Ya(a)}forEach(a,b){const c=cb(this);for(let d=0;d<c.length;d++){const f=c[d];a.call(b,this.get(f),
f,this)}}set(a,b){if(this.i&2)throw Error("Cannot mutate an immutable Map");const c=this.h;if(null==b)return c.delete(a),this;c.set(a,this.j(b,this.m,!1,this.s));this.size=c.size;return this}get(a){const b=this.h;if(b.has(a)){var c=b.get(a),d=this.i,f=this.m;f&&Array.isArray(c)&&d&16&&B(c);d=this.j(c,f,!!(d&2),this.s);d!==c&&b.set(a,d);return d}}has(a){return this.h.has(a)}[Symbol.iterator](){return this.entries()}};function db(a,b){a=""+a;b=""+b;return a>b?1:a<b?-1:0}
function jb(a,b,c,d){a=$a(a,b,!0);c?A(a.l):d&&(a=qb(a));return a}function pb(a){return a}function ib(a){return a}function fb(a){return a};let F;function rb(a){switch(typeof a){case "number":return isFinite(a)?a:String(a);case "object":if(a)if(Array.isArray(a)){if(0!==(x(a)&128))return a=Array.prototype.slice.call(a),Za(a),a}else{if(La&&null!=a&&a instanceof Uint8Array)return Ka(a);if(a instanceof Oa){const b=a.W;return null==b?"":"string"===typeof b?b:a.W=Ka(b)}if(a instanceof E)return eb(a)}}return a};function sb(a,b,c,d){if(null!=a){if(Array.isArray(a))a=tb(a,b,c,void 0!==d);else if(Ua(a)){const f={};for(let e in a)f[e]=sb(a[e],b,c,d);a=f}else a=b(a,d);return a}}function tb(a,b,c,d){const f=x(a);d=d?!!(f&16):void 0;a=Array.prototype.slice.call(a);for(let e=0;e<a.length;e++)a[e]=sb(a[e],b,c,d);c(f,a);return a}function ub(a){return sb(a,vb,wb)}function vb(a){return a.D===Ta?a.toJSON():a instanceof E?eb(a,ub):rb(a)}function xb(a){return sb(a,yb,wb)}
function yb(a){if(!a)return a;if("object"===typeof a){if(La&&null!=a&&a instanceof Uint8Array)return new Uint8Array(a);if(a instanceof E)return a.size?bb(a,B(gb(a,xb))):[];if(a.D===Ta)return zb(a)}return a}function wb(a,b){a&128&&Za(b)};function Ab(a){return a.h||(a.h=a.l[a.i+a.A]={})}function G(a,b,c){return-1===b?null:b>=a.i?a.h?a.h[b]:void 0:c&&a.h&&(c=a.h[b],null!=c)?c:a.l[b+a.A]}function H(a,b,c,d){Xa(a);return I(a,b,c,d)}function I(a,b,c,d){a.j&&(a.j=void 0);if(b>=a.i||d)return Ab(a)[b]=c,a;a.l[b+a.A]=c;(c=a.h)&&b in c&&delete c[b];return a}
function Bb(a,b,c,d,f){let e=G(a,b,d);Array.isArray(e)||(e=D);const g=x(e);g&1||Qa(e);if(f)g&2||A(e),c&1||Object.freeze(e);else{f=!(c&2);const h=g&2;c&1||!h?f&&g&16&&!h&&Pa(e,16):(e=Qa(Array.prototype.slice.call(e)),I(a,b,e,d))}return e}
function Cb(a,b){var c=z(a.l);let d=Bb(a,b,1,!1,c);var f=x(d);if(!(f&4)){Object.isFrozen(d)&&(d=Qa(d.slice()),I(a,b,d,!1));let e=0,g=0;for(;e<d.length;e++){const h=d[e];null!=h&&(d[g++]=h)}g<e&&(d.length=g);w(d,5);c&&(A(d),Object.freeze(d))}!c&&(f&2||Object.isFrozen(d))&&(d=Array.prototype.slice.call(d),w(d,5),c=d,null==c?c=D:(f=x(c),1!==(f&1)&&(Object.isFrozen(c)&&(c=Array.prototype.slice.call(c)),y(c,f|1))),H(a,b,c,!1));return d}function J(a,b,c){a=G(a,b);return null==a?c:a}let Db;
function Eb(a,b,c){{const g=z(a.l);b:{var d=G(a,b),f=g,e=!1;if(null==d){if(f){a=Db||(Db=new E(A([])));break b}d=[]}else if(d.constructor===E){if(0==(d.i&2)||f){a=d;break b}d=gb(d)}else Array.isArray(d)?e=z(d):d=[];if(f){if(!d.length){a=Db||(Db=new E(A([])));break b}e||(e=!0,A(d))}else if(e)for(e=!1,d=Array.prototype.slice.call(d),f=0;f<d.length;f++){const h=d[f]=Array.prototype.slice.call(d[f]);Array.isArray(h[1])&&(h[1]=A(h[1]))}e||(x(d)&32?Pa(d,16):x(a.l)&16&&B(d));e=new E(d,c);I(a,b,e,!1);a=e}null==
a?c=a:(!g&&c&&(a.s=!0),c=a)}return c}function L(a,b,c){const d=G(a,c,!1);b=$a(d,b);b!==d&&null!=b&&(I(a,c,b,!1),w(b.l,x(a.l)&-33));return b}function M(a,b,c){b=L(a,b,c);if(null==b)return b;if(!z(a.l)){const d=qb(b);d!==b&&(b=d,I(a,c,b,!1))}return b}
function Fb(a,b,c,d){var f=z(a.l);a.o||(a.o={});var e=a.o[c];let g=Bb(a,c,3,d,f);if(e)f||(Object.isFrozen(e)?f||(e=Array.prototype.slice.call(e),a.o[c]=e):f&&Object.freeze(e));else{e=[];const h=!!(x(a.l)&16),l=z(g);!f&&l&&(g=Qa(Array.prototype.slice.call(g)),I(a,c,g,d));let k=l;for(let n=0;n<g.length;n++){const m=g[n],q=ab(m,b,h);void 0!==q&&(k=k||z(m),e.push(q),l&&A(q.l))}a.o[c]=e;Object.isFrozen(g)||(b=x(g)|33,y(g,k?b&-9:b|8));(f||f&&l)&&A(e);(f||f)&&Object.freeze(e)}a=Bb(a,c,3,d,f);if(!f&&a&&!(x(a)&
8)){for(f=0;f<e.length;f++)c=e[f],d=qb(c),c!==d&&(e[f]=d,a[f]=e[f].l);w(a,8)}return e}function Gb(a,b,c,d){Xa(a);let f;if(null!=c){f=Qa([]);let e=!1;for(let g=0;g<c.length;g++)f[g]=c[g].l,e=e||z(f[g]);a.o||(a.o={});a.o[b]=c;c=f;e?Pa(c,8):w(c,8)}else a.o&&(a.o[b]=void 0),f=D;return I(a,b,f,d)}function Hb(a,b){return null==a?b:a}function P(a,b){return Hb(G(a,b),"")}function R(a,b){a=G(a,b);return Hb(null==a?a:!!a,!1)};function Ib(a){const b=x(a);if(b&2)return a;a=Array.prototype.map.call(a,Jb,void 0);Sa(b,a);Object.freeze(a);return a}function Kb(a,b,c=Sa){if(null!=a){if(La&&a instanceof Uint8Array)return a.length?new Oa(new Uint8Array(a)):Na||(Na=new Oa(null));if(Array.isArray(a)){const d=x(a);if(d&2)return a;if(b&&!(d&32)&&(d&16||0===d))return y(a,d|2),a;a=tb(a,Kb,c,!0);b=x(a);b&4&&b&2&&Object.freeze(a);return a}return a.D===Ta?Jb(a):a instanceof E?bb(a,A(gb(a,Kb))):a}}
function Jb(a){if(z(a.l))return a;a=Lb(a,!0);A(a.l);return a}
function Lb(a,b){const c=a.l;var d=B([]),f=a.constructor.h;f&&d.push(f);0!==(x(c)&128)&&Za(d);b=b||z(a.l)?Sa:Ra;f=a.constructor;F=d;d=new f(d);F=void 0;a.B&&(d.B=a.B.slice());f=!!(x(c)&16);for(let m=0;m<c.length;m++){var e=c[m];if(m===c.length-1&&Ua(e))for(const q in e){var g=+q;if(Number.isNaN(g))Ab(d)[g]=e[g];else{var h=d,l=e[q],k=f,n=b;const C=a.o&&a.o[g];C?Gb(h,g,Ib(C),!0):H(h,g,Kb(l,k,n),!0)}}else h=d,g=m-a.A,l=f,k=b,(n=a.o&&a.o[g])?Gb(h,g,Ib(n),!1):H(h,g,Kb(e,l,k),!1)}return d};function qb(a){if(z(a.l)){var b=Lb(a,!1);b.j=a;a=b}return a}function zb(a){var b=tb(a.l,yb,Ra);B(b);F=b;b=new a.constructor(b);F=void 0;Mb(b,a);return b}function Nb(a){Va=!0;try{return JSON.stringify(a.toJSON(),Ob)}finally{Va=!1}}
var S=class{constructor(a,b,c){null==a&&(a=F);F=void 0;var d=this.constructor.i||0,f=0<d,e=this.constructor.h,g=!1;if(null==a){a=e?[e]:[];var h=!0;y(a,48)}else{if(!Array.isArray(a))throw Error();if(e&&e!==a[0])throw Error();const l=w(a,0);let k=l;if(h=0!==(16&k))(g=0!==(32&k))||(k|=32);if(f)if(128&k)d=0;else{if(0<a.length){const n=a[a.length-1];if(Ua(n)&&"g"in n){d=0;k|=128;delete n.g;let m=!0;for(let q in n){m=!1;break}m&&a.pop()}}}else if(128&k)throw Error();l!==k&&y(a,k)}this.A=(e?0:-1)-d;this.o=
void 0;this.l=a;a:{e=this.l.length;d=e-1;if(e&&(e=this.l[d],Ua(e))){this.h=e;this.i=d-this.A;break a}void 0!==b&&-1<b?(this.i=Math.max(b,d+1-this.A),this.h=void 0):this.i=Number.MAX_VALUE}if(!f&&this.h&&"g"in this.h)throw Error('Unexpected "g" flag in sparse object of message that is not a group type.');if(c){b=h&&!g&&!0;f=this.i;let l;for(h=0;h<c.length;h++)g=c[h],g<f?(g+=this.A,(d=a[g])?Pb(d,b):a[g]=D):(l||(l=Ab(this)),(d=l[g])?Pb(d,b):l[g]=D)}}toJSON(){const a=this.l;return Va?a:tb(a,vb,wb)}};
function Pb(a,b){if(Array.isArray(a)){var c=x(a),d=1;!b||c&2||(d|=16);(c&d)!==d&&y(a,c|d)}}S.prototype.D=Ta;S.prototype.toString=function(){return this.l.toString()};function Ob(a,b){return rb(b)}
function Mb(a,b){b.B&&(a.B=b.B.slice());const c=b.o;if(c){const e=b.h;for(let g in c)if(b=c[g]){var d=!(!e||!e[g]),f=+g;if(Array.isArray(b)){if(b.length)for(d=Fb(a,b[0].constructor,f,d),f=0;f<Math.min(d.length,b.length);f++)Mb(d[f],b[f])}else throw a=typeof b,Error("unexpected object: type: "+("object"!=a?a:b?Array.isArray(b)?"array":a:"null")+": "+b);}}};var Qb=class extends S{constructor(){super()}};var Rb=class extends S{constructor(a){super(a)}},Sb=class extends S{constructor(a){super(a)}};var Ub=class extends S{constructor(a){super(a,-1,Tb)}},Vb=class extends S{constructor(a){super(a)}C(){return P(this,3)}U(a){H(this,5,a)}},T=class extends S{constructor(a){super(a)}C(){return P(this,1)}U(a){H(this,2,a)}},Wb=class extends S{constructor(a){super(a)}},Tb=[6,7];var Yb=class extends S{constructor(a){super(a,-1,Xb)}},Xb=[17];var Zb=class extends S{constructor(a){super(a)}};var $b=class extends S{constructor(){super()}};var ac={capture:!0},bc={passive:!0},cc=ma(function(){let a=!1;try{const b=Object.defineProperty({},"passive",{get:function(){a=!0}});p.addEventListener("test",null,b)}catch(b){}return a});function dc(a){return a?a.passive&&cc()?a:a.capture||!1:!1}function U(a,b,c,d){a.addEventListener&&a.addEventListener(b,c,dc(d))};function ec(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)};var fc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function gc(a){var b=a.indexOf("#");0>b&&(b=a.length);var c=a.indexOf("?");if(0>c||c>b){c=b;var d=""}else d=a.substring(c+1,b);return[a.slice(0,c),d,a.slice(b)]}function hc(a,b){return b?a?a+"&"+b:b:a}function ic(a,b){if(!b)return a;a=gc(a);a[1]=hc(a[1],b);return a[0]+(a[1]?"?"+a[1]:"")+a[2]}
function jc(a,b,c){if(Array.isArray(b))for(var d=0;d<b.length;d++)jc(a,String(b[d]),c);else null!=b&&c.push(a+(""===b?"":"="+encodeURIComponent(String(b))))}function kc(a){var b=[],c;for(c in a)jc(c,a[c],b);return b.join("&")}function lc(){var a=ec();a=null!=a?"="+encodeURIComponent(String(a)):"";return ic("https://pagead2.googlesyndication.com/pagead/gen_204","zx"+a)}var mc=/#|$/;
function nc(a,b){var c=a.search(mc);a:{var d=0;for(var f=b.length;0<=(d=a.indexOf(b,d))&&d<c;){var e=a.charCodeAt(d-1);if(38==e||63==e)if(e=a.charCodeAt(d+f),!e||61==e||38==e||35==e)break a;d+=f+1}d=-1}if(0>d)return null;f=a.indexOf("&",d);if(0>f||f>c)f=c;d+=b.length+1;return decodeURIComponent(a.slice(d,-1!==f?f:0).replace(/\+/g," "))}
function oc(a,b){a=gc(a);var c=a[1],d=[];c&&c.split("&").forEach(function(f){var e=f.indexOf("=");b.hasOwnProperty(0<=e?f.slice(0,e):f)||d.push(f)});a[1]=hc(d.join("&"),kc(b));return a[0]+(a[1]?"?"+a[1]:"")+a[2]};function pc(a,b){if(a)for(const c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(a[c],c,a)}var qc=a=>{a.preventDefault?a.preventDefault():a.returnValue=!1};let rc=[];const sc=()=>{const a=rc;rc=[];for(const b of a)try{b()}catch(c){}};
var xc=a=>{rc.push(a);1==rc.length&&(window.Promise?Promise.resolve().then(sc):window.setImmediate?setImmediate(sc):setTimeout(sc,0))},yc=a=>{var b=V;"complete"===b.readyState||"interactive"===b.readyState?xc(a):b.addEventListener("DOMContentLoaded",a)},zc=a=>{var b=window;"complete"===b.document.readyState?xc(a):b.addEventListener("load",a)};function Ac(a=document){return a.createElement("img")};function Bc(a,b,c=null,d=!1){Cc(a,b,c,d)}function Cc(a,b,c,d){a.google_image_requests||(a.google_image_requests=[]);const f=Ac(a.document);if(c||d){const e=g=>{c&&c(g);if(d){g=a.google_image_requests;const h=Array.prototype.indexOf.call(g,f,void 0);0<=h&&Array.prototype.splice.call(g,h,1)}f.removeEventListener&&f.removeEventListener("load",e,dc());f.removeEventListener&&f.removeEventListener("error",e,dc())};U(f,"load",e);U(f,"error",e)}f.src=b;a.google_image_requests.push(f)}
function Dc(a,b){var c;if(c=a.navigator)c=a.navigator.userAgent,c=/Chrome/.test(c)&&!/Edge/.test(c)?!0:!1;c&&a.navigator.sendBeacon?a.navigator.sendBeacon(b):Bc(a,b,void 0,!1)};let Ec=0;function Fc(a){return(a=Gc(a,document.currentScript))&&a.getAttribute("data-jc-version")||"unknown"}function Gc(a,b=null){return b&&b.getAttribute("data-jc")===String(a)?b:document.querySelector(`[${"data-jc"}="${a}"]`)}
function Hc(a){if(!(.01<Math.random())){const b=Gc(a,document.currentScript);a=`https://${b&&"true"===b.getAttribute("data-jc-rcd")?"pagead2.googlesyndication-cn.com":"pagead2.googlesyndication.com"}/pagead/gen_204?id=jca&jc=${a}&version=${Fc(a)}&sample=${.01}`;Dc(window,a)}};var V=document,W=window;const Ic=[qa,ra,ta,sa,pa,va,wa,ua,xa];function Jc(a,b){if(a instanceof t)return a;const c=Aa(a,Ic);c===ia&&b(a);return c}var Kc=a=>{var b=`${"http:"===W.location.protocol?"http:":"https:"}//${"pagead2.googlesyndication.com"}/pagead/gen_204`;return c=>{c=kc({id:"unsafeurl",ctx:a,url:c});c=ic(b,c);navigator.sendBeacon&&navigator.sendBeacon(c,"")}};var Lc=a=>{var b=V;try{return b.querySelectorAll("*["+a+"]")}catch(c){return[]}};class Mc{constructor(a,b){this.error=a;this.context=b.context;this.msg=b.message||"";this.id=b.id||"jserror";this.meta={}}};const Nc=RegExp("^https?://(\\w|-)+\\.cdn\\.ampproject\\.(net|org)(\\?|/|$)");var Oc=class{constructor(a,b){this.h=a;this.i=b}},Pc=class{constructor(a,b){this.url=a;this.T=!!b;this.depth=null}};function Qc(a,b){const c={};c[a]=b;return[c]}function Rc(a,b,c,d,f){const e=[];pc(a,function(g,h){(g=Sc(g,b,c,d,f))&&e.push(h+"="+g)});return e.join(b)}
function Sc(a,b,c,d,f){if(null==a)return"";b=b||"&";c=c||",$";"string"==typeof c&&(c=c.split(""));if(a instanceof Array){if(d=d||0,d<c.length){const e=[];for(let g=0;g<a.length;g++)e.push(Sc(a[g],b,c,d+1,f));return e.join(c[d])}}else if("object"==typeof a)return f=f||0,2>f?encodeURIComponent(Rc(a,b,c,d,f+1)):"...";return encodeURIComponent(String(a))}function Tc(a){let b=1;for(const c in a.i)b=c.length>b?c.length:b;return 3997-b-a.j.length-1}
function Uc(a,b){let c="https://pagead2.googlesyndication.com"+b,d=Tc(a)-b.length;if(0>d)return"";a.h.sort(function(e,g){return e-g});b=null;let f="";for(let e=0;e<a.h.length;e++){const g=a.h[e],h=a.i[g];for(let l=0;l<h.length;l++){if(!d){b=null==b?g:b;break}let k=Rc(h[l],a.j,",$");if(k){k=f+k;if(d>=k.length){d-=k.length;c+=k;f=a.j;break}b=null==b?g:b}}}a="";null!=b&&(a=f+"trn="+b);return c+a}class Vc{constructor(){this.j="&";this.i={};this.m=0;this.h=[]}};function Wc(){var a=Xc,b=window.google_srt;0<=b&&1>=b&&(a.h=b)}function Yc(a,b,c,d=!1,f){if((d?a.h:Math.random())<(f||.01))try{let e;c instanceof Vc?e=c:(e=new Vc,pc(c,(h,l)=>{var k=e;const n=k.m++;h=Qc(l,h);k.h.push(n);k.i[n]=h}));const g=Uc(e,"/pagead/gen_204?id="+b+"&");g&&Bc(p,g)}catch(e){}}class Zc{constructor(){this.h=Math.random()}};let $c=null;function ad(){const a=p.performance;return a&&a.now&&a.timing?Math.floor(a.now()+a.timing.navigationStart):Date.now()}function bd(){const a=p.performance;return a&&a.now?a.now():null};class cd{constructor(a,b){var c=bd()||ad();this.label=a;this.type=b;this.value=c;this.duration=0;this.uniqueId=Math.random();this.taskId=this.slotId=void 0}};const X=p.performance,dd=!!(X&&X.mark&&X.measure&&X.clearMarks),ed=ma(()=>{var a;if(a=dd){var b;if(null===$c){$c="";try{a="";try{a=p.top.location.hash}catch(c){a=p.location.hash}a&&($c=(b=a.match(/\bdeid=([\d,]+)/))?b[1]:"")}catch(c){}}b=$c;a=!!b.indexOf&&0<=b.indexOf("1337")}return a});function fd(a){a&&X&&ed()&&(X.clearMarks(`goog_${a.label}_${a.uniqueId}_start`),X.clearMarks(`goog_${a.label}_${a.uniqueId}_end`))}
class gd{constructor(){var a=window;this.i=[];this.j=a||p;let b=null;a&&(a.google_js_reporting_queue=a.google_js_reporting_queue||[],this.i=a.google_js_reporting_queue,b=a.google_measure_js_timing);this.h=ed()||(null!=b?b:1>Math.random())}start(a,b){if(!this.h)return null;a=new cd(a,b);b=`goog_${a.label}_${a.uniqueId}_start`;X&&ed()&&X.mark(b);return a}end(a){if(this.h&&"number"===typeof a.value){a.duration=(bd()||ad())-a.value;var b=`goog_${a.label}_${a.uniqueId}_end`;X&&ed()&&X.mark(b);!this.h||
2048<this.i.length||this.i.push(a)}}};function hd(a){let b=a.toString();a.name&&-1==b.indexOf(a.name)&&(b+=": "+a.name);a.message&&-1==b.indexOf(a.message)&&(b+=": "+a.message);if(a.stack){a=a.stack;var c=b;try{-1==a.indexOf(c)&&(a=c+"\n"+a);let d;for(;a!=d;)d=a,a=a.replace(RegExp("((https?:/..*/)[^/:]*:\\d+(?:.|\n)*)\\2"),"$1");b=a.replace(RegExp("\n *","g"),"\n")}catch(d){b=c}}return b}
function id(a,b,c){let d,f;try{a.h&&a.h.h?(f=a.h.start(b.toString(),3),d=c(),a.h.end(f)):d=c()}catch(e){c=!0;try{fd(f),c=a.u(b,new Mc(e,{message:hd(e)}),void 0,void 0)}catch(g){a.s(217,g)}if(c){let g,h;null==(g=window.console)||null==(h=g.error)||h.call(g,e)}else throw e;}return d}function jd(a,b){var c=kd;return(...d)=>id(c,a,()=>b.apply(void 0,d))}
class ld{constructor(a=null){this.j=Xc;this.i=null;this.u=this.s;this.h=a;this.m=!1}pinger(){return this.j}s(a,b,c,d,f){f=f||"jserror";let e;try{const N=new Vc;var g=N;g.h.push(1);g.i[1]=Qc("context",a);b.error&&b.meta&&b.id||(b=new Mc(b,{message:hd(b)}));if(b.msg){g=N;var h=b.msg.substring(0,512);g.h.push(2);g.i[2]=Qc("msg",h)}var l=b.meta||{};b=l;if(this.i)try{this.i(b)}catch(K){}if(d)try{d(b)}catch(K){}d=N;l=[l];d.h.push(3);d.i[3]=l;d=p;l=[];let Ga;b=null;do{var k=d;try{var n;if(n=!!k&&null!=k.location.href)b:{try{Ca(k.foo);
n=!0;break b}catch(K){}n=!1}var m=n}catch(K){m=!1}m?(Ga=k.location.href,b=k.document&&k.document.referrer||null):(Ga=b,b=null);l.push(new Pc(Ga||""));try{d=k.parent}catch(K){d=null}}while(d&&k!=d);for(let K=0,tc=l.length-1;K<=tc;++K)l[K].depth=tc-K;k=p;if(k.location&&k.location.ancestorOrigins&&k.location.ancestorOrigins.length==l.length-1)for(m=1;m<l.length;++m){var q=l[m];q.url||(q.url=k.location.ancestorOrigins[m-1]||"",q.T=!0)}var C=l;let kb=new Pc(p.location.href,!1);k=null;const lb=C.length-
1;for(q=lb;0<=q;--q){var O=C[q];!k&&Nc.test(O.url)&&(k=O);if(O.url&&!O.T){kb=O;break}}O=null;const Cd=C.length&&C[lb].url;0!=kb.depth&&Cd&&(O=C[lb]);e=new Oc(kb,O);if(e.i){C=N;var Q=e.i.url||"";C.h.push(4);C.i[4]=Qc("top",Q)}var nb={url:e.h.url||""};if(e.h.url){var ob=e.h.url.match(fc),la=ob[1],uc=ob[3],vc=ob[4];Q="";la&&(Q+=la+":");uc&&(Q+="//",Q+=uc,vc&&(Q+=":"+vc));var wc=Q}else wc="";la=N;nb=[nb,{url:wc}];la.h.push(5);la.i[5]=nb;Yc(this.j,f,N,this.m,c)}catch(N){try{Yc(this.j,f,{context:"ecmserr",
rctx:a,msg:hd(N),url:e&&e.h.url},this.m,c)}catch(Ga){}}return!0}};class md{};let Xc,kd;const Y=new gd;var nd=()=>{window.google_measure_js_timing||(Y.h=!1,Y.i!=Y.j.google_js_reporting_queue&&(ed()&&Array.prototype.forEach.call(Y.i,fd,void 0),Y.i.length=0))};(a=>{Xc=null!=a?a:new Zc;"number"!==typeof window.google_srt&&(window.google_srt=Math.random());Wc();kd=new ld(Y);kd.i=b=>{const c=Ec;0!==c&&(b.jc=String(c),b.shv=Fc(c))};kd.m=!0;"complete"==window.document.readyState?nd():Y.h&&U(window,"load",()=>{nd()})})();
var Z=(a,b)=>jd(a,b),od=a=>{var b=md,c="S";b.S&&b.hasOwnProperty(c)||(c=new b,b.S=c);b=[];!a.eid&&b.length&&(a.eid=b.toString());Yc(Xc,"gdn-asoch",a,!0)};function pd(a=window){return a};var qd=(a,b)=>{b=P(a,2)||b;if(!b)return"";if(R(a,13))return b;const c=/[?&]adurl=([^&]+)/.exec(b);if(!c)return b;const d=[b.slice(0,c.index+1)];Eb(a,4).forEach((f,e)=>{d.push(encodeURIComponent(e)+"="+encodeURIComponent(f)+"&")});d.push(b.slice(c.index+1));return d.join("")},rd=(a,b=[])=>{b=0<b.length?b:Lc("data-asoch-targets");a=Eb(a,1,Ub);const c=[];for(let h=0;h<b.length;++h){var d=b[h].getAttribute("data-asoch-targets"),f=d.split(","),e=!0;for(let l of f)if(!a.has(l)){e=!1;break}if(e){e=a.get(f[0]);
for(d=1;d<f.length;++d){var g=a.get(f[d]);e=zb(e).toJSON();g=g.toJSON();const l=Math.max(e.length,g.length);for(let k=0;k<l;++k)null==e[k]&&(e[k]=g[k]);e=new Ub(e)}f=Eb(e,4);null!=G(e,5,!1)&&f.set("nb",J(e,5,0).toString());c.push({element:b[h],data:e})}else od({type:1,data:d})}return c},ud=(a,b,c,d)=>{c=qd(b,c);if(0!==c.length){var f=nc(c,"ase");if("1"===f||"2"===f){if(609===d)var e=4;else{var g;e=(null==(g=V.featurePolicy)?0:g.allowedFeatures().includes("attribution-reporting"))?6:5}"1"===f?(g=sd(c,
"asr","1"),a.setAttribute("attributionsrc",g),c=sd(c,"nis",e.toString())):"2"===f&&(td(c)?(e=sd(ca(new ea({url:c})),"nis",e.toString()),a.setAttribute("attributionsrc",e)):(a.setAttribute("attributionsrc",""),c=sd(c,"nis",e.toString())))}na(a,Jc(c,Kc(d)));a.target||(a.target=null!=G(b,11)?P(b,11):"_top")}},vd=a=>{for(const b of a)if(a=b.data,"A"==b.element.tagName&&!R(a,1)){const c=b.element;ud(c,a,c.href,609)}},td=a=>!/[?&]dsh=1(&|$)/.test(a)&&/[?&]ae=1(&|$)/.test(a),wd=a=>{const b=p.oneAfmaInstance;
if(b)for(const c of a)if((a=c.data)&&void 0!==L(a,Wb,8)){const d=P(M(a,Wb,8),4);if(d){b.fetchAppStoreOverlay(d,void 0,P(M(a,Wb,8),6));break}}},xd=(a,b=500)=>{const c=[],d=[];for(var f of a)(a=f.data)&&void 0!==L(a,T,12)&&(d.push(M(a,T,12)),c.push(M(a,T,12).C()));f=(e,g)=>{if(g)for(const h of d)g[h.C()]&&h.U(!0)};a=p.oneAfmaInstance;for(const e of c){let g;null==(g=a)||g.canOpenAndroidApp(e,f,()=>{},b)}},zd=(a,b,c,d,f)=>{if(!b||void 0===L(b,Wb,8))return!1;const e=M(b,Wb,8);let g=P(e,2);Eb(b,10).forEach((l,
k)=>{var n=g;k=encodeURIComponent(k);const m=encodeURIComponent(l);l=new RegExp("[?&]"+k+"=([^&]+)");const q=l.exec(n);console.log(q);k=k+"="+m;g=q?n.replace(l,q[0].charAt(0)+k):n.replace("?","?"+k+"&")});yd(b)&&R(b,15)&&!/[?&]label=/.test(c)&&(c=sd(c,"label","deep_link_fallback"));b=l=>d.openStoreOverlay(l,void 0,P(e,6));const h=l=>Dc(W,l);return d.redirectForStoreU2({clickUrl:c,trackingUrl:P(e,3),finalUrl:g,pingFunc:f?h:d.click,openFunc:(null==a?0:R(a,1))?b:d.openIntentOrNativeApp})},Bd=(a,b,c,
d,f,e,g,h=!1)=>{f=R(f,15);const l=td(e);!a||!b||f&&l||(e=h?Ad(e):Ad(e,g.click));e&&e.startsWith("intent:")?g.openIntentOrNativeApp(e):c?d?g.openBrowser(e):g.openChromeCustomTab(e):g.openSystemBrowser(e,{useFirstPackage:!0,useRunningProcess:!0})},Ad=(a,b=null)=>{if(null!==b){const c=new ea({url:a});if(c.i&&c.j||c.s)return b(ca(c)),da(c,1)}else return{V:b}={},b=new ea({url:a,V:b}),b.i&&b.j||b.s?navigator.sendBeacon?navigator.sendBeacon(ca(b),"")?da(b,1):da(b,2):da(b,0):a;return a},Dd=(a,b=!0,c=!1)=>
{let d=!1;c&&W.navigator&&W.navigator.sendBeacon&&(d=W.navigator.sendBeacon(a));d||(b&&W.fetch?W.fetch(a,{method:"GET",keepalive:!0,mode:"no-cors"}).then(f=>{f.ok||Bc(W,a)}):Bc(W,a))},sd=(a,b,c)=>{b=encodeURIComponent(String(b));c=encodeURIComponent(String(c));return a.replace("?","?"+b+"="+c+"&")},yd=a=>{for(const b of Fb(a,Vb,7))if(3===J(b,1,0)&&P(b,2))return!0;return!1};function Ed(a,b){return H(a,2,b)}function Fd(a,b){return H(a,3,b)}function Gd(a,b){return H(a,4,b)}function Hd(a,b){return H(a,5,b)}function Id(a,b){return H(a,9,b)}function Jd(a,b){return Gb(a,10,b)}function Kd(a,b){return H(a,11,b)}function Ld(a,b){return H(a,1,b)}function Md(a,b){return H(a,7,b)}var Od=class extends S{constructor(){super(void 0,-1,Nd)}},Pd=class extends S{constructor(){super()}},Nd=[10,6];const Qd="platform platformVersion architecture model uaFullVersion bitness fullVersionList wow64".split(" ");function Rd(a){let b;return null!=(b=a.google_tag_data)?b:a.google_tag_data={}}function Sd(a){let b,c;return"function"===typeof(null==(b=a.navigator)?void 0:null==(c=b.userAgentData)?void 0:c.getHighEntropyValues)}
function Td(){var a=window;if(!Sd(a))return null;const b=Rd(a);if(b.uach_promise)return b.uach_promise;a=a.navigator.userAgentData.getHighEntropyValues(Qd).then(c=>{null!=b.uach||(b.uach=c);return c});return b.uach_promise=a}
function Ud(a){let b;return Kd(Jd(Hd(Ed(Ld(Gd(Md(Id(Fd(new Od,a.architecture||""),a.bitness||""),a.mobile||!1),a.model||""),a.platform||""),a.platformVersion||""),a.uaFullVersion||""),(null==(b=a.fullVersionList)?void 0:b.map(c=>{var d=new Pd;d=H(d,1,c.brand);return H(d,2,c.version)}))||[]),a.wow64||!1)}function Vd(){let a,b;return null!=(b=null==(a=Td())?void 0:a.then(c=>Ud(c)))?b:null};function Wd(a){for(const b of a)if("A"==b.element.tagName){a=b.element;const c=b.data;null==G(c,2)&&H(c,2,a.href)}}function Xd(a,b){return ka(a,c=>c.element===b)}function Yd(a){yc(Z(556,()=>{new Zd(a||{})}))}
function $d(a,b,c,d){if(!R(d,13)){var f=c.href;var e=/[?&]adurl=([^&]+)/.exec(f);f=e?[f.slice(0,e.index),f.slice(e.index)]:[f,""];for(na(c,Jc(f[0],Kc(557)));!c.id;)if(e="asoch-id-"+ec(),!V.getElementById(e)){c.id=e;break}e=c.id;"function"===typeof window.xy&&window.xy(b,c,V.body);"function"===typeof window.mb&&window.mb(c);"function"===typeof window.bgz&&window.bgz(e);"function"===typeof window.ja&&window.ja(e,d?J(d,5,0):0);"function"===typeof window.vti&&window.vti(e);a.s&&"function"===typeof window.ss&&
(a.P?window.ss(e,1,a.s):window.ss(a.s,1));0<f.length&&(a=0<a.G.length&&(null==d||null==G(d,19))?c.href+"&uach="+encodeURIComponent(a.G)+f[1]:c.href+f[1],na(c,Jc(a,Kc(557))))}}async function ae(a,b,c,d){let f="";var e=p.oneAfmaInstance;if(e&&(b.preventDefault(),f=await e.appendClickSignalsAsync(c.href)||"",a.M&&(e=await e.getNativeClickMeta()))){if(e.customClickGestureEligible)return;f=sd(f,"nas",e.encodedNas)}be(a,b,c,d,f)}
function be(a,b,c,d,f){const e=R(a.i,2),g=e&&300<Date.now()-a.O,h=p.oneAfmaInstance;h?(qc(b),(()=>{let l=h.logScionEventAndAddParam(f);if(!a.u&&d&&void 0!==L(d,T,12)){var k=M(d,T,12).C();if(0<Fb(d,Vb,7).length)for(const n of Fb(d,Vb,7));R(M(d,T,12),2)?(h.click(l),h.openAndroidApp(k),k=!0):k=!1}else k=!1;k||zd(a.F,d,l,h,a.Y)||Bd(e,g,a.aa,a.u,d,l,h,a.Z)})()):(R(a.i,21)&&c.href&&"_blank"!==c.target&&(a.m=nc(c.href,"ai")||"")&&(a.j="clicked"),b=window,a.X&&b.pawsig&&"function"===typeof b.pawsig.clk?b.pawsig.clk(c):
g&&(b="2"===nc(c.href,"ase")&&td(c.href)?Ad(c.href,()=>{}):a.ba?Ad(c.href,l=>{W.fetch(l,{method:"GET",keepalive:!0,mode:"no-cors"})}):Ad(c.href),b!==c.href&&na(c,Jc(b,Kc(599)))));g&&(a.O=Date.now());Hc(a.N)}
var Zd=class{constructor(a){this.u=Fa||Da||Ha||Ea;var b=Lc("data-asoch-meta");if(1!==b.length)od({type:2,data:b.length});else{this.N=70;this.i=new Yb(JSON.parse(b[0].getAttribute("data-asoch-meta"))||[]);this.L=a["extra-meta"]?new Yb(JSON.parse(a["extra-meta"])):null;this.M="true"===a["is-fsn"];this.F=a["ios-store-overlay-config"]?new Zb(JSON.parse(a["ios-store-overlay-config"])):null;this.aa="true"===a["use-cct-over-browser"];this.Y="true"===a["send-ac-click-ping-by-js"];this.R="true"===a["correct-redirect-url-for-och-15-click"];
this.Z="true"===a["send-click-ping-by-js-in-och"];this.X="true"===a["enable-paw"];this.ba="true"===a["async-using-fetch"];this.j=this.m="";this.I=this.H=-1;this.G="";b=Vd();null!=b&&b.then(d=>{d=Nb(d);for(var f=[],e=0,g=0;g<d.length;g++){var h=d.charCodeAt(g);255<h&&(f[e++]=h&255,h>>=8);f[e++]=h}this.G=Ka(f,3)});this.h=rd(this.i);this.ca=Number(a["deeplink-and-android-app-validation-timeout"])||500;this.O=-Infinity;this.s=P(this.i,5)||"";this.P=R(this.i,11);this.L&&(this.P=R(this.L,11));this.K=this.J=
null;R(this.i,3)||(vd(this.h),H(this.i,3,!0));Wd(this.h);a=p.oneAfmaInstance;!this.u&&a&&xd(this.h,this.ca);var c;if(a&&(null==(c=this.F)?0:R(c,2)))switch(c=()=>{const d=Hb(G(this.F,4),0);0<d?p.setTimeout(()=>{wd(this.h)},d):wd(this.h)},J(this.F,3,0)){case 1:a.runOnOnShowEvent(c);break;case 2:zc(c);break;default:wd(this.h)}U(V,"click",Z(557,d=>{a:if(!d.defaultPrevented||this.J===d){for(var f,e,g=d.target;(!f||!e)&&g;){e||"A"!=g.tagName||(e=g);var h=g.hasAttribute("data-asoch-targets"),l=g.hasAttribute("data-asoch-fixed-value");
if(!f)if(l)f=new Ub(JSON.parse(g.getAttribute("data-asoch-fixed-value"))||[]);else if("A"==g.tagName||h)if(h=h&&"true"===g.getAttribute("data-asoch-is-dynamic")?rd(this.i,[g]):this.h,h=Xd(h,g))f=h.data;g=g.parentElement}if(g=f&&!R(f,1)){if(d.defaultPrevented){var k=e;if(this.J===d&&this.K){e=new Rb(this.K);var n=P(f,9),m="";switch(J(e,4,1)){case 2:if(Hb(G(e,2),0))m="blocked_fast_click";else if(P(e,1)||P(e,7))m="blocked_border_click";break;case 3:m=V,m=m.getElementById?m.getElementById("common_15click_anchor"):
null,"function"===typeof window.copfcChm&&m&&(f=zb(f),H(f,5,12),Eb(f,4).set("nb",(12).toString()),(g=Xd(this.h,m))?g.data=f:this.h.push({element:m,data:f}),!this.R&&k&&($d(this,d,k,f),H(f,2,k.href)),window.copfcChm(d,qd(f,m.href),null,void 0!==L(e,Sb,10)?Nb(M(e,Sb,10)):null),this.R&&$d(this,d,m,f)),m="onepointfiveclick_first_click"}n&&m&&Dd(n+"&label="+m,!1);Hc(this.N)}break a}h=f;for(m of Cb(h,6))Dd(m)}if(e&&g){f=g?f:null;(m=Xd(this.h,e))?m=m.data:(m=new Ub,H(m,2,e.href),H(m,11,e.target||"_top"),
this.h.push({element:e,data:m}));ud(e,f||m,P(m,2),557);$d(this,d,e,f);for(n of Cb(this.i,17))m=n,g=V.body,h={},"function"===typeof window.CustomEvent?l=new CustomEvent(m,h):(l=document.createEvent("CustomEvent"),l.initCustomEvent(m,!!h.bubbles,!!h.cancelable,h.detail)),g.dispatchEvent(l);if(null==f?0:null!=G(f,19)){g=new Qb;H(g,1,J(f,5,0));n=P(f,19);m=null!=G(f,20,!1)?Hb(G(f,20),0):null;g=Nb(g);h=this.G;l=pd(p);const q=new $b;H(q,1,n);null!==m&&H(q,2,m);null!==h&&H(q,3,h);H(q,4,g);null==l||null==
(k=l.fence)||k.reportEvent({eventType:"click",eventData:JSON.stringify(q),destination:["buyer"]})}R(this.i,16)||this.M?ae(this,d,e,f):(k="",(n=p.oneAfmaInstance)&&(k=n.appendClickSignals(e.href)),be(this,d,e,f,k))}}}),ac);!a&&R(this.i,21)&&(U(W,"pagehide",Z(1037,()=>{if(this.m&&this.j&&(this.j+="+pagehide",this.I=Date.now(),-1!==this.H)){var d={id:"visibilityBeforePagehide",payload:this.j,delay:this.I-this.H,isios:this.u,clickstring:this.m};Dd(oc(lc(),d),!1,!0)}})),U(V,"visibilitychange",Z(1067,()=>
{if("visible"===V.visibilityState)this.m=this.j="",this.I=this.H=-1;else if("hidden"===V.visibilityState&&this.j&&this.m){this.H=Date.now();var d={id:"visibilityhidden",payload:this.j,isios:this.u,clickstring:this.m};Dd(oc(lc(),d),!1,!0)}})));this.s&&"function"===typeof window.ss&&U(V.body,"mouseover",Z(626,()=>{window.ss(this.s,0)}),bc);"function"===typeof window.ivti&&window.ivti(window);c=window;c.googqscp&&"function"===typeof c.googqscp.registerCallback&&c.googqscp.registerCallback((d,f)=>{this.J=
d;this.K=f})}}};var ce=Z(555,a=>Yd(a));Ec=70;const de=Gc(70,document.currentScript);if(null==de)throw Error("JSC not found 70");const ee={},fe=de.attributes;for(let a=fe.length-1;0<=a;a--){const b=fe[a].name;0===b.indexOf("data-jcp-")&&(ee[b.substring(9)]=fe[a].value)}ce(ee);}).call(this);
