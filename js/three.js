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

// scenes
const scene=new THREE.Scene()

// objects 
const geometry=new THREE.BoxGeometry()
const boxMeterial=new THREE.MeshBasicMaterial({color:0x00FF00})
const box=new THREE.Mesh(geometry,boxMeterial)
scene.add(box)


// plan 
const planGeometry = new THREE.PlaneGeometry( 10, 10 );
const material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( planGeometry, material );
scene.add( plane );
plane.rotation.x=-0.5 * Math.PI

// SphereGeometry

const shaperGeometry = new THREE.SphereGeometry(1,50,30); 
const shaperMaterial = new THREE.MeshStandardMaterial( { color: 0x0000ff,wireframe:false } ); 
const sphere = new THREE.Mesh( shaperGeometry, shaperMaterial ); 
scene.add( sphere );
sphere.position.set(-3,3,0)

// camera 
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.01,1000)
scene.add(camera)
camera.position.set(-10,2,5)

// light 

const ambientLight=new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

const directionalLight=new  THREE.DirectionalLight(0xFFFFFF,0.8)
scene.add(directionalLight)
directionalLight.position.y=4
// light helper
const lightHelper=new THREE.DirectionalLightHelper(directionalLight,2)
scene.add(lightHelper)

// ax helper
const axHelper=new THREE.AxesHelper(5)
scene.add(axHelper)

// grid helper
const gridHelper=new THREE.GridHelper(10 ,20)
// scene.add(gridHelper)

let step=0;
let speed=0.01

// animation 
function animation(time) {
  
    box.rotation.x = time/10000
    box.rotation.y = time/10000
    step+=options.speed
    sphere.position.y = 3 * Math.abs(Math.sin(step))

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
