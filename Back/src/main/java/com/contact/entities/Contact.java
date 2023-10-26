package com.contact.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Contacts")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idContact")
public class Contact {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long idContact;

	@Column(name="fname")
	private String firstName;
	
	@Column(name="lname")
	private String lastName;
	
	@Column(name = "email", unique = true)
	private String email;
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "idAdresse")
	private Adresse address;
	
	@OneToMany(cascade=CascadeType.ALL,fetch = FetchType.EAGER, mappedBy="contact")
	Set<PhoneNum> phones =new HashSet<PhoneNum>();
	
	@ManyToMany(cascade=CascadeType.PERSIST, fetch = FetchType.EAGER)
	@JoinTable(name="CTC_GRP", joinColumns=@JoinColumn(name="CTC_ID"), inverseJoinColumns=@JoinColumn(name="GRP_ID"))
	private Set<ContactGroupe> contactGroups=new HashSet<>();
	
	
	public Set<ContactGroupe> getContactGroups() {
		return contactGroups;
	}

	public void setContactGroups(Set<ContactGroupe> contactGroups) {
		this.contactGroups = contactGroups;
	}


	public Adresse getAddress() {
		return address;
	}


	public void setAddress(Adresse address) {
		this.address = address;
	}


	public Set<PhoneNum> getPhones() {
		return phones;
	}


	public void setPhones(Set<PhoneNum> phones) {
		this.phones = phones;
	}
	
	public void addPhoneNum(PhoneNum pn) 
	{
		this.phones.add(pn);
	}


	public Contact(){
	}
	

	public Contact(String firstName, String lastName, String email, long idContact) {
		this(firstName, lastName, email);
		this.idContact = idContact;
	}


	public Contact(String firstName, String lastName, String email) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}
	
	public Contact(String firstName, String lastName, String email, Adresse adresse) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.address = adresse;
	}


	public String getEmail(){
		return email;
	}
	
	public void setEmail(String email){
		this.email = email;
	}
	
	public String getFirstName(){
		return firstName;
	}
	
	public void setFirstName(String firstname){
		this.firstName = firstname;
	}
	
	
	public String getLastName(){
		return lastName;
	}
	
	public void setLastName(String lastname){
		this.lastName = lastname;
	}

	public long getIdContact() {
		return idContact;
	}

	public void setIdContact(long idContact) {
		this.idContact = idContact;
	}
}
