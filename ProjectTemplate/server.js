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

// Helper function to read grievances from the JSON file
const readGrievances = () => {
    try {
        const data = fs.readFileSync('grievance.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return [];
        } else {
            throw err;
        }
    }
};

// Helper function to write grievances to the JSON file
const writeGrievances = (grievances) => {
    fs.writeFileSync('grievance.json', JSON.stringify(grievances, null, 2));
};

// Handle the POST request to submit complaints
app.post('/submitComplaint', (req, res) => {
    const newComplaint = req.body;
    const grievances = readGrievances();
    grievances.push(newComplaint);
    writeGrievances(grievances);
    res.json({ status: 'success' });
});

// Handle GET request for complaints
app.get('/api/grievances', (req, res) => {
    const grievances = readGrievances();
    res.json(grievances);
});

// Handle PUT request to update a complaint by ID
app.put('/api/grievances/:id', (req, res) => {
    const complaintID = req.params.id;
    const updatedData = req.body;
    const grievances = readGrievances();
    const complaintIndex = grievances.findIndex(complaint => complaint.complaintID === complaintID);

    if (complaintIndex === -1) {
        return res.status(404).send('Complaint not found');
    }

    grievances[complaintIndex] = { ...grievances[complaintIndex], ...updatedData };
    writeGrievances(grievances);
    res.json(grievances[complaintIndex]);
});

// Handle DELETE request to delete a complaint by ID
app.delete('/api/grievances/:id', (req, res) => {
    const complaintID = req.params.id;
    let grievances = readGrievances();
    const complaintIndex = grievances.findIndex(complaint => complaint.complaintID === complaintID);

    if (complaintIndex === -1) {
        return res.status(404).send('Complaint not found');
    }

    grievances = grievances.filter(complaint => complaint.complaintID !== complaintID);
    writeGrievances(grievances);
    res.status(204).send();
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});