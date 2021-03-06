import "./style.css";

import * as THREE from "three";

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

///////////////////////Shapes///////////////////////

// const material = new THREE.MeshBasicMaterial({
//   color: 0xff6347,
//   wireframe: true,
// });

const geoTorus = new THREE.TorusGeometry(10, 1, 16, 50);
const matTorus = new THREE.MeshStandardMaterial({ color: 0xdd7500 });
const torus = new THREE.Mesh(geoTorus, matTorus);
torus.position.set(0, 3, -20);

const geoStars = new THREE.SphereGeometry(0.25, 24, 24);
const matStars = new THREE.MeshBasicMaterial({ color: 0x44fff1 });

function addStars() {
  const stars = new THREE.Mesh(geoStars, matStars);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  stars.position.set(x, y, z);
  scene.add(stars);
}
Array(500).fill().forEach(addStars);

const geoCube1 = new THREE.BoxGeometry(5, 2, 3);
const matCube1 = new THREE.MeshBasicMaterial({ color: 0x7500dd });
const cube1 = new THREE.Mesh(geoCube1, matCube1);
cube1.position.set(-1, -10, 10);

const geoCone1 = new THREE.ConeGeometry(1, 5, 20);
const matCone1 = new THREE.MeshStandardMaterial({ color: 0x00dd75 });
const cone1 = new THREE.Mesh(geoCone1, matCone1);
cone1.position.set(10, -10, 5);

scene.add(torus, cube1, cone1);

///////////LIGHT And GRID/////////////

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 9, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);

// const gridHelper = new THREE.GridHelper(200, 50);
scene.add(pointLight, ambientLight);

// const controls = new OrbitControls(camera, renderer.domElement);

// const spaceTexture = new THREE.TextureLoader().load("/resources/bg.svg");
// scene.background = spaceTexture;

////////////////Animate///////////////

function torusAnimate() {
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;
}

function cube1Animate() {
  cube1.rotation.y += 0.003;
}

function cone1Animate() {
  cone1.rotation.x += 0.01;
}

function animate() {
  requestAnimationFrame(animate);
  torusAnimate();
  cube1Animate();
  cone1Animate();
  renderer.render(scene, camera);
}
animate();

// function moveCamera() {
//   const t = doncument.body.getBoundingClientRect().top;
//   cube1.rotation.y += 0.5;
//   cube1.rotation.z += 0.1;
//   cone1.rotation.x += 0.07;
//   cone1.rotation.y += 0.07;

//   camera.position.z = t * -0.1;
// }

// document.body.onscroll = moveCamera;

window.addEventListener("scroll", updateCamera);

camera.position.setZ(30);
camera.position.setY(-10);
camera.position.setX(5);
function updateCamera() {
  const t = window.scrollY;
  cube1.rotation.x += 0.08;
  cone1.rotation.x += 0.08;
  camera.position.setZ(30 - t * 0.05);
  camera.position.setY(-10 - t * t * -0.000015);
  camera.position.setX(5 - t * t * 0.000019);
}
