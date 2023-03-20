import { PhoneNumber } from "./phonenumber.model";

export interface Customer {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  homeAddress: string,
  phoneNumber: PhoneNumber
}
