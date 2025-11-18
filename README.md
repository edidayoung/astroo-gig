# Astro Services - Electronics E-commerce Website

A modern, responsive e-commerce website for electronics with a clean, maintainable codebase.

## 📁 Project Structure

```
astroo-gig/
├── index.html              # Home page
├── pages/                  # Category pages
│   ├── smartphones.html
│   ├── laptops.html
│   ├── audio.html
│   └── accessories.html
├── css/                    # Modular stylesheets
│   ├── main.css           # Main CSS file (imports all modules)
│   ├── variables.css      # CSS variables and reset
│   ├── navigation.css     # Navigation styles
│   ├── components.css     # Reusable components
│   ├── home.css           # Home page specific styles
│   ├── category.css       # Category pages styles
│   ├── cart.css           # Shopping cart modal styles
│   ├── footer.css         # Footer styles
│   └── responsive.css     # Media queries and responsive design
├── js/                     # JavaScript modules
│   ├── products-data.js   # Product catalog data
│   ├── cart.js            # Shopping cart functionality
│   ├── navigation.js      # Navigation menu logic
│   ├── home.js            # Home page specific scripts
│   ├── category.js        # Category pages scripts
│   └── utils.js           # Utility functions
└── images/                 # Product images and assets
```

## 🎨 CSS Architecture

The CSS is split into modular files for better maintainability:

- **variables.css**: Global CSS variables, reset, and base styles
- **navigation.css**: All navigation-related styles (desktop & mobile)
- **components.css**: Reusable components (buttons, cards, badges)
- **home.css**: Home page specific styles (hero, mission/vision, reviews)
- **category.css**: Category pages specific styles
- **cart.css**: Shopping cart modal styles
- **footer.css**: Footer component styles
- **responsive.css**: All media queries and responsive breakpoints
- **main.css**: Imports all CSS modules in the correct order

## 📜 JavaScript Architecture

The JavaScript is organized into focused modules:

- **products-data.js**: Product catalog (easy to update)
- **cart.js**: Cart management (add, remove, checkout)
- **navigation.js**: Navigation menu functionality
- **home.js**: Home page initialization and features
- **category.js**: Category page product loading and filtering
- **utils.js**: Shared utility functions (WhatsApp, animations, etc.)

## 🚀 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern navigation with dropdown categories
- ✅ Shopping cart with WhatsApp checkout
- ✅ Product search functionality
- ✅ Smooth animations and transitions
- ✅ Category filtering
- ✅ WhatsApp integration for inquiries
- ✅ Clean, maintainable code structure

## 🛠️ How to Edit

### Adding/Updating Products

Edit `js/products-data.js`:

```javascript
{
    id: 13,
    name: "Product Name",
    price: "₦100,000",
    category: "smartphones", // or laptops, audio, accessories
    image: "images/product.jpg",
    description: "Product description",
    badge: "hot", // or "new", "pro", or null
    badgeText: "Hot Sale"
}
```

### Updating Styles

- Global colors/variables: `css/variables.css`
- Navigation: `css/navigation.css`
- Components: `css/components.css`
- Responsive design: `css/responsive.css`

### Adding New Pages

1. Create HTML file in `pages/` folder
2. Link to `../css/main.css` for styles
3. Include necessary JS files from `../js/`
4. Update navigation links in all pages

## 📱 Contact Integration

WhatsApp: +234 913 399 3369
Facebook: Astro Ekpanya

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📝 License

© 2025 Astro Services. All rights reserved.
