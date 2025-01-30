const products = [
    // Շոկոլադներ
    { 
        id: 1, 
        name: 'Շոկոլադ Սնիկերս', 
        price: 500, 
        image: 'https://images.unsplash.com/photo-1534432182912-63863115e106?w=400',
        category: 'chocolate' 
    },
    { 
        id: 2, 
        name: 'Շոկոլադ Մարս', 
        price: 450, 
        image: 'https://mmshop.am/wa-data/public/shop/products/55/04/455/images/3873/3873.970.jpg', 
        category: 'chocolate' 
    },
    { 
        id: 3, 
        name: 'Շոկոլադ Թվիքս', 
        price: 400, 
        image: 'https://jur.am/media/catalog/product/cache/19d3ab1dca0dc3888973d193ac4915be/t/w/twix-minis.webp', 
        category: 'chocolate' 
    },
    
    // Տորթեր
    { 
        id: 4, 
        name: 'Շոկոլադե տորթ', 
        price: 3500, 
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', 
        category: 'cake' 
    },
    { 
        id: 5, 
        name: 'Մրգային տորթ', 
        price: 4000, 
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400', 
        category: 'cake' 
    },
    { 
        id: 6, 
        name: 'Չիզքեյք', 
        price: 2800, 
        image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400', 
        category: 'cake' 
    },

    // Կոնֆետներ
    { 
        id: 7, 
        name: 'Շոկոլադե կոնֆետներ', 
        price: 600, 
        image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400', 
        category: 'candy' 
    },
    { 
        id: 8, 
        name: 'Կարամելային կոնֆետ', 
        price: 400, 
        image: 'https://i.pinimg.com/736x/b7/bd/30/b7bd307f3a582b176a103351b1e3bdec.jpg', 
        category: 'candy' 
    },
    { 
        id: 9, 
        name: 'Մրգային կոնֆետներ', 
        price: 350, 
        image: 'https://m.media-amazon.com/images/I/91X7r62-pML._AC_UF894,1000_QL80_.jpg', 
        category: 'candy' 
    },

    // Պաղպաղակներ
    { 
        id: 10, 
        name: 'Վանիլային պաղպաղակ', 
        price: 400, 
        image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=400',
        category: 'ice-cream' 
    },
    { 
        id: 11, 
        name: 'Շոկոլադե պաղպաղակ', 
        price: 450, 
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', 
        category: 'ice-cream' 
    },
    { 
        id: 12, 
        name: 'Մրգային պաղպաղակ', 
        price: 500, 
        image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400', 
        category: 'ice-cream' 
    },
];

let cart = [];
let currentCategory = null;

// Պրոդուկտների ցուցադրում
function displayProducts() {
    const productsContainer = document.getElementById('products');
    const filteredProducts = currentCategory 
        ? products.filter(p => p.category === currentCategory)
        : products;

    productsContainer.innerHTML = filteredProducts.map(product => `
        <div class="product animate-fade-in animate-hover-scale">
            <img class="product-image animate-zoom-on-hover" src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Գինը՝ ${product.price} դրամ</p>
            <button onclick="addToCart(${product.id})" class="animate-pulse">Գնել</button>
        </div>
    `).join('');
}

// Զամբյուղում ավելացնել
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

// Զամբյուղից հեռացնել
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Զամբյուղի UI թարմացում
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartModalTotal = document.getElementById('cart-modal-total');
    const cartItems = document.getElementById('cart-items');

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = `Ընդհանուր: ${totalPrice} դրամ`;
    cartModalTotal.textContent = `Ընդհանուր: ${totalPrice} դրամ`;

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>${item.price * item.quantity} դրամ</span>
            <button onclick="removeFromCart(${item.id})">Հեռացնել</button>
        </div>
    `).join('');
}

// Մոդալ պատուհանի կառավարում
const modal = document.getElementById('cart-modal');
const cartButton = document.getElementById('cart-button');
const closeButton = document.getElementsByClassName('close')[0];
const checkoutButton = document.getElementById('checkout');

cartButton.onclick = () => modal.style.display = 'block';
closeButton.onclick = () => modal.style.display = 'none';
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

checkoutButton.onclick = () => {
    if (cart.length === 0) {
        alert('Զամբյուղը դատարկ է');
        return;
    }
    alert('Շնորհակալություն գնումների համար');
    cart = [];
    updateCartUI();
    modal.style.display = 'none';
}

// Մենյուի կոճակների իրադարձությունների կառավարում
document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Ակտիվ կլասի թարմացում
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Կատեգորիայի թարմացում և պրոդուկտների ֆիլտրում
            currentCategory = link.dataset.category || null;
            displayProducts();
        });
    });

    displayProducts();
});

// Էջի բեռնման ժամանակ ցուցադրել պրոդուկտները
document.addEventListener('DOMContentLoaded', displayProducts);

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card animate-fade-in animate-hover-scale';
    
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.className = 'product-image animate-zoom-on-hover';
    
    // ... rest of the product card creation code ...
    
    return card;
} 