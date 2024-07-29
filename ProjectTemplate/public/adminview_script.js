document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/grievances')
        .then(response => response.json())
        .then(grievances => {
            const grievancesList = document.getElementById('grievance-list');

            grievances.forEach(grievance => {
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.textContent = grievance.id;
                row.appendChild(idCell);

                const descriptionCell = document.createElement('td');
                descriptionCell.textContent = grievance.description;
                row.appendChild(descriptionCell);

               //Beginning of priority function

                const priorityCell = document.createElement('td');
                const prioritySelect = document.createElement('select');

                const awaitingReviewOption = document.createElement('option');
                awaitingReviewOption.textContent = 'awaiting review';
                awaitingReviewOption.value = 'awaiting review';
                prioritySelect.appendChild(awaitingReviewOption);

                const p1Option = document.createElement('option');
                p1Option.textContent = 'P1';
                p1Option.value = 'P1';
                prioritySelect.appendChild(p1Option);

                const p2Option = document.createElement('option');
                p2Option.textContent = 'P2';
                p2Option.value = 'P2';
                prioritySelect.appendChild(p2Option);

                const p3Option = document.createElement('option');
                p3Option.textContent = 'P3';
                p3Option.value = 'P3';
                prioritySelect.appendChild(p3Option);

                const p4Option = document.createElement('option');
                p4Option.textContent = 'P4';
                p4Option.value = 'P4';
                prioritySelect.appendChild(p4Option);

                prioritySelect.value = grievance.priority;

                prioritySelect.addEventListener('change', () => {
                    grievance.priority = prioritySelect.value;
                    console.log(`Grievance ID ${grievance.id} priority updated to ${grievance.priority}`);

                    // Send the updated priority to the backend
                    
                    fetch(`/api/grievances/${grievance.id}`, {
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
                
                //End of priority function


                const statusCell = document.createElement('td');
                const statusSelect = document.createElement('select');
                
                const inProgressOption = document.createElement('option');
                inProgressOption.textContent = 'In Progress';
                inProgressOption.value = 'In Progress';
                const resolvedOption = document.createElement('option');
                resolvedOption.textContent = 'Resolved';
                resolvedOption.value = 'Resolved';

                statusSelect.appendChild(inProgressOption);
                statusSelect.appendChild(resolvedOption);
                statusSelect.value = grievance.status;

                statusSelect.addEventListener('change', () => {
                    grievance.status = statusSelect.value;
                    console.log(`Grievance ID ${grievance.id} status updated to ${grievance.status}`);
                    // Send the updated status to the backend
                    fetch(`/api/grievances/${grievance.id}`, {
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
        })
        .catch(error => {
            console.error('Error fetching grievances:', error);
        });
});
