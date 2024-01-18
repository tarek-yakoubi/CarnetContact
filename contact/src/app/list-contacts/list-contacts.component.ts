import { Component, OnInit } from '@angular/core';
import { Contact } from '../add-contact/add-contact.model';
import { ContactService } from '../add-contact/add-contact.service';
import { Router } from '@angular/router';

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

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.contactService.getAllContacts().subscribe(data => {
      this.contacts = data;
      this.filteredContacts = data;
    });
  }

  ngOnChanges(): void {
    this.contactService.getAllContacts().subscribe(data => {
      this.contacts = data;
      this.filteredContacts = data;
    });
  }

  filterContacts(): void {
    this.filteredContacts = this.contacts.filter(contact =>
      contact.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.address.street.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.address.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.address.zip.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.address.country.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.phones.some(phone =>
        phone.phoneKind.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        phone.phoneNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  openCreateContactComponent(): void {
    this.router.navigate(['/add-contact']);
  }

  navigateToEdit(contactId: number): void {
    this.router.navigate(['/edit-contact', contactId]);
  }

  deleteContact(contactId: number): void {
    this.contactService.deleteContact(contactId)
    .subscribe(
      () => {
        alert('Contact supprimé avec succès!');
        this.contacts = this.contacts.filter(contact => contact.idContact !== contactId);
      },
      error => {
        alert('Contact supprimé avec succès!');
        window.location.reload();
      }
    );
  }

}
