import { IData } from './interfaces';
import Modal from './modal';

class Card {
    private modal;
    constructor() {
        this.modal = new Modal();
    }
    draw(data: IData[], view?: string) {
        const userS: string = localStorage.getItem('shopUser');
        const itemAdded: IData[] = JSON.parse(localStorage.getItem(userS));
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const cardItemTemp = document.querySelector('#cardItemTemp') as HTMLTemplateElement;
        const cardItemTempRow = document.querySelector('#cardItemTempRow') as HTMLTemplateElement;
        if (!view || view === 'block-like') {
            data.forEach((item) => {
                const cardClone = cardItemTemp.content.cloneNode(true) as HTMLElement;
                (cardClone.querySelector('.item-img') as HTMLElement).style.backgroundImage = `url(${
                    item.image || 'img/placeholder.jpg'
                })`;
                if (itemAdded && itemAdded[0]) {
                    for (let i = 0; i < itemAdded.length; i++) {
                        if (itemAdded[i].art == item.art) {
                            (cardClone.querySelector('.item-img') as HTMLElement).classList.add('added');
                        }
                    }
                }
                cardClone.querySelector('.container').classList.add(item.art);
                cardClone.querySelector('h4').textContent = item.name;
                const c = item.price || '';
                cardClone.querySelector('span').textContent = c as string;
                fragment.append(cardClone);
            });
        } else {
            data.forEach((item) => {
                const cardClone = cardItemTempRow.content.cloneNode(true) as HTMLElement;
                (cardClone.querySelector('.item-row_item-img') as HTMLElement).style.backgroundImage = `url(${
                    item.image || 'img/placeholder.jpg'
                })`;
                if (itemAdded && itemAdded[0]) {
                    for (let i = 0; i < itemAdded.length; i++) {
                        if (itemAdded[i].art == item.art) {
                            (cardClone.querySelector('.item-row_item-img') as HTMLElement).classList.add('added');
                        }
                    }
                }
                cardClone.querySelector('.container_row').classList.add(item.art);
                cardClone.querySelector('.item_art').textContent = item.art;
                cardClone.querySelector('.item_name').textContent = item.name;
                cardClone.querySelector('.item_cat').textContent = item.category;
                cardClone.querySelector('.item_epo').textContent = item.epocsid ? 'Да' : 'Нет';
                cardClone.querySelector('.item_epo-color').textContent =
                    item.epocsidColor !== 'none' ? item.epocsidColor : ' - ';
                cardClone.querySelector('.item_wood').textContent = item.woodType;
                cardClone.querySelector('.item_wood-color').textContent = item.woodColor;
                cardClone.querySelector('.item_price').textContent = `${item.price}`;
                cardClone.querySelector('.item_shipping').textContent = item.freeShipping ? 'Да' : 'Нет';
                cardClone.querySelector('.item_date').textContent = item.date;
                fragment.append(cardClone);
            });
        }
        document.querySelector('.products-container').innerHTML = '';
        document.querySelector('.products-container').append(fragment);
        const mod = document.querySelectorAll('.hidden, .hidden_row');
        for (let i = 0; i < mod.length; i++) {
            mod[i].addEventListener('click', (e: Event) => {
                console.log((e.target as HTMLElement).parentElement.closest('div').className);
                const items: IData[] = data.filter(function (obj: IData) {
                    return (
                        obj.art ===
                        (e.target as HTMLElement).parentElement
                            .closest('.container, .container_row')
                            .className.split(' ')[1]
                    );
                });
                this.modal.drawModal(items[0]);
            });
        }
    }
}

export default Card;
