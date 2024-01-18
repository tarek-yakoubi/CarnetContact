import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { ListContactsComponent } from './list-contacts/list-contacts.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { DeleteContactComponent } from './delete-contact/delete-contact.component';
import { ContactGroupComponent } from './contact-group/contact-group.component';
import { CreateContactGroupComponent } from './contact-group-create/contact-group-create.component';
import { PhoneEditComponent } from './phone-edit/phone-edit.component';
import { EditContactGroupComponent } from './edit-contact-group/edit-contact-group.component';
import { ContactGroupZoomComponent } from './contact-group-zoom/contact-group-zoom.component';
import { AddcontactToContactGroupComponent } from './addcontact-to-contact-group/addcontact-to-contact-group.component';

@NgModule({
  declarations: [	
    AppComponent,
    AddContactComponent,
    NavbarComponent,
    ListContactsComponent,
    EditContactComponent,
    DeleteContactComponent,
    ContactGroupComponent,
    CreateContactGroupComponent,
    PhoneEditComponent,
    EditContactGroupComponent,
      ContactGroupZoomComponent,
      AddcontactToContactGroupComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
