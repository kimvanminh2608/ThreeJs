// Import necessary libraries
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';


let mixer;
let currentModel;
const clock = new THREE.Clock();
const container = document.getElementById( 'container' );

const stats = new Stats();
container.appendChild( stats.dom );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );

const pmremGenerator = new THREE.PMREMGenerator( renderer );

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xbfe3dd );
scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
camera.position.set( 5, 2, 8 );

const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0.5, 0 );
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '../libs/draco/gltf/' );

// Load models from the server
const loader = new GLTFLoader();

loader.setDRACOLoader(dracoLoader );

//Get Data from BE
fetch('http://localhost:3000/api/models')
    .then(response => response.json())
    .then(models => {
        const selector = document.getElementById('modelSelector');
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.path;
            option.textContent = model.name;
            selector.appendChild(option);
        });

        selector.addEventListener('change', () => {
            loadModel(selector.value);
        });

        loadModel(models[0].path); // Load the first model by default
    });

function loadModel(modelPath) {
    if (currentModel) {
        scene.remove(currentModel);
    }

    loader.load(modelPath, function ( gltf ) {

      const model = gltf.scene;
      currentModel = gltf.scene;
      model.position.set( 1, 1, 0 );
      model.scale.set( 0.01, 0.01, 0.01 );
      scene.add(model);
    
      mixer = new THREE.AnimationMixer( model );
      mixer.clipAction( gltf.animations[ 0 ] ).play();
    
      renderer.setAnimationLoop( animate );
    
    }, undefined, function ( e ) {
    
      console.error( e );
    
    } );
}

// Add color picker
const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input', event => {
    if (currentModel) {
        currentModel.traverse(child => {
            if (child.isMesh) {
                child.material.color.set(event.target.value);
            }
        });
    }
});

window.onresize = function () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

};


function animate() {

  const delta = clock.getDelta();

  mixer.update( delta );

  controls.update();

  stats.update();

  renderer.render( scene, camera );

}
