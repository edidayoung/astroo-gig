// Home Page Specific JavaScript

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
    updateCartBadge();
    animateVisibleProducts();
    setupSmoothScrolling();
});

// Load products dynamically (only first 6 best sellers)
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    // Show only first 6 products (best sellers)
    const bestSellers = products.slice(0, 6);
    
    bestSellers.forEach((product) => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            const productsGrid = document.getElementById('productsGrid');
            let visibleCount = 0;
            
            // Remove existing no results message
            const existingMessage = document.querySelector('.no-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                const productDesc = card.querySelector('.product-desc').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show message if no products found and search term is not empty
            if (visibleCount === 0 && searchTerm.trim() !== '') {
                const noResultsMessage = document.createElement('div');
                noResultsMessage.className = 'no-results-message';
                noResultsMessage.innerHTML = `
                    <div class="no-results-content">
                        <i class="fas fa-search"></i>
                        <h3>Product Not Available</h3>
                        <p>We couldn't find what you're looking for. Contact us and we'll help you find it!</p>
                        <button class="btn btn-primary" onclick="contactWhatsApp('I am looking for: ${searchTerm.replace(/'/g, "\\'")}')">
                            <i class="fab fa-whatsapp"></i> Contact Us for More Details
                        </button>
                    </div>
                `;
                if (productsGrid) {
                    productsGrid.appendChild(noResultsMessage);
                }
            }
        });
    }
    
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'var(--dark-bg)';
            navbar.style.backdropFilter = 'none';
        }
    });
}
