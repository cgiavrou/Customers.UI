import { ContactMode } from "./contactmode.model";
import { PhoneNumber } from "./phonenumber.model";

export interface Customer{
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  address: string,
  contactId: string,
  phoneNumber: PhoneNumber,
  contactMode: ContactMode
}
