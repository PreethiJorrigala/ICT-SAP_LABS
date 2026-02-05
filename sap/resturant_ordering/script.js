let cart = {};
let total = 0;

const cartDiv = document.getElementById('cart');
const menuItems = document.querySelectorAll('.card');

document.getElementById('showCartBtn').onclick = () => {
    cartDiv.classList.toggle('active');
};

function addToCart(item, price) {
    cart[item] = cart[item] ? { price, qty: cart[item].qty + 1 } : { price, qty: 1 };
    updateCart();
    cartDiv.classList.add('active');
}

function updateCart() {
    const div = document.getElementById("cartItems");
    div.innerHTML = "";
    total = 0;
    for (let i in cart) {
        let itemTotal = cart[i].price * cart[i].qty;
        total += itemTotal;
        div.innerHTML += `<div class="cart-item">${i} x${cart[i].qty}<span>₹${itemTotal}</span></div>`;
    }
    document.getElementById("total").innerText = total;
}

function placeOrder() {
    if (total == 0) {
        alert("Cart is Empty!");
        return;
    }
    alert("Order placed successfully! ₹" + total);
    cart = {};
    updateCart();
    cartDiv.classList.remove('active');
}

function filterCategory(cat, btn) {
    menuItems.forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.category === cat) ? "block" : "none";
    });
    document.querySelectorAll('.category-buttons button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}