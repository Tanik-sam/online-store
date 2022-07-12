import data from '../../data.json';
import { IData } from './interfaces';

function Filter(): IData[] {
    const input: string = (document.getElementById('search') as HTMLInputElement | null).value; //получаем значение из поля в html
    //type TColor='синий'|'зеленый'|'желтый'|'золотой'|'черный'|'серый'|'серебряный'|'красный'|'розовый'|'голубой'|'фиолетовый'|'none';
    //type TWoodType='Лиственница'|'Береза'|'Сосна'|'Дуб'|'Вишня'|'Липа'|'Другое';
    //type TWoodColor='Дуб'|'Махагон'|'Прозрачный'|'Орех'|'Каштан';

    const arr: IData[] = data;
    const newArr: IData[] = arr.filter(function (obj: IData) {
        let k: keyof IData;
        for (k in obj) {
            if (typeof obj[k] == 'string') {
                if (
                    obj[k] == input.toLowerCase() ||
                    (obj[k] as string).toLowerCase().indexOf(input.toLowerCase()) !== -1
                ) {
                    return true;
                }
            }
        }
    });
    return newArr;
}

function Category(name: string): IData[] {
    const arr: IData[] = data;
    if (name == 'Все') return arr;
    const newArr: IData[] = arr.filter(function (obj: IData) {
        return obj.category == name;
    });
    return newArr;
}

function Selection(val: string): IData[] {
    const arr: IData[] = data;
    if (val == 'Все') return arr;
    const newArr: IData[] = arr.filter(function (obj: IData) {
        return obj.woodType == val;
    });
    return newArr;
}

function WoodColor(name: string): IData[] {
    const arr: IData[] = data;
    if (name == 'Все') return arr;
    const newArr: IData[] = arr.filter(function (obj: IData) {
        return obj.woodColor == name;
    });
    return newArr;
}

function PriceChange(val: number): IData[] {
    const arr: IData[] = data;
    const newArr: IData[] = arr.filter(function (obj: IData) {
        return obj.price <= val;
    });
    return newArr;
}

function Check(check: boolean): IData[] {
    const arr: IData[] = data;
    if (!check) return arr;
    const newArr: IData[] = arr.filter(function (obj: IData) {
        return obj.freeShipping === true;
    });
    return newArr;
}

function Reseter(): IData[] {
    const arr: IData[] = data;
    return arr;
}

export { Filter, Category, Selection, WoodColor, PriceChange, Check, Reseter };
