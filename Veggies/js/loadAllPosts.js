async function fetchPostsAndGenerateHTML() {
  

    try {

        // Get UUID from localStorage
        const uuid = localStorage.getItem("uuid");
        
        // console.log('UUID being sent:', uuid);
        // Fetch data from the API with UUID in the headers
        const response = await fetch(apiUrlPrefixProd+"/posts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
             // This ensures cookies or other credentials are included in the request
        });


        // // Fetch data from the API
        // const response = await fetch(apiUrl);
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }

        const posts = await response.json(); // Parse JSON response

        // Container where cards will be added
        const retailContainer = document.getElementById("retail");
        const wholesaleContainer = document.getElementById("wholesale");

        // Generate HTML for each post
        posts.forEach(postRequest => {
            const post = postRequest.post;

            // Prepend the prefix to gallery image names
            const galleryImages = postRequest.galaryImages.map(
                imageName => imageName
            );

            // Create HTML string with post values
            
            const cardHTML = `
                <div class="card product-card">
                    <img src="${post.postImage}" 
                        alt="${post.postQualityTitle}" 
                        class="card-img-top product-image" 
                        data-target="#imageModal" 
                        data-toggle="modal" 
                        data-images="${galleryImages.join(",")}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.postQualityTitle}</p>
                        <p class="price">Price: ₹${post.price} per ${post.unit}</p>
                        <div class="counter-controls">
                            <button class="btn btn-danger decrement">-</button>
                            <span class="kg-count">1</span> ${post.unit}
                            <button class="btn btn-success increment">+</button>
                        </div>
                        <span class="postId" style="display:none">${post.postId}</span>
                        <button class="order-btn">Order</button>
                    </div>
                </div>
            `;
            // Append card to the container

            if (post.category == "retail") {
                retailContainer.innerHTML += cardHTML;
            } else if (post.category == "wholesale") {
                wholesaleContainer.innerHTML += cardHTML;
            }



        });
    } catch (error) {
        console.error("Error fetching or processing posts:", error);
        $("#loginModal").modal("show");
    }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", fetchPostsAndGenerateHTML);
