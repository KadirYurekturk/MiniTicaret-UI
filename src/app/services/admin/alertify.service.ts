import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string, alertifyOptions : AlertifyOptions) {
    alertify.set('notifier', 'position', alertifyOptions.position);
    alertify.set('notifier', 'delay', alertifyOptions.delay);
    const msg = alertify[alertifyOptions.messageType](message);
    if(alertifyOptions.dismissOthers)
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

export class AlertifyOptions{
  messageType: MessageType = MessageType.Notify;
  position: Position = Position.TopRight;
  delay: number = 5;
  dismissOthers: boolean = false;
}