//Grievance List

const grievances = [
    "Faulty Equipment",          //I am thinking P1
    "Friendly Fire",             //P2
    "Service Delay",             //P6
    "Incorrect Check Amount",    //P5
    "Bacta Tank Leaking",        //P3
    "Technical Support Problem"  //P4
];

// Function to populate the dropdown menu
function populateDropdown() {
    const dropdown = document.getElementById('grievanceDropdown');
    
    grievances.forEach(grievance => {
        
        const option = document.createElement('option');
        option.value = grievance;
        option.textContent = grievance;
        
        // Append the option to the dropdown
        dropdown.appendChild(option);
    });s
}


document.addEventListener('DOMContentLoaded', populateDropdown);