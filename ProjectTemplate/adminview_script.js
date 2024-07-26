document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/grievances')
        .then(response => response.json())
        .then(grievances => {
            const grievancesList = document.getElementById('grievances-list');

            grievances.forEach(grievance => {
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.textContent = grievance.id;
                row.appendChild(idCell);

                const descriptionCell = document.createElement('td');
                descriptionCell.textContent = grievance.description;
                row.appendChild(descriptionCell);

                const priorityCell = document.createElement('td');
                priorityCell.textContent = `Level ${grievance.priority}`;
                row.appendChild(priorityCell);

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
