'use strict'

import { addToCart, renderCart, clearCart, setItemCount, showItemCart, CartComponent} from "./cart.js"
import { HeaderMenu } from "./HeaderMenu.js"
import { createItemPage } from "./itemPage.js"
//регистрируэм веб компонент

customElements.define('header-menu', HeaderMenu)
customElements.define('cart-component', CartComponent)

const cart = document.getElementById('cart')
const openCart = document.getElementById('open-cart')
const cartContent = document.getElementById('cart-content')
const cartClose = document.getElementById('cart-close')
const cartClear = document.getElementById('cart-clear')
const itemCount = document.getElementById('itemCount')
const productItem = document.querySelectorAll(".product__item")

setItemCount(itemCount)

const addCart = document.querySelectorAll('.product__add-cart')
openCart.addEventListener('click', () => {
    renderCart(cartContent, itemCount, addCart)

    cart.style.display = 'flex'
    document.documentElement.style.overflow = 'hidden'
})
cartClose.addEventListener('click', () => {
     cart.style.display = 'none'
     document.documentElement.style.overflow = 'auto'
 })

addCart.forEach(btn => {
    btn.addEventListener('click', e => addToCart(e, ".product__title", ".product__price span", itemCount, addCart))
});

cartClear.addEventListener('click', () => clearCart(cartContent, itemCount, addCart))
// let user = {name:"vasya",1:true}
// delete user[1]
// console.log(user)
// console.log(Object.keys(user).length)

showItemCart(addCart)

productItem.forEach( item => {
    // item.addEventListener("click", (e) => {
    //     document.documentElement.style.overflow = 'hidden'
    //     createItemPage(e)
    // })
    item.addEventListener("click", createItemPage)
})
