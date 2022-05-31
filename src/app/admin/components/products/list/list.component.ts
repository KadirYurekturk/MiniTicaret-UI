import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Product } from '../../../../contracts/list_products';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { ProductService } from '../../../../services/common/models/product.service';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductService, private spinner: NgxSpinnerService, private alertify: AlertifyService) { }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdAt', 'updatedAt','edit','delete'];

  dataSource: MatTableDataSource<List_Product> = null; // = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  async getProducts() {
    this.spinner.show("SpinnerCog");

    const allproducts: List_Product[] = await this.productService.getAllProducts(() => { this.spinner.hide("SpinnerCog") },
      errorMessage => {
        this.alertify.message(errorMessage, {
          delay: 5, messageType: MessageType.Error, position: Position.TopRight, dismissOthers: true
        }
        ), this.spinner.hide("SpinnerCog")
      }
    );

    this.dataSource = new MatTableDataSource<List_Product>(allproducts);
    this.dataSource.paginator = this.paginator;
  }

  async getProductsWithPaging() {
    const pageSize = this.paginator ? this.paginator.pageSize : 5;
    const pageIndex = this.paginator ? this.paginator.pageIndex : 0;
    
    const allproducts: { pageProducts: List_Product[], totalCount: number } = await this.productService.getAllProductsWithPaging(pageIndex, pageSize, ()=> {  },
      errorMessage => {
        this.alertify.message(errorMessage, {
          delay: 5, messageType: MessageType.Error, position: Position.TopRight, dismissOthers: true
        }
        )
      }
    );

    this.dataSource = new MatTableDataSource<List_Product>(allproducts.pageProducts);
    this.paginator.length = allproducts.totalCount;
    debugger;
  }

  delete(id,event) {
    alert(id);
    const td = event.target.parentElement.parentElement;
    $(td).fadeOut(2000);
  }

  async pageChanged() {
    await this.getProductsWithPaging();
  }

  async ngOnInit() {
    await this.getProductsWithPaging();
  }



}
