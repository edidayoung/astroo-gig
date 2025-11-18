// Cart Management
let cart = [];

// Add to Cart Function
function addToCart(productName, price) {
    const product = {
        name: productName,
        price: price
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
        
        itemsHTML += `
            <div class="cart-item">
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
    
    let message = 'Hi! I would like to order the following items:\n\n';
    let total = 0;
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ${item.price}\n`;
        const priceValue = parseInt(item.price.replace(/[₦,]/g, ''));
        total += priceValue;
    });
    
    message += `\nTotal: ₦${total.toLocaleString()}`;
    
    const phoneNumber = '2349133993369';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after checkout
    cart = [];
    updateCartBadge();
    closeCart();
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
