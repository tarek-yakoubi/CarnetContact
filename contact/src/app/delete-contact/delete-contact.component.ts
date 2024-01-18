import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../add-contact/add-contact.service';
import { Contact } from '../add-contact/add-contact.model';

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.css']
})
export class DeleteContactComponent {

  contact!: Contact;
  constructor(private contactService: ContactService, private router: Router) { }

}
