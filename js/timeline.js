/*
  Developer: Israel Viveros;
  Version: 1.0;
*/
// Jquery.jsonp 2.4.0
(function(e){function t(){}function n(e){C=[e]}function r(e,t,n){return e&&e.apply&&e.apply(t.context||t,n)}function i(e){return/\?/.test(e)?"&":"?"}function O(c){function Y(e){z++||(W(),j&&(T[I]={s:[e]}),D&&(e=D.apply(c,[e])),r(O,c,[e,b,c]),r(_,c,[c,b]))}function Z(e){z++||(W(),j&&e!=w&&(T[I]=e),r(M,c,[c,e]),r(_,c,[c,e]))}c=e.extend({},k,c);var O=c.success,M=c.error,_=c.complete,D=c.dataFilter,P=c.callbackParameter,H=c.callback,B=c.cache,j=c.pageCache,F=c.charset,I=c.url,q=c.data,R=c.timeout,U,z=0,W=t,X,V,J,K,Q,G;return S&&S(function(e){e.done(O).fail(M),O=e.resolve,M=e.reject}).promise(c),c.abort=function(){!(z++)&&W()},r(c.beforeSend,c,[c])===!1||z?c:(I=I||u,q=q?typeof q=="string"?q:e.param(q,c.traditional):u,I+=q?i(I)+q:u,P&&(I+=i(I)+encodeURIComponent(P)+"=?"),!B&&!j&&(I+=i(I)+"_"+(new Date).getTime()+"="),I=I.replace(/=\?(&|$)/,"="+H+"$1"),j&&(U=T[I])?U.s?Y(U.s[0]):Z(U):(E[H]=n,K=e(y)[0],K.id=l+N++,F&&(K[o]=F),L&&L.version()<11.6?(Q=e(y)[0]).text="document.getElementById('"+K.id+"')."+p+"()":K[s]=s,A&&(K.htmlFor=K.id,K.event=h),K[d]=K[p]=K[v]=function(e){if(!K[m]||!/i/.test(K[m])){try{K[h]&&K[h]()}catch(t){}e=C,C=0,e?Y(e[0]):Z(a)}},K.src=I,W=function(e){G&&clearTimeout(G),K[v]=K[d]=K[p]=null,x[g](K),Q&&x[g](Q)},x[f](K,J=x.firstChild),Q&&x[f](Q,J),G=R>0&&setTimeout(function(){Z(w)},R)),c)}var s="async",o="charset",u="",a="error",f="insertBefore",l="_jqjsp",c="on",h=c+"click",p=c+a,d=c+"load",v=c+"readystatechange",m="readyState",g="removeChild",y="<script>",b="success",w="timeout",E=window,S=e.Deferred,x=e("head")[0]||document.documentElement,T={},N=0,C,k={callback:l,url:location.href},L=E.opera,A=!!e("<div>").html("<!--[if IE]><i><![endif]-->").find("i").length;O.setup=function(t){e.extend(k,t)},e.jsonp=O})(jQuery)
//TinySort 1.5.6
!function(a,b){"use strict";function c(a){return a&&a.toLowerCase?a.toLowerCase():a}function d(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]==b)return!e;return e}var e=!1,f=null,g=parseFloat,h=Math.min,i=/(-?\d+\.?\d*)$/g,j=/(\d+\.?\d*)$/g,k=[],l=[],m=function(a){return"string"==typeof a},n=function(a,b){for(var c,d=a.length,e=d;e--;)c=d-e-1,b(a[c],c)},o=Array.prototype.indexOf||function(a){var b=this.length,c=Number(arguments[1])||0;for(c=0>c?Math.ceil(c):Math.floor(c),0>c&&(c+=b);b>c;c++)if(c in this&&this[c]===a)return c;return-1};a.tinysort={id:"TinySort",version:"1.5.6",copyright:"Copyright (c) 2008-2013 Ron Valstar",uri:"http://tinysort.sjeiti.com/",licensed:{MIT:"http://www.opensource.org/licenses/mit-license.php",GPL:"http://www.gnu.org/licenses/gpl.html"},plugin:function(){var a=function(a,b){k.push(a),l.push(b)};return a.indexOf=o,a}(),defaults:{order:"asc",attr:f,data:f,useVal:e,place:"start",returns:e,cases:e,forceStrings:e,ignoreDashes:e,sortFunction:f}},a.fn.extend({tinysort:function(){var p,q,r,s,t=this,u=[],v=[],w=[],x=[],y=0,z=[],A=[],B=function(a){n(k,function(b){b.call(b,a)})},C=function(a,b){return"string"==typeof b&&(a.cases||(b=c(b)),b=b.replace(/^\s*(.*?)\s*$/i,"$1")),b},D=function(a,b){var c=0;for(0!==y&&(y=0);0===c&&s>y;){var d=x[y],f=d.oSettings,h=f.ignoreDashes?j:i;if(B(f),f.sortFunction)c=f.sortFunction(a,b);else if("rand"==f.order)c=Math.random()<.5?1:-1;else{var k=e,o=C(f,a.s[y]),p=C(f,b.s[y]);if(!f.forceStrings){var q=m(o)?o&&o.match(h):e,r=m(p)?p&&p.match(h):e;if(q&&r){var t=o.substr(0,o.length-q[0].length),u=p.substr(0,p.length-r[0].length);t==u&&(k=!e,o=g(q[0]),p=g(r[0]))}}c=d.iAsc*(p>o?-1:o>p?1:0)}n(l,function(a){c=a.call(a,k,o,p,c)}),0===c&&y++}return c};for(p=0,r=arguments.length;r>p;p++){var E=arguments[p];m(E)?z.push(E)-1>A.length&&(A.length=z.length-1):A.push(E)>z.length&&(z.length=A.length)}for(z.length>A.length&&(A.length=z.length),s=z.length,0===s&&(s=z.length=1,A.push({})),p=0,r=s;r>p;p++){var F=z[p],G=a.extend({},a.tinysort.defaults,A[p]),H=!(!F||""===F),I=H&&":"===F[0];x.push({sFind:F,oSettings:G,bFind:H,bAttr:!(G.attr===f||""===G.attr),bData:G.data!==f,bFilter:I,$Filter:I?t.filter(F):t,fnSort:G.sortFunction,iAsc:"asc"==G.order?1:-1})}return t.each(function(c,d){var e,f=a(d),g=f.parent().get(0),h=[];for(q=0;s>q;q++){var i=x[q],j=i.bFind?i.bFilter?i.$Filter.filter(d):f.find(i.sFind):f;h.push(i.bData?j.data(i.oSettings.data):i.bAttr?j.attr(i.oSettings.attr):i.oSettings.useVal?j.val():j.text()),e===b&&(e=j)}var k=o.call(w,g);0>k&&(k=w.push(g)-1,v[k]={s:[],n:[]}),e.length>0?v[k].s.push({s:h,e:f,n:c}):v[k].n.push({e:f,n:c})}),n(v,function(a){a.s.sort(D)}),n(v,function(a){var b=a.s,c=a.n,f=b.length,g=c.length,i=f+g,j=[],k=i,l=[0,0];switch(G.place){case"first":n(b,function(a){k=h(k,a.n)});break;case"org":n(b,function(a){j.push(a.n)});break;case"end":k=g;break;default:k=0}for(p=0;i>p;p++){var m=d(j,p)?!e:p>=k&&k+f>p,o=m?0:1,q=(m?b:c)[l[o]].e;q.parent().append(q),(m||!G.returns)&&u.push(q.get(0)),l[o]++}}),t.length=0,Array.prototype.push.apply(t,u),t}}),a.fn.TinySort=a.fn.Tinysort=a.fn.tsort=a.fn.tinysort}(jQuery);

var funcionesUI = new Object;

funcionesUI.draggableUI = function (){
        $(".wrapTimeline").find(".scroll").draggable({
          axis: "y",
            containment: ".wrapTimeline",
            scroll: false,
            cursor: "move",
               start: function() {
                $(".mascaraTimeline").animate({opacity:'0.8'});
               },
              drag: function() {
                var wrapTag = $(".wrapTimeline");
              var parentTimeline = parseInt(wrapTag.offset().top),
              childTimeline = parseInt($(this).offset().top),
              finalTimeline = parseInt(childTimeline-parentTimeline),
              RelationFirst = $(".mascaraTimeline").outerHeight() - wrapTag.outerHeight(),
              RelationSecond = RelationFirst/ wrapTag.outerHeight(),
              FinalTopMasc = (finalTimeline*RelationSecond)*1.072;
              $(".mascaraTimeline").css("top","-"+FinalTopMasc+"px"); 
            },
            stop: function() {
              $(".mascaraTimeline").animate({opacity:'1'});     
            }
         });
}


funcionesUI.loadJSON = function (){
var bodyTimeline = "";
   $.jsonp({    
    url: "http://static-televisadeportes.esmas.com/timeline/3/timelinemaster.jsonp",
    callback: "timelinemaster",
    success: function(json) {        
       $.each(json, function(index, val) {        
         $.each(val.periods, function(index2, val2) {          
           $.each(val2, function(index3, FinalValor) {             
             var newDate = FinalValor.startdate.split("/");
                  $.jsonp({
                    url: FinalValor.link,
                    callback: "tlperiod",                    
                    success: function(jsonNew) {
                      if(bodyTimeline===""){
                        bodyTimeline += '<div class="relleno relleno2"></div><div class="lineScroll"></div>';
                      }  
                      
                        
                      if(FinalValor.typeevent === "worldcup" ){
                        bodyTimeline += '<article class="itemTimeline mundial" rel="'+newDate[2]+'">';  
                      }else{
                        bodyTimeline += '<article class="itemTimeline" rel="'+newDate[2]+'">';    
                      }

                      
                      bodyTimeline += '<div class="yearItemTimeline">'+newDate[2]+'</div>';
                      bodyTimeline += '<div class="infoItemTimeline">';
                      if(FinalValor.typeevent === "worldcup"){
                        bodyTimeline += '<div class="titleMundialItem">'+FinalValor.title+'</div>';
                      }
                      if(FinalValor.urlthumb != null){
                        bodyTimeline += '<img src="'+FinalValor.urlthumb+'">';  
                      }
                      
                      bodyTimeline += '<div class="summaryItemTimeline">'+jsonNew.period.description+'</div>';

                      if(jsonNew.period.events){                       
                        if(jsonNew.period.events.event.length > 1 && FinalValor.typeevent != "worldcup"){
                          $.each(jsonNew.period.events.event, function(index, val3) {                        
                           bodyTimeline += '<div class="OtherTimeline">'+val3.description+'</div>';                        
                        });
                        }else{
                          if(FinalValor.typeevent != "worldcup"){
                            bodyTimeline += '<div class="OtherTimeline">'+jsonNew.period.events.event.description+'</div>';
                          }
                        }
                      }

                      bodyTimeline += '</div>';
                      if(FinalValor.linknota != null && FinalValor.typeevent === "worldcup"){
                        bodyTimeline += '<a href="'+FinalValor.linknota+'" target="_blank"><div class="viewmoreItemTimeline">M&aacute;s</div></a>';
                      }                     
                      bodyTimeline += '</article>';


 
                        
                        $(".mascaraTimeline").html(bodyTimeline);
                        $('.mascaraTimeline >.itemTimeline').tsort({attr:'rel'});
                    },
                    error: function() {
                      // console.log("Algo a salido mal al cargar el JSON");
                    }
              });         
           });        
         });
       });
  
  funcionesUI.draggableUI();
    },
    error: function() {
       //console.log("No se ha podido inicalizar el timeline");
    }
});
}

$(function() {  
  funcionesUI.loadJSON(); 
});