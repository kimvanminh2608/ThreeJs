const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors'); // Import CORS middleware
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve the "public" directory as static files (e.g., your frontend assets)
app.use(express.static('public'));

// Serve 3D model files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API to fetch model list
app.get('/api/models', (req, res) => {
  const models = [
      { name: 'Example Model', path: '/models/LittlestTokyo.glb' }
  ];
  res.json(models);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
