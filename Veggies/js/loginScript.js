// Check if UUID exists in localStorage
function checkUUIDAndProceed() {
    const uuid = localStorage.getItem("uuid");

    if (uuid) {
        // console.log("UUID found:", uuid);
        // deleteUUID();
        proceedWithUUID(uuid);
    } else {
        // Show the login modal
        const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
        loginModal.show();
    }
}

function deleteUUID() {
    localStorage.removeItem("uuid");
    console.log("deleted")
}

function login() {
    const contact = document.getElementById("contact").value;
    const password = document.getElementById("password").value;

    if (!contact || !password) {
        alert("Please enter both contact number and password.");
        return;
    }

    // Make a POST request to the login endpoint
    fetch(apiUrlPrefixProd+"/salers/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ contact, password }),
    })
        .then((response) => {
            console.log(response);
            if (response.ok) {
                return response.text(); // Response is now just the UUID string or 'null'
            } else {
                throw new Error("Login failed.");
            }
        })
        .then((uuid) => {
            if (uuid && uuid !== 'null') { // Check if the UUID is valid and not 'null'
                console.log("Login successful. UUID:", uuid);
                localStorage.setItem("uuid", uuid); // Store the UUID in localStorage
                window.location.reload();
                proceedWithUUID(uuid); // Proceed with the UUID
            } else {
                throw new Error("Invalid credentials or UUID not found.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Login failed. Please try again.");
        });
}


// Proceed with requests using UUID
function proceedWithUUID(uuid) {
    // console.log("Proceeding with UUID:", uuid);
}

// Initialize the process
document.addEventListener("DOMContentLoaded", () => {
    
});