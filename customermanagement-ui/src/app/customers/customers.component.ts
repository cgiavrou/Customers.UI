import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../models/ui-models/customer.model';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers : Customer[] = [];
  displayedColumns: string[] =['firstName', 'lastName', 'email', 'address', 'edit'];

  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();
  @ViewChild(MatPaginator) matPaginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;
  filterString='';

  constructor(private customerService: CustomerService) {}

  ngOnInit():void {

    //Fetch Customers
    this.customerService.getCustomers()
    .subscribe(
      (successResponse) => {
        this.customers = successResponse;
        this.dataSource = new MatTableDataSource<Customer>(this.customers);

        if(this.matPaginator) {
              this.dataSource.paginator = this.matPaginator;
        }

        if(this.matSort) {
          this.dataSource.sort =this.matSort;
        }
      },
      (errorResponse)   => { console.log(errorResponse);  }
     );
  }

  filterCustomers() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

}
