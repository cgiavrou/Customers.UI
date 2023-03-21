import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/ui-models/customer.model';
import { CustomerService } from '../customer.service';
import { ConfirmationDialog } from 'src/app/confirm-dialog/confirmation-dialog';


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
    homeAddress: '',
    phoneNumber: {
      id: '',
      mobile: 0,
      homePhone: 0,
      workPhone: 0
    }
  };

  isNewCustomer = false;
  header = '';

  @ViewChild('customerDetailsForm') customerDetailsForm?: NgForm;
  dialogRef!: MatDialogRef<ConfirmationDialog>;

  constructor(private readonly customerService: CustomerService,
      private readonly route: ActivatedRoute,
      private snackbar: MatSnackBar,
      private router: Router,
      private dialog: MatDialog ) { }

  ngOnInit(): void {

        this.route.paramMap.subscribe(
          (params) => {
            this.customerId = params.get('id');

            if (this.customerId) {
              if (this.customerId.toLowerCase() === 'Add'.toLowerCase()) {
                // -> new Customer Functionality
                this.isNewCustomer = true;
                this.header = 'Add New Customer';
              } else {
                // -> Existing Customer Functionality
                this.isNewCustomer = false;
                this.header = 'Edit Customer';
                this.customerService.getCustomer(this.customerId)
                  .subscribe(
                    (successResponse) => {
                      this.customer = successResponse;
                    },
                    (errorResponse) => {
                    }
                  );
              }
            }
          }
        );
  }

  onUpdate(): void {
        if (this.customerDetailsForm?.form.valid) {
          this.customerService.updateCustomer(this.customer.id, this.customer)
            .subscribe(
              (successResponse) => {
                // Show a notification
                this.snackbar.open('Customer updated successfully', undefined, {
                  duration: 2000
                });
              },
              (errorResponse) => {
                // Log it
                console.log(errorResponse);
              }
            );
        }
  }

  openConfirmationDialog():void {
    this.dialogRef = this.dialog.open(ConfirmationDialog, { disableClose: false});
    this.dialogRef.componentInstance.confirmMessage= "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe( result =>
      {
        if(result){
          this.onDelete()
        }
        this.dialogRef.close;
      });
    }

  onDelete(): void {

        this.customerService.deleteCustomer(this.customer.id)
          .subscribe(
            (successResponse) => {
              this.snackbar.open('Customer deleted successfully', undefined, {
                duration: 2000
              });

              setTimeout(() => {
                this.router.navigateByUrl('customers');
              }, 2000);
            },
            (errorResponse) => {
              // Log
            }
          );
  }

  onAdd(): void {
        if (this.customerDetailsForm?.form.valid) {
          // Submit form date to api
          this.customerService.addCustomer(this.customer)
            .subscribe(
              (successResponse) => {
                this.snackbar.open('Customer added successfully', undefined, {
                  duration: 2000
                });

                setTimeout(() => {
                  this.router.navigateByUrl(`customers/${successResponse.id}`);
                }, 2000);

              },
              (errorResponse) => {
                // Log
                console.log(errorResponse);
              }
            );
        }
  }

}

