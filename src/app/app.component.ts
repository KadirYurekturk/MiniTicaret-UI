import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Products: any =[];
  title = 'TicaretClient';
  apiURL = "https://localhost:7249";
  constructor(private http: HttpClient) { 
    this.loadEmployees();
  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    })
  }

  getProducts(): Observable<Product> {
    return this.http
      .get<Product>(this.apiURL + "/api/products")
      .pipe(retry(1))
  }

  loadEmployees() {
    return this.getProducts().subscribe((data: {}) => {
      this.Products = data;
    });
  }
}

export class Product {
  Id: string;
  Name: string;
  Description: string;
  Price: number;
}
