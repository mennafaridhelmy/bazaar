import { Component, OnInit } from '@angular/core';
import { ManagingDbService } from '../../shared/managing-db/managing-db.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  url = 'http://localhost:3000';
  products: any;
  productsSample: any;
  cartProducts: any;

  constructor(public _mangerService: ManagingDbService , private _http: HttpClient) {}

  ngOnInit(): void {
    this.getProducts();
    this.getcart();
  }

  getProducts() {
    this.products = this._mangerService.productsData;
    this.productsSample = this.products.slice(0, 6);
  }

  getcart() {
    this.cartProducts = this._mangerService.cartData;
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
        this._http.put(this.url + '/cart/' + id, addedItem).subscribe();
      }
    });

    if (this.cartProducts?.filter((x) => x.id == id)[0] === undefined) {
      this.cartProducts.push(addedItem);
      this._http.post(this.url + '/cart/', addedItem).subscribe();
    }
  }
}
