import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagingDbService } from '../../shared/managing-db/managing-db.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss',
})
export class ItemDetailsComponent {
  url = 'http://localhost:3000';
  quantity = 1;
  item_id: number;
  products: any;
  item: any;
  cartProducts: any;

  constructor(private route: ActivatedRoute,public _mangerService: ManagingDbService ,private _http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.item_id = params['id'];
    });
    this.getItem();
    this.getCart();
  }

  getItem() {
    this.products = this._mangerService.productsData;
    this.item = this.products.filter((x) => x.id == this.item_id)[0];
  }

  getCart(){
    this.cartProducts = this._mangerService.cartData;
  }

  addQuantity() {
    this.quantity += 1;
  }
  substractQuantity() {
    if (this.quantity != 1) {
      this.quantity -= 1;
    }
  }

  addProduct(id: number) {
    let addedItem = {
      id: id,
      quantity: this.quantity,
    };

    this.cartProducts?.map((product) => {
      if (product.id === id) {
        this._http.put(this.url + '/cart/'+id,addedItem).subscribe();
        console.log('hena');
      }
    });

    if (this.cartProducts?.filter((x) => x.id == id)[0] === undefined) {
      this.cartProducts.push(addedItem);
      this._http.post(this.url + '/cart/', addedItem).subscribe();
    }
  }
}
