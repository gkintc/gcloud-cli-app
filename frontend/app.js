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