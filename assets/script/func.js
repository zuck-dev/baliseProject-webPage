import * as THREE from 'three';

import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

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

let camera, scene, renderer;

const container = document.querySelector('.view');
const showBtn = document.querySelector('.show');
let model = null;

function init(container, model) {

  console.log(model);
	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	// renderer.setPixelRatio( window.devicePixelRatio );
	// renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
  renderer.setSize( window.innerWidth/2, window.innerWidth/2 );
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
  renderer.setSize( window.innerWidth/2, window.innerWidth/2 );

	render();

}
function render() {

	renderer.render( scene, camera );

}
