// ADD TO CART

const addToCartBtn = document.querySelector(' .add-to-cart-btn')

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
        if (document.title === 'Triple Chocolate Cake — Her Little Patisserie') {
        localStorage.setItem('cart', JSON.stringify([item1]))
        } 
        
        else if (document.title === 'Biscoff Burnt Basque Cheesecake — Her Little Patisserie') {
        localStorage.setItem('cart', JSON.stringify([item2]))
}
    })
}

// CART PAGE - reading from localStorage

const cartContainer = document.getElementById('cart-items-container')

if (cartContainer) {
    const cartData = localStorage.getItem('cart')

    if (cartData) {
        const items = JSON.parse(cartData) 

        items.forEach(function(item) {
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
                            <a href="#" class="cart-remove">Remove</a>
                        </div>
                    </div>
                    <p class="cart-item-price">$${item.price}.00</p>
                </div>
                <hr class="cart-divider-line"></hr>
            `

        })

        

       
    }
}