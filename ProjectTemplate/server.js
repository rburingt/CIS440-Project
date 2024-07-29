const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'adminview.html'));
});

// Handle the POST request to submit complaints
app.post('/submitComplaint', (req, res) => {
    const newComplaint = req.body;

    fs.readFile('grievance.json', (err, data) => {
        if (err && err.code === 'ENOENT') {
            const complaints = [newComplaint];
            fs.writeFile('grievance.json', JSON.stringify(complaints, null, 2), err => {
                if (err) {
                    return res.status(500).send('Error writing file');
                }
                return res.json({ status: 'success' });
            });
        } else if (err) {
            return res.status(500).send('Error reading file');
        } else {
            try {
                const complaints = JSON.parse(data);
                complaints.push(newComplaint);
                fs.writeFile('grievance.json', JSON.stringify(complaints, null, 2), err => {
                    if (err) {
                        return res.status(500).send('Error writing file');
                    }
                    res.json({ status: 'success' });
                });
            } catch (parseErr) {
                return res.status(500).send('Error parsing JSON data');
            }
        }
    });
});

// Handle GET request for complaints
app.get('/api/grievances', (req, res) => {
    fs.readFile('grievance.json', (err, data) => {
        if (err && err.code === 'ENOENT') {
            return res.json([]);
        } else if (err) {
            return res.status(500).send('Error reading file');
        } else {
            try {
                const complaints = JSON.parse(data);
                res.json(complaints);
            } catch (parseErr) {
                return res.status(500).send('Error parsing JSON data');
            }
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});