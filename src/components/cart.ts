import { IData, IUserCart } from './interfaces';

class Cart {
    chosen = 0;
    total = 0;
    userCartArr:IUserCart[] = [];
    add(amount: number): number {
        this.chosen += 1;
        return this.chosen;
    }
    dec(amount: number): number {
        if (this.chosen <= 0) {
            this.chosen = 0;
        } else {
            this.chosen -= 1;
        }
        return this.chosen;
    }
    getPrice(): number {
        return this.chosen;
    }
    deletePrice(): void {
        this.chosen = 0;
        this.total = 0;
    }
    deleteItem(): void {
        this.drawTable();
    }
    drawCart(userCart?: IUserCart): void {
        if (userCart) {
            if (userCart.quntity === 0) {
                alert('Ваша корзина пуста!')
                return;
            }
            let alreadyItem = this.userCartArr.some((v, i, a) => {
                return v.art === userCart.art;
            });
            console.log(userCart.art);
            if (alreadyItem) {
                const newArr = this.userCartArr.map((v, i, a) => {
                    if (v.art === userCart.art) v.quntity += userCart.quntity;
                    return v
                });
                this.userCartArr = newArr.slice();
            } else {
                this.userCartArr.push(userCart)
            };
        }
        this.drawTable();
    }
    drawTable(): void {
        const userS:string = localStorage.getItem('shopUser');
        if (!this.userCartArr[0]){
            this.userCartArr = JSON.parse(localStorage.getItem(userS))
        };
        localStorage.setItem(userS, JSON.stringify(this.userCartArr));
        if ((document.querySelector('.overlay'))){
            document.querySelector('.products-container').removeChild(document.querySelector('.overlay'));
        }
        const fragment = document.createDocumentFragment();
        const cartItemTemp = document.querySelector('#cart') as HTMLTemplateElement;
        const cartClone = cartItemTemp.content.cloneNode(true) as HTMLElement;
        fragment.append(cartClone);
        document.querySelector('.products-container').append(fragment);
        const cartTable = document.querySelector('.cart__table') as HTMLElement;
        this.userCartArr.forEach((userCartItem:IUserCart) => {
            this.total += userCartItem.quntity * userCartItem.price;
            const itemConteiner = document.createElement('div');
            itemConteiner.className = 'cart-name__block';
            const itemImg = document.createElement('div');
            itemImg.style.backgroundImage = `url(${userCartItem.img || 'img/news_placeholder.jpg'})`;
            itemImg.className = 'cart-name__block_img';
            const itemName = document.createElement('h4');
            itemName.className = 'cart-name__block_name';
            itemName.textContent = userCartItem.name;
            itemConteiner.append(itemImg);
            itemConteiner.append(itemName);
            const itemPrice = document.createElement('h4');
            itemPrice.innerText = userCartItem.price.toString();
            const itemQuntity = document.createElement('h4');
            itemQuntity.innerText = userCartItem.quntity.toString();
            const totalPrice = document.createElement('h4');
            totalPrice.innerText = (userCartItem.quntity * userCartItem.price).toString();
            const itemDeleteDiv = document.createElement('div');
            itemDeleteDiv.className='cart_del'
            const itemDelete = document.createElement('i');
            itemDelete.className = 'fa-solid fa-trash-can';
            itemDeleteDiv.append(itemDelete);
            cartTable.append(itemConteiner);
            cartTable.append(itemPrice);
            cartTable.append(itemQuntity);
            cartTable.append(totalPrice);
            cartTable.append(itemDeleteDiv);
        });
        document.querySelector('.cart__table_total-sum').innerHTML = `${this.total.toString()} бел. руб`;
        const close: HTMLElement = document.querySelector('.close-btn');
        close.addEventListener('click', (e: Event) => {
            document.querySelector('.products-container').removeChild(document.querySelector('.overlay'));
        });
        const del = document.querySelectorAll('.cart_del');
        for (let i = 0; i < del.length; i++) {
            del[i].addEventListener('click', (e: Event) => {
                const newUserCartArr = this.userCartArr.filter((v, j)=>i!==j);
                console.log(i);
                this.userCartArr = newUserCartArr.slice();
                console.log(this.userCartArr);
                this.total =0;
                this.drawTable();
            });
        }
    }
}

export default Cart;
