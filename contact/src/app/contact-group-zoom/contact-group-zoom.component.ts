import { EditContactGroupComponent } from './../edit-contact-group/edit-contact-group.component';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../add-contact/add-contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactGroupService } from '../contact-group/contact-group.service';
import { ContactService } from '../add-contact/add-contact.service';
import { ContactGroup } from '../contact-group/contact-group.model';
import { ContactGroupDTO } from '../contact-group/contact-group-dto';
import { ContactDTO } from '../list-contacts/contact-dto';

@Component({
  selector: 'app-contact-group-zoom',
  templateUrl: './contact-group-zoom.component.html',
  styleUrls: ['./contact-group-zoom.component.css']
})
export class ContactGroupZoomComponent implements OnInit {

    contactGroup: ContactGroupDTO = {} as ContactGroupDTO;
    groupId!: number;
    contacts: Contact[] = [];


    constructor(private contactGroupService: ContactGroupService, private contactService: ContactService, private route : ActivatedRoute, private router:Router) {}

    ngOnInit() {
      this.groupId = +this.route.snapshot.params['id'];
      console.log('id'+this.groupId);
      this.contactGroupService.getContactGroupById(this.groupId).subscribe(
        (group: ContactGroupDTO) => {
          console.log('group'+group);
          this.contactGroup = group;
          this.loadContacts(this.contactGroup.contactIds);
        },
        error => console.error('Error fetching group:', error)
      );
      console.log('cretaed'+  this.contactGroup);
    }

    editContactGroup(groupId: number): void {
      if (groupId !== undefined && groupId !== null) {
        this.router.navigate(['/edit-contact-group', groupId]);
      } else {
        console.error('Le groupId est undefined ou null');
      }
    }

    loadContacts(contactIds: number[]): void {
      contactIds.forEach(id => {
        this.contactService.getContactById(id).subscribe(
          (contact: Contact) => {
            console.log('contact '+contact.email);
            this.contacts.push(contact);
          },
          error => console.error(`Error fetching contact with ID ${id}:`, error)
        );
      });
    }

    editContact(contactId: number): void {
      this.router.navigate(['/edit-contact', contactId]);
  }

  deleteContactGroup(groupId: number): void {
    this.contactGroupService.deleteContactGroup(groupId)
    .subscribe(
      () => {
        alert('Contact supprimé avec succès!');
        this.router.navigate(['/contactgroup-list']);
      },
      error => {
        alert('Contact supprimé avec succès!');
        window.location.reload();
      }
    );
    }

  removeContact(contactId: number, groupId: number) {
    this.contactGroupService.deleteContactFromGroup(contactId, groupId).subscribe(
      () => {
        window.location.reload();
        this.router.navigate(['/contact-group-zoom', groupId]);
      },
      error => {
        // Gérez les erreurs ici
        console.error('Erreur lors de la suppression du contact du groupe', error);
      }
    );
  }
}
