"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const grievancesList = document.getElementById('grievance-list');
    const statusFilter = document.getElementById('status-filter');
    const priorityFilter = document.getElementById('priority-filter');
    const complaintID = document.getElementById('complaintID')

    if (!grievancesList) {
        console.error('Grievance list element not found');
        return;
    }

    let grievances = [];

    function fetchData() {
        fetch('/api/grievances')
        //fetch('grievance.json') I edited it in VSCode Live Server so I used this function to test, but changed it back for Node.js
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                grievances = data;
                updateTable();
            })
            .catch(error => {
                console.error('Error fetching grievances:', error);
            });
    }

    function updateTable() {
        grievancesList.innerHTML = '';

        const status = statusFilter.value;
        const priority = priorityFilter.value;

        const filteredGrievances = grievances.filter(grievance => {
            
            const grievanceStatus = grievance.status === 0 ? 'In Progress' : 'Resolved';
            const matchesStatus = status === '' || grievanceStatus === status;
            const matchesPriority = priority === '' || priority === `P${grievance.priority}`;
            return matchesStatus && matchesPriority;
        });

        filteredGrievances.forEach(grievance => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = grievance.complaintID;
            row.appendChild(idCell);

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = grievance.text;
            row.appendChild(descriptionCell);

            // Priority function
            const priorityCell = document.createElement('td');
            const prioritySelect = document.createElement('select');

            const priorities = ['awaiting review', 'P1', 'P2', 'P3', 'P4'];
            priorities.forEach(priority => {
                const option = document.createElement('option');
                option.textContent = priority;
                option.value = priority;
                prioritySelect.appendChild(option);
            });

            prioritySelect.value = `P${grievance.priority}`;

            prioritySelect.addEventListener('change', () => {
                grievance.priority = prioritySelect.value.replace('P', '');
                console.log(`Grievance ID ${grievance.complaintID} priority updated to ${grievance.priority}`);

                fetch(`/api/grievances/${grievance.complaintID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ priority: grievance.priority }),
                }).then(response => {
                    if (!response.ok) {
                        console.error('Failed to update priority');
                    }
                });
            });

            priorityCell.appendChild(prioritySelect);
            row.appendChild(priorityCell);

            // Status function
            const statusCell = document.createElement('td');
            const statusSelect = document.createElement('select');

            const statuses = ['In Progress', 'Resolved'];
            statuses.forEach(status => {
                const option = document.createElement('option');
                option.textContent = status;
                option.value = status;
                statusSelect.appendChild(option);
            });

            statusSelect.value = grievance.status === 0 ? 'In Progress' : 'Resolved';

            statusSelect.addEventListener('change', () => {
                grievance.status = statusSelect.value === 'In Progress' ? 0 : 1;
                console.log(`Grievance ID ${grievance.complaintID} status updated to ${grievance.status}`);

                fetch(`/api/grievances/${grievance.complaintID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: grievance.status }),
                }).then(response => {
                    if (!response.ok) {
                        console.error('Failed to update status');
                    }
                });
            });

            statusCell.appendChild(statusSelect);
            row.appendChild(statusCell);

            grievancesList.appendChild(row);
        });
    }

    function applyFilters() {
        updateTable();
    }

    statusFilter.addEventListener('change', applyFilters);
    priorityFilter.addEventListener('change', applyFilters);

    function deleteGrievance(){
        
        const grievanceID = getElementById("complaintID").value;
       
        fetch(`/api/grievances/${grievance.complaintID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ priority: grievance.complaintID }),
        }).then(response => {
            if (!response.ok) {
                console.error('Failed to delete complaint');
            }
        });
    
    
}

    fetchData();
});