import Card from './card';
import { IData } from './interfaces';

export class ShopView {
    private card;
    constructor() {
        this.card = new Card();
    }
    view:string='line-like'
    drawCard(data: IData[]) {
        const values: IData[] | undefined[] = data ? data : [];
        this.card.draw(values);
        console.log('сработал шопвью', values);
    }
    changeView(view:string){
            this.view = view;
            console.log('сработал вью', view);
    }
}

export default ShopView;
