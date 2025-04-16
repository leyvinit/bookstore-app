// DOM Elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const cartButton = document.getElementById('cart-button');
const cartCount = document.getElementById('cart-count');
const loginButton = document.getElementById('login-button');
const loginModal = document.getElementById('login-modal');
const cartModal = document.getElementById('cart-modal');
const closeButtons = document.querySelectorAll('.close-button');
const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginContent = document.getElementById('login-content');
const signupContent = document.getElementById('signup-content');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const continueShoppingButton = document.getElementById('continue-shopping');
const featuredBooksContainer = document.getElementById('featured-books-container');
const bestsellersContainer = document.getElementById('bestsellers-container');
const newReleasesContainer = document.getElementById('new-releases-container');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');

// Global variables
let books = [];
let cart = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
    loadCartFromLocalStorage();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // Search functionality
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Modal handling
    loginButton.addEventListener('click', () => openModal(loginModal));
    cartButton.addEventListener('click', () => {
        updateCartDisplay();
        openModal(cartModal);
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Tab switching
    loginTab.addEventListener('click', () => switchTab('login'));
    signupTab.addEventListener('click', () => switchTab('signup'));

    // Form submissions
    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);

    // Cart functionality
    continueShoppingButton.addEventListener('click', () => closeModal(cartModal));
    checkoutButton.addEventListener('click', handleCheckout);

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
}

// Fetch books from API
async function fetchBooks() {
    try {
        // In a real application, this would be a call to a real API
        // For now, we'll use placeholder data
        const response = await fetch('api/books.php');
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        
        // Simulate API response
        books = generateDummyBooks();
        
        // Display books
        displayFeaturedBooks();
        displayBestsellers();
        displayNewReleases();
    } catch (error) {
        console.error('Error fetching books:', error);
        // Fallback to dummy data
        books = generateDummyBooks();
        displayFeaturedBooks();
        displayBestsellers();
        displayNewReleases();
    }
}

// Generate dummy books for testing
function generateDummyBooks() {
    return [
        {
            id: 1,
            title: 'The Silent Whispers',
            author: 'Amelia Walker',
            price: 24.99,
            image: 'images/book1.jpg',
            rating: 4.5,
            category: 'Fiction',
            featured: true,
            bestseller: true,
            newRelease: false,
            description: 'A captivating tale of mystery and intrigue set in a small coastal town.'
        },
        {
            id: 2,
            title: 'Beyond the Horizon',
            author: 'Benjamin Reynolds',
            price: 19.99,
            image: 'images/book2.jpg',
            rating: 4.2,
            category: 'Sci-Fi',
            featured: true,
            bestseller: false,
            newRelease: true,
            description: 'An epic science fiction adventure across multiple galaxies.'
        },
        {
            id: 3,
            title: 'Midnight Gardens',
            author: 'Sophia Chen',
            price: 22.50,
            image: 'images/book3.jpg',
            rating: 4.7,
            category: 'Fantasy',
            featured: false,
            bestseller: true,
            newRelease: false,
            description: 'A magical journey through enchanted gardens that only appear at midnight.'
        },
        {
            id: 4,
            title: 'The Last Detective',
            author: 'Marcus Johnson',
            price: 18.99,
            image: 'images/book4.jpg',
            rating: 4.3,
            category: 'Mystery',
            featured: true,
            bestseller: true,
            newRelease: false,
            description: 'A gripping detective story with twists at every turn.'
        },
        {
            id: 5,
            title: 'Whispers of the Heart',
            author: 'Elena Rodriguez',
            price: 15.99,
            image: 'images/book5.jpg',
            rating: 4.0,
            category: 'Romance',
            featured: false,
            bestseller: false,
            newRelease: true,
            description: 'A touching romance that spans decades of separation and reunion.'
        },
        {
            id: 6,
            title: 'The Quantum Paradox',
            author: 'David Kim',
            price: 28.99,
            image: 'images/book6.jpg',
            rating: 4.6,
            category: 'Non-Fiction',
            featured: true,
            bestseller: false,
            newRelease: true,
            description: 'An exploration of quantum physics for the curious mind.'
        },
        {
            id: 7,
            title: 'Desert Storms',
            author: 'Aisha Patel',
            price: 21.50,
            image: 'images/book7.jpg',
            rating: 4.4,
            category: 'Fiction',
            featured: false,
            bestseller: true,
            newRelease: false,
            description: 'A powerful story of survival and resilience in the harshest desert.'
        },
        {
            id: 8,
            title: 'Culinary Journeys',
            author: 'Jean-Pierre Dubois',
            price: 32.00,
            image: 'images/book8.jpg',
            rating: 4.8,
            category: 'Non-Fiction',
            featured: true,
            bestseller: true,
            newRelease: true,
            description: 'A culinary tour around the world with recipes and stories.'
        },
        {
            id: 9,
            title: 'The Forgotten Path',
            author: 'Isabella Martinez',
            price: 17.99,
            image: 'images/book9.jpg',
            rating: 4.1,
            category: 'Fantasy',
            featured: false,
            bestseller: false,
            newRelease: true,
            description: 'A young hero discovers a hidden path to a magical realm.'
        },
        {
            id: 10,
            title: 'Corporate Strategies',
            author: 'Robert Thompson',
            price: 45.00,
            image: 'images/book10.jpg',
            rating: 4.3,
            category: 'Non-Fiction',
            featured: false,
            bestseller: true,
            newRelease: false,
            description: 'Essential strategies for modern business leaders.'
        }
    ];
}

// Display books in different sections
function displayFeaturedBooks() {
    const featuredBooks = books.filter(book => book.featured);
    featuredBooksContainer.innerHTML = featuredBooks.map(book => createBookCard(book)).join('');
    attachAddToCartListeners();
}

function displayBestsellers() {
    const bestsellerBooks = books.filter(book => book.bestseller);
    bestsellersContainer.innerHTML = bestsellerBooks.map(book => createBookCard(book)).join('');
    attachAddToCartListeners();
}

function displayNewReleases() {
    const newReleaseBooks = books.filter(book => book.newRelease);
    newReleasesContainer.innerHTML = newReleaseBooks.map(book => createBookCard(book)).join('');
    attachAddToCartListeners();
}

// Create HTML for book card
function createBookCard(book) {
    return `
        <div class="book-card" data-id="${book.id}">
            <img src="${book.image}" alt="${book.title}" class="book-image">
            ${book.newRelease ? '<span class="book-tag">New</span>' : ''}
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <div class="book-rating">
                    ${generateStarRating(book.rating)}
                    <span>${book.rating.toFixed(1)}</span>
                </div>
                <p class="book-price">$${book.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${book.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Attach event listeners to Add to Cart buttons
function attachAddToCartListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const bookId = parseInt(e.target.dataset.id || e.target.closest('.add-to-cart').dataset.id);
            addToCart(bookId);
        });
    });
}

// Search functionality
function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) return;
    
    const searchResults = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm) || 
        book.category.toLowerCase().includes(searchTerm)
    );
    
    featuredBooksContainer.innerHTML = searchResults.map(book => createBookCard(book)).join('');
    attachAddToCartListeners();
    
    // Update section title
    const sectionTitle = document.querySelector('.featured-books h2');
    sectionTitle.textContent = `Search Results for "${searchTerm}"`;
    
    // Scroll to results
    document.querySelector('.featured-books').scrollIntoView({ behavior: 'smooth' });
}

// Modal handling
function openModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
}

function switchTab(tab) {
    if (tab === 'login') {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginContent.style.display = 'block';
        signupContent.style.display = 'none';
    } else {
        loginTab.classList.remove('active');
        signupTab.classList.add('active');
        loginContent.style.display = 'none';
        signupContent.style.display = 'block';
    }
}

// Cart functionality
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    const existingItem = cart.find(item => item.id === bookId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            image: book.image,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCartToLocalStorage();
    
    // Show confirmation
    showToast(`Added "${book.title}" to cart`);
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartDisplay() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotalElement.textContent = '$0.00';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => createCartItemHTML(item)).join('');
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
    
    // Attach event listeners to cart item controls
    attachCartItemListeners();
}

function createCartItemHTML(item) {
    return `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.title}</h3>
                <p class="cart-item-author">by ${item.author}</p>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" disabled>
                        <button class="quantity-btn increase">+</button>
                    </div>
                    <button class="remove-item">Remove</button>
                </div>
            </div>
        </div>
    `;
}

function attachCartItemListeners() {
    const decreaseButtons = document.querySelectorAll('.decrease');
    const increaseButtons = document.querySelectorAll('.increase');
    const removeButtons = document.querySelectorAll('.remove-item');
    
    decreaseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            const itemId = parseInt(cartItem.dataset.id);
            updateItemQuantity(itemId, 'decrease');
        });
    });
    
    increaseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            const itemId = parseInt(cartItem.dataset.id);
            updateItemQuantity(itemId, 'increase');
        });
    });
    
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            const itemId = parseInt(cartItem.dataset.id);
            removeItemFromCart(itemId);
        });
    });
}

function updateItemQuantity(itemId, action) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return;
    
    if (action === 'increase') {
        cart[itemIndex].quantity++;
    } else if (action === 'decrease') {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
        } else {
            removeItemFromCart(itemId);
            return;
        }
    }
    
    updateCartCount();
    updateCartDisplay();
    saveCartToLocalStorage();
}

function removeItemFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    updateCartDisplay();
    saveCartToLocalStorage();
}

function saveCartToLocalStorage() {
    localStorage.setItem('purrBookCart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('purrBookCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Authentication handling
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // In a real application, this would send a request to a server
    // For demonstration, we'll simulate a successful login
    
    // Simulate API call
    setTimeout(() => {
        // Simulate successful login
        const user = { email, name: email.split('@')[0] };
        localStorage.setItem('purrBookUser', JSON.stringify(user));
        
        // Update UI
        loginButton.textContent = `Hello, ${user.name}`;
        closeModal(loginModal);
        showToast('Login successful');
    }, 500);
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    // In a real application, this would send a request to a server
    // For demonstration, we'll simulate a successful registration
    
    // Simulate API call
    setTimeout(() => {
        // Simulate successful registration
        const user = { email, name };
        localStorage.setItem('purrBookUser', JSON.stringify(user));
        
        // Update UI
        loginButton.textContent = `Hello, ${user.name}`;
        closeModal(loginModal);
        showToast('Account created successfully');
    }, 500);
}

function handleCheckout() {
    // In a real application, this would redirect to a checkout page
    showToast('Proceeding to checkout...');
    setTimeout(() => {
        showToast('This is a demo. Checkout functionality is not implemented.', 'info');
    }, 2000);
}

// Toast notification system
function showToast(message, type = 'success') {
    // Check if toast container exists, if not create it
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close">&times;</button>
    `;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Add event listener to close button
    const closeButton = toast.querySelector('.toast-close');
    closeButton.addEventListener('click', () => {
        toast.remove();
    });
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Add toast styles if not already in the document
if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.innerHTML = `
        .toast-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
        }
        
        .toast {
            min-width: 250px;
            max-width: 350px;
            background-color: #333;
            color: white;
            border-radius: 4px;
            padding: 12px 24px;
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            animation: slide-in 0.3s ease-out forwards;
        }
        
        .toast.success {
            background-color: #4caf50;
        }
        
        .toast.error {
            background-color: #f44336;
        }
        
        .toast.info {
            background-color: #2196f3;
        }
        
        .toast.warning {
            background-color: #ff9800;
        }
        
        .toast-close {
            background: transparent;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: 10px;
        }
        
        .fade-out {
            opacity: 0;
            transition: opacity 0.5s ease-out;
        }
        
        @keyframes slide-in {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Placeholder for missing images
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'images/placeholder.jpg';
    }
}, true);