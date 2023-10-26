package com.contact.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Query;

import com.contact.entities.Contact;
import com.contact.entities.ContactGroupe;
import com.contact.util.JpaUtil;
import org.springframework.stereotype.Service;

@Service
public class DAOContactGroupe implements IDAOContactGroupe{

	public DAOContactGroupe(){}
	public ContactGroupe addContactGroupe(ContactGroupe contactGroupe) {
	    Set<Contact> contactsToAdd = new HashSet<>();
	    EntityManager em = JpaUtil.getEmf().createEntityManager();
		EntityTransaction tx =  em.getTransaction();
		tx.begin();
		System.out.println(contactGroupe.getGroupName());
	    for (Contact contact : contactGroupe.getContacts()) {
	        if (contact.getIdContact() != 0) { // Si un ID est fourni
	            Contact existingContact = em.find(Contact.class, contact.getIdContact());
	            if (existingContact != null) {
	            	existingContact.getContactGroups().add(contactGroupe);
	                contactsToAdd.add(existingContact);
	            }
	        } else { // Si aucun ID n'est fourni
	        	contact.getContactGroups().add(contactGroupe);
	            contactsToAdd.add(contact);
	            em.persist(contact); // Persistez le nouveau contact
	        }
	    }
	    contactGroupe.setContacts(contactsToAdd);
	    em.persist(contactGroupe);
		System.out.println(contactGroupe);
		tx.commit();
		em.close();
		return contactGroupe;
	}

	public ContactGroupe addContactGroupes(ContactGroupe contactGroupe) {
		try 
		{
			EntityManager em = JpaUtil.getEmf().createEntityManager();
			EntityTransaction tx =  em.getTransaction();
			tx.begin();
			
			//Set<PhoneNum> phones = contact.getPhones();
			//Adresse adresse = contact.getAddress();
			//Contact c1 = new Contact(contact.getFirstName(),contact.getLastName(), contact.getEmail());
			em.persist(contactGroupe);
			System.out.println(contactGroupe);
			tx.commit();

			em.close();

			return contactGroupe;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public ContactGroupe GetByIdContactGroupe(long IdContactGroupe) {
		EntityManager em = null;
		ContactGroupe contact = null;
		try {
			em = JpaUtil.getEmf().createEntityManager();
			EntityTransaction tx = em.getTransaction();
			tx.begin();

			contact = em.find(ContactGroupe.class, IdContactGroupe); 

			tx.commit();
		} catch (Exception e) {
			e.printStackTrace();
			if (em != null) 
				em.getTransaction().rollback(); 
		} finally {
			if (em != null) {
				em.close();
			}
		}
		return contact;
	}
	
	

	@Override
	public List<ContactGroupe> GetAllContactroupes() {
		EntityManager em = null;
		List<ContactGroupe> contactGroupes = new ArrayList<>();

		try {
			em = JpaUtil.getEmf().createEntityManager();

			Query query = em.createQuery("SELECT g FROM ContactGroupe g");
			contactGroupes = query.getResultList();
			return contactGroupes;
		} catch (Exception e) {
			handleException(e);
		} finally {
			closeEntityManager(em);
		}

		return contactGroupes;

	}

	@Override
	public boolean deleteContactGroup(long groupId) {
		EntityManager em = JpaUtil.getEmf().createEntityManager();
		EntityTransaction tx = em.getTransaction();

		try {
			tx.begin();

			// Rechercher le groupe par ID
			ContactGroupe group = em.find(ContactGroupe.class, groupId);
			if(group == null) {
				return false;  // Groupe non trouvé
			}

			em.remove(group);  // Supprimer le groupe

			tx.commit();
			return true;
		} catch(Exception e) {
			handleException(e);
			if(tx.isActive()) {
				tx.rollback();
			}
			return false;
		} finally {
			closeEntityManager(em);
		}
	}
	@Override
	public boolean addContactToGroup(long groupId, Contact contact) {
		EntityManager em = JpaUtil.getEmf().createEntityManager();
		EntityTransaction tx = em.getTransaction();

		try {
			tx.begin();

			// Rechercher le groupe par ID
			ContactGroupe group = em.find(ContactGroupe.class, groupId);
			if(group == null) {
				return false;  // Groupe non trouvé
			}

			// Vérifier si le contact existe déjà
			if(contact.getIdContact() != 0) {
				contact = em.find(Contact.class, contact.getIdContact());
				if(contact == null) {
					return false;  // Contact non trouvé
				}
			} else {
				em.persist(contact);  // Sauvegarder le nouveau contact
			}

			// Ajouter le contact au groupe
			group.getContacts().add(contact);
			contact.getContactGroups().add(group);

			tx.commit();
			return true;
		} catch(Exception e) {
			handleException(e);
			if(tx.isActive()) {
				tx.rollback();
			}
			return false;
		} finally {
			closeEntityManager(em);
		}
	}

	@Override
	public ContactGroupe updateContactGroupe(long IdContactGroupe, ContactGroupe cg) {
		return null;
	}

	private void handleException(Exception e) {
		// Log the exception, alert the admin, etc.
		e.printStackTrace();
	}

	private void closeEntityManager(EntityManager em) {
		if (em != null) {
			em.close();
		}
	}

}
