import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Create_Product[] = [] ;
  constructor(private httpClient : HttpClientService) { }

  ngOnInit(): void {

    this.httpClient.get<Create_Product[]>(
      {controller:"products"}
    ).subscribe(data => this.products = data);

      // this.httpClient.post({controller:"products"} , {
      //   name:"kalem",
      //   description:"açıklama kalem",
      //   price:100
      //  } ).subscribe();
      // this.httpClient.put({controller:"products"} , {
      //   id:"8baa2455-802a-4186-b317-25eef98eb7ad",
      //   name:"kalemtraş",
      //   description:"kalemtraş kalem",
      //   price:120        
      // }
      // ).subscribe();
      //this.httpClient.delete({controller:"products"} , "8baa2455-802a-4186-b317-25eef98eb7ad").subscribe();

      // this.httpClient.get({
      //   apiUrl:"https://jsonplaceholder.typicode.com/", controller:"posts"}
      // ).subscribe(data => console.log(data));

      // this.httpClient.get({
      //   fullEndPoint:"https://jsonplaceholder.typicode.com/posts"}).subscribe(data => console.log(data));
  }

}


