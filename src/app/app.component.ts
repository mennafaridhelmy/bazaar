import { Component, OnInit } from '@angular/core';
import { ManagingDbService } from './shared/managing-db/managing-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'bazaar';
  searchKeyWord = '';
  cartItems:any;
  constructor(public _mangerService: ManagingDbService) {
  }

  ngOnInit() {
    this.getCartData();
    
  }

  getCartData(){
    this.cartItems = this._mangerService.cartData;
  }
}
