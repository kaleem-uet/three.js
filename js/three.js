import * as THREE from "three";
const canvas = document.querySelector("canvas.webgl");
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui'
// renderer
const renderer = new THREE.WebGLRenderer({
    canvas:canvas
}

);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.shadowMap.enabled=true
// scenes
const scene=new THREE.Scene()

// objects 
const geometry=new THREE.BoxGeometry()
const boxMeterial=new THREE.MeshBasicMaterial({color:0x00FF00})
const box=new THREE.Mesh(geometry,boxMeterial)
scene.add(box)


// plan 
const planGeometry = new THREE.PlaneGeometry( 30, 30 );
const material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( planGeometry, material );
scene.add( plane );
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow=true

// SphereGeometry

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF,
    wireframe: false});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;

// camera 
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.01,1000)
scene.add(camera)
camera.position.set(-10, 30, 30);

// light 

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight=new  THREE.DirectionalLight(0xFFFFFF,0.8)
scene.add(directionalLight)
directionalLight.position.set(-30,50,0)
directionalLight.castShadow=true

directionalLight.shadow.camera.bottom=-12

const helper = new THREE.CameraHelper( directionalLight.shadow.camera);
 scene.add( helper );


// light helper
const lightHelper=new THREE.DirectionalLightHelper(directionalLight,1)
scene.add(lightHelper)

// ax helper
const axHelper=new THREE.AxesHelper(5)
scene.add(axHelper)

// grid helper
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// scene.add(gridHelper)

let step=0;
let speed=0.01

// animation 
function animation(time) {
  
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    renderer.render(scene,camera)
}
renderer.setAnimationLoop(animation)


// dat gui is use to change the color dynamicaly 
const gui=new dat.GUI()
const options={
    shaperColor:'#ffea00',
    wireframe:false,
    speed:0.01
}

gui.addColor(options,'shaperColor').onChange((color)=>{
    sphere.material.color.set(color)
})
gui.add(options,'wireframe').onChange((frame)=>{
    sphere.material.wireframe=frame
})

gui.add(options,'speed',0.01,1)
// control
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();
