(this.webpackJsonphealth_care=this.webpackJsonphealth_care||[]).push([[0],[,,,,function(e,t,n){e.exports=n.p+"static/media/img5.32c02084.jpg"},function(e,t,n){e.exports=n.p+"static/media/img2.3244e30d.jpg"},function(e,t,n){e.exports=n.p+"static/media/img10.f9389f33.jpg"},function(e,t,n){e.exports=n.p+"static/media/img9.30e01b99.jpg"},function(e,t,n){e.exports=n.p+"static/media/img12.2d8485db.jpg"},function(e,t,n){e.exports=n.p+"static/media/img11.9e8dbacf.jpg"},function(e,t,n){e.exports=n.p+"static/media/img7.ffb1d223.jpg"},function(e,t,n){e.exports=n(18)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(3),o=n.n(r),s=(n(16),n(1)),i=(n(17),n(4)),u=n.n(i),l=function(){return fetch("/tips",{method:"GET"}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))},m=function(){return fetch("/chatRoomId",{method:"DELETE"}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))},f=n(5),h=n.n(f),d=n(6),b=n.n(d),j=function(e){var t=e.user,n=e.onLogin,r=Object(a.useState)(""),o=Object(s.a)(r,2),i=o[0],u=o[1],l=Object(a.useState)(""),m=Object(s.a)(l,2),f=m[0],d=m[1];return c.a.createElement("div",{className:"bg"},"Doctor"===t?c.a.createElement("img",{src:h.a,alt:"bg",class:"bg"}):c.a.createElement("img",{src:b.a,alt:"bg",class:"bg"}),c.a.createElement("div",{className:"title"},"Doctor"===t?"Welcome Doctor, Please Login with your details":"Welcome, Please Login with your details! We are always here to help you"),c.a.createElement("div",{className:"heading"},"Please Enter UserName"),c.a.createElement("input",{className:"username",name:"text",type:"text",onChange:function(e){var t=e.target.value;u(t.toUpperCase())},value:i}),"Doctor"===t?c.a.createElement("button",{className:"create",type:"button",onClick:function(){var e;(e=i,fetch("/sessionDoctor",{method:"POST",headers:new Headers({"content-type":"application/json"}),body:JSON.stringify({username:e})}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))).then((function(e){n(e)})).catch((function(e){d(e.error)}))}},"Login"):c.a.createElement("button",{className:"create",type:"button",onClick:function(){var e;(e=i,fetch("/sessionPatient",{method:"POST",headers:new Headers({"content-type":"application/json"}),body:JSON.stringify({username:e})}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))).then((function(e){n(e)})).catch((function(e){d(e.error)}))}},"Login"),c.a.createElement("div",{className:"status"},f))},g=function(e){var t=e.onLogin,n=Object(a.useState)(""),r=Object(s.a)(n,2),o=r[0],i=r[1],l=Object(a.useState)(!1),m=Object(s.a)(l,2),f=m[0],h=m[1];return c.a.createElement("div",null,f?c.a.createElement("div",null,c.a.createElement("button",{className:"btn-home",type:"button",onClick:function(){h(!1)}},"Home"),c.a.createElement(j,{user:o,onLogin:t})):c.a.createElement("div",{className:"bg"},c.a.createElement("img",{src:u.a,alt:"bg",class:"bg"}),c.a.createElement("div",{className:"title"},"Welcome to Health Care Center"),c.a.createElement("div",{className:"sub_title"},"Get Started"),c.a.createElement("div",{className:"btn-starters"},c.a.createElement("button",{className:"btn-start-doctor",type:"button",onClick:function(){h(!0),i("Doctor")}},"Doctor"),c.a.createElement("div",{className:"divider"}),c.a.createElement("button",{className:"btn-start-patient",type:"button",onClick:function(){h(!0),i("Patient")}},"Patient"))))},E=function(e){var t=e.user,n=e.onLogout;return c.a.createElement("ul",null,t.isLoggedIn?c.a.createElement("div",null,c.a.createElement("button",{className:"btn-logout",type:"button",onClick:function(){fetch("/session",{method:"DELETE"}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(){return n()}))}},"Logout")):"")},p=n(7),v=n.n(p),O=n(8),N=n.n(O),k=function(e){var t=e.tipsList,n=e.callBackFromTips,a=Object.values(t).map((function(e){return c.a.createElement("div",{className:"tip"},e.doctorName," : ",e.healthTip)}));return c.a.createElement("div",{className:"bg"},c.a.createElement("img",{src:N.a,alt:"bg",class:"bg"}),c.a.createElement("button",{className:"btn-main",type:"button",onClick:function(){n()}},"Main Page"),c.a.createElement("div",{className:"title"},"Health Tips By Doctors"),c.a.createElement("div",{className:"tip-list"},a))};var y=function(e){var t=e.messagelist;if(0===Object.keys(t).length)return c.a.createElement("div",{className:"messages"},c.a.createElement("h3",null,"Messages"));var n=t.chats.map((function(e){return c.a.createElement("p",null,e.timestamp," ",e.username,": ",e.message)}));return c.a.createElement("div",{className:"messages"},c.a.createElement("h3",null,"Messages"),c.a.createElement("ul",{className:"message-list"},n))};var P=function(e){var t=e.getTextMessage,n=e.GetchatList,r=e.setMessageList,o=e.error,i=e.setError,u=Object(a.useState)(""),l=Object(s.a)(u,2),m=l[0],f=l[1];return c.a.createElement("div",{className:"outgoing"},c.a.createElement("input",{className:"message",name:"text",type:"text",onChange:function(e){f(e.target.value)},value:m}),c.a.createElement("button",{className:"btn-msg",type:"button",onClick:function(){t(m),f(""),i(""),n({setMessageList:r})}},"Send"),c.a.createElement("div",{className:"status"},o))},S=n(9),w=n.n(S),L=function(e){var t=e.callBackFromChats,n=Object(a.useState)([]),r=Object(s.a)(n,2),o=r[0],i=r[1],u=Object(a.useState)(""),l=Object(s.a)(u,2),m=l[0],f=l[1],h=function(e){var t=e.setMessageList,n=e.setError;fetch("/message",{method:"GET"}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(e){t(e)})).catch((function(e){n(e.error)}))};return Object(a.useEffect)((function(){h({setMessageList:i,setError:f});var e=setInterval((function(){h({setMessageList:i,setError:f})}),3e3);return function(){clearInterval(e)}}),[]),c.a.createElement("div",{id:"chat-app"},c.a.createElement("div",{className:"title"},"Welcome To The Chat Room!"),c.a.createElement("div",{className:"bg"},c.a.createElement("img",{src:w.a,alt:"bg",class:"bg"}),c.a.createElement("button",{className:"btn-main",type:"button",onClick:function(){t()}},"Quit Chat"),c.a.createElement(P,{getTextMessage:function(e){var t;(t=e,fetch("/message",{method:"POST",body:JSON.stringify({message:t}),headers:new Headers({"content-type":"application/json"})}).catch((function(){return Promise.reject({error:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))).then((function(){})).catch((function(e){f(e.error)}))},GetchatList:h,setMessageList:i,error:m,setError:f}),c.a.createElement("div",{className:"chat-panel"},c.a.createElement(y,{messagelist:o}))))},T=function(){var e=Object(a.useState)(""),t=Object(s.a)(e,2),n=t[0],r=t[1],o=Object(a.useState)(!1),i=Object(s.a)(o,2),u=i[0],f=i[1],h=Object(a.useState)(""),d=Object(s.a)(h,2),b=d[0],j=d[1],g=Object(a.useState)(!1),E=Object(s.a)(g,2),p=E[0],O=E[1],N=Object(a.useState)(""),y=Object(s.a)(N,2),P=y[0],S=y[1];Object(a.useEffect)((function(){T();var e=setInterval((function(){T(),1==p&&C()}),3e3);return function(){clearInterval(e)}}),[]);var w=function(){l().then((function(e){j(e)})).catch((function(e){r(e.error)}))},T=function(){fetch("/chatRoomId",{method:"GET"}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(e){0!=Object.keys(e).length?O(!0):O(!1)})).catch((function(e){r(e.error)}))},C=function(){S("Waiting for Doctor, thanks for your patience"),fetch("/availablePatients",{method:"POST",body:JSON.stringify({}),headers:new Headers({"content-type":"application/json"})}).catch((function(){return Promise.reject({error:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(e){e.chatRoomId&&O(!0)})).catch((function(e){r(e.error)}))};return c.a.createElement("div",null,u?c.a.createElement(k,{tipsList:b,callBackFromTips:function(){f(!1),O(!1)}}):p?c.a.createElement(L,{callBackFromChats:function(){S(""),m().then((function(){})).catch((function(e){r(e.error)})),f(!1),O(!1)}}):c.a.createElement("div",null,c.a.createElement("div",{className:"title"},"Welcome To Health Care Center, Feel free to connect with Doctors"),c.a.createElement("div",{className:"bg"},c.a.createElement("img",{src:v.a,alt:"bg",class:"bg"}),c.a.createElement("div",{className:"divider"}),c.a.createElement("div",null,c.a.createElement("button",{className:"btn-view-tip",type:"button",onClick:C},"Request chat appointment with Doctor")),c.a.createElement("div",{className:"status"},P),c.a.createElement("div",{className:"divider"}),c.a.createElement("div",null,c.a.createElement("button",{className:"btn-view-tip",type:"button",onClick:function(){w(),f(!0)}},"View Health Tips"))),c.a.createElement("div",{className:"status"},n)))},C=n(10),I=n.n(C),x=function(){var e=Object(a.useState)(""),t=Object(s.a)(e,2),n=t[0],r=t[1],o=Object(a.useState)(""),i=Object(s.a)(o,2),u=i[0],f=i[1],h=Object(a.useState)(!1),d=Object(s.a)(h,2),b=d[0],j=d[1],g=Object(a.useState)(""),E=Object(s.a)(g,2),p=E[0],v=E[1],O=Object(a.useState)(""),N=Object(s.a)(O,2),y=N[0],P=N[1],S=Object(a.useState)(!1),w=Object(s.a)(S,2),T=w[0],C=w[1],x=Object(a.useState)(0),D=Object(s.a)(x,2),H=(D[0],D[1]),M=Object(a.useState)(""),W=Object(s.a)(M,2),B=W[0],G=W[1],R=function(){l().then((function(e){v(e),f("")})).catch((function(e){f(e.error)}))},F=function(){fetch("/availablePatients",{method:"GET"}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(e){G(""),P(e)})).catch((function(e){G(e.error),P("")}))};Object(a.useEffect)((function(){F();var e=setInterval((function(){F()}),3e3);return function(){clearInterval(e)}}),[]);var J=Object.values(y).map((function(e){return c.a.createElement("div",null,c.a.createElement("button",{className:"btn-patient",type:"button",name:"button"},e.name))}));return c.a.createElement("div",null,b?c.a.createElement(k,{tipsList:p,callBackFromTips:function(){f(""),j(!1),C(!1)}}):T?c.a.createElement(L,{callBackFromChats:function(){f(""),m().then((function(){})).catch((function(e){f(e.error)})),j(!1),C(!1)}}):c.a.createElement("div",null,c.a.createElement("div",{className:"title"},"Welcome Doctor"),c.a.createElement("div",{className:"bg"},c.a.createElement("img",{src:I.a,alt:"bg",class:"bg"}),c.a.createElement("div",{className:"patients"},c.a.createElement("div",{className:"heading"},"Waiting Patients"),c.a.createElement("ul",{className:"patient-list"},J),c.a.createElement("div",{className:"status"},B))),c.a.createElement("div",null,c.a.createElement("button",{className:"btn-view-tip",type:"button",onClick:function(){fetch("/chatRoomId",{method:"POST"}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(e){0!=Object.keys(e).length?(H(e.chatRoomId),C(!0)):C(!1)})).catch((function(e){f(e.error)}))}},"Go To Chat Room")),c.a.createElement("div",{className:"title-tip"},"Add Health Tip"),c.a.createElement("div",{className:""},c.a.createElement("textarea",{className:"tip-text",name:"text",type:"text",onChange:function(e){var t=e.target.value;r(t)},value:n}),c.a.createElement("div",null,c.a.createElement("button",{className:"btn-tip",type:"button",onClick:function(){(function(e){return fetch("/tips",{method:"POST",headers:new Headers({"content-type":"application/json"}),body:JSON.stringify({healthTip:e})}).catch((function(){return Promise.reject({error:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))})(n).then((function(){r("")})).catch((function(e){f(e.error)}))}},"Add Tip"))),c.a.createElement("div",{className:"divider"}),c.a.createElement("div",null,c.a.createElement("button",{className:"btn-view-tip",type:"button",onClick:function(){R(),j(!0)}},"View Health Tips")),c.a.createElement("div",{className:"status"},u)))};var D=function(){var e,t=Object(a.useState)({isLoggedIn:!1}),n=Object(s.a)(t,2),r=n[0],o=n[1],i=Object(a.useState)(""),u=Object(s.a)(i,2),l=u[0],m=u[1],f=Object(a.useState)(""),h=Object(s.a)(f,2),d=h[0],b=h[1],j=Object(a.useState)(""),p=Object(s.a)(j,2),v=p[0],O=p[1];return Object(a.useEffect)((function(){fetch("/session",{method:"GET"}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():Promise.reject({code:"login-invalid"})})).then((function(e){o({isLoggedIn:!0}),m(e.userName),b(e.userType)})).catch((function(e){O(e.error),o({isLoggedIn:!1})}))}),[]),e=r.isLoggedIn&&"patient"==d?c.a.createElement(T,{userName:l,error:v}):r.isLoggedIn&&"doctor"==d?c.a.createElement(x,{userName:l,error:v}):c.a.createElement(g,{onLogin:function(e){o({isLoggedIn:!0}),m(e.userName),b(e.userType)}}),c.a.createElement("div",{className:"App"},c.a.createElement(E,{user:r,onLogout:function(){o({isLoggedIn:!1})}}),e)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[11,1,2]]]);
//# sourceMappingURL=main.0c4e251d.chunk.js.map