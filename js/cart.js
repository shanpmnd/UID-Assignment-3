// CART PAGE
const cartContainer = document.getElementById('cart-items-container')

if (cartContainer) {
    const cartData = localStorage.getItem('cart')
    if (cartData) {
        const items = JSON.parse(cartData)
        items.forEach(function(item, index) {
            const itemQty = item.quantity || 1
            const itemTotal = item.price * itemQty
            cartContainer.innerHTML += `
                <li class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-size">${item.size} | ${item.serves}</p>
                        <div class="cart-item-controls">
                            <div class="cart-qty">
                                <button type="button" class="cart-qty-btn" aria-label="Decrease quantity" onclick="changeQty(${index}, -1)">-</button>
                                <span aria-live="polite">${itemQty}</span>
                                <button type="button" class="cart-qty-btn" aria-label="Increase quantity" onclick="changeQty(${index}, 1)">+</button>
                            </div>
                            <button type="button" class="cart-remove" onclick="removeItem(${index})">Remove</button>
                        </div>
                    </div>
                    <p class="cart-item-price">$${itemTotal}.00</p>
                </li>
                <hr class="cart-divider-line">
            `
        })

        let total = 0
        items.forEach(function(item) { total += item.price * (item.quantity || 1) })
        document.querySelector('.cart-summary-value').textContent = '$' + total + '.00'
        document.querySelector('.cart-total-value').textContent = '$' + total + '.00'
        document.getElementById('order-items-label').textContent = 'ORDER ITEMS (' + items.length + ')'
    }
}

// PAYMENT OVERLAY
const checkoutBtn = document.getElementById('checkout-btn')
const paymentOverlay = document.getElementById('payment-overlay')
const makePaymentBtn = document.getElementById('make-payment-btn')

function getCartTotal() {
    const cartData = localStorage.getItem('cart')
    if (!cartData) return 0
    const items = JSON.parse(cartData)
    let total = 0
    items.forEach(function(item) { total += item.price * (item.quantity || 1) })
    return total
}

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        if (makePaymentBtn) { makePaymentBtn.textContent = 'MAKE PAYMENT – $' + getCartTotal() }
        paymentOverlay.classList.add('active')
        document.body.style.overflow = 'hidden'
    })
}

if (paymentOverlay) {
    paymentOverlay.addEventListener('click', function(event) {
        if (event.target === paymentOverlay) {
            paymentOverlay.classList.remove('active')
            document.body.style.overflow = ''
        }
    })
}

if (paymentOverlay) {
    paymentOverlay.addEventListener('submit', function(event) {
        event.preventDefault()
        window.location.href = 'confirmation.html'
    })
}

// MOBILE CHECKOUT BUTTON
const checkoutBtnMobile = document.getElementById('checkout-btn-mobile')
if (checkoutBtnMobile) {
    checkoutBtnMobile.addEventListener('click', function() {
        if (makePaymentBtn) { makePaymentBtn.textContent = 'MAKE PAYMENT – $' + getCartTotal() }
        paymentOverlay.classList.add('active')
        document.body.style.overflow = 'hidden'
    })
}

// REMOVE ITEM
function removeItem(index) {
    const existing = JSON.parse(localStorage.getItem('cart'))
    existing.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(existing))
    location.reload()
}

// CHANGE QUANTITY IN CART
function changeQty(index, delta) {
    const existing = JSON.parse(localStorage.getItem('cart'))
    const newQty = (existing[index].quantity || 1) + delta
    if (newQty < 1) return
    existing[index].quantity = newQty
    localStorage.setItem('cart', JSON.stringify(existing))
    location.reload()
}
