document.getElementById('commandForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const command = document.getElementById('commandInput').value;
    try {
        const response = await fetch('http://34.31.180.224:5000/execute-command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ command }),
        });
        const data = await response.json();
        document.getElementById('result').textContent = data.result || data.error;
    } catch (err) {
        document.getElementById('result').textContent = 'Error: ' + err.message;
    }
});

document.getElementById('clearScreenButton').addEventListener('click', () => {
    document.getElementById('result').textContent = '';
});


document.getElementById('running-vm').addEventListener('click', async () => {
    const hardcodedCommand = 'gcloud compute instances list --filter="status:RUNNING" --format="table(name, creationTimestamp)"'; // Replace this with your hardcoded command
    try {
        const response = await fetch('http://localhost:5000/execute-command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ command: hardcodedCommand }),
        });
        const data = await response.json();
        document.getElementById('result').textContent = data.result || data.error;
    } catch (err) {
        document.getElementById('result').textContent = 'Error: ' + err.message;
    }
});