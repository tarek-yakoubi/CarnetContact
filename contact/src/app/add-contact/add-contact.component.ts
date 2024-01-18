import { Address } from './adresse.model';
import { Component } from '@angular/core';
import { Contact } from './add-contact.model';
import { ContactService } from './add-contact.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {

    contact: Contact =  {
      idContact: 0,
      firstName: '',
      lastName: '',
      email: '',
      address: {
        street: '',
        city: '',
        zip: '',
        country: ''
      },
      phones: [ { phoneKind: 'Mobile', phoneNumber: '' }, { phoneKind: 'Fixe', phoneNumber: '' }
      ],
      contactGroups: []
    };

    constructor(private contactService: ContactService, private router: Router) { }

    addContact() {
      this.contact = this.contact;
      console.log(this.contact);
      const filledPhones = this.contact.phones.filter(phone => phone.phoneNumber !== '');
      const contactToSend: Contact = {
        ...this.contact,
        phones: filledPhones
      };
        this.contactService.addContact(contactToSend)
            .subscribe(
                data => {

                    alert('Contact ajouté avec succès!');
                    this.router.navigate(['/contacts-list']);
                },
                error => {
                    console.error(error);
                    alert('Une erreur s\'est produite lors de l\'ajout du contact.');
                }
            );
    }
}
