package com.contact.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="ContactsGroupe")
public class ContactGroupe {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long idContactGroup;
	
	@Column(name="GrName")
	private String groupName;

	@ManyToMany(fetch = FetchType.EAGER, mappedBy="contactGroups")
	private Set <Contact> contacts=new HashSet<Contact>();
	
	
	public Set<Contact> getContacts() {
		return contacts;
	}

	public ContactGroupe(String groupName) {
		super();
		this.groupName = groupName;
	}
	
	public ContactGroupe() {
	}
	
	public void setContacts(Set<Contact> contacts) {
		this.contacts = contacts;
	}

	public long getIdContactGroup() {
		return idContactGroup;
	}

	public void setIdContactGroup(long idContactGroup) {
		this.idContactGroup = idContactGroup;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
}
