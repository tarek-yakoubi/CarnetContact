import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './add-contact.model';

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
        return this.http.post<Contact>(this.baseUrl + 'create', contact, this.httpOptions);
    }

    getAllContacts(): Observable<Contact[]> {
      return this.http.get<Contact[]>(this.baseUrl, this.httpOptions);
    }
}
