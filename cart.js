

const wheel = document.getElementById('wheel');
const result = document.getElementById('result');
const spinButton = document.getElementById('spinButton');
const discounts = ['50%', '40%', '30%', '20%', '10%'];

function spinWheel() {
    spinButton.disabled = true;

    const randomDegree = Math.floor(Math.random() * 360);
    const spins = 5;
    const totalDegree = randomDegree + spins * 360;

    wheel.style.transform = `rotate(${totalDegree}deg)`;

    setTimeout(() => {
        const segment = Math.floor((360 - (randomDegree % 360)) / 72);
        const discount = discounts[segment];

        result.innerText = `Поздравляем! Ваша скидка: ${discount}`;

        spinButton.style.display = 'none';
    }, 3000); 
}

const cartContainer = document.getElementById('cart-items');
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

        const priceFormatted = item.price.toFixed(2);

        itemDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${item.imageUrl}" alt="${item.product}" width="100" style="border-radius: 10px;">
                <div>
                    <p><strong>${item.product}</strong></p>
                    <p>Цена: ${priceFormatted} тг</p>
                </div>
            </div>
            <button onclick="removeFromCart(${index})" class="remove-button">Удалить</button>
        `;

        cartContainer.appendChild(itemDiv);
    });

    calculateTotal();
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
    const total = cart.reduce((sum, item) => {
        return sum + item.price;
    }, 0);

    const totalFormatted = total.toFixed(2);
    document.getElementById('total-sum').textContent = `Общая сумма: ${totalFormatted} тг`;
}

renderCart();
