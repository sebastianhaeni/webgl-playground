const THREE = require('three');

let scene = new THREE.Scene();
let material = new THREE.MeshLambertMaterial({
    color: 0xffffff
});
let geometry = new THREE.BoxBufferGeometry(1, 1, 1);
let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

let light = new THREE.AmbientLight(0x0c0c0c); // soft white light
scene.add(light);


let pointLight = new THREE.PointLight('#ccffcc', 1, 100);
pointLight.position.set(-2, .5, 0);
scene.add(pointLight);

module.exports = scene;
