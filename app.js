// ຂໍ້ມູນສິນຄ້າຕົວຢ່າງ
const products = [
    { id: 1, name: 'ນ້ຳດື່ມ', price: 5000, image: '/api/placeholder/150/100' },
    { id: 2, name: 'ເຂົ້າໜົມປັງ', price: 10000, image: '/api/placeholder/150/100' },
    { id: 3, name: 'ນ້ຳໝາກໄມ້', price: 15000, image: '/api/placeholder/150/100' },
    { id: 4, name: 'ອາຫານແຫ້ງ', price: 20000, image: '/api/placeholder/150/100' },
    { id: 5, name: 'ເຂົ້າກ່ອງ', price: 25000, image: '/api/placeholder/150/100' },
    { id: 6, name: 'ຂະໜົມ', price: 8000, image: '/api/placeholder/150/100' }
];

let cart = [];

// ສະແດງສິນຄ້າທັງໝົດ
function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = products.map(product => `
        <div class="product-item" onclick="addToCart(${product.id})">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₭${product.price.toLocaleString()}</p>
        </div>
    `).join('');
}

// ເພີ່ມສິນຄ້າໃສ່ກະຕ່າ
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
}

// ອັບເດດການສະແດງກະຕ່າສິນຄ້າ
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <div class="quantity-control">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <span>₭${item.price.toLocaleString()}</span>
            <span>₭${(item.price * item.quantity).toLocaleString()}</span>
        </div>
    `).join('');

    updateTotal();
}

// ອັບເດດຈຳນວນສິນຄ້າ
function updateQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        updateCartDisplay();
    }
}

// ຄຳນວນລາຄາລວມ
function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('totalAmount').textContent = `₭${total.toLocaleString()}`;
}

// ດຳເນີນການຊຳລະເງິນ
function processPayment() {
    if (cart.length === 0) {
        alert('ກະລຸນາເລືອກສິນຄ້າກ່ອນ');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const receivedAmount = parseFloat(document.getElementById('receivedAmount').value) || 0;

    if (receivedAmount < total) {
        alert('ຈຳນວນເງິນບໍ່ພຽງພໍ');
        return;
    }

    const change = receivedAmount - total;
    document.getElementById('changeAmount').textContent = `₭${change.toLocaleString()}`;

    alert(`ການຊຳລະເງິນສຳເລັດ!\nຈຳນວນເງິນທີ່ຮັບ: ₭${receivedAmount.toLocaleString()}\nເງິນທອນ: ₭${change.toLocaleString()}`);

    // ລ້າງຂໍ້ມູນຫຼັງຈາກຊຳລະເງິນສຳເລັດ
    document.getElementById('receivedAmount').value = '';
    document.getElementById('changeAmount').textContent = '₭0';
    clearCart();
}

// ລ້າງກະຕ່າສິນຄ້າ
function clearCart() {
    cart = [];
    updateCartDisplay();
}

// ເລີ່ມຕົ້ນສະແດງສິນຄ້າ
displayProducts();