import { Contact } from './../add-contact/add-contact.model';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../add-contact/add-contact.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ContactGroup } from '../contact-group/contact-group.model';
import { ContactDTO } from '../list-contacts/contact-dto';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent {
[x: string]: any;
  editContactForm: FormGroup;
  contact!: Contact;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {
    this.editContactForm = this.fb.group({
      idContact: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        zip: [''],
        country: ['']
      }),
      phones: this.fb.array([])
    });
  }

  get phones(): FormArray {
    return this.editContactForm.get('phones') as FormArray;
  }

  addPhone(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    var phoneGroup = this.fb.group({
      phoneKind: [''],
      phoneNumber: ['']
    });
    this.phones.push(phoneGroup);
  }
  updatePhone(index: number, updatedPhone: any): void {
    const phoneGroup = this.phones.at(index) as FormGroup;
    phoneGroup.patchValue(updatedPhone);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const contactId = +params['id'];
      this.contactService.getContactById(contactId).subscribe(
        (contact) => {
          console.log(contact)
          this.contact = contact;
          const phoneFormGroups = contact.phones.map(phone => this.fb.group(phone));
          this.editContactForm.setControl('phones', this.fb.array(phoneFormGroups));
          this.editContactForm.patchValue(contact);
        }
      );
    });
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  onSubmit() {
    if (this.editContactForm.valid) {
      const payload: Contact = {
        idContact: this.contact.idContact,
        firstName: this.editContactForm.value.firstName,
        lastName: this.editContactForm.value.lastName,
        email: this.editContactForm.value.email,
        address: {
          street: this.editContactForm.value.address.street,
          city: this.editContactForm.value.address.city,
          zip: this.editContactForm.value.address.zip,
          country: this.editContactForm.value.address.country,
        },
        phones: this.editContactForm.value.phones.map((phone: any) => ({
          phoneKind: phone.phoneKind,
          phoneNumber: phone.phoneNumber
        })),
        contactGroups: []
      };
      console.log(payload);
      this.contactService.updateContact(payload, payload.idContact).subscribe(
        () => {
          console.log('Contact updated:', payload);
          this.router.navigate(['/contacts-list']);
        },
        error => {
          console.error('Error updating contact:', error);
        }
      );
    }
  }


}
