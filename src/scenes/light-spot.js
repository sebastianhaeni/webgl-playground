const THREE = require('three');

let scene = new THREE.Scene();

let plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10, 0),
    new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        color: 0xffffff
    })
);
plane.position.set(0, -.5, 0);
plane.rotation.set(Math.PI / 2, 0, 0);
plane.receiveShadow = true;
scene.add(plane);

let material = new THREE.MeshLambertMaterial({
    color: 0xffffff
});
let geometry = new THREE.BoxBufferGeometry(1, 1, 1);
let mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;
scene.add(mesh);

let light = new THREE.AmbientLight(0x0c0c0c); // soft white light
scene.add(light);

let spotLight = new THREE.SpotLight(0xccffcc, 1, 100, .1);
spotLight.target.position.set(.5, .5, .5);
spotLight.position.set(-5, 5, 0);
spotLight.castShadow = true;
scene.add(spotLight);


spotLight = new THREE.SpotLight(0xccffcc, 1, 100, .1);
spotLight.target.position.set(.5, .5, .5);
spotLight.position.set(5, 0, 15);
spotLight.castShadow = true;
scene.add(spotLight);

module.exports = scene;
