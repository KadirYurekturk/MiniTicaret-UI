import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Create_Product } from '../../../../contracts/create_product';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { ProductService } from '../../../../services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private productService: ProductService, private spinner: NgxSpinnerService, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {

    this.spinner.show("SpinnerCog");


    const create_product: Create_Product = new Create_Product();


    create_product.name = name.value;
    create_product.price = parseInt(price.value);
    create_product.stock = parseInt(stock.value);

    this.productService.create(create_product, () => {
      this.spinner.hide("SpinnerCog");
      this.alertify.message("Product created successfully", { delay: 5, messageType: MessageType.Success, position: Position.TopRight, dismissOthers: true });
    }, errorMessage => {
      this.spinner.hide("SpinnerCog");
      this.alertify.message(errorMessage, { delay: 5, messageType: MessageType.Error, position: Position.TopRight, dismissOthers: true });
    });

  }

}
