import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { ViewCustomerComponent } from './customers/view-customer/view-customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent

  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'customers/:id',
    component: ViewCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
