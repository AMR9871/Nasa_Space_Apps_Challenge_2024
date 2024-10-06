// src/components/StarMap.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const StarMap = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add stars to the scene
    const starsGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

    // Generate random star positions
    const starsArray = new Float32Array(6000);
    for (let i = 0; i < starsArray.length; i += 3) {
      starsArray[i] = (Math.random() - 0.5) * 1000;
      starsArray[i + 1] = (Math.random() - 0.5) * 1000;
      starsArray[i + 2] = (Math.random() - 0.5) * 1000;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsArray, 3));
    const starPoints = new THREE.Points(starsGeometry, starMaterial);

    scene.add(starPoints);

    // Camera position
    camera.position.z = 500;

    // Animate scene
    const animate = () => {
      requestAnimationFrame(animate);
      starPoints.rotation.x += 0.001;
      starPoints.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on component unmount
    return () => mountRef.current.removeChild(renderer.domElement);
  }, []);

  return <div ref={mountRef} />;
};

export default StarMap;
// src/App.js
import React from 'react';
import StarMap from './components/StarMap';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Explore the Stars from an Exoplanet</h1>
        <StarMap />
      </header>
    </div>
  );
}

export default App;
// server/app.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection setup
const pool = new Pool({
  user: 'yourUsername',
  host: 'localhost',
  database: 'exoplanetDB',
  password: 'yourPassword',
  port: 5432,
});

// API route to fetch exoplanet data
app.get('/api/exoplanets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM exoplanets');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// API route to fetch stars based on exoplanet perspective
app.get('/api/stars/:exoplanetId', async (req, res) => {
  const { exoplanetId } = req.params;
  // Perform SQL query to get star data transformed for exoplanet perspective
  // For now, return dummy data
  const stars = [
    { id: 1, name: 'Star A', x: 50, y: 70, z: 100, distance: 10 },
    { id: 2, name: 'Star B', x: -20, y: 40, z: 30, distance: 15 },
  ];
  res.json(stars);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
// src/components/ExoplanetList.js
import React, { useState, useEffect } from 'react';

const ExoplanetList = ({ onSelect }) => {
  const [exoplanets, setExoplanets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/exoplanets')
      .then((response) => response.json())
      .then((data) => setExoplanets(data));
  }, []);

  return (
    <div>
      <h2>Select an Exoplanet:</h2>
      <ul>
        {exoplanets.map((planet) => (
          <li key={planet.id} onClick={() => onSelect(planet)}>
            {planet.name} ({planet.distance_from_earth} light years)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExoplanetList;
// src/App.js
import React, { useState } from 'react';
import StarMap from './components/StarMap';
import ExoplanetList from './components/ExoplanetList';

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Explore the Stars from an Exoplanet</h1>
        <ExoplanetList onSelect={setSelectedPlanet} />
        {selectedPlanet && <StarMap exoplanet={selectedPlanet} />}
      </header>
    </div>
  );
}

export default App;