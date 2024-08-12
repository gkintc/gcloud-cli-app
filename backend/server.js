const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Endpoint to execute gcloud commands
app.post('/execute-command', (req, res) => {
    const command = req.body.command;

    if (!command) {
        return res.status(400).json({ error: 'Command is required' });
    }

    exec(command, (error, stdout, stderr) => {
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

