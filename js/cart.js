// Cart Management
let cart = [];

// Add to Cart Function
function addToCart(productName, price, productImage) {
    const product = {
        name: productName,
        price: price,
        image: productImage || 'placeholder.jpg'
    };
    
    cart.push(product);
    updateCartBadge();
    showNotification(`${productName} added to cart!`);
}

// Update Cart Badge
function updateCartBadge() {
    const cartBadge = document.querySelector('.nav-cart-badge');
    if (cartBadge) {
        cartBadge.textContent = cart.length;
    }
}

// Display Cart Items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '₦0';
        return;
    }
    
    let total = 0;
    let itemsHTML = '';
    
    cart.forEach((item, index) => {
        const priceValue = parseInt(item.price.replace(/[₦,]/g, ''));
        total += priceValue;
        
        // Determine correct image path
        const isInSubfolder = window.location.pathname.includes('/pages/');
        const imagePath = isInSubfolder ? `../images/${item.image}` : `images/${item.image}`;
        
        itemsHTML += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${imagePath}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80x80?text=Product'">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = itemsHTML;
    cartTotal.textContent = `₦${total.toLocaleString()}`;
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartBadge();
    displayCartItems();
}

// Close Cart Modal
function closeCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.remove('active');
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    let message = '🛒 *ORDER REQUEST*\n\n';
    message += 'Hi! I would like to order the following items:\n\n';
    let total = 0;
    
    // Get the base URL for image links
    const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '');
    const imageBaseUrl = baseUrl.includes('/pages/') ? baseUrl.replace('/pages', '') : baseUrl;
    
    cart.forEach((item, index) => {
        message += `*${index + 1}. ${item.name}*\n`;
        message += `   💰 Price: ${item.price}\n`;
        message += `   🖼️ Image: ${imageBaseUrl}/images/${item.image}\n\n`;
        const priceValue = parseInt(item.price.replace(/[₦,]/g, ''));
        total += priceValue;
    });
    
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*Total: ₦${total.toLocaleString()}*\n\n`;
    message += `📦 Please confirm availability and delivery details.\n`;
    message += `📍 I will provide my delivery address after confirmation.\n\n`;
    message += `Thank you! 🙏`;
    
    const phoneNumber = '2349133993369';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Show instruction notification
    showCheckoutNotification();
    
    // Clear cart after checkout
    cart = [];
    updateCartBadge();
    closeCart();
}

// Show checkout notification with instructions
function showCheckoutNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #25D366, #128C7E);
        color: white;
        padding: 20px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
        z-index: 3000;
        max-width: 350px;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: start; gap: 12px;">
            <i class="fab fa-whatsapp" style="font-size: 24px; margin-top: 2px;"></i>
            <div>
                <strong style="display: block; margin-bottom: 8px;">Order Sent! 📱</strong>
                <p style="margin: 0; font-size: 14px; line-height: 1.5;">
                    Click the image links in WhatsApp to view products. You can save and send them in the chat.
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #8B5CF6, #C084FC);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}
