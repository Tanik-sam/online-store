import data from '../../data.json';
import { ShopView } from './shopView';
import { IData } from './interfaces';
import { Filter, Category, Selection, WoodColor, PriceChange, Check, Reseter, Sorting } from './filters';

class Start {
    private view;
    constructor() {
        this.view = new ShopView();
    }
    viewView:string='line-like';
    dataFiltered: IData[] = data;
    categoryBeforeChange: IData[] = data.slice();
    changeCategory = false;
    selectionBeforeChange: IData[] = data.slice();
    changeSelection = false;
    woodColorBeforeChange: IData[] = data.slice();
    changeWoodColor = false;
    priceBeforeChange: IData[] = data.slice();
    changePrice = false;
    checkBeforeChange: IData[] = data.slice();
    changeCheck = false;
    start(): void {
        window.addEventListener('load', (e: Event) => {
            this.dataFiltered = Sorting('price-lowest', this.dataFiltered);
            this.view.drawCard(this.dataFiltered);
        });
        const line: HTMLElement = document.querySelector('.line-like');
        line.addEventListener('click', (e: Event) => {
            this.view.changeView('line-like');
        });
        const block: HTMLElement = document.querySelector('.block-like');
        block.addEventListener('click', (e: Event) => {
            this.view.changeView('block-like');
        });
        const screen: HTMLElement = document.getElementById('search');
        const input: string = (document.getElementById('search') as HTMLInputElement | null).value;
        screen.addEventListener('input', (e: Event) => {
            this.dataFiltered = Filter();
            this.view.drawCard(this.dataFiltered);
        });
        const category: HTMLElement = document.querySelector('.category') as HTMLInputElement | null;
        category.addEventListener('click', (e: Event) => {
            if (this.changeCategory) {
                this.dataFiltered = Category((e.target as HTMLButtonElement).name, this.categoryBeforeChange);
            } else {
                this.categoryBeforeChange = this.dataFiltered.slice();
                this.dataFiltered = Category((e.target as HTMLButtonElement).name, this.dataFiltered);
            }
            this.view.drawCard(this.dataFiltered);
            this.changeCategory = true;
        });
        const selection: HTMLElement = document.querySelector('.wood-select') as HTMLInputElement | null;
        selection.addEventListener('change', (e: Event) => {
            if (this.changeSelection) {
                this.dataFiltered = Selection((e.target as HTMLButtonElement).value, this.selectionBeforeChange);
            } else {
                this.selectionBeforeChange = this.dataFiltered.slice();
                this.dataFiltered = Selection((e.target as HTMLButtonElement).value, this.dataFiltered);
            }
            this.view.drawCard(this.dataFiltered);
            this.changeSelection = true;
        });
        const woodColor: HTMLElement = document.querySelector('.colors') as HTMLElement | null;
        woodColor.addEventListener('click', (e: Event) => {
            if (this.changeWoodColor) {
                this.dataFiltered = WoodColor((e.target as HTMLButtonElement).name, this.woodColorBeforeChange);
            } else {
                this.woodColorBeforeChange = this.dataFiltered.slice();
                this.dataFiltered = WoodColor((e.target as HTMLButtonElement).name, this.dataFiltered);
            }
            this.view.drawCard(this.dataFiltered);
            this.changeWoodColor = true;
        });
        const price: HTMLElement = document.getElementById('price') as HTMLElement | null;
        const priceView: HTMLElement = document.querySelector('.price') as HTMLElement | null;
        price.addEventListener('change', (e: Event) => {
            priceView.innerHTML = `${(e.target as HTMLButtonElement).value} бел. руб`;
            if (this.changePrice) {
                this.dataFiltered = PriceChange(
                    parseInt((e.target as HTMLButtonElement).value),
                    this.priceBeforeChange
                );
            } else {
                this.priceBeforeChange = this.dataFiltered.slice();
                this.dataFiltered = PriceChange(parseInt((e.target as HTMLButtonElement).value), this.dataFiltered);
            }
            this.view.drawCard(this.dataFiltered);
            this.changePrice = true;
        });
        const check: HTMLInputElement = document.getElementById('shipping') as HTMLInputElement | null;
        check.addEventListener('click', (e: Event) => {
            if (this.changeCheck) {
                this.dataFiltered = Check(check.checked, this.checkBeforeChange);
            } else {
                this.checkBeforeChange = this.dataFiltered.slice();
                this.dataFiltered = Check(check.checked, this.dataFiltered);
            }
            this.view.drawCard(this.dataFiltered);
            this.changeCheck = true;
        });
        const res: HTMLInputElement = document.getElementById('reset') as HTMLInputElement | null;
        res.addEventListener('click', (e: Event) => {
            this.dataFiltered = Reseter();
            this.view.drawCard(this.dataFiltered);
            (document.querySelector('.price') as HTMLElement | null).innerHTML = `50 бел. руб`;
            (document.getElementById('price') as HTMLInputElement | null).value = '50';
        });
        const sorting: HTMLElement = document.getElementById('sort') as HTMLInputElement | null;
        sorting.addEventListener('change', (e: Event) => {
            console.log((e.target as HTMLButtonElement).value);
            this.dataFiltered = Sorting((e.target as HTMLButtonElement).value, this.dataFiltered);
            this.view.drawCard(this.dataFiltered);
        });
    }
}

export default Start;
