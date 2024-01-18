import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactGroup } from './contact-group.model';
import { ContactGroupDTO } from './contact-group-dto';

@Injectable({
  providedIn: 'root'
})
export class ContactGroupService {
  private baseUrl = 'http://localhost:8080/contactGroups/';

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
    })
  };

  getAllContactGroups(): Observable<ContactGroupDTO[]> {
    return this.http.get<ContactGroupDTO[]>(`${this.baseUrl}`,this.httpOptions);
  }

  createContactGroup(contactGroup: ContactGroupDTO): Observable<ContactGroupDTO> {
    console.log('create ' + contactGroup);
    return this.http.post<ContactGroupDTO>(`${this.baseUrl}create`, contactGroup, this.httpOptions);
  }

  getContactGroupById(id: number): Observable<ContactGroupDTO> {
    console.log('get ' + id);
    return this.http.get<ContactGroupDTO>(`${this.baseUrl}${id}`, this.httpOptions);
  }

  updateContactGroup( id: number,contactGroup: ContactGroupDTO): Observable<ContactGroupDTO> {
    return this.http.patch<ContactGroupDTO>(`${this.baseUrl}${id}/update`, contactGroup,  this.httpOptions);
  }

  deleteContactGroup(id: number):  Observable<ContactGroup>{
    return this.http.delete<ContactGroup>(`${this.baseUrl}${id}/delete`, this.httpOptions);
  }

  addContactToGroup(contactId: number, groupId: number): Observable<ContactGroupDTO> {
    return this.http.patch<ContactGroupDTO>(`${this.baseUrl}${groupId}/add-contact/${contactId}`, this.httpOptions);
  }

  deleteContactFromGroup(contactId: number, groupId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${groupId}/remove-contact/${contactId}`, this.httpOptions);
  }

}
