import Card from './card';
import { IData } from './interfaces';

export class ShopView {
    private card;
    constructor() {
        this.card = new Card();
    }
    drawCard(data: IData[], view?: string) {
        const values: IData[] | undefined[] = data ? data : [];
        this.card.draw(values, view);
    }
}

export default ShopView;
