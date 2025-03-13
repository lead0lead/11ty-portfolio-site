import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const cursor_blob = document.getElementById("cursor_blob");
const canvas = document.querySelector('#bg');
const canvasContainer = document.querySelector('.titlecard__image')

document.body.onpointermove = event => {
    const {clientX, clientY} = event;

    cursor_blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, {duration: 3000, fill: "forwards" });
}

if (canvas) {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, canvas.clientWidth / canvas.clientHeight, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
        alpha: true,
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( canvasContainer.clientWidth, canvasContainer.clientHeight );
    camera.position.setZ(30);

    const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 });
    const torus = new THREE.Mesh( geometry, material );

    scene.add(torus)

    const pointLight = new THREE.PointLight(0xffffff, 10000);
    pointLight.position.set(20,20,20);
    scene.add(pointLight)

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    const lightHelper = new THREE.PointLightHelper(pointLight);
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(lightHelper, gridHelper)

    const controls = new OrbitControls(camera, renderer.domElement);

    const reziseObserver = new ResizeObserver(() => {
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
        camera.updateProjectionMatrix();
    })

    reziseObserver.observe(canvasContainer);

    function animate(){

        requestAnimationFrame( animate );
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.005;
        torus.rotation.z += 0.01;

        controls.update();

        renderer.render( scene, camera );
    }

    animate()
}
