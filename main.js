// main.js

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);

// Create a renderer and add it to the DOM
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create stars as points
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

// Generate random star positions in 3D space
const starVertices = [];
for (let i = 0; i < 6000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (Math.random() - 0.5) * 2000;
  starVertices.push(x, y, z);
}

// Add vertices to star geometry
starGeometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(starVertices, 3)
);

// Create a star field using Points and add it to the scene
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Set camera position
camera.position.z = 1000;

// Animation loop to rotate the stars
const animate = function () {
  requestAnimationFrame(animate);

  stars.rotation.x += 0.0005;
  stars.rotation.y += 0.001;

  renderer.render(scene, camera);
};

// Start animation
animate();

// Handle window resizing
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});