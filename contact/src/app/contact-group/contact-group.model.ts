import { Contact } from "../add-contact/add-contact.model";

export interface ContactGroup {
  idContactGroup: number;
  groupName: string;
  contacts: Contact[];
}

