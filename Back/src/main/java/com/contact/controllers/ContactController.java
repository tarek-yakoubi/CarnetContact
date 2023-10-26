package com.contact.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.contact.services.DAOContact;
import com.contact.entities.Contact;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/contacts")
public class ContactController {

	@Autowired
	private DAOContact contactService;

	@GetMapping("/")
	public ResponseEntity<List<Contact>> getAllContacts() {
		List<Contact> contacts = contactService.GetAllContacts();
		return ResponseEntity.ok(contacts);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Contact> getContactById(@PathVariable("id") int id) {
		Contact contact = contactService.getContactById(id);
		if (contact != null) {
			return ResponseEntity.ok(contact);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/create")
	public ResponseEntity<Contact> addContact(@RequestBody Contact contact) {
		Contact addedContact = contactService.addContact(contact);
		if (addedContact != null) {
			return ResponseEntity.status(HttpStatus.CREATED).body(addedContact);
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
