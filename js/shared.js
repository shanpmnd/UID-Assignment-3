// HAMBURGER MENU TOGGLE
const menuToggle = document.querySelector('.menu-toggle')
const mobileNav = document.getElementById('mobile-nav')
const mobileNavClose = document.getElementById('mobile-nav-close')

if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function() {
        mobileNav.classList.add('open')
    })
}

if (mobileNavClose && mobileNav) {
    mobileNavClose.addEventListener('click', function() {
        mobileNav.classList.remove('open')
    })
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

// PRODUCT DATA
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

// PRODUCT CARD CLICK
const productCardLinks = document.querySelectorAll('.product-card-link[data-id]')
productCardLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'))
        if (id === 1) { localStorage.setItem('selectedProduct', JSON.stringify(item1)) }
        else if (id === 2) { localStorage.setItem('selectedProduct', JSON.stringify(item2)) }
    })
})
