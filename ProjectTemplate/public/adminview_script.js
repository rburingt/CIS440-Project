"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const grievancesList = document.getElementById('grievance-list');
    const statusFilter = document.getElementById('status-filter');
    const priorityFilter = document.getElementById('priority-filter');

    if (!grievancesList) {
        console.error('Grievance list element not found');
        return;
    }

    let grievances = [];

    function fetchData() {
        fetch('/api/grievances')
            .then(response => response.json())
            .then(data => {
                grievances = data;
                updateTable();
            })
            .catch(error => console.error('Error fetching grievances:', error));
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
                    } else {
                        console.log(`Updated priority for complaint ID ${grievance.complaintID}`);
                    }
                }).catch(error => {
                    console.error('Error updating priority:', error);
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
                    } else {
                        console.log(`Updated status for complaint ID ${grievance.complaintID}`);
                        // Update the table to reflect the new status
                        updateTable();
                    }
                }).catch(error => {
                    console.error('Error updating status:', error);
                });
            });

            statusCell.appendChild(statusSelect);
            row.appendChild(statusCell);

            // Conditionally render the delete button
            const deleteCell = document.createElement('td');
            if (grievance.status === 1) { // Only show delete button if status is "Resolved"
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    deleteGrievance(grievance.complaintID);
                });
                deleteCell.appendChild(deleteButton);
            }
            row.appendChild(deleteCell);

            grievancesList.appendChild(row);
        });
    }

    function applyFilters() {
        updateTable();
    }

    statusFilter.addEventListener('change', applyFilters);
    priorityFilter.addEventListener('change', applyFilters);

    function deleteGrievance(complaintID) {
        console.log(`Attempting to delete grievance with ID ${complaintID}`);

        fetch(`/api/grievances/${complaintID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) {
                console.error('Failed to delete complaint');
                return;
            }
            // Remove deleted grievance from the local list and update the table
            grievances = grievances.filter(grievance => grievance.complaintID !== complaintID);
            updateTable();
        }).catch(error => {
            console.error('Error deleting grievance:', error);
        });
    }

    fetchData();
});