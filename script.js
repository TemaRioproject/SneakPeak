
const cartContainer = document.getElementById('cart-items');
const clearCartButton = document.getElementById('clearCartButton');
const calculateTotalButton = document.getElementById('calculateTotalButton');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    cartContainer.innerHTML = ''; 

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Ваша корзина пуста.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        
        itemDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${item.imageUrl}" alt="${item.product}" width="50" height="50" style="border-radius: 50%;">
                <div>
                    <p><strong>${item.product}</strong></p>
                    <p>Цена: ${item.price}тг</p>
                </div>
            </div>
            <button onclick="removeFromCart(${index})" class="remove-button">Удалить</button>
        `;
        
        cartContainer.appendChild(itemDiv);
    });
}

function addToCart(product, price, imageUrl) {
    const item = {
        product,
        price: parseFloat(price), 
        imageUrl
    };
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}


function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    alert(`Общая сумма: ${total.toFixed(2)}тг`);
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.target.getAttribute('data-product');
        const price = e.target.getAttribute('data-price').replace('тг', '').trim();
        const imageUrl = e.target.previousElementSibling.getAttribute('src');
        addToCart(product, price, imageUrl);
    });
});

clearCartButton.addEventListener('click', clearCart);
calculateTotalButton.addEventListener('click', calculateTotal);

renderCart();
