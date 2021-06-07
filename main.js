import './style.sass';
import anime from 'animejs/lib/anime.es.js';
import Chart from 'chart.js/dist/chart.min.js';

import * as THREE from 'three';

import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

console.log('Hello World');

let pic = document.querySelectorAll('.imgGrid');
let audio = document.querySelector('.trace');
let audio_trace = Array.prototype.slice.call( audio.children );
var path = document.querySelectorAll('#main-container > path');
var spinText = document.querySelectorAll('collapsible');

if (navigator.appVersion.indexOf("Chrome/") != -1) {
  spinText.forEach((item, i) => {
    console.log(item);
  });

}

// NOTE: typeWriter text when element get into screen
getInScreen(typeWriter, "#test1", 'PROTOTYPE VERSION_N°1', "#test1")

let i = 0;
let speed = 100;

function typeWriter(txt, target) {
  if (i < txt.length) {
    document.querySelector(target).innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed, txt, target);
  }
}

function getInScreen(func, target, ...args) {
  var observer = new IntersectionObserver(function(entries) {
  	if(entries[0].isIntersecting === true){
      console.log('Element is fully visible in screen');
      func(...args);
    };
  }, { threshold: [0.5] });

  return observer.observe(document.querySelector(target));

}

let coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
      content.style.padding = 0;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.padding = '1em';
    }
  });
}

// NOTE: display 3d model

let camera, scene, renderer;

const container = document.querySelector('.view');
const showBtn = document.querySelector('.show');
let model = null;

function init(container, model) {

  console.log(model);
	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	// renderer.setPixelRatio( window.devicePixelRatio );
	// renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
  renderer.setSize( window.innerWidth, window.innerWidth );
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
	renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setClearColor( 0x000000, 0 );
	container.appendChild( renderer.domElement );

	// camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
  camera = new THREE.PerspectiveCamera( 50, 1, 1, 2000 );
	camera.position.set( 0, 100, 0 );

	const environment = new RoomEnvironment();
	const pmremGenerator = new THREE.PMREMGenerator( renderer );

	scene = new THREE.Scene();
	// scene.background = new THREE.Color( 0xbbbbbb );
	scene.environment = pmremGenerator.fromScene( environment ).texture;

	// const grid = new THREE.GridHelper( 500, 10, 0x000000, 0x000000 );
	// grid.material.opacity = 0.5;
	// grid.material.depthWrite = false;
	// grid.material.transparent = true;
	// scene.add( grid );

  scene.add( new THREE.HemisphereLight( 0xffffff, 0x3c3c3c ) );


  const loader = new STLLoader();
  loader.load( './assets/stl/'+model, function ( geometry ) {

    const material = new THREE.MeshStandardMaterial( { color: 0x2b2b2b, roughness: 0.8, metalness: 0, } );
    const mesh = new THREE.Mesh( geometry, material );

    mesh.position.set( 0, 120, 0.6 );
    mesh.rotation.set( Math.PI / 2, 0, 0 );
    mesh.scale.set( 2, 2, 2 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add( mesh );
    render();

  } );



	const controls = new OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render ); // use if there is no animation loop
	controls.minDistance = 400;
	controls.maxDistance = 1000;
	controls.target.set( 10, 90, - 16 );
	controls.update();

	window.addEventListener( 'resize', onWindowResize, false );

}
function onWindowResize() {

	// camera.aspect = window.innerWidth / window.innerHeight;
  camera.aspect = 1;
	camera.updateProjectionMatrix();

	// renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setSize( window.innerWidth, window.innerWidth );

	render();

}
function render() {

	renderer.render( scene, camera );

}

showBtn.onclick = function (event) {
// TODO: cleaning btn close
  let close3d = document.createElement('div');
  close3d.className = "close3d";
  close3d.onclick = function () {
    this.style.opacity = '0.25';
    model = null;
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
  // NOTE: if model exist delete child of div view else create 3d scene
  if (model) {
    this.style.opacity = '0.25';
    model = null;
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  } else {
    container.scrollIntoView({behavior: "smooth", block: "nearest", inline: "center"});
    this.style.opacity = '1';
    model = this.id + '.stl';
    init(container, model);
    render();
    container.appendChild(close3d);

  }
}

pic.forEach(item => {
  item.childNodes.forEach(element => {
    element.addEventListener('click', function() {
      let section = element.parentNode;
      let assemblage = section.parentNode;
      let img = document.createElement('img');
      let gridN = section.className.slice(8);
      let imgCount = section.childElementCount;
      console.log(gridN);
      img.src = 'assets/img'+gridN+'/'+element.attributes.src.value.slice(12);
      console.log(img.src);
      img.className = 'large';
      console.log(section);
      console.log(assemblage);
      // NOTE: on clik on small img if do not exist do else do
      if (!document.querySelector('.large')) {
        assemblage.insertBefore(img, section);
        section.style.filter = 'blur(10px)';
        document.body.style.overflow = 'hidden';
        // document.querySelector('.imgGrid').style.width = '75%';
        img.scrollIntoView({behavior: "smooth", block: "start", inline: "center"});

      } else {
        assemblage.removeChild(document.querySelector('.large'));
        section.style.filter = 'blur(0px)';
        document.body.style.overflow = 'auto';

      }
      let i = parseInt(element.attributes.src.value.slice(12, -4));
      // NOTE: on click on large image
      img.onclick = function (){
        i<imgCount ? i++ : i=1;
        img.src = 'assets/img'+gridN+'/'+i+'.jpg';
        assemblage.replaceChild(img, img);
        console.log(i);
      };
    })
  });
});

audio_trace.forEach(element => {
  element.addEventListener('click', function() {
    let n = element.firstChild.attributes.src.value.slice(23, -4);
    let sound = document.getElementById('audio_'+n);
    if (sound.paused == true) {
      sound.play();
    } else {
      sound.pause();
    }

    let d = document.createElement('div');
    d.className = 'barT';
    console.log(element.firstChild);
    if (element.firstChild.parentNode.childNodes.length > 2) {} else {
      element.firstChild.parentNode.appendChild(d);
    }

    function step() {
      let progress;
      let sound = document.getElementById('audio_'+n);
      progress = ((sound.currentTime)*element.firstChild.width)/sound.duration;
      d.style.left = progress -(d.clientWidth/2) + "px";
      if (progress < element.firstChild.width) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);

  });
});

var animation = anime({
  targets: path,
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 150,
  delay: function(el, i) { return i * 25 },
  direction: 'alternate',
  loop: false,
  autoplay: false
});

getInScreen(animation.play, "#main-container")

const tableau = fetch('assets/csvjson.json')
   .then(tableau => tableau.text())
   .then(v => JSON.parse(v))
   .catch(err => console.log(err))

tableau.then(v => console.log(v[0]))
tableau.then(v => v.forEach(element => {
    ytemp.push(parseFloat(element.TEMP))
    ylight.push(element.resitance)
    xcount.push(element.CNT)
}));

/////////

const ytemp = [];
const ylight = [];
const xcount = [];

var ctx = document.getElementById('chart').getContext('2d');
var ctx1 = document.getElementById('chart1').getContext('2d');

chartIt();

async function chartIt() {
  await tableau;
  console.log(ylight);
  var myChart = new Chart(ctx, {
      type: 'radar',
      data: {
          labels: xcount,
          datasets: [{
              label: 'light',
              data: ylight,
              // backgroundColor: ['rgba(255, 99, 132, 0.2)'],
              // borderColor: ['rgba(255, 99, 132, 1)'],
              // borderWidth: 1
          }]
      },
      options: {
        elements:{
          point:{
            pointBackgroundColor: 'rgba(148, 0, 255, 0.5)',
            pointBorderWidth: 0,
            pointRadius: 0,
            pointHoverRadius: 4,
          },
          line:{
            borderColor: 'rgba(148, 0, 255, 1)',
            borderWidth: 1,
            fill: false
          },
        },
        scales: {
          r: {
            angleLines: {
              display: false
            },
            pointLabels: {
              display: false
            },
            min: 2000,
            max: 4096
          },
        },
        plugins: {
          datalabels: {
            display: false
          },
          legend: {
              display: false,
              title: {
                display: false
              }
          },
        },
        animations: {

        },
      },
  });
  var myChart = new Chart(ctx1, {
      type: 'radar',
      data: {
          labels: xcount,
          datasets: [{
              label: 'temperature',
              data: ytemp,
              // backgroundColor: ['rgba(255, 99, 132, 0.2)'],
              // borderColor: ['rgba(255, 99, 132, 1)'],
              // borderWidth: 1
          }]
      },
      options: {
        elements:{
          point:{
            pointBackgroundColor: 'rgba(148, 0, 255, 0.5)',
            pointBorderWidth: 0,
            pointRadius: 0,
            pointHoverRadius: 4,
          },
          line:{
            borderColor: 'rgba(148, 0, 255, 1)',
            borderWidth: 1,
            fill: false,
            cubicInterpolationMode: 'default'
          },
        },
        scales: {
          r: {
            angleLines: {
              display: false
            },
            pointLabels: {
              display: false
            },
            min: 0,
            max: 20
          },
        },
        plugins: {
          datalabels: {
            display: false
          },
          legend: {
              display: false,
              title: {
                display: false
              }
          },
        },
        animations: {

        },
      },
  });

}
