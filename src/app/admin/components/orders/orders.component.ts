import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private spinner : NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show("SpinnerCog");
    setTimeout(() => {
      this.spinner.hide("SpinnerCog");
    }, 1000);
  }

}
