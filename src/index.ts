import './pages/main/style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import Start from './components/start';
import { Filter } from './components/filters';
import { IData } from './components/interfaces';
import data from '../data.json';

/*let dataFiltered: IData[] = data;
const screen: HTMLElement = document.getElementById('search');
const input: string = (document.getElementById('search') as HTMLInputElement | null).value;
screen.addEventListener('input', (e: Event) => {
    dataFiltered = Filter();
});
const container: HTMLElement = document.querySelector('products-container');*/
const go = new Start();
go.start();
