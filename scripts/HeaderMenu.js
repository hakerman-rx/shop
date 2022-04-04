export class HeaderMenu extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="header">
            <nav>
                <ul class="menu">
                    <li><a href=${this.getAttribute('link-home')}>Home</a></li>
                    <li><a href=${this.getAttribute('link-phone')}>Smartphones</a></li>
                    <li><a href=${this.getAttribute('link-pc')}>PC</a></li>
                </ul>
            </nav>
            <div class="open-cart" id="open-cart">
                <span id="itemCount"></span>
            </div>
        </header>
        `
    }
}