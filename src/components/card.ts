import { IData } from './interfaces';

class Card {
    draw(data: IData[]) {
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const cardItemTemp = document.querySelector('#cardItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const cardClone = cardItemTemp.content.cloneNode(true) as HTMLElement;

            (cardClone.querySelector('.item-img') as HTMLElement).style.backgroundImage = `url(${
                item.image || 'img/news_placeholder.jpg'
            })`;
            cardClone.querySelector('h4').textContent = item.name;
            const c = item.price || '';
            cardClone.querySelector('span').textContent = c as string;

            fragment.append(cardClone);
        });

        document.querySelector('.products-container').innerHTML = '';
        document.querySelector('.products-container').append(fragment);
    }
}

export default Card;
