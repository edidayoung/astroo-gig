// Category Pages JavaScript

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});

// Load category products
function loadCategoryProducts(category) {
    const productsGrid = document.getElementById('categoryProducts');
    const filteredProducts = products.filter(p => p.category === category);
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="text-align:center;color:var(--text-secondary);padding:40px;">No products found in this category.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    setupSearch();
    updateCartBadge();
    animateCategoryProducts();
}

// Animate category products
function animateCategoryProducts() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        observer.observe(card);
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            const productsGrid = document.getElementById('categoryProducts');
            let visibleCount = 0;
            
            // Remove existing no results message
            const existingMessage = document.querySelector('.no-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            productCards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('.product-desc').textContent.toLowerCase();
                
                if (name.includes(term) || desc.includes(term)) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show message if no products found and search term is not empty
            if (visibleCount === 0 && term.trim() !== '') {
                const noResultsMessage = document.createElement('div');
                noResultsMessage.className = 'no-results-message';
                noResultsMessage.innerHTML = `
                    <div class="no-results-content">
                        <i class="fas fa-search"></i>
                        <h3>Product Not Available</h3>
                        <p>We couldn't find what you're looking for. Contact us and we'll help you find it!</p>
                        <button class="btn btn-primary" onclick="contactWhatsApp('I am looking for: ${term.replace(/'/g, "\\'")}')">
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
}
