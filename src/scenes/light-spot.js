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

let material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
});
let geometry = new THREE.BoxBufferGeometry(1, 1, 1);
let mesh = new THREE.Mesh(geometry, material);
mesh.position.y = .001;
mesh.castShadow = true;
scene.add(mesh);

let light = new THREE.AmbientLight(0x111111); // soft white light
scene.add(light);

let spotLight = new THREE.SpotLight(0xdddddd, 3, 20, .2);
spotLight.target.position.set(.5, .5, .5);
spotLight.position.set(-5, 5, 5);
spotLight.castShadow = true;
scene.add(spotLight);


spotLight = new THREE.SpotLight(0xffffff, 10, 100, .1);
spotLight.target.position.set(.5, 10.5, .5);
spotLight.position.set(10, 0, 3);
spotLight.castShadow = true;
scene.add(spotLight);

module.exports = scene;
