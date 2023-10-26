import { Component } from '@angular/core';
import { Contact } from './add-contact.model';
import { ContactService } from './add-contact.service';


@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {

    contact: Contact = new Contact();

    constructor(private contactService: ContactService) { }

    addContact() {
        this.contactService.addContact(this.contact)
            .subscribe(
                data => {
                    console.log(data);
                    alert('Contact ajouté avec succès!');
                },
                error => {
                    console.error(error);
                    alert('Une erreur s\'est produite lors de l\'ajout du contact.');
                }
            );
    }
}
