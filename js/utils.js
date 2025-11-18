// Utility Functions

// WhatsApp Contact Function
function contactWhatsApp(product) {
    const phoneNumber = '2349133993369';
    const message = `Hi! I'm interested in ${product}. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Scroll to Products Function
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Setup smooth scrolling for all anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll to top button functionality
    initScrollToTop();
}

// Initialize scroll to top button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) return;
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animate visible products
function animateVisibleProducts() {
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

    // Observe product cards and review cards
    const animatedElements = document.querySelectorAll('.product-card, .review-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Create product card HTML
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.setAttribute('data-category', product.category);
    
    let badgeHTML = '';
    if (product.badge) {
        badgeHTML = `<div class="product-badge ${product.badge}">${product.badgeText}</div>`;
    }
    
    // Determine the correct image path based on current location
    const isInSubfolder = window.location.pathname.includes('/pages/');
    const imagePath = isInSubfolder ? `../images/${product.image}` : `images/${product.image}`;
    
    productCard.innerHTML = `
        ${badgeHTML}
        <div class="product-image">
            <img src="${imagePath}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300?text=Product+Image'">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p class="product-desc">${product.description}</p>
            <div class="product-footer">
                <span class="price">${product.price}</span>
                <button class="btn-cart" onclick="addToCart('${product.name.replace(/'/g, "\\'")}', '${product.price}', '${product.image}')">
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
        </div>
    `;
    
    return productCard;
}
