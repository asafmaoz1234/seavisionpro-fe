
document.getElementById('wf-form-Contact-9-Form').addEventListener('submit', function(event) {
    event.preventDefault();
    handleFormSubmission();
});

function handleFormSubmission() {
    document.getElementById("form-success").style.display = "none";
    document.getElementById("form-duplicate-error").style.display = "none";
    document.getElementById("form-submit-error").style.display = "none";
    document.getElementById("form-errors").style.display = "none";

    const name = document.getElementById('Contact-9-Name').value;
    const email = document.getElementById('Contact-9-Email').value;
    const message = document.getElementById('Contact-9-Message').value;

    if (emailAlreadySubmitted(email)) {
        document.getElementById("form-errors").style.display = "block";
        document.getElementById("form-duplicate-error").style.display = "block";
        return;
    }

    console.log("Form data submitted:", { name, email, message });
    // Prepare the form data as an object
    const formData = {
        message: "**SENDER EMAIL** " + email + " **MESSAGE** " + message,
        messageAttributes: {
            fromProcess: {
                stringValue: "SeaVisionPro.com-ContactUs",
                dataType: "String"
            }
        }
    };

    let data = sendFormData(formData);
    console.log(data);
    if (data === undefined) {
        return;
    }else {
        document.getElementById("form-success").style.display = "block";
    }
}

async function sendFormData(formData) {
    try {
        const response = await fetch('https://b093xw7y8j.execute-api.eu-west-1.amazonaws.com/prod/sendMessage', {
            method: 'POST', // Set the method to POST
            headers: {
                'Content-Type': 'application/json' // Send as JSON
            },
            body: JSON.stringify(formData) // Convert form data to JSON
        });

        // Handle the response
        if (response.ok) {
            return true; // Assuming the response is JSON
            // Optionally show a success message or redirect
        } else {
            // Optionally show an error message
            throw new Error('Failed to submit form');
        }
    } catch (error) {
        // Handle any network or other errors
        document.getElementById("form-errors").style.display = "block";
        document.getElementById("form-submit-error").style.display = "block";
    }

}

// Function to add an email to sessionStorage
function emailAlreadySubmitted(email) {
    // Get the current emails stored in sessionStorage
    let storedEmails = sessionStorage.getItem('submitted_emails');

    // If there are no emails stored, initialize an empty array
    if (storedEmails === null) {
        storedEmails = [];
    } else {
        // Parse the stored string into an array
        storedEmails = JSON.parse(storedEmails);
    }

    // Check if the email is already in the array
    if (!storedEmails.includes(email)) {
        // If email is not found, add it to the array
        storedEmails.push(email);

        // Store the updated array back in sessionStorage (as a string)
        sessionStorage.setItem('submitted_emails', JSON.stringify(storedEmails));

        return false;
    } else {
        return true;
    }
}