const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// Endpoint to execute gcloud commands
app.post('/execute-command', (req, res) => {
    const command = req.body.command;

    if (!command) {
        return res.status(400).json({ error: 'Command is required' });
    }

    // Simple validation (whitelist approach could be better)
    const allowedCommands = [
        'gcloud compute instances list',
        // Add more allowed commands here
    ];

    if (!allowedCommands.includes(command)) {
        return res.status(400).json({ error: 'Command is not allowed' });
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Command execution error:', error); // Log error for debugging
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (stderr) {
            console.error('Command stderr:', stderr); // Log stderr output
            return res.status(500).json({ error: stderr });
        }
        res.json({ result: stdout });
    });
});

// Start server--
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
