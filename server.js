// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML form at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Define the file path where data will be saved
    const filePath = path.join(__dirname, 'login-data.txt');
    
    // Prepare the data to be written to the file
    const data = `Username: ${username}, Password: ${password}\n`;

    // Write the data to the file
    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error('Failed to write to file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        // Send a response to the client
        res.send('Login information saved successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
