document.addEventListener('DOMContentLoaded', (event) => {
    // Function to load HTML files into the selected element
    function loadHTML(selector, filePath) {
        return fetch(filePath)
            .then(response => response.text())
            .then(data => {
                document.querySelector(selector).innerHTML = data;
            })
            .catch(error => {
                console.error("Error loading HTML file:", error);
            });
    }

    // Load header and footer first
    Promise.all([
        loadHTML('#footer', 'footer.html')
    ])
    .then(() => {
        // Once the HTML is loaded, add event listeners for menu toggle
        const menuIcon = document.querySelector('.menu-icon');
        const overlay = document.querySelector('.overlay');
        const mobileMenu = document.querySelector('.middle');

        menuIcon.addEventListener("click", toggleMobileMenu);
        overlay.addEventListener("click", closeMobileMenu);

        // Function to toggle mobile menu
        function toggleMobileMenu() {
            menuIcon.classList.toggle('active');
            overlay.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        }

        // Function to close mobile menu
        function closeMobileMenu() {
            menuIcon.classList.remove('active');
            overlay.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

        
    if (document.body.classList.contains('index-page')) {
        fetch("assets/js/category.json")
        .then(response => response.json())
        .then(data => {
            const categoryList = document.getElementById("category-list");


            data.forEach(category => {
                const listItem = document.createElement("li");
                
                const anchor = document.createElement("a");
                anchor.href = "#";  
                
                const image = document.createElement("img");
                image.src = category.image;
                image.alt = category.name;
                
                const heading = document.createElement("h4");
                heading.textContent = category.name;
                
                anchor.appendChild(image);
                anchor.appendChild(heading);
                listItem.appendChild(anchor);
                
                categoryList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.log("Error loading categories:", error);
        });

    }

    

    
    fetch("assets/js/product.json")
    .then(response => response.json())
    .then(products => {

       

        const productsContainer = document.querySelector('.products'); 
        const productsContainer2 = document.querySelector('.products2'); 
        const productsContainer3 = document.querySelector('.products3');

       

        products.forEach((product, index) => {
            let additionalHtml = '';
            let toplefthtml ='';

            if (index === 4) { 
                toplefthtml =`
                    <div class="topLeft">
                        <h4>NEW</h4>
                    </div>`
                additionalHtml = `
                    
                    <div class="round">
                        <div class="double">
                            <div class="red"></div>
                        </div>
                        <div class="magenta"></div>
                    </div>
                    
                `;
            } else if (index === 5) { 
                additionalHtml = `
                    <div class="round">
                        <div class="double">
                            <div class="yellow"></div>
                        </div>
                        <div class="magenta"></div>
                    </div>
                `;
            } else if (index === 6) { 
                toplefthtml =`
                    <div class="topLeft">
                        <h4>NEW</h4>
                    </div>`
                additionalHtml = `
                   
                    <div class="round">
                        <div class="double">
                            <div class="black"></div>
                        </div>
                        <div class="magenta"></div>
                    </div>
                     
                `;
            } else if (index === 7) { 
                additionalHtml = `
                    <div class="round">
                        <div class="double">
                            <div class="green"></div>
                        </div>
                        <div class="magenta"></div>
                    </div>
                `;
            }

            
            const productHTML = `
            <div class="product">
                <div class="box">
                    <img src="${product.image}" alt="image">
                    <div class="add-cart"><a href="#"><p>Add To Cart</p></a></div>
                    ${toplefthtml} 
                    <div class="topRight">
                        <div class="circle-container">
                            <div class="circle">
                                <a href=""><img src="assets/images/wishlist.svg" alt="image" class="wishlist"></a>
                            </div>
                        </div>
                        <div class="circle-container">
                            <div class="circle">
                                <a href=""><img src="assets/images/Quick View.svg" alt="image" class="wishlist"></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <h4 class="p-name">${product.name}</h4>
                    <span class="price">${product.price}</span>
                    <div class="stars">
                        ${Array.from({ length: product.rating }, (_, i) => `<span class="star"><img src="assets/images/star.svg" alt="star"></span>`).join('')}
                        ${Array.from({ length: 5 - product.rating }, (_, i) => `<span class="stargray"><img src="assets/images/star.svg" alt="star"></span>`).join('')}
                    </div>
                    <span>(${product.reviews})</span>
                </div>
                ${additionalHtml} 
            </div>
            `;

            if (productsContainer) {
                productsContainer.innerHTML += productHTML;
            }
            if (productsContainer2) {
                productsContainer2.innerHTML += productHTML;
            }
            if (productsContainer3) {
                productsContainer3.innerHTML += productHTML;
            }
 


        });
    })
    .catch(error => {
        console.log("Error loading products:", error);
    });


    const searchInput = document.getElementById('search-input');
        const productList = document.getElementById('product-list');

        searchInput.addEventListener('input', function() {
            const searchTerm = searchInput.value.toLowerCase();  // Get the input value
            const products = productList.querySelectorAll('.product');  // Get all products

            // Loop through the products and check if the name contains the search term
            products.forEach(product => {
                const productName = product.querySelector('.p-name').textContent.toLowerCase();
                
                if (productName.includes(searchTerm)) {
                    product.style.display = 'block';  // Show the product if it matches
                } else {
                    product.style.display = 'none';   // Hide the product if it doesn't match
                }
            });
        });
    
});



