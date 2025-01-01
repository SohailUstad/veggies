$(document).ready(function () {
    // Increment and Decrement Handlers
    $(document).on("click", ".increment", function () {
        const countSpan = $(this).siblings(".kg-count");
        let currentCount = parseInt(countSpan.text());
        countSpan.text(currentCount + 1);
    });

    $(document).on("click", ".decrement", function () {
        const countSpan = $(this).siblings(".kg-count");
        let currentCount = parseInt(countSpan.text());
        if (currentCount > 1) {
            countSpan.text(currentCount - 1);
        }
    });
    var data = null;



    // Individual Order Button Handler (for opening the order modal)
    $(document).on("click", ".order-btn", function () {
        const card = $(this).closest(".product-card");
        const postId = card.find(".postId").text();
        const kgCount = card.find(".kg-count").text();
        const contactNumber = localStorage.getItem("contact");

        // Data to be sent in the POST request
        data = {
            contact: contactNumber,
            postId: postId,
            quantity: kgCount
        };
        let contact = localStorage.getItem("contact");
        if (contact) {
            placeOrder(data)
        } else {
            $("#loginModal").modal("show");
        }

    });

    $(document).ready(function () {
        // Modal and Carousel Setup for Product Image Click
        $(document).on("click", ".product-image", function () {
            const images = $(this).data("images").split(",");
            const carouselImages = $("#carouselImages");
            carouselImages.empty();

            // Populate carousel with images
            images.forEach((img, index) => {
                const activeClass = index === 0 ? "active" : "";
                carouselImages.append(`
                    <div class="carousel-item ${activeClass}">
                        <img src="${img}" class="d-block w-100" alt="Product Image ${index + 1}">
                    </div>
                `);
            });

            // Show the modal
            $("#imageModal").modal("show");
        });
    });



    // Handle Order Form Submission
    $("#orderForm").on("submit", function (e) {
        e.preventDefault(); // Prevent form submission
        const uniqueCode = $("#uniqueCode").val();
        localStorage.setItem("contact", uniqueCode);
    });
});

function saveContact() {

}

function placeOrder(data) {
    console.log(data)
    // Sending the POST request
    fetch(apiUrlPrefixProd+'/orders', { // Replace with your API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(responseData => {
            console.log('Success:', responseData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function handleNavigation(section) {
    // Update the URL without reloading the page
    history.pushState({ section }, '', `#${section}`);
    updateView(section);
}

// Update the view based on the current section
function updateView(section) {
    const sections = ['retail', 'wholesale'];
    sections.forEach(id => {
        document.getElementById(id).style.display = id === section ? 'block' : 'none';
    });

    // Hide the main body when showing a section
    document.getElementById('main-body').style.display = section ? 'none' : 'flex';
}

// Listen to the back/forward button navigation
window.addEventListener('popstate', event => {
    const section = event.state ? event.state.section : '';
    updateView(section);
});

// Initial load - handle the case when the page is loaded with a hash
window.addEventListener('load', () => {
    const section = location.hash.replace('#', '') || '';
    updateView(section);
});

function login() {
    $.ajax({
        url: apiUrlPrefixProd+"/salers/get",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            contact: $("#contactForLogin").val(),
            password: $("#passwordForLogin").val()
        }),
        success: function (response) {
            if (response != null) {
                console.log("Login successful:", response);
                localStorage.setItem("contact", $("#contactForLogin").val());
                placeOrder(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Login failed:", textStatus, errorThrown);
        }
    });

}