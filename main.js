import * as THREE from 'three';

const sensitivity = 0.006
const cameraSpeed = 0.05
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const floor = new THREE.Mesh(new THREE.BoxGeometry(10,1,10),new THREE.MeshNormalMaterial)
floor.position.y = -1
scene.add(floor);

camera.position.z = 5;

let keys = new Set();
window.addEventListener('keydown', function(e) { keys.add(e.key) });
window.addEventListener('keyup', function(e) { keys.delete(e.key) });

let lastClientX = 0
let lastClientY = 0
function handleMouseMotion(event) {
    const clientDifferenceX = lastClientX-event.clientX;
    const clientDifferenceY = lastClientY-event.clientY;
    camera.rotation.y +=clientDifferenceX*sensitivity;
    // camera.rotation.x +=clientDifferenceY*sensitivity;
    // console.log(camera.rotation.x)
    if (camera.rotation.x > 1.5) {
        camera.rotation.x = 1.5;
    }
    if (camera.rotation.x < -1.5) {
        camera.rotation.x = -1.5;
    }
    lastClientX = event.clientX;
    lastClientY = event.clientY;
}

window.addEventListener("mousemove",handleMouseMotion)

function getMovement() {
    if (keys.has("w")) {
        camera.position.x -= Math.sin(camera.rotation.y)*cameraSpeed;
        camera.position.z -= Math.cos(camera.rotation.y)*cameraSpeed;
    }
    if (keys.has("s")) {
        camera.position.x += Math.sin(camera.rotation.y)*cameraSpeed;
        camera.position.z += Math.cos(camera.rotation.y)*cameraSpeed;
    }
    if (keys.has("a")) {
        camera.position.x -= Math.cos(camera.rotation.y)*cameraSpeed;
        camera.position.z += Math.sin(camera.rotation.y)*cameraSpeed;
    }
    if (keys.has("d")) {
        camera.position.x += Math.cos(camera.rotation.y)*cameraSpeed;
        camera.position.z -= Math.sin(camera.rotation.y)*cameraSpeed;
    }
}

function createChunkMesh(chunkData) {
    chunkData.map((a,z) =>(
        a.map((b,y)=>(
            b.map((c,x)=>{
                if (c) {
                    console.log(x,y,z)
                    let block = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshNormalMaterial);
                    block.position.x = x;
                    block.position.y = y;
                    block.position.z = z;
                    scene.add(block);
                }
            })
        ))
    ))
}

const chunkData = [
    [
        [false,true,false,true,true,false,false,true],
        [false,true,false,true,true,true,false,true],
        [true,true,false,false,false,true,false,true],
        [true,true,false,true,true,false,false,true],
    ],[
        [false,true,false,false,false,true,false,true],
        [false,true,false,true,true,false,false,true],
        [true,true,false,false,false,true,false,true],
        [true,true,false,true,true,false,false,true],
    ],[
        [false,true,false,false,true,false,false,true],
        [false,true,false,false,false,true,false,true],
        [true,true,false,false,false,true,false,true],
        [true,true,false,true,true,false,false,true],
    ],[
        [false,true,false,true,true,true,false,true],
        [false,true,false,false,true,false,false,true],
        [true,true,false,false,false,true,false,true],
        [true,true,false,true,true,false,false,true],
    ],[
        [false,true,false,true,true,false,false,true],
        [false,true,false,true,true,true,false,true],
        [true,true,false,false,false,true,false,true],
        [true,true,false,true,true,false,false,true],
    ],[
        [true,true,false,false,false,true,false,true],
        [true,true,false,true,true,false,false,true],
        [true,true,false,false,false,true,false,true],
        [true,true,false,true,true,false,false,true],
    ],[
        [false,true,false,false,true,false,false,true],
        [false,true,false,false,false,true,false,true],
        [false,true,false,true,true,true,false,true],
        [false,true,false,false,true,false,false,true],
    ],[
        [false,true,false,true,true,true,false,true],
        [false,true,false,false,true,false,false,true],
        [false,true,false,true,true,true,false,true],
        [false,true,false,false,true,false,false,true],
    ],[
        [false,true,false,true,true,false,false,true],
        [false,true,false,true,true,true,false,true],
        [true,true,false,false,false,true,false,true],
        [true,true,false,true,true,false,false,true],
    ],[
        [false,true,false,false,false,true,false,true],
        [false,true,false,true,true,false,false,true],
        [true,true,false,false,false,true,false,true],
        [true,true,false,true,true,false,false,true],
    ],[
        [false,true,false,true,true,true,false,true],
        [false,true,false,false,true,false,false,true],
        [true,true,false,false,false,true,false,true],
        [true,true,false,true,true,false,false,true],
    ],[
        [false,true,false,true,true,false,false,true],
        [false,true,false,true,true,true,false,true],
        [true,true,false,false,false,true,false,true],
        [true,true,false,true,true,false,false,true],
    ],
]

createChunkMesh(chunkData)

function animate() {
	requestAnimationFrame( animate );

    getMovement()

	renderer.render( scene, camera );
}

animate();