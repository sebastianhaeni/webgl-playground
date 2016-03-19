const THREE = require('three');

let scene = new THREE.Scene();
let texture = new THREE.TextureLoader().load('textures/crate.gif');
let geometry = new THREE.BoxBufferGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ map: texture });

let mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

module.exports = scene;
