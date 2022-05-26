import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  //constructor(private httpClient : HttpClient) {
  //  httpClient.get('https://localhost:7200/api/Nufus/1/5').subscribe(
  //    data=> console.log(data)
  //  );
  // }

  ngOnInit(): void {
  }

}
