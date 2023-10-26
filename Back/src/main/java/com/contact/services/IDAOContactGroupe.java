package com.contact.services;

import java.util.List;

import com.contact.entities.Contact;
import com.contact.entities.ContactGroupe;

public interface IDAOContactGroupe {
	
	public ContactGroupe addContactGroupe(ContactGroupe contactGroupe);
	public boolean addContactToGroup(long groupId, Contact contact);
	public ContactGroupe updateContactGroupe(long IdContactGroupe,ContactGroupe cg);
	
	public ContactGroupe GetByIdContactGroupe(long IdContactGroupe);
	
	public List<ContactGroupe> GetAllContactroupes();
	
	public boolean deleteContactGroup(long IdContactGroupe);
}
