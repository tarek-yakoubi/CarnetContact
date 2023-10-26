package com.contact.services;

import java.util.List;

import com.contact.entities.Contact;

public interface IDAOContact {
	
	public Contact addContact(Contact contact);
	public Contact getContactById(long id);
	public List<Contact> searchContactsAllInfo(String query);
	public List<Contact> GetAllContacts();
}
