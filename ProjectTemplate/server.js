const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'userHome.html'));
});

// Handle the POST request to submit complaints
app.post('/submitComplaint', (req, res) => {
    const newComplaint = req.body;

    fs.readFile('grievance.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }

        const complaints = JSON.parse(data);
        complaints.push(newComplaint);

        fs.writeFile('grievance.json', JSON.stringify(complaints, null, 2), err => {
            if (err) {
                return res.status(500).send('Error writing file');
            }

            res.json({ status: 'success' });
        });
    });
});

// Handle GET request for complaints
app.get('/complaints', (req, res) => {
    fs.readFile('grievance.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        res.json(JSON.parse(data));
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});