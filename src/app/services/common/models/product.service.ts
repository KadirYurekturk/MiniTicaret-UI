import { HttpErrorResponse } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Create_Product } from '../../../contracts/create_product';
import { List_Product } from '../../../contracts/list_products';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"
    }, product)
      .subscribe(result => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        Object.keys(_error).forEach(key => {
           for (const i of _error[key]) {
            message += i + "<br>";
          } 
        });
        errorCallBack(message);
      });
  }

  async getAllProducts(successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<List_Product[]> {
    const promiseProducts: Promise<List_Product[]> = this.httpClientService.get<List_Product[]>(
      {
        controller: "products"
      }).toPromise();

    promiseProducts.then(f => successCallBack()
    ).catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));
    
    return await promiseProducts;
  }

  async getAllProductsWithPaging(page: number = 0, size: number = 10, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ pageProducts: List_Product[], totalCount: number }>{
    const promiseProducts: Promise<{ pageProducts: List_Product[], totalCount: number }> = this.httpClientService.get < { pageProducts:List_Product[] , totalCount : number } >(
      {
        controller: "products",
        queryString: `page=${page}&ItemsPerPage=${size}`
        
      }).toPromise();

    promiseProducts.then(f => successCallBack()
    ).catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));

    return await promiseProducts;
  }

}
