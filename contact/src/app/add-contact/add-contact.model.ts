import { ContactGroup } from './../contact-group/contact-group.model';
import { Address } from "./adresse.model";
import { Phone } from "./phones.model";

export interface Contact {
  idContact: number;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  phones: Phone[];
  contactGroups: ContactGroup[];
}
