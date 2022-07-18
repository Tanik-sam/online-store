import data from '../../data.json';
import { IData, IFilterType } from './interfaces';

class FilterNew {
    dataChanged = data;
    filtration = {
        categ: { val: false, data: '' },
        select: { val: false, data: '' },
        woodC: { val: false, data: '' },
        price: { val: false, data: 0 },
        checked: { val: false, data: false },
    };

    search(): IData[] {
        const input: string = (document.getElementById('search') as HTMLInputElement | null).value;
        const arr: IData[] = data;
        const newArr: IData[] = arr.filter((obj: IData) => {
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
    allFilters(): IData[] {
        let arr: IData[] = this.dataChanged;
        if (this.filtration.categ.val == true) {
            const newArr = arr.filter((obj: IData) => {
                return obj.category == this.filtration.categ.data;
            });
            arr = newArr.slice();
        }
        if (this.filtration.select.val == true) {
            if (this.filtration.select.data == 'Другое') {
                this.filtration.select.data = 'Пластик';
            }
            const newArr = arr.filter((obj: IData) => {
                return obj.woodType == this.filtration.select.data;
            });
            arr = newArr.slice();
        }
        if (this.filtration.woodC.val == true) {
            const newArr = arr.filter((obj: IData) => {
                return obj.woodColor == this.filtration.woodC.data;
            });
            arr = newArr.slice();
        }
        if (this.filtration.price.val == true) {
            const newArr = arr.filter((obj: IData) => {
                return obj.price <= this.filtration.price.data;
            });
            arr = newArr.slice();
        }
        if (this.filtration.checked.val == true) {
            const newArr = arr.filter((obj: IData) => {
                return obj.freeShipping === this.filtration.checked.data;
            });
            arr = newArr.slice();
        }
        return arr;
    }
    category(name: string): IData[] {
        if (name == 'Все') {
            this.filtration.categ.val = false;
            return this.allFilters();
        }
        this.filtration.categ.val = true;
        this.filtration.categ.data = name;
        return this.allFilters();
    }

    selection(val: string): IData[] {
        if (val == 'Все') {
            this.filtration.select.val = false;
            return this.allFilters();
        }
        this.filtration.select.val = true;
        this.filtration.select.data = val;
        return this.allFilters();
    }

    woodColor(name: string): IData[] {
        if (name == 'Все') {
            this.filtration.woodC.val = false;
            return this.allFilters();
        }
        this.filtration.woodC.val = true;
        this.filtration.woodC.data = name;
        return this.allFilters();
    }

    priceChange(val: number): IData[] {
        this.filtration.price.val = true;
        this.filtration.price.data = val;
        return this.allFilters();
    }

    check(check: boolean): IData[] {
        if (!check) {
            this.filtration.checked.val == false;
            return this.allFilters();
        }
        this.filtration.checked.val = true;
        this.filtration.checked.data = check;
        return this.allFilters();
    }

    sorting(name: string): IData[] {
        switch (name) {
            case 'price-lowest':
                this.dataChanged.sort((a, b) => a.price - b.price);
                break;
            case 'price-highest':
                this.dataChanged.sort((a, b) => b.price - a.price);
                break;
            case 'name-z':
                this.dataChanged.sort((a, b) => {
                    if (b.name < a.name) return -1;
                    if (b.name > a.name) return 1;
                });
                break;
            case 'name-a':
                this.dataChanged.sort((a, b) => {
                    if (b.name > a.name) return -1;
                    if (b.name < a.name) return 1;
                });
                break;
            case 'date-oldest':
                this.dataChanged.sort((a, b) => {
                    if (b.date > a.date) return -1;
                    if (b.date < a.date) return 1;
                });
                break;
            case 'date-newest':
                this.dataChanged.sort((a, b) => {
                    if (new Date(b.date) < new Date(a.date)) return -1;
                    if (new Date(b.date) > new Date(a.date)) return 1;
                });
                break;
        }
        return this.dataChanged;
    }

    reseter(): IData[] {
        const arr: IData[] = data;
        this.filtration.categ.val = false;
        this.filtration.select.val = false;
        this.filtration.woodC.val = false;
        this.filtration.price.val = false;
        this.filtration.checked.val = false;
        return arr;
    }
}

export default FilterNew;
