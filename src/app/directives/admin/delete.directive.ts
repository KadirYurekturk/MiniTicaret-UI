import { HostListener, Input, Renderer2 } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Directive } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../../services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective{

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "assets/images/delete.png");
    img.setAttribute("style", "width:20px;height:20px;cursor:pointer;");
    img.setAttribute("title", "Delete");
    _renderer.appendChild(element.nativeElement, img);
    

  }

  @Input() id: string;
  @Output() callBack: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  onclick() {
    this.spinner.show("SpinnerAtom");
    //this.productService.delete(this.element.nativeElement.id);
    this.productService.delete(this.id);    
    const tr = this.element.nativeElement.parentElement;
    $(tr).fadeOut(2000, () => {
      this.callBack.emit();
      this.spinner.hide("SpinnerAtom");
    });
    
  }

  

}
