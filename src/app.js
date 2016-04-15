const THREE = require('three');
//const OrbitControls = require('three-orbit-controls')(THREE);
const scenes = require('./scenes');
const WasdControls = require('./wasd-controls');

let camera;
let orbitControls;
let wasdControls;
let currentScene;
let renderer;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 2.5;
    camera.position.y = 0;
    camera.position.z = -5;
    camera.rotation.order = 'YXZ';
    
    // create a render and set the size
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x00000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.soft = false;
    document.body.appendChild(renderer.domElement);

    //orbitControls = new OrbitControls(camera, renderer.domElement);
    //orbitControls.autoRotate = true;
    //orbitControls.enableZoom = true;

    wasdControls = new WasdControls(camera);

    window.addEventListener('resize', onWindowResize, false);

    initScenes();
}

function initScenes() {
    let sceneChooser = document.getElementById('scene-chooser');
    for (let scene in scenes) {
        let option = document.createElement('option');
        option.value = scene;
        option.innerText = scene;
        option.selected = document.location.hash === '#' + scene;
        sceneChooser.appendChild(option);
    }

    currentScene = scenes[document.getElementById('scene-chooser').value];

    sceneChooser.onchange = () => {
        let scene = document.getElementById('scene-chooser').value;
        currentScene = scenes[scene];
        document.location.hash = scene;
    };
}

function render() {
    renderer.render(currentScene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // required if controls.enableDamping = true,
    // or if controls.autoRotate = true
    switch (document.getElementById('move-chooser').value) {
        case 'orbit':
            orbitControls.update();
            break;
        case 'wasd':
            wasdControls.update();
            break;
    }

    render();
}
