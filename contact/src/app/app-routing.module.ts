import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ListContactsComponent } from './list-contacts/list-contacts.component';

const routes: Routes = [
  { path: 'add-contact', component: AddContactComponent },
  { path: 'contactslist', component: ListContactsComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
