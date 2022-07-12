import data from '../../data.json';
import { ShopView } from './shopView';
import { IData } from './interfaces';
import { Filter, Category, Selection, WoodColor, PriceChange, Check, Reseter } from './filters';

class Start {
    private view;
    constructor() {
        this.view = new ShopView();
    }

    start(): void {
        let dataFiltered: IData[] = data;
        window.addEventListener('load', (e: Event) => {
            this.view.drawCard(data);
        });
        const screen: HTMLElement = document.getElementById('search');
        const input: string = (document.getElementById('search') as HTMLInputElement | null).value;
        screen.addEventListener('input', (e: Event) => {
            dataFiltered = Filter();
            this.view.drawCard(dataFiltered);
        });
        const category: HTMLElement = document.querySelector('.category') as HTMLInputElement | null;
        category.addEventListener('click', (e: Event) => {
            dataFiltered = Category((e.target as HTMLButtonElement).name);
            this.view.drawCard(dataFiltered);
        });
        const selection: HTMLElement = document.querySelector('.wood-select') as HTMLInputElement | null;
        selection.addEventListener('change', (e: Event) => {
            dataFiltered = Selection((e.target as HTMLButtonElement).value);
            this.view.drawCard(dataFiltered);
        });
        const woodColor: HTMLElement = document.querySelector('.colors') as HTMLElement | null;
        woodColor.addEventListener('click', (e: Event) => {
            dataFiltered = WoodColor((e.target as HTMLButtonElement).name);
            this.view.drawCard(dataFiltered);
        });
        const price: HTMLElement = document.getElementById('price') as HTMLElement | null;
        const priceView: HTMLElement = document.querySelector('.price') as HTMLElement | null;
        price.addEventListener('change', (e: Event) => {
            priceView.innerHTML = `${(e.target as HTMLButtonElement).value} бел. руб`;
            dataFiltered = PriceChange(parseInt((e.target as HTMLButtonElement).value));
            this.view.drawCard(dataFiltered);
        });
        const check: HTMLInputElement = document.getElementById('shipping') as HTMLInputElement | null;
        check.addEventListener('click', (e: Event) => {
            dataFiltered = Check(check.checked);
            this.view.drawCard(dataFiltered);
        });
        const res: HTMLInputElement = document.getElementById('reset') as HTMLInputElement | null;
        res.addEventListener('click', (e: Event) => {
            dataFiltered = Reseter();
            this.view.drawCard(dataFiltered);
        });
    }
}

export default Start;
