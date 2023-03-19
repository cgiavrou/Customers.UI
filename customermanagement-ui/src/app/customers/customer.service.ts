import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Customer } from '../models/api-models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseApiUrl = 'https://localhost:44326';

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.baseApiUrl + '/customers');
  }
}
