const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);
const scenes = require('./scenes');

let camera;
let orbitControls;
let currentScene;
let renderer;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -10;
    camera.position.y = 10;
    camera.position.z = 10;

    // create a render and set the size
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x00000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.autoRotate = true;
    orbitControls.enableZoom = true;

    window.addEventListener('resize', onWindowResize, false);

    initScenes();
}

function initScenes() {
    let sceneChooser = document.getElementById('scene-chooser');
    for(let scene in scenes) {
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
    orbitControls.update();

    render();
}
