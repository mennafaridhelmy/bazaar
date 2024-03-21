import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ManagingDbService {
  cartData: any;
  productsData:any;
  constructor(private _http: HttpClient, private route: ActivatedRoute) {
    this.getCart().subscribe((data) => {
      this.cartData = data;
    });

    this.getProducts().subscribe((data) => {
      this.productsData = data;
    });
  }


  getCart(): Observable<any>  {
    return this._http.get('http://localhost:3000/cart');
  }

  getProducts(): Observable<any>  {
    return this._http.get('http://localhost:3000/products');
  }
}
