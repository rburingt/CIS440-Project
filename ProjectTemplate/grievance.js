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

formValid = false;
//stores user input and gives them a complaint number
function submitForm() {
   let leaderSelected = document.getElementById("leaderSelected").value;
   let grievanceType = document.getElementById("grievanceDropdown").value;
   let offenseText = document.getElementById("offenseTextDescription").value;
   let complaintNumber = generateComplaintNumber(99999);

   let validity = true;

   var form = document.getElementById('userComplaintForm');
    for(var i=0; i < form.elements.length; i++){
      if(form.elements[i].value === '' && form.elements[i].hasAttribute('required')){
        document.getElementById("formSubmitted").innerHTML = "Please input the missing values";
        return false;
      }
    else {
        document.getElementById("formSubmitted").innerHTML = "Thank you for submitting your grievance your complaint ID is: " + complaintNumber;
        return true;
      }
    }
    
    formSubmission(submitForm());
    }
    
    //attempts to append to formSubmitted ID after submitting form and giving the customer a complaintID
   
  

    function formSubmission(validity){
        let complaintNumber = generateComplaintNumber(99999);
       
        if (validity) {
        document.getElementById("formSubmitted").innerHTML = "Thank you for submitting your grievance your complaint ID is: " + complaintNumber;
        }
    }
  





document.addEventListener('DOMContentLoaded', populateDropdown);