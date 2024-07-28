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
    });
}

//generates complaint number
function generateComplaintNumber(max) {
    
    return Math.floor(Math.random()*max)
}

//stores user input and gives them a complaint number
function submitForm() {
   let leaderSelected = document.getElementById("leaderSelected").value;
   let grievanceType = document.getElementById("grievanceDropdown").value;
   let offenseText = document.getElementById("offenseTextDescription").value;
   let  complaintNumber = generateComplaintNumber(99999);

  


    if (leaderSelected == "" || grievanceType == "" || offenseText=="") {
        document.getElementById("formSubmitted").innerHTML = "Please input the missing values";
  
      }
    else {
        document.getElementById('formSubmitted').innerHTML = "Thanks for submitting your complaint. Your complaint number is "+ complaintNumber;
        console.log('Return true');
      }

    
    
}


 //attempts to append to formSubmitted ID after submitting form and giving the customer a complaintID
   

/*function formSubmission(leaderSelected, greivanceType, offenseText) {
    let complaintNumber = generateComplaintNumber(99999);
    //this will be used to add data to the json file

    //takes you to new page once complaint is submitted
    window.location.href = 'complaintSubmitted.html';
    
       // document.getElementById("formSubmitted").innerHTML = "Thank you for submitting your grievance your complaint ID is: " + complaintNumber;
    }
  */



document.addEventListener('DOMContentLoaded', populateDropdown);