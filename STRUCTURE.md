# Project Structure Documentation

## 📂 Folder Organization

### Root Level
- `index.html` - Main homepage
- `README.md` - Project documentation
- `STRUCTURE.md` - This file

### `/pages/` - Category Pages
All product category pages are organized here:
- `smartphones.html` - Smartphones category
- `laptops.html` - Laptops category
- `audio.html` - Audio products category
- `accessories.html` - Accessories category

### `/css/` - Modular Stylesheets
Organized by functionality for easy maintenance:

| File | Purpose |
|------|---------|
| `main.css` | Main entry point - imports all CSS modules |
| `variables.css` | CSS custom properties, reset, base styles |
| `navigation.css` | Navigation bar and menu styles |
| `components.css` | Reusable UI components (buttons, cards, badges) |
| `home.css` | Home page specific styles (hero, mission/vision) |
| `category.css` | Category pages specific styles |
| `cart.css` | Shopping cart modal styles |
| `footer.css` | Footer component styles |
| `responsive.css` | All media queries and breakpoints |

### `/js/` - JavaScript Modules
Separated by functionality:

| File | Purpose |
|------|---------|
| `products-data.js` | Product catalog data (easy to update) |
| `cart.js` | Shopping cart functionality |
| `navigation.js` | Navigation menu logic |
| `home.js` | Home page initialization |
| `category.js` | Category page product loading |
| `utils.js` | Shared utility functions |

### `/images/` - Assets
Product images and visual assets

## 🔗 File Dependencies

### index.html requires:
```html
<link rel="stylesheet" href="css/main.css">
<script src="js/products-data.js"></script>
<script src="js/cart.js"></script>
<script src="js/utils.js"></script>
<script src="js/navigation.js"></script>
<script src="js/home.js"></script>
```

### Category pages require:
```html
<link rel="stylesheet" href="../css/main.css">
<script src="../js/products-data.js"></script>
<script src="../js/cart.js"></script>
<script src="../js/utils.js"></script>
<script src="../js/navigation.js"></script>
<script src="../js/category.js"></script>
```

## 🎯 Benefits of This Structure

### Maintainability
- ✅ Easy to find and edit specific features
- ✅ Changes to one module don't affect others
- ✅ Clear separation of concerns

### Scalability
- ✅ Easy to add new pages or features
- ✅ Simple to add new product categories
- ✅ Modular CSS prevents style conflicts

### Performance
- ✅ Browser can cache individual modules
- ✅ Only load what's needed per page
- ✅ Easier to optimize specific modules

### Collaboration
- ✅ Multiple developers can work on different modules
- ✅ Clear file naming conventions
- ✅ Self-documenting structure

## 📝 Common Tasks

### Adding a New Product
Edit `js/products-data.js` and add to the products array

### Changing Colors/Theme
Edit `css/variables.css` - update CSS custom properties

### Modifying Navigation
Edit `css/navigation.css` for styles
Edit `js/navigation.js` for functionality

### Adding a New Category Page
1. Copy an existing category page from `/pages/`
2. Update the title and category name
3. Update the `loadCategoryProducts()` call
4. Add link to navigation in all pages

### Updating Responsive Design
Edit `css/responsive.css` - all media queries are here

## 🚀 Quick Start

1. Open `index.html` in a browser
2. Navigate to category pages via the menu
3. All paths are relative and work locally

## 📱 Mobile Development

All responsive styles are in `css/responsive.css`:
- Desktop: Default styles
- Tablet: `@media (max-width: 1024px)`
- Mobile: `@media (max-width: 768px)`
- Small Mobile: `@media (max-width: 480px)`
