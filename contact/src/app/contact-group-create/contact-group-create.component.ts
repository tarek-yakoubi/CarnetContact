import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ContactService } from '../add-contact/add-contact.service';
import { Contact } from '../add-contact/add-contact.model';
import { ContactGroupService } from '../contact-group/contact-group.service';
import { Router } from '@angular/router';
import { ContactGroupDTO } from '../contact-group/contact-group-dto';

@Component({
  selector: 'app-create-contact-group',
  templateUrl: './contact-group-create.component.html',
  styleUrls: ['./contact-group-create.component.css']
})
export class CreateContactGroupComponent implements OnInit {

  createGroupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactGroupService: ContactGroupService,
    private router: Router
  ) {
    this.createGroupForm = this.fb.group({
      groupName: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  openCreateContactGroupComponent(): void {
      this.router.navigate(['/create-contact-group']);
  }
  onSubmit() {
    const newGroup: ContactGroupDTO = {
      groupName: this.createGroupForm.value.groupName,
      contactIds: [],
      idContactGroup: 0
    };

    this.contactGroupService.createContactGroup(newGroup).subscribe(
      () => {
        alert('Nouveau groupe créé avec succès!');
        this.router.navigate(['/contactgroup-list']);
      },
      error => {
        console.error(error);
        alert('Erreur lors de la création du groupe.');
      }
    );
  }
}
