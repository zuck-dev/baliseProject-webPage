import{a as e,C as t,W as n,A as l,s as a,P as o,R as i,b as r,S as s,H as c,c as d,M as u,d as m,O as h}from"./vendor.7de1dada.js";console.log("hello friend");let p=document.querySelectorAll(".imgGrid"),f=document.querySelectorAll(".trace");var y=document.querySelectorAll("#main-container > path"),g=document.querySelectorAll("collapsible");const v=document.querySelectorAll(".titrePorto");-1!=navigator.appVersion.indexOf("Chrome/")&&g.forEach(((e,t)=>{})),w((function e(t,n){E<t.length&&(document.querySelector(n).innerHTML+=t.charAt(E),E++,setTimeout(e,100,t,n))}),"#test1","PROTOTYPE VERSION_N°1","#test1");let E=0;function w(e,t,...n){return new IntersectionObserver((function(t){!0===t[0].isIntersecting&&e(...n)}),{threshold:[.5]}).observe(document.querySelector(t))}let b,x,C,S=document.getElementsByClassName("collapsible");for(let P=0;P<S.length;P++)S[P].addEventListener("click",(function(){this.classList.toggle("active");let e=this.nextElementSibling;e.style.maxHeight?(e.style.maxHeight=null,e.style.padding=0,e.style.border="none"):(e.style.maxHeight="80vh",e.style.padding="1em",e.style.border="solid black 1px")}));const N=document.querySelectorAll(".show");var q=null;let k=null;function A(){b.aspect=1,b.updateProjectionMatrix(),C.setSize(window.innerWidth,window.innerWidth),I()}function I(){C.render(x,b)}N.forEach((e=>{e.onclick=function(e){q=document.querySelector(`#view${this.id.slice(5)}`);let t=document.createElement("div");if(t.className="close3d",t.onclick=function(){for(this.style.opacity="0.25",k=null;q.firstChild;)q.removeChild(q.firstChild)},k){for(this.style.opacity="0.25",k=null;q.firstChild;)q.removeChild(q.firstChild);v.forEach((e=>{e.style.zIndex="0"}))}else q.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"}),this.style.opacity="1",k=this.id+".stl",function(e,t){C=new n({antialias:!0,alpha:!0}),C.setSize(window.innerWidth,window.innerWidth),C.toneMapping=l,C.toneMappingExposure=1,C.outputEncoding=a,C.setClearColor(0,0),e.appendChild(C.domElement),b=new o(50,1,1,2e3),b.position.set(0,100,0);const p=new i,f=new r(C);x=new s,x.environment=f.fromScene(p).texture,x.add(new c(16777215,3947580)),(new d).load("stl/"+t,(function(e){const t=new u({color:2829099,roughness:.8,metalness:0}),n=new m(e,t);n.position.set(0,120,.6),n.rotation.set(Math.PI/2,0,0),n.scale.set(2,2,2),n.castShadow=!0,n.receiveShadow=!0,x.add(n),I()}));const y=new h(b,C.domElement);y.addEventListener("change",I),y.minDistance=400,y.maxDistance=1e3,y.target.set(10,90,-16),y.update(),window.addEventListener("resize",A,!1)}(q,k),I(),q.appendChild(t),v.forEach((e=>{e.style.zIndex="-1"}))}})),p.forEach((e=>{e.childNodes.forEach((e=>{e.addEventListener("click",(function(){let t=e.parentNode,n=t.parentNode,l=document.createElement("img"),a=t.className.slice(8),o=t.childElementCount;l.src="img"+a+"/"+e.attributes.src.value.slice(8,9)+".jpg",l.className="large",document.querySelector(".large")?(n.removeChild(document.querySelector(".large")),t.style.filter="blur(0px)",document.body.style.overflow="auto"):(n.insertBefore(l,t),l.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"}),t.style.filter="blur(10px)",setTimeout((function(){document.body.style.overflow="hidden"}),1e3));let i=parseInt(e.attributes.src.value.slice(12,-4));l.onclick=function(){i<o?i++:i=1,l.src="img"+a+"/"+i+".jpg",n.replaceChild(l,l)}}))}))})),f.forEach(((e,t)=>{Array.prototype.slice.call(e.children).forEach((e=>{e.addEventListener("click",(function(){let t=e.firstChild.id.slice(9),n=document.getElementById("audio_"+t);1==n.paused?n.play():n.pause();let l=document.createElement("div");l.className="barT",e.firstChild.parentNode.childNodes.length>2||e.firstChild.parentNode.appendChild(l),requestAnimationFrame((function n(){let a,o=document.getElementById("audio_"+t);a=o.currentTime*e.firstChild.width/o.duration,l.style.left=a-l.clientWidth/2+"px",a<e.firstChild.width&&requestAnimationFrame(n)}))}))}))})),document.querySelectorAll(".codeBTN").forEach((e=>{e.addEventListener("click",(function(){fetch(`code/${e.value}.txt`).then((e=>e.text())).then((t=>{e.parentNode.nextElementSibling.value=t}));let t=document.getElementsByClassName("active");t[0].className=t[0].className.replace(" active",""),this.className+=" active"}))}));const L=document.querySelectorAll(".drawing g"),B=document.querySelectorAll(".tooltiptext");L.forEach((t=>{t.addEventListener("mouseenter",(function(n){let l=Array.prototype.slice.call(t.children);B.forEach((e=>{e.innerHTML=t.firstElementChild.textContent})),e({targets:l,easing:"easeOutInBounce",duration:200,zIndex:4,strokeWidth:1.1,stroke:"#9400ff",scale:1.1})})),t.addEventListener("mouseleave",(function(){let n=Array.prototype.slice.call(t.children);e({targets:n,easing:"easeOutInBounce",duration:200,strokeWidth:1,stroke:"#f9f9f9",scale:1})}))})),w(e({targets:y,strokeDashoffset:[e.setDashoffset,0],easing:"easeInOutSine",duration:150,delay:function(e,t){return 25*t},direction:"alternate",loop:!1,autoplay:!1}).play,"#main-container");const O=fetch("proto2.json").then((e=>e.text())).then((e=>JSON.parse(e)));O.then((e=>e.forEach((e=>{T.push(e.CNT)}))));const T=[],W={proto2:{light:{data:[],title:"Lum",min:2e3,max:4096},pressure:{data:[],title:"pres",min:1029,max:1038},temperature:{data:[],title:"temp",min:0,max:20}},proto3:{}},H=document.querySelector("select");var M=document.getElementById("chart").getContext("2d"),z=null;H.onchange=function(e){let n=W[H.name][e.target.value];W[H.name][e.target.value].data=[],O.then((t=>t.forEach((t=>{W[H.name][e.target.value].data.push(parseFloat(t[e.target.value]))})))),z&&z.destroy(),async function(e){await O,z=new t(M,{type:"radar",data:{labels:T,datasets:[{label:"light",data:e.data}]},options:{elements:{point:{pointBackgroundColor:"rgba(148, 0, 255, 0.5)",pointBorderWidth:0,pointRadius:0,pointHoverRadius:4},line:{borderColor:"rgba(148, 0, 255, 1)",borderWidth:1,fill:!1}},scales:{r:{angleLines:{display:!1},pointLabels:{display:!1},min:e.min,max:e.max}},plugins:{datalabels:{display:!1},title:{display:!0,text:e.title},legend:{display:!1}},animations:{}}})}(n)};
