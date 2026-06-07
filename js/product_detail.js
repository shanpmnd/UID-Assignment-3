// PRODUCT DETAIL PAGE
const addToCartBtn = document.querySelector('.add-to-cart-btn')
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

    const priceRange = document.getElementById('product-price-range')
    if (priceRange) {
        const min = product.sizes[0].price
        const max = product.sizes[product.sizes.length - 1].price
        priceRange.textContent = '$' + min + '.00 – $' + max + '.00'
    }

    // QUANTITY SELECTOR
    let currentQty = 1
    const qtyValue = document.querySelector('.qty-value')
    const qtyBtns = document.querySelectorAll('.qty-btn')

    function updateQty(newQty) {
        if (newQty < 1) return
        currentQty = newQty
        qtyValue.textContent = currentQty
        if (addToCartBtn) {
            addToCartBtn.textContent = 'ADD TO CART – $' + (product.price * currentQty) + '.00'
        }
    }

    if (qtyBtns.length === 2) {
        qtyBtns[0].addEventListener('click', function() { updateQty(currentQty - 1) })
        qtyBtns[1].addEventListener('click', function() { updateQty(currentQty + 1) })
    }

    // SIZE SELECTOR
    const sizeCards = document.querySelectorAll('.size-card')
    sizeCards.forEach(function(card, index) {
        card.addEventListener('click', function() {
            sizeCards.forEach(function(c) { c.classList.remove('selected') })
            card.classList.add('selected')
            const chosenSize = product.sizes[index]
            product.size = chosenSize.name
            product.serves = chosenSize.serves
            product.price = chosenSize.price
            if (addToCartBtn) {
                addToCartBtn.textContent = 'ADD TO CART – $' + (chosenSize.price * currentQty) + '.00'
            }
            localStorage.setItem('selectedProduct', JSON.stringify(product))
        })
    })
}

// ADD TO CART
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
        const existing = JSON.parse(localStorage.getItem('cart') || '[]')
        const selectedProductRaw = localStorage.getItem('selectedProduct')
        if (selectedProductRaw) {
            const product = JSON.parse(selectedProductRaw)
            const qty = parseInt(document.querySelector('.qty-value')?.textContent) || 1
            existing.push({
                name: product.name,
                image: product.image,
                size: product.size,
                serves: product.serves,
                price: product.price,
                quantity: qty
            })
        }
        localStorage.setItem('cart', JSON.stringify(existing))
        window.location.href = 'cart.html'
    })
}
