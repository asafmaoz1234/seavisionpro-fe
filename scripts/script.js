document.addEventListener('DOMContentLoaded', function () {
    // Get references to HTML elements
    const resultsTable = document.getElementById('results-table');
    const registrationForm = document.getElementById('registration-form');
    const resultsPlaceholder = document.getElementById('results-placeholder');


    // Object to store cached data for each coastal area
    const cachedData = {};

    // Function to fetch data from the server or use cached data
    function fetchData(coastalArea) {
        if (cachedData[coastalArea]) {
            return Promise.resolve(cachedData[coastalArea]);
        } else {
            // Replace with your server API URL
            return fetch(`https://jsonplaceholder.typicode.com/posts?coastalArea=${coastalArea}`)
                .then(response => response.json())
                .then(data => {
                    cachedData[coastalArea] = data; // Cache the data
                    return data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }

    // Function to populate the results table
    function populateTable(data) {
        resultsTable.innerHTML = ''; // Clear previous data
        // Create and insert the header row
        const headerRow = resultsTable.createTHead().insertRow(0);

        // Insert header cells and set their titles
        const headerUserId = headerRow.insertCell(0);
        headerUserId.textContent = 'User ID';

        const headerWaveHeight = headerRow.insertCell(1);
        headerWaveHeight.textContent = 'Wave Height';

        const headerWeather = headerRow.insertCell(2);
        headerWeather.textContent = 'Weather';

        const tableBody = resultsTable.appendChild(document.createElement('tbody'));

        // Create table rows with data, limiting to the first 10 entries
        for (let i = 0; i < Math.min(10, data.length); i++) {
            const entry = data[i];
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = entry.userId;
            row.insertCell(1).textContent = `Wave Height: ${entry.id} meters`;
            row.insertCell(2).textContent = `Weather: ${entry.title}`;
            if (entry.id < 5) {
                row.classList.add('entry-smaller');
            } else {
                row.classList.add('entry-larger');
            }
        }
    }
// Assuming your buttons have a class "location-button"
    const locationButtons = document.querySelectorAll('.location-button');

    locationButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedArea = this.value;
            fetchData(selectedArea)
                .then(data => {
                    populateTable(data);
                    resultsTable.style.display = 'table'; // Display the table
                    resultsPlaceholder.style.display = 'none'; // Hide the placeholder
                });
        });
    });

    // Event listener for form submission
    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        // Collect form data
        const selectedService = document.getElementById('coastal-area').value;
        const userEmail = document.getElementById('email').value;
        const interval = document.getElementById('notify-interval').value;

        // Send data to the server (replace with your server logic)
        const formData = {
            service: selectedService,
            email: userEmail,
            interval: interval,
            // Add other form data fields as needed
        };

        // Replace with your server API URL for registration
        fetch('https://example.com/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    // Registration successful, handle success scenario
                    alert('Registration successful!');
                    // Clear the form fields if needed
                    registrationForm.reset();
                } else {
                    // Registration failed, handle error scenario
                    alert('Registration failed. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error registering user:', error);
                alert('An error occurred. Please try again later.');
            });
    });
});
