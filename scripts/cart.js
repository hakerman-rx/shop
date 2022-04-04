'use strict'

const KEY = 'cart~&Ё'

//добавляем данные в хранилище
function setCartData(obj) {
    localStorage.setItem(KEY, JSON.stringify(obj))
    return false
}

//получаем данные из хранилища
function getCartData() {
    return JSON.parse(localStorage.getItem(KEY))
}

//очищаем корзину
export function clearCart(cart, itemCount, addCart) {
    localStorage.removeItem(KEY)
    renderCart(cart, itemCount, addCart)
    setItemCount(itemCount)
    showItemCart(addCart)
}

//добавляем товар в корзину
export function addToCart(event, title, price, itemCount, addCart) {
    let target = event.target
    target.disabled = true
    const cartData = getCartData() || {}
    let itemId = target.dataset.id
    let itemParent = target.parentElement
    let itemTitle = itemParent.querySelector(title).textContent
    let itemPrice = itemParent.querySelector(price).textContent
    let itemImg = itemParent.querySelector('img').src
    if (!cartData.hasOwnProperty(itemId)) {
        cartData[itemId] = [itemTitle, itemPrice, itemImg]
    }
    if (!setCartData(cartData)) {
        target.disabled = false
    }
    setItemCount(itemCount)
    let alertProduct = document.createElement('div')
    alertProduct.className = 'alert-product'
    alertProduct.innerHTML = `<p><span>${itemTitle}</span> added to cart</p>`
    document.body.append(alertProduct)
    setTimeout(() => alertProduct.remove(), 2000)
    showItemCart(addCart)
}

//выводим корзину на экран

export function renderCart(cart, itemCount, addCart) {
    const cartData = getCartData()
    let totalItems, totalSum = 0;
    if (!cartData || Object.keys(cartData).length === 0) {
        totalItems = '<p class="cart__empty">Cart Empty</p>'
    } else {
        totalItems = '<table class = "cart__table"><thead><tr><th>Title</th><th>Price</th></tr></thead><tbody>'
        for (const id in cartData) {
            totalItems += `<tr>`
            for (let i = 0; i < cartData[id].length; i++) {
                if(i == 2) {
                    totalItems += `<td class='cart__img' style='background-image: url(${cartData[id][i]});' ></td>`
                }else {
                    totalItems += `<td>${cartData[id][i]}</td>`
                }
            }
            totalItems += `<td><button class="cart__delete" data-id = ${id}></button></td>`
            totalItems += `</tr>`
            totalSum += +cartData[id][1]
        }
        totalItems += `</tbody></table>`
        totalItems += `<p>Total Price: ${totalSum}</p>`
    }
    cart.innerHTML = totalItems
    addEventDeleteItemCart(cart, itemCount, addCart)
}

//Удаление одного товара из карзины

function deleteItemCart(e, cart, itemCount, addCart) {
    const cartData = getCartData()
    delete cartData[e.target.dataset.id]
    setCartData(cartData)
    renderCart(cart, itemCount, addCart)
    setItemCount(itemCount)
    showItemCart(addCart)
}
//Добавить событие для добавленя товара

function addEventDeleteItemCart(cart, itemCount, addCart) {
    const deleteItem = document.querySelectorAll('.cart__delete')
    deleteItem.forEach((btn) => {
        btn.addEventListener('click', (e) => deleteItemCart(e, cart, itemCount, addCart))
    })
}

export function setItemCount(elem) {
    let cartData = getCartData()
    elem.textContent = cartData ? Object.keys(cartData).length : 0
}


export function showItemCart(addCart) {
    let cartData = getCartData()
    addCart.forEach((btn) => {
        btn.textContent = (cartData && Object.keys(cartData).length != 0 && cartData.hasOwnProperty(btn.dataset.id)) ?
        'Added to cart' :
        'Add to cart'
    })
} 

export class CartComponent extends HTMLElement{
    connectedCallback() {
        this.innerHTML = `
        <div class="cart" id="cart">
            <div class="cart__body">
                <button class="cart__clear" id="cart-clear">Clear Cart</button>
                <div class="cart__content" id="cart-content"></div>
                <span class="cart__close" id="cart-close"></span>
                
            </div>
        </div>
        `
    }
}

