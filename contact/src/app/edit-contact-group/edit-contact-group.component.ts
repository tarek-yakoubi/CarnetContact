import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactGroupService } from '../contact-group/contact-group.service';
import { ContactGroupDTO } from '../contact-group/contact-group-dto';
import { Contact } from '../add-contact/add-contact.model';
import { ContactService } from '../add-contact/add-contact.service';

@Component({
  selector: 'app-edit-contact-group',
  templateUrl: './edit-contact-group.component.html',
  styleUrls: ['./edit-contact-group.component.css']
})
export class EditContactGroupComponent implements OnInit {
  editGroupForm: FormGroup;
  contactGroup!: ContactGroupDTO;
  groupId!: number;
  availableContacts: Contact[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private contactGroupService: ContactGroupService,
    private router: Router,
    private contactService: ContactService
  ) {
    this.editGroupForm = this.fb.group({
      groupName: ['', Validators.required],
      contactCheckboxes: new FormArray([])
    });
  }

  ngOnInit() {
    this.groupId = +this.route.snapshot.params['id'];
    this.loadGroupData();
    this.contactService.getAllContacts().subscribe(
      contacts => {
        //this.availableContacts = contacts;
      },
      error => console.error('Error fetching contacts:', error)
    );

  }

  loadContacts() {
    this.contactService.getAllContacts().subscribe(
      //(contacts: Contact[]) => this.availableContacts = contacts,
      error => console.error('Error fetching contacts:', error)
    );
  }

  loadGroupData() {
    this.contactGroupService.getContactGroupById(this.groupId).subscribe(
      group => {
        this.contactGroup = {
          idContactGroup: group.idContactGroup,
          groupName: group.groupName,
          contactIds: group.contactIds
        };
        console.log('cretaed'+  this.contactGroup);
        this.editGroupForm.patchValue({ groupName: group.groupName });
        this.initializeContactCheckboxes();
      },
      error => console.error('Error fetching group:', error)
    );
  }

  initializeContactCheckboxes() {
    const contactCheckboxesControls = this.availableContacts.map(contact => {
      const isSelected = this.contactGroup?.contactIds?.includes(contact.idContact) || false;
      return new FormControl(isSelected);
    });
    this.editGroupForm.setControl('contactCheckboxes', new FormArray(contactCheckboxesControls));
  }

  get contactControls() {
    return (this.editGroupForm.get('contactCheckboxes') as FormArray).controls;
  }

  onSubmit() {
    if (this.editGroupForm.valid) {
      const selectedContactIds = this.getSelectedContactIds();
      const updatedGroup: ContactGroupDTO = {
        idContactGroup: this.groupId,
        groupName: this.editGroupForm.value.groupName,
        contactIds: selectedContactIds
      };
      this.contactGroupService.updateContactGroup(this.groupId, updatedGroup).subscribe(
        () => {
          console.log('Group updated successfully');
          this.router.navigate(['/contactgroup-list']);
        },
        error => console.error('Error updating group:', error)
      );
    }
  }

  getSelectedContactIds(): number[] {
    const n =  this.editGroupForm.value.contactCheckboxes
      .map((checked: boolean, i: number) => checked ? this.availableContacts[i].idContact : null)
      .filter((id: number | null) => id !== null);
      console.log('n = '+n);
      return n
  }
}
