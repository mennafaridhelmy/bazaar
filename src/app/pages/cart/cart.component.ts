import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  url = 'http://localhost:3000';
  disableUpdate = true;
  products: any;
  cartProductsObject: any;
  cart: Array<object> = [];
  sum = 0;
  newCart: any = [];
  parentComponent = this._parent;
  constructor(private _http: HttpClient, private _parent: AppComponent) {}

  ngOnInit(): void {
    this.getCart();
    this.getProducts();
    this.findCartItems();
    this.calcSum();
  }

  getCart(){
    this._http.get(this.url + '/cart').subscribe((data) => {
      this.cartProductsObject = data;
    });
  }

  getProducts(){
    this._http.get(this.url + '/products').subscribe((data) => {
      this.products = data;
    });
  }

  findCartItems() {
    for (let i = 0; i < this.products.length; i++) {
      for (let j = 0; j < this.cartProductsObject.length; j++) {
        if (this.products[i].id === this.cartProductsObject[j].id) {
          this.cart.push({
            product: this.products[i],
            cartInfo: this.cartProductsObject[j],
          });
        }
      }
    }
  }

  addQuantity(id: number) {
    let indexToUpdate = this.cart.findIndex(
      (item) => item['product'].id === id
    );
    this.cart[indexToUpdate]['cartInfo'].quantity =
      this.cart[indexToUpdate]['cartInfo'].quantity + 1;
    this.disableUpdate = false;
  }
  substractQuantity(id: number) {
    let indexToUpdate = this.cart.findIndex(
      (item) => item['product'].id === id
    );

    this.cart[indexToUpdate]['cartInfo'].quantity != 1
      ? (this.cart[indexToUpdate]['cartInfo'].quantity =
          this.cart[indexToUpdate]['cartInfo'].quantity - 1)
      : (this.cart[indexToUpdate]['cartInfo'].quantity = 1);
    this.disableUpdate = false;
  }

  updateCart() {
    this.newCart = this.cart.map((item) => {
      return {
        id: item['cartInfo'].id,
        quantity: item['cartInfo'].quantity,
      };
    });
    this.cart.map((item) => {
      this._http
        .delete(this.url + '/cart/' + item['cartInfo'].id)
        .subscribe((data) => {});
    });
    this.newCart?.map((newItem) => {
      this._http.post(this.url + '/cart/', newItem).subscribe();
    });
    this.disableUpdate = true;
    this.calcSum();
  }

  deleteItem(id: number) {
    this._http.delete(this.url + '/cart/' + id).subscribe((data) => {});
    let index = this.cart.map((item) => item['cartInfo'].id).indexOf(id);
    this.cart.splice(index, 1);
    this.parentComponent.cartItems.length=this.parentComponent.cartItems.length-1;
    this.calcSum();
  }

  calcSum() {
    this.sum = 0;
    this.cart.map((item) => {
      this.sum = this.sum + item['cartInfo'].quantity * item['product'].price;
    });
  }
}
