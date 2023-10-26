package com.contact.controllers;

import java.util.List;

import com.contact.services.DAOContactGroupe;
import com.contact.entities.ContactGroupe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contactGroups")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactGroupController {
	@Autowired
	private DAOContactGroupe dcg;
	@PostMapping("/create")
	public ResponseEntity<ContactGroupe> createContactGroup(@RequestBody ContactGroupe contactGroup) {
		dcg.addContactGroupe(contactGroup);
		return ResponseEntity.ok(contactGroup);
	}

	@GetMapping("/")
	public ResponseEntity<List<ContactGroupe>> getAllContactGroupes() {
		List<ContactGroupe> contactGroupe;
		contactGroupe = dcg.GetAllContactroupes();
		return ResponseEntity.ok(contactGroupe);
	}

	@DeleteMapping("/{groupId}/delete")
	public ResponseEntity<Void> deleteContactGroup(@PathVariable long groupId) {
		boolean success = dcg.deleteContactGroup(groupId);
		if (!success) {
			return ResponseEntity.notFound().build();  // Groupe non trouvé
		}
		return ResponseEntity.noContent().build();  // Suppression réussie
	}

	@PutMapping("/{groupId}/update")
	public ResponseEntity<ContactGroupe> updateContactGroup(@PathVariable long groupId, @RequestBody ContactGroupe updatedGroup) {
		ContactGroupe existingGroup = dcg.GetByIdContactGroupe(groupId);
		if (existingGroup == null) {
			return ResponseEntity.notFound().build();  // Groupe non trouvé
		}
		// Ici, vous pouvez mettre à jour les attributs nécessaires de `existingGroup` avec ceux de `updatedGroup`.
		// Par exemple: existingGroup.setGroupName(updatedGroup.getGroupName());
		// Ensuite, utilisez une méthode DAO pour enregistrer les changements.
		dcg.updateContactGroupe(groupId, existingGroup);
		return ResponseEntity.ok(existingGroup);
	}
}


