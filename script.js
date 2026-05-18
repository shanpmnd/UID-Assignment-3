// CLEAR CART ON HOME PAGE - for clean refresh
if (document.title === 'Her Little Patisserie') {
    localStorage.removeItem('cart')
}

// CLEAR CART ON CONFIRMATION PAGE
if (document.title === 'Order Confirmed — Her Little Patisserie') {
    localStorage.removeItem('cart')
}

// ADD TO CART
const addToCartBtn = document.querySelector('.add-to-cart-btn')

const item1 = {
    name: 'Triple Chocolate Cake',
    image: 'assets/choc_cake.png',
    size: '6" Whole',
    serves: '6-8 people',
    price: 65
}

const item2 = {
    name: 'Biscoff Burnt Basque Cheesecake',
    image: 'assets/cheesecake.png',
    size: '6" Whole',
    serves: '6-8 people',
    price: 65
}

if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
        const existing = JSON.parse(localStorage.getItem('cart') || '[]')

        if (document.title === 'Triple Chocolate Cake — Her Little Patisserie') {
            existing.push(item1)
        } else if (document.title === 'Biscoff Burnt Basque Cheesecake — Her Little Patisserie') {
            existing.push(item2)
        }

        localStorage.setItem('cart', JSON.stringify(existing))
    })
}

// CART PAGE - reading from localStorage
const cartContainer = document.getElementById('cart-items-container')

if (cartContainer) {
    const cartData = localStorage.getItem('cart')

    if (cartData) {
        const items = JSON.parse(cartData) 

        items.forEach(function(item, index) {
            cartContainer.innerHTML += `
            <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-size">${item.size} | ${item.serves}</p>
                        <div class="cart-item-controls">
                            <div class="cart-qty">
                                <button class="cart-qty-btn">-</button>
                                <span>1</span>
                                <button class="cart-qty-btn">+</button>
                            </div>
                            <a href="#" class="cart-remove" onclick="removeItem(${index})">Remove</a>
                        </div>
                    </div>
                    <p class="cart-item-price">$${item.price}.00</p>
                </div>
                <hr class="cart-divider-line"></hr>
            `
        })

        // UPDATE TOTAL
        let total = 0
        items.forEach(function(item) {
            total += item.price
        })

        document.querySelector('.cart-summary-value').textContent = '$' + total + '.00'
        document.querySelector('.cart-total-value').textContent = '$' + total + '.00'
        document.getElementById('order-items-label').textContent = 'ORDER ITEMS (' + items.length + ')'
    }
}

// PAYMENT OVERLAY
const checkoutBtn = document.getElementById('checkout-btn')
const paymentOverlay = document.getElementById('payment-overlay')
const makePaymentBtn = document.getElementById('make-payment-btn')

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        // Set the dynamic total on the button
        const cartData = localStorage.getItem('cart')
        if (cartData && makePaymentBtn) {
            const items = JSON.parse(cartData)
            let total = 0
            items.forEach(function(item) {
                total += item.price
            })
            makePaymentBtn.textContent = 'MAKE PAYMENT – $' + total
        }
        paymentOverlay.classList.add('active')
        document.body.style.overflow = 'hidden'
    })
}

// Close if clicking outside the panel 
if (paymentOverlay) {
    paymentOverlay.addEventListener('click', function(event) {
        if (event.target === paymentOverlay) {
            paymentOverlay.classList.remove('active') // changes css back to hidden
            document.body.style.overflow = ''
        }
    })
}

if (makePaymentBtn) {
    makePaymentBtn.addEventListener('click', function() {
        window.location.href = 'confirmation.html'
    })
}

// REMOVE ITEM
function removeItem(index) {
    const existing = JSON.parse(localStorage.getItem('cart'))
    existing.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(existing))
    location.reload()
}

// UPDATE CART BADGE
const cartBadge = document.getElementById('cart-badge')

if (cartBadge) {
    const cartData = localStorage.getItem('cart')
    if (cartData) {
        const items = JSON.parse(cartData)
        cartBadge.textContent = items.length
    }
}