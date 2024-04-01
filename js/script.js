import * as THREE from "three";

const canvas = document.querySelector("canvas.webgl");
// Scene
const scene = new THREE.Scene();

// light 
const light = new THREE.AmbientLight( 0xffffff,0.2 ); // soft white light
scene.add( light );

const pointLight = new THREE.PointLight( 0xffffff, 1, 50 );
pointLight.position.set( 5, 0, 1 );
scene.add( pointLight )

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: "red",
});
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.z=1
// mesh.position.x=0.7,
// mesh.position.y=-0.6
mesh.position.set(0.7,-0.6,1)
scene.add(mesh);

// size
const sizes = {
  width: 800,
  height: 600,
};
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position)
scene.add(camera)


// renderer
const renderer = new THREE.WebGL1Renderer({
  canvas: canvas,
});

// time
let time = Date.now()

// animation
const tick = () => {
  	// Time
      const currentTime = Date.now()
      const deltaTime = currentTime - time
      time = currentTime
  
      // Update objects
      mesh.rotation.y += 0.001 * deltaTime
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
