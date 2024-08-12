const express = require('express');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { exec } = require('child_process');
const app = express();
const port = 3000;
const cors = require('cors');

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize the Secret Manager client
const client = new SecretManagerServiceClient();

// Function to access the secret from Secret Manager
async function getSecret(secretName) {
  const [version] = await client.accessSecretVersion({
    name: `projects/articulate-rain-321323/secrets/${secretName}/versions/latest`,
  });

  const secretPayload = version.payload.data.toString();
  return JSON.parse(secretPayload);
}

// Use the secret for authentication or other purposes
async function initialize() {
  try {
    const secret = await getSecret('gcloudcliapp-sa-key');

    // Example: Set up environment variable from secret
    process.env.GOOGLE_APPLICATION_CREDENTIALS = secret.GOOGLE_APPLICATION_CREDENTIALS;

    // You can use the secret here as needed, e.g., to authenticate gcloud or other services
    console.log('Secret loaded successfully');

  } catch (error) {
    console.error('Error retrieving secret:', error);
    process.exit(1);
  }
}

// Initialize secrets and start the server
initialize().then(() => {
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

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
