import './pages/main/style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import Start from './components/start';
import { IData } from './components/interfaces';
import data from '../data.json';

const go = new Start();
go.start();
