// ========== NEW NAVIGATION SYSTEM ==========

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
});

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const categoriesDropdown = document.getElementById('categoriesDropdown');
    const cartBtn = document.getElementById('cartBtn');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close menu when clicking overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', closeNav);
    }
    
    // Categories dropdown toggle (mobile)
    if (categoriesDropdown) {
        const trigger = categoriesDropdown.querySelector('.nav-dropdown-trigger');
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                categoriesDropdown.classList.toggle('active');
            }
        });
    }
    
    // Close menu when clicking nav items (mobile)
    document.querySelectorAll('.nav-item:not(.nav-dropdown)').forEach(item => {
        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                const href = item.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    closeNav();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });
    
    // Active nav item on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-item[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Cart button
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            const cartModal = document.getElementById('cartModal');
            if (cartModal) {
                cartModal.classList.add('active');
                displayCartItems();
            }
        });
    }
    
    // Update cart badge
    updateCartBadge();
}

function closeNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const categoriesDropdown = document.getElementById('categoriesDropdown');
    
    if (navToggle) navToggle.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    if (categoriesDropdown) categoriesDropdown.classList.remove('active');
    document.body.style.overflow = '';
}

function updateCartBadge() {
    const badge = document.querySelector('.nav-cart-badge');
    if (badge && typeof cart !== 'undefined') {
        badge.textContent = cart.length;
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const categoriesDropdown = document.getElementById('categoriesDropdown');
    if (categoriesDropdown && !categoriesDropdown.contains(e.target) && window.innerWidth <= 768) {
        categoriesDropdown.classList.remove('active');
    }
});
