import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

///////////////////////Shapes///////////////////////

// const material = new THREE.MeshBasicMaterial({
//   color: 0xff6347,
//   wireframe: true,
// });

const geoTorus = new THREE.TorusGeometry(5, 1, 16, 50);
const matTorus = new THREE.MeshStandardMaterial({ color: 0x00ddcd });
const torus = new THREE.Mesh(geoTorus, matTorus);
torus.position.set(15, 10, 5);

const geoStars = new THREE.SphereGeometry(0.25, 24, 24);
const matStars = new THREE.MeshBasicMaterial({ color: 0x00ddcd });

function addStars() {
  const stars = new THREE.Mesh(geoStars, matStars);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  stars.position.set(x, y, z);
  scene.add(stars);
}
Array(400).fill().forEach(addStars);

const geoCube1 = new THREE.BoxGeometry(1, 2, 3);
const matCube1 = new THREE.MeshBasicMaterial({ color: 0x7500dd });
const cube1 = new THREE.Mesh(geoCube1, matCube1);
cube1.position.set(5, 5, 5);

const geoCone1 = new THREE.ConeGeometry(5, 10, 15);
const matCone1 = new THREE.MeshStandardMaterial({ color: 0x00dd75 });
const cone1 = new THREE.Mesh(geoCone1, matCone1);
cone1.position.set(-10, 5, 5);

scene.add(torus, cube1, cone1);

///////////LIGHT And GRID/////////////

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 9, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(pointLight, ambientLight, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const spaceTexture = new THREE.TextureLoader().load("/resources/bg.svg");
scene.background = spaceTexture;

////////////////Animate///////////////

function torusAnimate() {
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;
}

function cube1Animate() {
  cube1.rotation.x += 0.03;
  cube1.rotation.y += 0.005;
  cube1.rotation.z += 0.001;
}

function animate() {
  requestAnimationFrame(animate);
  torusAnimate();
  cube1Animate();
  renderer.render(scene, camera);
}

animate();
