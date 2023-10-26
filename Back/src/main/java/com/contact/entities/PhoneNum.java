package com.contact.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idPhoneNum")
public class PhoneNum {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idPhoneNum;
	
	@Column(name="phoneKind")
	private String phoneKind;
	
	@Column(name="phoneNumber")
	private String phoneNumber;
	
	@ManyToOne
	@JoinColumn(name="id_contact")
	private Contact contact=null;

	public PhoneNum() 
	{
	}
	
	public PhoneNum(String phoneKind, String phoneNumber) 
	{
		super();
		this.phoneKind = phoneKind;
		this.phoneNumber = phoneNumber;
	}

	public long getIdPhoneNum() {
		return idPhoneNum;
	}

	public void setIdPhoneNum(long idPhoneNum) {
		this.idPhoneNum = idPhoneNum;
	}

	public String getPhoneKind() {
		return phoneKind;
	}

	public void setPhoneKind(String phoneKind) {
		this.phoneKind = phoneKind;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Contact getContact() {
		return contact;
	}

	public void setContact(Contact contact) {
		this.contact = contact;
	}
	
	
	
	
}
