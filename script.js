// Cybersecurity 3D Animation using THREE.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('cyberCanvas'), alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc, wireframe: true });
const cyberShape = new THREE.Mesh(geometry, material);
scene.add(cyberShape);

// Adding moving light
const movingLight = new THREE.PointLight(0xff00ff, 1, 100);
scene.add(movingLight);

// Position of the light (this is updated in animate function)
const lightPositionX = 10;
const lightPositionY = 10;

// Adding light movement and camera animation
function animate() {
    requestAnimationFrame(animate);
    cyberShape.rotation.x += 0.01;
    cyberShape.rotation.y += 0.01;

    // Move the light in a sine wave pattern
    movingLight.position.set(
        Math.sin(Date.now() * 0.001) * 20, 
        Math.cos(Date.now() * 0.001) * 20, 
        10
    );

    renderer.render(scene, camera);
}

animate();

// Responsive Canvas
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Interactive Mouse Effect for camera movement
document.addEventListener("mousemove", (event) => {
    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    camera.position.x = x * 20; // Move the camera horizontally based on mouse
    camera.position.y = y * 20; // Move the camera vertically based on mouse
    camera.lookAt(scene.position); // Ensure camera looks at the center of the scene
});
