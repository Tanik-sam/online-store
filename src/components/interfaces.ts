export interface IData {
    position: number;
    category: string;
    name: string;
    art: string;
    epocsid: boolean;
    epocsidColor: string;
    woodType: string;
    woodColor: string;
    price: number;
    freeShipping: boolean;
    image: string;
    date: string;
}
export interface IUserCart{
    art: string;
    img: string;
    name: string;
    price: number;
    quntity: number;
}
export interface IFilterType{
    cat: {val:boolean,fil:string},
    sel: {val:boolean,fil:string},
    wColor: {val:boolean,fil:string},
    pChange: {val:boolean,fil:number},
    ch: {val:boolean,fil:boolean}
}