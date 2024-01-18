import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ListContactsComponent } from './list-contacts/list-contacts.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ContactGroupComponent } from './contact-group/contact-group.component';
import { CreateContactGroupComponent } from './contact-group-create/contact-group-create.component';
import { EditContactGroupComponent } from './edit-contact-group/edit-contact-group.component';
import { ContactGroupZoomComponent } from './contact-group-zoom/contact-group-zoom.component';
import { AddcontactToContactGroupComponent } from './addcontact-to-contact-group/addcontact-to-contact-group.component';

const routes: Routes = [
  { path: 'add-contact', component: AddContactComponent },
  { path: 'contacts-list', component: ListContactsComponent },
  { path: 'edit-contact/:id', component: EditContactComponent },
  { path: 'contactgroup-list', component: ContactGroupComponent },
  { path: 'create-contact-group', component: CreateContactGroupComponent },
  { path: 'edit-contact-group/:id', component: EditContactGroupComponent },
  { path: 'contact-group-zoom/:id', component: ContactGroupZoomComponent },
  { path: 'addcontact-to-group', component: AddcontactToContactGroupComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
