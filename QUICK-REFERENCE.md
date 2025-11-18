# Quick Reference Guide

## 🎨 CSS Variables (css/variables.css)

```css
--primary: #8B5CF6        /* Purple */
--secondary: #A78BFA      /* Light Purple */
--accent: #C084FC         /* Pink Purple */
--dark-bg: #0a0a0a        /* Dark Background */
--card-bg: #1a1a1a        /* Card Background */
--border: #2a2a2a         /* Border Color */
--text-primary: #ffffff   /* White Text */
--text-secondary: #a0a0a0 /* Gray Text */
--success: #25D366        /* WhatsApp Green */
```

## 📦 Product Object Structure

```javascript
{
    id: 1,                          // Unique ID
    name: "Product Name",           // Display name
    price: "₦850,000",             // Price with currency
    category: "smartphones",        // Category slug
    image: "images/product.jpg",    // Image path
    description: "Description",     // Short description
    badge: "hot",                   // Badge type: "hot", "new", "pro", or null
    badgeText: "Hot Sale"          // Badge display text
}
```

## 🔧 Common Functions

### Cart Functions (js/cart.js)
```javascript
addToCart(productName, price)     // Add item to cart
removeFromCart(index)              // Remove item by index
updateCartBadge()                  // Update cart count
displayCartItems()                 // Refresh cart display
checkout()                         // WhatsApp checkout
closeCart()                        // Close cart modal
```

### Utility Functions (js/utils.js)
```javascript
contactWhatsApp(product)           // Open WhatsApp with message
scrollToProducts()                 // Scroll to products section
setupSmoothScrolling()             // Enable smooth scroll
animateVisibleProducts()           // Animate on scroll
createProductCard(product)         // Generate product HTML
```

### Category Functions (js/category.js)
```javascript
loadCategoryProducts(category)     // Load products by category
setupSearch()                      // Initialize search
animateCategoryProducts()          // Animate products
```

## 📱 Contact Information

```javascript
const phoneNumber = '2349133993369';
const whatsappUrl = `https://wa.me/${phoneNumber}`;
const facebookUrl = 'https://facebook.com/AstroEkpanya';
```

## 🎯 CSS Classes Reference

### Buttons
```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-outline">Outline Button</button>
<button class="btn-cart">Cart Button</button>
```

### Product Cards
```html
<div class="product-card">
    <div class="product-badge hot">Hot Sale</div>
    <div class="product-image">...</div>
    <div class="product-info">...</div>
</div>
```

### Navigation
```html
<nav class="navbar">
    <div class="nav-container">
        <a class="nav-logo">...</a>
        <div class="nav-menu">
            <a class="nav-item active">...</a>
        </div>
    </div>
</nav>
```

## 🔄 File Import Order

### HTML Head (Styles)
```html
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

### HTML Body End (Scripts)
```html
<script src="js/products-data.js"></script>
<script src="js/cart.js"></script>
<script src="js/utils.js"></script>
<script src="js/navigation.js"></script>
<script src="js/home.js"></script> <!-- or category.js for category pages -->
```

## 🎨 Badge Types

```css
.product-badge.hot   /* Red/Orange gradient */
.product-badge.new   /* Teal/Green gradient */
.product-badge.pro   /* Purple gradient */
```

## 📐 Responsive Breakpoints

```css
/* Desktop: Default styles */
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile */ }
@media (max-width: 480px)  { /* Small Mobile */ }
```

## 🚀 Quick Edits

### Change Primary Color
`css/variables.css` → `--primary: #YOUR_COLOR`

### Add Product
`js/products-data.js` → Add object to products array

### Update Phone Number
Search for `2349133993369` and replace all instances

### Modify Navigation
`css/navigation.css` → Styles
`js/navigation.js` → Functionality

### Change Hero Text
`index.html` → `.hero-content` section

## 🐛 Debugging Tips

### Cart not updating?
Check `updateCartBadge()` is called after cart changes

### Products not showing?
Verify `products-data.js` is loaded before other scripts

### Navigation not working?
Ensure `navigation.js` is loaded and IDs match HTML

### Styles not applying?
Check CSS import order in `main.css`

### Images not loading?
Verify image paths are relative to HTML file location
