import { Injectable } from '@angular/core';
declare var alertify: any;
declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string, messageType: MessageType = MessageType.Notify, position: Position = Position.TopRight, delay: number = 5 , dismissOthers : boolean = false) {
    alertify.set('notifier', 'position', position);
    alertify.set('notifier', 'delay', delay);
    const msg = alertify[messageType](message);
    if(dismissOthers)
      msg.dismissOthers();
  }

  dismiss() {    
      alertify.dismissAll();  
  }

}

export enum MessageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position {
  BottomLeft = "bottom-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  TopLeft = "top-left",
  TopCenter = "top-center",
  TopRight = "top-right"
}