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
    description: 'Crafted with premium Belgium chocolate so that everyone can enjoy! Also made with chocolate drizzle and topped with fresh fruits.',
    size: '6" Whole',
    serves: '6-8 people',
    price: 65,
    sizes: [
        { label: 'S', name: 'Slice', serves: '1–2 people', price: 10 },
        { label: 'M', name: '6" Whole', serves: '6–8 people', price: 65 },
        { label: 'L', name: '8" Whole', serves: '10–12 people', price: 100 }
    ]
}

const item2 = {
    name: 'Biscoff Burnt Basque Cheesecake',
    image: 'assets/cheesecake.png',
    description: 'Crafted with premium ingredients, including velvet cream cheese, smooth Biscoff spread, and a luxurious selection of fresh fruits.',
    size: '6" Whole',
    serves: '6-8 people',
    price: 65,
    sizes: [
        { label: 'S', name: 'Slice', serves: '1–2 people', price: 10 },
        { label: 'M', name: '6" Whole', serves: '6–8 people', price: 65 },
        { label: 'L', name: '8" Whole', serves: '10–12 people', price: 100 }
    ]
}

const productCardLinks = document.querySelectorAll('.product-card-link[data-id]')

productCardLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'))

        if (id === 1) {
            localStorage.setItem('selectedProduct', JSON.stringify(item1))
        }

        else if (id === 2) {
            localStorage.setItem('selectedProduct', JSON.stringify(item2))
        }
    })
})


if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
        const existing = JSON.parse(localStorage.getItem('cart') || '[]')
        const selectedProductRaw = localStorage.getItem('selectedProduct')

        if (selectedProductRaw) {
            const product = JSON.parse(selectedProductRaw)
            existing.push({
                name: product.name,
                image: product.image,
                size: product.size,
                serves: product.serves,
                price: product.price
            })
        }

        localStorage.setItem('cart', JSON.stringify(existing))
        window.location.href = 'cart.html'
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
                <li class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-size">${item.size} | ${item.serves}</p>
                        <div class="cart-item-controls">
                            <div class="cart-qty">
                                <button type="button" class="cart-qty-btn" aria-label="Decrease quantity">-</button>
                                <span aria-live="polite">1</span>
                                <button type="button" class="cart-qty-btn" aria-label="Increase quantity">+</button>
                            </div>
                            <button type="button" class="cart-remove" onclick="removeItem(${index})">Remove</button>
                        </div>
                    </div>
                    <p class="cart-item-price">$${item.price}.00</p>
                </li>
                <hr class="cart-divider-line">
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
            paymentOverlay.classList.remove('active')
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

// PRODUCT DETAIL PAGE
const selectedProduct = localStorage.getItem('selectedProduct')
const productMainImg = document.getElementById('product-main-img')

if (selectedProduct && productMainImg) {
    const product = JSON.parse(selectedProduct)

    document.getElementById('breadcrumb-name').textContent = product.name.toUpperCase()
    document.getElementById('product-name').textContent = product.name.toUpperCase()
    document.getElementById('product-description').textContent = product.description

    productMainImg.src = product.image
    productMainImg.alt = product.name

    document.querySelectorAll('.product-thumb').forEach(function(thumb) {
        thumb.src = product.image
        thumb.alt = product.name
    })

    const pricesDetail = document.getElementById('product-prices-detail')
    pricesDetail.innerHTML = product.sizes.map(function(s) {
        return '<span>' + s.label + ' $' + s.price + '.00</span>'
    }).join('')
}