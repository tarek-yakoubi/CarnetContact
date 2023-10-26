import { Component, OnInit } from '@angular/core';
import { Contact } from '../add-contact/add-contact.model';
import { ContactService } from '../add-contact/add-contact.service';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})
export class ListContactsComponent implements OnInit {

  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchTerm: string = "";
  page: number = 1;
  pageSize: number = 10;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getAllContacts().subscribe(data => {
      this.contacts = data;
      this.filteredContacts = data;
    });
  }

  ngOnChanges(): void {
    this.filteredContacts = this.contacts.filter(contact =>
      contact.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      // Ajoutez d'autres critères de recherche si nécessaire.
    );
  }

}
