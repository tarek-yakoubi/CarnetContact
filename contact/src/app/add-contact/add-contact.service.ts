import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './add-contact.model';
import { ContactDTO } from '../list-contacts/contact-dto';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    private baseUrl: string = 'http://localhost:8080/contacts/';

    constructor(private http: HttpClient) {
    }

    private httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
      })
    };

    addContact(contact: Contact): Observable<Contact> {
      console.log(contact);
        return this.http.post<Contact>(this.baseUrl + 'create', contact, this.httpOptions);
    }

    getAllContacts(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.baseUrl, this.httpOptions);
    }

    getContactById(id: number): Observable<Contact> {
      return this.http.get<Contact>(`${this.baseUrl}${id}`, this.httpOptions);
    }

    updateContact(contact: Contact, id: number): Observable<Contact> {
      return this.http.patch<Contact>(`${this.baseUrl}${id}/update`, contact,  this.httpOptions);
    }

    deleteContact(id: number): Observable<Contact> {
      return this.http.delete<Contact>(`${this.baseUrl}${id}/delete`,  this.httpOptions);
    }
}
