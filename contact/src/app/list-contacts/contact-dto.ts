import { Address } from "../add-contact/adresse.model";
import { Phone } from "../add-contact/phones.model";

export interface ContactDTO {
  idContact: number;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  phones : Phone[];
  contactGroupIds: number[];
}
