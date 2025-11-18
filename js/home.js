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

// Enhanced Review Carousel Functionality
let currentReviewIndex = 0;
let reviewsPerView = 3;
let totalReviews = 0;
let autoSlideInterval;

function initReviewCarousel() {
    const carousel = document.getElementById('reviewsCarousel');
    const prevBtn = document.getElementById('reviewPrev');
    const nextBtn = document.getElementById('reviewNext');
    const dotsContainer = document.getElementById('reviewDots');
    
    if (!carousel) return;
    
    const reviewCards = carousel.querySelectorAll('.review-card');
    totalReviews = reviewCards.length;
    
    // Add quote icons to each review card
    reviewCards.forEach(card => {
        const quoteIcon = document.createElement('div');
        quoteIcon.className = 'quote-icon';
        quoteIcon.innerHTML = '<i class="fas fa-quote-right"></i>';
        card.appendChild(quoteIcon);
    });
    
    // Update reviews per view based on screen size
    updateReviewsPerView();
    
    // Create dots
    createReviewDots();
    
    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            navigateReviews('prev');
            resetAutoSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            navigateReviews('next');
            resetAutoSlide();
        });
    }
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        resetAutoSlide();
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            navigateReviews('next');
        } else if (touchEndX - touchStartX > swipeThreshold) {
            navigateReviews('prev');
        }
    }
    
    // Mouse drag support
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        carousel.style.cursor = 'grabbing';
        resetAutoSlide();
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.pageX;
    });
    
    carousel.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.cursor = 'grab';
        
        const diff = startX - currentX;
        const dragThreshold = 50;
        
        if (diff > dragThreshold) {
            navigateReviews('next');
        } else if (diff < -dragThreshold) {
            navigateReviews('prev');
        }
    });
    
    carousel.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            carousel.style.cursor = 'grab';
        }
    });
    
    // Update on window resize
    window.addEventListener('resize', () => {
        updateReviewsPerView();
        updateCarouselPosition();
        createReviewDots();
    });
    
    // Initialize auto-slide
    startAutoSlide();
    
    // Initial update
    updateCarouselPosition();
}

function updateReviewsPerView() {
    const width = window.innerWidth;
    if (width < 768) {
        reviewsPerView = 1;
    } else if (width < 1024) {
        reviewsPerView = 2;
    } else {
        reviewsPerView = 3;
    }
}

function navigateReviews(direction) {
    const maxIndex = Math.max(0, totalReviews - reviewsPerView);
    
    if (direction === 'next') {
        currentReviewIndex = currentReviewIndex >= maxIndex ? 0 : currentReviewIndex + 1;
    } else {
        currentReviewIndex = currentReviewIndex <= 0 ? maxIndex : currentReviewIndex - 1;
    }
    
    updateCarouselPosition();
}

function updateCarouselPosition() {
    const carousel = document.getElementById('reviewsCarousel');
    const prevBtn = document.getElementById('reviewPrev');
    const nextBtn = document.getElementById('reviewNext');
    
    if (!carousel) return;
    
    const reviewCards = carousel.querySelectorAll('.review-card');
    if (reviewCards.length === 0) return;
    
    // Calculate the width of one card plus gap
    const firstCard = reviewCards[0];
    const cardWidth = firstCard.offsetWidth;
    const gap = 30; // Match the CSS gap
    const moveDistance = (cardWidth + gap) * currentReviewIndex;
    
    carousel.style.transform = `translateX(-${moveDistance}px)`;
    
    // Update active card styling
    reviewCards.forEach((card, index) => {
        if (index >= currentReviewIndex && index < currentReviewIndex + reviewsPerView) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
    
    // Update button states
    const maxIndex = Math.max(0, totalReviews - reviewsPerView);
    
    if (prevBtn) {
        prevBtn.disabled = false; // Always enabled for looping
    }
    
    if (nextBtn) {
        nextBtn.disabled = false; // Always enabled for looping
    }
    
    // Update dots
    updateReviewDots();
}

function createReviewDots() {
    const dotsContainer = document.getElementById('reviewDots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    
    const maxIndex = Math.max(0, totalReviews - reviewsPerView);
    const numDots = maxIndex + 1;
    
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'review-dot';
        if (i === currentReviewIndex) {
            dot.classList.add('active');
        }
        
        dot.addEventListener('click', () => {
            currentReviewIndex = i;
            updateCarouselPosition();
            resetAutoSlide();
        });
        
        dotsContainer.appendChild(dot);
    }
}

function updateReviewDots() {
    const dots = document.querySelectorAll('.review-dot');
    dots.forEach((dot, index) => {
        if (index === currentReviewIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Auto-slide functionality
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        navigateReviews('next');
    }, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initialize review carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initReviewCarousel();
});