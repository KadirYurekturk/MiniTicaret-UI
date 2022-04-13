import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
declare var alertify: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private alertify: AlertifyService) { }

  ngOnInit(): void {
    // this.alertify.message('Hello World!', MessageType.Notify, Position.TopRight);
  }

  m(){
    this.alertify.message('Hello World!' , { messageType: MessageType.Success, position: Position.TopRight, delay: 5});
  }
  d(){
    this.alertify.dismiss();
  }

}
