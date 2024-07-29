// List of grievances
const grievances = [
    "Faulty Equipment",          // P1
    "Friendly Fire",             // P2
    "Service Delay",             // P6
    "Incorrect Check Amount",    // P5
    "Bacta Tank Leaking",        // P3
    "Technical Support Problem"  // P4
];

// Function to populate the dropdown menu
function populateDropdown() {
    const dropdown = document.getElementById('grievanceDropdown');
    
    grievances.forEach(grievance => {
        const option = document.createElement('option');
        option.value = grievance;
        option.textContent = grievance;
        dropdown.appendChild(option);
    });
}

// Generates a complaint number
function generateComplaintNumber(max) {
    return Math.floor(Math.random() * max);
}

// Handles form submission
async function submitForm() {
    const leaderElement = document.getElementById('leaderSelected');
    const grievanceElement = document.getElementById('grievanceDropdown');
    const offenseElement = document.getElementById('offenseTextDescription');

    if (!leaderElement || !grievanceElement || !offenseElement) {
        console.error('One or more elements are missing.');
        return;
    }

    const complaintData = {
        complaintID: generateComplaintNumber(99999), // Generate complaint number
        text: offenseElement.value,
        priority: grievances.indexOf(grievanceElement.value) + 1, // Match priority
        type: grievances.indexOf(grievanceElement.value) + 1, // Match type
        status: 0,
        assignedAdmin: 'Admin' // Placeholder for assigned admin
    };

    try {
        const response = await fetch('/submitComplaint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(complaintData)
        });

        const result = await response.json();
        document.getElementById('formSubmitted').innerHTML = "Thanks for submitting your complaint. Your complaint number is " + complaintData.complaintID;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('formSubmitted').innerHTML = "There was an error submitting your complaint.";
    }
}

document.addEventListener('DOMContentLoaded', populateDropdown);