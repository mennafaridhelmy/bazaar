import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'bazaar';
  searchKeyWord = '';
  cartItems:any;
  cartUrl = 'http://localhost:3000/cart';
  constructor(private _http: HttpClient,private wowService: NgwWowService) {
  }

  ngOnInit() {
    this.wowService.init();
    this.getCartItems();
  }

  getCartItems(){
    this._http.get(this.cartUrl).subscribe((data) => {
      this.cartItems=data;
    });
  }
}
