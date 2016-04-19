const THREE = require('three');

let scene = new THREE.Scene();

let texture = new THREE.TextureLoader().load('textures/crate.gif');
let material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    map: texture
});

let light = new THREE.AmbientLight(0x777777); // soft white light
scene.add(light);

let spotLight = new THREE.SpotLight(0xdddddd, 1, 20, .2);
spotLight.target.position.set(.5, .5, .5);
spotLight.position.set(-5, 5, 5);
spotLight.castShadow = true;
scene.add(spotLight);

spotLight = new THREE.SpotLight(0xffffff, 3, 100, .1);
spotLight.target.position.set(.5, 10.5, .5);
spotLight.position.set(10, 0, 3);
spotLight.castShadow = true;
scene.add(spotLight);

const BLOCK_SIZE = .5;

let geometry = new THREE.BoxBufferGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
let mesh = new THREE.Mesh(geometry, material);
mesh.position.y = .001;
mesh.castShadow = true;

const level = require('./level1.js');
for (let y = 0; y < level.length; y++) {
    for (let x = 0; x < level[y].length; x++) {
        if (level[y][x] === 0) {
            continue;
        }
        for (let i = 0; i < 10; i++) {
            let z = 1 << i;
            if ((z & level[y][x]) !== z) {
                continue;
            }
            mesh = mesh.clone();
            mesh.position.set(x * BLOCK_SIZE, y * BLOCK_SIZE-1, i * BLOCK_SIZE);
            scene.add(mesh);
        }
    }
}

module.exports = scene;
