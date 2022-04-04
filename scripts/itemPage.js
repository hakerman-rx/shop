'use strict'

export function createItemPage(e) {
    if (e.target.tagName === 'BUTTON') return
    const itemPage = document.createElement('div')
    itemPage.className = 'item-page'
    itemPage.innerHTML = `
        <div class="item-page__content">
            <h1 class="item-page__title">${this.querySelector('.product__title').textContent}</h1>
            <div class="item-page__img" style="background-image: url(${this.querySelector('.product__img').src});"></div>
            <p class="item-page__info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aut suscipit
                dolorum molestias fugiat.
                Autem qui perferendis eos vero consequuntur natus expedita repellendus numquam voluptatum recusandae animi
                laboriosam quas eum eveniet, atque blanditiis tenetur ratione soluta repudiandae! Autem odit ut possimus
                consectetur libero vero dolore, ab, eos perspiciatis aliquam incidunt accusantium commodi exercitationem
                nemo recusandae, nihil rem? Odit esse sapiente pariatur iure! Maxime excepturi voluptatibus ex esse earum
                voluptate quod repudiandae aliquam reiciendis atque perferendis, minima dolor optio vitae repellat possimus
                exercitationem facilis reprehenderit sapiente fuga temporibus ea? Labore quis hic, sit delectus corporis,
                aliquid totam animi reprehenderit error impedit voluptate repudiandae quasi earum quo. Enim labore provident
                a debitis, facere aspernatur, eligendi laboriosam, adipisci beatae rem fugiat! Quia, id!</p>
            <button class="item-page__button">Buy Now</button>
            <p class="item-page__price"> Price: $<span>${this.querySelector('.product__price span').textContent}</span></p>
            <span class="item-page__back" id="itemPageClose">back</span>
        </div>
    `
    document.body.append(itemPage)

    const setImgPosition = (e) => {
        img.style.backgroundPositionX = `${-e.offsetX + 80}px`
        img.style.backgroundPositionY = `${-e.offsetY + 80}px`
    }
    let a = 1

    document.getElementById('itemPageClose')
        .addEventListener('click', () => itemPage.remove())
    const img = document.querySelector('.item-page__img')
    img.addEventListener('mousemove', setImgPosition)
    img.addEventListener('click', () => {
        a = -a
        if(a == -1) {
            img.removeEventListener('mousemove', setImgPosition)
        }else {
            img.addEventListener('mousemove', setImgPosition)
        }
    })
    // img.addEventListener('mouseout', () => {
    //     img.addEventListener('mousemove', setImgPosition)
    // })

}