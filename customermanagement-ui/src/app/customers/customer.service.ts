import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Customer } from '../models/api-models/customer.model';
import { AddCustomerRequest } from '../models/api-models/add-customer-request.model';
import { UpdateCustomerRequest } from '../models/api-models/update-customer-request.model';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseApiUrl = 'https://localhost:44326';

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.baseApiUrl + '/customers');
  }

  getCustomer(customerId: string): Observable<Customer> {
    return this.httpClient.get<Customer>(this.baseApiUrl + '/customers/' + customerId);
  }

  deleteCustomer(customerId: string): Observable<Customer>{
    return this.httpClient.delete<Customer>(this.baseApiUrl + '/customers/' + customerId);
  }

  updateCustomer(customerId: string, customerRequest: Customer):Observable<Customer>{
    const updateCustomerRequest: UpdateCustomerRequest = {
      firstName: customerRequest.firstName,
      lastName: customerRequest.lastName,
      email: customerRequest.email,
      homeAddress: customerRequest.homeAddress,
      mobile: customerRequest.phoneNumber.mobile,
      homePhone: customerRequest.phoneNumber.homePhone,
      workPhone: customerRequest.phoneNumber.workPhone
    }

    return this.httpClient.put<Customer>(this.baseApiUrl + '/customers/' + customerId, updateCustomerRequest);
  }

  addCustomer(customerRequest: Customer): Observable<Customer> {
    const addCustomerRequest: AddCustomerRequest = {
      firstName: customerRequest.firstName,
      lastName: customerRequest.lastName,
      email: customerRequest.email,
      homeAddress: customerRequest.homeAddress,
      mobile: customerRequest.phoneNumber.mobile,
      homePhone: customerRequest.phoneNumber.homePhone,
      workPhone: customerRequest.phoneNumber.workPhone
    };

    return this.httpClient.post<Customer>(this.baseApiUrl + '/customers/add', addCustomerRequest );
  }
}
