package com.contact.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
	public class Adresse {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long idAdresse;
	
	@Column(name="street")
	private String street;
	
	@Column(name="city")
	private String city;
	
	@Column(name="zip")
	private String zip;
	
	@Column(name="country")
	private String country;

	@OneToOne(mappedBy = "address")
	@JsonBackReference
	private Contact contact;


	public Adresse(long idAdresse, String street, String city, String zip, String country) {
		super();
		this.idAdresse = idAdresse;
		this.street = street;
		this.city = city;
		this.zip = zip;
		this.country = country;
	}
	
	public Adresse(String street, String city, String zip, String country) {
		super();
		this.street = street;
		this.city = city;
		this.zip = zip;
		this.country = country;
	}
	
	public Adresse() {
	}
	
	public long getIdAdresse() {
		return idAdresse;
	}
	public void setIdAdresse(long idAdresse) {
		this.idAdresse = idAdresse;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getZip() {
		return zip;
	}
	public void setZip(String zip) {
		this.zip = zip;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	
	public Contact getContact() {
		return contact;
	}

	public void setContact(Contact contact) {
		this.contact = contact;
	}
}
