import { Component, OnInit } from '@angular/core';
import { ContactGroupService } from './contact-group.service';
import { Router } from '@angular/router';
import { ContactGroupDTO } from './contact-group-dto';

@Component({
  selector: 'app-contact-group',
  templateUrl: './contact-group.component.html',
  styleUrls: ['./contact-group.component.css']
})
export class ContactGroupComponent implements OnInit {
  contactGroups: ContactGroupDTO[] = [];

  constructor(private contactGroupService: ContactGroupService, private router : Router) { }

  ngOnInit() {
    this.getContactGroups();
  }

  getContactGroups(): void {
    this.contactGroupService.getAllContactGroups().subscribe(
      (data: ContactGroupDTO[]) => {
        this.contactGroups = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  openCreateContactGroupComponent(): void {
    this.router.navigate(['/create-contact-group']);
  }

  addContactToGroup(): void
  {
     this.router.navigate(['/addcontact-to-group']);
  }

  editContactGroup(groupId: number): void {
    if (groupId !== undefined && groupId !== null) {
      this.router.navigate(['/edit-contact-group', groupId]);
    } else {
      console.error('Le groupId est undefined ou null');
    }
  }

  getContactGroupById(groupId: number): void {
    if (groupId !== undefined && groupId !== null) {
      this.router.navigate(['/contact-group-zoom', groupId]);
    } else {
      console.error('Le groupId est undefined ou null');
    }
  }

  deleteContactGroup(groupId: number): void {
    this.contactGroupService.deleteContactGroup(groupId)
    .subscribe(
      () => {
        alert('Contact supprimé avec succès!');
        this.contactGroups = this.contactGroups.filter(contactGroups => contactGroups.idContactGroup !== groupId);
      },
      error => {
        alert('Contact supprimé avec succès!');
        window.location.reload();
      }
    );
    }
}
