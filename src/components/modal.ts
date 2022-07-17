import { IData, IUserCart } from './interfaces';
import Cart from './cart';
import Card from './card';

class Modal {
    private cart;
    constructor() {
        this.cart = new Cart();
    }
    drawModal(item: IData) {
        const userS: string = localStorage.getItem('shopUser');
        let itemAddedOne: IUserCart[] = [];
        const local = JSON.parse(localStorage.getItem(userS));
        if (local && local[0]) {
            itemAddedOne = local.filter((i: IUserCart) => i.art === item.art);
        }
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const modal = document.querySelector('#modal') as HTMLTemplateElement;
        const cardClone = modal.content.cloneNode(true) as HTMLElement;
        (cardClone.querySelector('.modal-window__img') as HTMLElement).style.backgroundImage = `url(${
            item.image || 'img/placeholder.jpg'
        })`;
        cardClone.querySelector('.modal-window_art').textContent = item.art;
        cardClone.querySelector('.modal-window_name').textContent = item.name;
        cardClone.querySelector('.item_cat').textContent = item.category;
        cardClone.querySelector('.item_epo').textContent = item.epocsid ? 'Да' : 'Нет';
        cardClone.querySelector('.item_epo-color').textContent =
            item.epocsidColor !== 'none' ? item.epocsidColor : ' - ';
        cardClone.querySelector('.item_wood').textContent = item.woodType;
        cardClone.querySelector('.item_wood-color').textContent = item.woodColor;
        cardClone.querySelector('.item_price').textContent = `${item.price}`;
        cardClone.querySelector('.item_shipping').textContent = item.freeShipping ? 'Да' : 'Нет';
        fragment.append(cardClone);
        document.querySelector('.products-container').append(fragment);
        const close: HTMLElement = document.querySelector('.close-btn');
        close.addEventListener('click', (e: Event) => {
            document.querySelector('.products-container').removeChild(document.querySelector('.overlay'));
        });
        const cartDec: HTMLElement = document.querySelector('.amount-btn_dec');
        let amount: string = (document.querySelector('.amount') as HTMLElement).innerText;
        if (itemAddedOne[0]) {
            amount = itemAddedOne[0].quntity.toString();
            this.cart.chosen = itemAddedOne[0].quntity;
        }
        cartDec.addEventListener('click', (e: Event) => {
            (document.querySelector('.amount') as HTMLElement).innerHTML = this.cart.dec(parseInt(amount)).toString();
        });
        const cartAdd: HTMLElement = document.querySelector('.amount-btn_add');
        cartAdd.addEventListener('click', (e: Event) => {
            (document.querySelector('.amount') as HTMLElement).innerHTML = this.cart.add(parseInt(amount)).toString();
        });
        const addToCart: HTMLInputElement = document.querySelector('.add-to-cart');
        addToCart.addEventListener('click', (e: Event) => {
            const userCart: IUserCart = {
                art: item.art,
                name: item.name,
                img: item.image,
                price: item.price,
                quntity: this.cart.getPrice(),
            };
            this.cart.drawCart(userCart);
            this.cart.deletePrice();
        });
    }
}
export default Modal;
