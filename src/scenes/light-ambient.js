const THREE = require('three');

let scene = new THREE.Scene();
let material = new THREE.MeshLambertMaterial({color: 0xffffff});
let geometry = new THREE.BoxBufferGeometry(1, 1, 1);

let mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

let light = new THREE.AmbientLight(0xff0000); // soft white light
scene.add(light);


module.exports = scene;
