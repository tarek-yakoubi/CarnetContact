import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../add-contact/add-contact.service';
import { Contact } from '../add-contact/add-contact.model';
import { ContactGroupService } from '../contact-group/contact-group.service';
import { Router } from '@angular/router';
import { ContactGroupDTO } from '../contact-group/contact-group-dto';

@Component({
  selector: 'app-create-contact-group',
  templateUrl: './addcontact-to-contact-group.component.html',
  styleUrls: ['./addcontact-to-contact-group.component.css']
})
export class AddcontactToContactGroupComponent implements OnInit {

 addToGroupForm: FormGroup;
  availableContacts: Contact[] = [];
  availableGroups: ContactGroupDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private contactGroupService: ContactGroupService,
    private router: Router
  ) {
    this.addToGroupForm = this.fb.group({
      selectedContact: ['', Validators.required],
      selectedGroup: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadContacts();
    this.loadContactGroups();
  }

  openCreateContactGroupComponent(): void {
      this.router.navigate(['/create-contact-group']);
  }


  loadContacts() {
    this.contactService.getAllContacts().subscribe(
      (contacts: Contact[]) => this.availableContacts = contacts,
      error => console.error('Error fetching contacts:', error)
    );
  }

  loadContactGroups() {
    this.contactGroupService.getAllContactGroups().subscribe(
      (groups: ContactGroupDTO[]) => this.availableGroups = groups,
      error => console.error('Error fetching contact groups:', error)
    );
  }

  onSubmit() {
    const selectedContactId = this.addToGroupForm.value.selectedContact;
    const selectedGroupId = this.addToGroupForm.value.selectedGroup;

    this.contactGroupService.addContactToGroup(selectedContactId, selectedGroupId).subscribe(
      () => {
        console.log('test');
        alert('Contact ajouté au groupe avec succès!');
        this.router.navigate(['/contactgroup-list']);
      },
      error => {
        console.error(error);
        alert('Erreur lors de l\'ajout du contact au groupe.');
      }
    );
  }


}
