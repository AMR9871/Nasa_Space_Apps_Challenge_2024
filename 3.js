const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', onClick);

function onClick(event) {
  // Normalize mouse coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  // Set raycaster from camera and mouse position
  raycaster.setFromCamera(mouse, camera);
  
  // Intersect objects in the scene
  const intersects = raycaster.intersectObjects(scene.children);
  
  // Check if there are any intersections
  if (intersects.length > 0) {
    // Get the first intersected object (the star)
    const star = intersects[0].object;
    
    // Display star information
    displayStarInfo(star);  // Function to show star details
  }
}


