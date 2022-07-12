import Card from './card';
import { IData } from './interfaces';

export class ShopView {
    private card;
    constructor() {
        this.card = new Card();
    }

    drawCard(data: IData[]) {
        const values: IData[] | undefined[] = data ? data : [];
        this.card.draw(values);
        console.log('сработал шопвью', values);
    }
}

export default ShopView;
