const THREE = require('three');

let scene = new THREE.Scene();

let vertices = [];
vertices.push(new THREE.Vector3(0.0, 0.0, 0.0));
vertices.push(new THREE.Vector3(1.0, 0.0, 0.0));
vertices.push(new THREE.Vector3(1.0, 1.0, 0.0));
vertices.push(new THREE.Vector3(0.0, 1.0, 0.0));
vertices.push(new THREE.Vector3(0.5, 0.5, 1.0));

let faces = [];
faces.push(new THREE.Face3(0, 3, 2));
faces.push(new THREE.Face3(2, 1, 0));
faces.push(new THREE.Face3(0, 1, 4));
faces.push(new THREE.Face3(1, 2, 4));
faces.push(new THREE.Face3(2, 3, 4));
faces.push(new THREE.Face3(3, 0, 4));

let pyramideGeometry = new THREE.Geometry();
pyramideGeometry.vertices = vertices;
pyramideGeometry.faces = faces;

let pyramideMaterial = new THREE.MeshBasicMaterial({wireframe: true, color: 0xffffff});

let pyramide = new THREE.Mesh(pyramideGeometry, pyramideMaterial);

scene.add(pyramide);

let axes = new THREE.AxisHelper(1.5);
scene.add(axes);

module.exports = scene;
