import data from '../../data.json';
import { ShopView } from './shopView';
import Cart from './cart';
import FilterNew from './filters';
import { IData } from './interfaces';

class Start {
    private view;
    private cart;
    private filter;
    constructor() {
        this.view = new ShopView();
        this.cart = new Cart();
        this.filter = new FilterNew();
    }
    user = localStorage.shopUser || null;
    dataFiltered: IData[] = data;
    start(): void {
        window.addEventListener('load', (e: Event) => {
            this.dataFiltered = this.filter.sorting('price-lowest');
            this.view.drawCard(this.dataFiltered);
            this.user = localStorage.shopUser ? localStorage.shopUser : localStorage.setItem('shopUser', 'unknown');
            this.cart.update();
            const cartVlaue: HTMLElement = document.querySelector('.cart-value') as HTMLElement | null;
            cartVlaue.innerText = this.cart.getItemNumbers().toString();
        });
        const line: HTMLElement = document.querySelector('.line-like');
        line.addEventListener('click', (e: Event) => {
            this.view.drawCard(this.dataFiltered, 'line-like');
        });
        const block: HTMLElement = document.querySelector('.block-like');
        block.addEventListener('click', (e: Event) => {
            this.view.drawCard(this.dataFiltered, 'block-like');
        });
        const screen: HTMLElement = document.getElementById('search');
        const input: string = (document.getElementById('search') as HTMLInputElement | null).value;
        screen.addEventListener('input', (e: Event) => {
            this.dataFiltered = this.filter.search();
            this.view.drawCard(this.dataFiltered);
        });
        const category: HTMLElement = document.querySelector('.category') as HTMLInputElement | null;
        category.addEventListener('click', (e: Event) => {
            this.dataFiltered = this.filter.category((e.target as HTMLButtonElement).name);
            this.view.drawCard(this.dataFiltered);
        });
        const selection: HTMLElement = document.querySelector('.wood-select') as HTMLInputElement | null;
        selection.addEventListener('change', (e: Event) => {
            this.dataFiltered = this.filter.selection((e.target as HTMLButtonElement).value);
            this.view.drawCard(this.dataFiltered);
        });
        const woodColor: HTMLElement = document.querySelector('.colors') as HTMLElement | null;
        woodColor.addEventListener('click', (e: Event) => {
            this.dataFiltered = this.filter.woodColor((e.target as HTMLButtonElement).name);
            this.view.drawCard(this.dataFiltered);
        });
        const price: HTMLElement = document.getElementById('price') as HTMLElement | null;
        const priceView: HTMLElement = document.querySelector('.price') as HTMLElement | null;
        price.addEventListener('change', (e: Event) => {
            priceView.innerHTML = `${(e.target as HTMLButtonElement).value} бел. руб`;
            this.dataFiltered = this.filter.priceChange(parseInt((e.target as HTMLButtonElement).value));
            this.view.drawCard(this.dataFiltered);
        });
        const check: HTMLInputElement = document.getElementById('shipping') as HTMLInputElement | null;
        check.addEventListener('click', (e: Event) => {
            this.dataFiltered = this.filter.check(check.checked);
            this.view.drawCard(this.dataFiltered);
        });
        const res: HTMLInputElement = document.getElementById('reset') as HTMLInputElement | null;
        res.addEventListener('click', (e: Event) => {
            this.dataFiltered = this.filter.reseter();
            this.view.drawCard(this.dataFiltered);
            (document.querySelector('.price') as HTMLElement | null).innerHTML = `50 бел. руб`;
            (document.getElementById('price') as HTMLInputElement | null).value = '50';
        });
        const sorting: HTMLElement = document.getElementById('sort') as HTMLInputElement | null;
        sorting.addEventListener('change', (e: Event) => {
            this.dataFiltered = this.filter.sorting((e.target as HTMLButtonElement).value);
            this.view.drawCard(this.dataFiltered);
        });
        const cart: HTMLElement = document.querySelector('.cart-btn') as HTMLInputElement | null;
        cart.addEventListener('click', (e: Event) => {
            this.cart.drawCart();
        });
    }
}

export default Start;
