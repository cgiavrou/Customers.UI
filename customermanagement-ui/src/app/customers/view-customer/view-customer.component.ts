import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/api-models/ui-models/customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  customerId : string | null | undefined;
  customer: Customer = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    contactId: '',
    contactMode: {
      id:'',
      description: ''
    },
    phoneNumber: {
      id: '',
      mobile: 0,
      homePhone: 0,
      workPhone: 0
    }
  }

  constructor(private readonly customerService: CustomerService,
    private readonly route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      (params)=> {
        this.customerId = params.get('id');

        if(this.customerId)
        {
          this.customerService.getCustomer(this.customerId)
          .subscribe(
            (successResponse) => {this.customer = successResponse;}
          );
        }

      }
    );
  }
}
