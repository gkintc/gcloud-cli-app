const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const { exec } = require('child_process');
const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors({
    origin: '*', // Allow requests from all origin
    methods: ['GET', 'POST'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  }));

app.use(express.json());

app.post('/execute-command', (req, res) => {
  const command = req.body.command;

  if (!command) {
    return res.status(400).json({ error: 'Command is required' });
  }

  // Simple validation (whitelist approach could be better)
  const allowedCommands = [
    'gcloud compute instances list',
    'gcloud projects list',
    // Add more allowed commands here
  ];

  if (!allowedCommands.includes(command)) {
    return res.status(400).json({ error: 'Command is not allowed' });
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Command execution error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (stderr) {
      console.error('Command stderr:', stderr);
      return res.status(500).json({ error: stderr });
    }
    res.json({ result: stdout });
  });
});

app.post('/run-script-orphaned-disk', (req, res) => {
  const scriptPath = path.join(__dirname, 'orphan-disk.sh'); // Path to your script

  exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
          return res.status(500).json({ error: error.message });
      }
      if (stderr) {
          return res.status(500).json({ error: stderr });
      }
      res.json({ result: stdout });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
