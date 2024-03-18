import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit{
  url = 'http://localhost:3000';
  products: any;
  bulkOfProducts: any;
  show = 9;
  cartProducts: any;

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCart();
  }

  getProducts() {
    this._http.get(this.url + '/products').subscribe((data) => {
      this.products = data;
      this.bulkOfProducts = this.products.slice(0, this.show);
    });
  }

  getCart(){
    this._http.get(this.url + '/cart').subscribe((data) => {
      this.cartProducts = data;
    });
  }

  ShowMore() {
    this.show += 9;
    this.getProducts();
  }

  addProduct(id: number) {
    let addedItem = {
      id: id,
      quantity: 1,
    };

    this.cartProducts?.map((product) => {
      if (product.id === id) {
        product.quantity += 1;
        addedItem = {
          id: id,
          quantity: product.quantity,
        };
        this._http.put(this.url + '/cart/'+id,addedItem).subscribe();
      }
    });

    if (this.cartProducts?.filter((x) => x.id == id)[0] === undefined) {
      this.cartProducts.push(addedItem);
      this._http.post(this.url + '/cart/', addedItem).subscribe();
    }
  }
  
}
