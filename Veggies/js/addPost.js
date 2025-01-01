function validateImage() {
    const fileInput = document.getElementById('mainImage');
    const file = fileInput.files[0]; // Get the selected file

    if (file) {
        // Check the file type
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validImageTypes.includes(file.type)) {
            alert('Please select a valid image file (JPEG, PNG, GIF)');
            fileInput.value = ''; // Reset the input
            return;
        }

        // Check the file size (optional, example: max 2MB)
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes
        if (file.size > maxSize) {
            alert('File size must be less than 2MB');
            fileInput.value = ''; // Reset the input
            return;
        }

    } else {
        alert('No file selected.');
    }
}
function validateSingleImage() {
    const fileInput = document.getElementById('mainImage');
    const file = fileInput.files[0]; // Get the selected file

    if (file) {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validImageTypes.includes(file.type)) {
            alert('Please select a valid image file (JPEG, PNG, GIF)');
            fileInput.value = ''; // Reset the input
            return;
        }

        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            alert('File size must be less than 2MB');
            fileInput.value = ''; // Reset the input
            return;
        }

    } else {
        alert('No file selected.');
    }
}

function validateMultipleImages() {
    const fileInput = document.getElementById('galleryImages');
    const files = fileInput.files; // Get all selected files

    if (files.length > 0) {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 2 * 1024 * 1024; // 2MB

        for (const file of files) {
            if (!validImageTypes.includes(file.type)) {
                alert(`File "${file.name}" is not a valid image (JPEG, PNG, GIF).`);
                fileInput.value = ''; // Reset the input
                return;
            }

            if (file.size > maxSize) {
                alert(`File "${file.name}" exceeds the size limit of 2MB.`);
                fileInput.value = ''; // Reset the input
                return;
            }
        }

    } else {
        alert('No files selected.');
    }
}
/* -------------------------------------------------------------------------------------- */
async function uploadMainImage() {
    const input = document.getElementById("mainImage");
    const files = input.files;

    if (files.length === 0) {
        alert("Please select at least one file to upload.");
        return;
    }

    try {
        // Prepare FormData to send multiple files
        const formData = new FormData();
        for (const file of files) {
            formData.append("files", file); // "files" matches the @RequestParam in the controller
        }

        // Make the Axios POST request
        const response = await axios.post(apiUrlPrefixProd+"/api/images/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        // Handle successful response
        if (response.status === 200) {
            const urls = response.data; // Assuming the server returns a list of image names

            // Clear the container before appending new inputs
            const galleryBox = document.getElementById("mainImageBox");
            galleryBox.innerHTML = "";

            // Append each image name as a hidden input field
            urls.forEach((url, index) => {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = "mainimages[]"; // Optional: This can be used to group similar inputs
                input.value = url;
                input.id = `mainimage${index + 1}`; // Set unique ID like galleryImage1, galleryImage2, etc.
                galleryBox.appendChild(input); // Append input to the galleryImagesBox
            });

            alert("Images uploaded successfully!");
        }
    } catch (error) {
        console.error("Upload failed:", error);
        alert("Error uploading images. Please try again.");
    }
}

// Attach event listener to the upload button
document.getElementById("mainImageUploadBtn").addEventListener("click", uploadMainImage);
/* ------------------------------------------------------------------------------------- */
async function uploadGalleryImages() {
    const input = document.getElementById("galleryImages");
    const files = input.files;

    if (files.length === 0) {
        alert("Please select at least one file to upload.");
        return;
    }

    try {
        // Prepare FormData to send multiple files
        const formData = new FormData();
        for (const file of files) {
            formData.append("files", file); // "files" matches the @RequestParam in the controller
        }

        // Make the Axios POST request
        const response = await axios.post(apiUrlPrefixProd+"/api/images/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        // Handle successful response
        if (response.status === 200) {
            const urls = response.data; // Assuming the server returns a list of image names

            // Clear the container before appending new inputs
            const galleryBox = document.getElementById("galleryImagesBox");
            galleryBox.innerHTML = "";

            // Append each image name as a hidden input field
            urls.forEach((url, index) => {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = "galleryImages[]"; // Optional: This can be used to group similar inputs
                input.value = url;
                input.id = `galleryImage${index + 1}`; // Set unique ID like galleryImage1, galleryImage2, etc.
                galleryBox.appendChild(input); // Append input to the galleryImagesBox
            });

            alert("Images uploaded successfully!");
        }
    } catch (error) {
        console.error("Upload failed:", error);
        alert("Error uploading images. Please try again.");
    }
}


// Attach event listener to the upload button
document.getElementById("galleryImagesUploadBtn").addEventListener("click", uploadGalleryImages);

/* ----------------------------------------------------------------------------------------- */
// Function to upload the form data
async function uploadFormData() {
    // Construct the JSON structure as per the required format
    let category = document.getElementById("category").value;
    if (category == "other") {
        category = document.getElementById("customCategory").value;
    }
    const requestData = {
        post: {
            title: document.getElementById("postTitle").value,
            postQualityTitle: document.getElementById("postQualityTitle").value,
            price: parseInt(document.getElementById("price").value, 10), // Ensure the price is parsed as an integer
            unit: document.getElementById("unit").value,
            postImage: document.getElementById("mainImageBox").querySelector("input").value, // Get the main image file name
            category: category // Replace with the actual category if dynamic
        },
        galaryImages: Array.from(
            document.querySelectorAll("#galleryImagesBox input")
        ).map(input => input.value) // Get all gallery image file names
    };

    try {
        // Make the Axios POST request
        const response = await axios.post(apiUrlPrefixProd+"/posts", requestData, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Handle successful response
        if (response.status === 200) {
            loadCategoriesFromAPI();
            alert("Form data uploaded successfully!");
        }
    } catch (error) {
        console.error("Upload failed:", error);
        alert("Error uploading form data. Please try again.");
    }
}

// Attach the upload function to the form submission event
document.getElementById("addPostForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    uploadFormData(); // Call the upload function
});
/* ------------------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", async function () {
    const categorySelect = document.getElementById("category");
    const customCategoryRow = document.getElementById("customCategoryRow");
    const customCategoryInput = document.getElementById("customCategory");

    loadCategoriesFromAPI();

    // Show or hide the custom category input based on the selected option
    categorySelect.addEventListener("change", function () {
        if (categorySelect.value === "other") {
            customCategoryRow.style.display = "block";
            customCategoryInput.required = true; // Make custom input required
        } else {
            customCategoryRow.style.display = "none";
            customCategoryInput.required = false; // Remove the required attribute
            customCategoryInput.value = ""; // Clear the input value
        }
    });
});
async function loadCategoriesFromAPI() {
    const categorySelect = document.getElementById("category");
    const customCategoryRow = document.getElementById("customCategoryRow");
    const customCategoryInput = document.getElementById("customCategory");
    categorySelect.innerHTML=null;
    try {
        // Fetch category options from the API
        const response = await axios.get(apiUrlPrefixProd+"/posts/categories");

        if (response.status === 200 && Array.isArray(response.data)) {
            const categories = response.data; // An array of strings like ['Electronics']

            // Populate the select element with options
            categories.forEach(category => {
                const option = document.createElement("option");
                option.value = category; // Use category name directly
                option.textContent = category;
                categorySelect.appendChild(option);
            });

            // Add the "Other" option
            const otherOption = document.createElement("option");
            otherOption.value = "other";
            otherOption.textContent = "Other";
            categorySelect.appendChild(otherOption);
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to load categories. Please try again later.");
    }
}
