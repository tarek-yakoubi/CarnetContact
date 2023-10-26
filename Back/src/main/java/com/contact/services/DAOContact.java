package com.contact.services;

import com.contact.entities.Contact;
import com.contact.entities.PhoneNum;
import com.contact.util.JpaUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.TypedQuery;
import java.util.ArrayList;

import java.util.List;

@Service
public class DAOContact implements IDAOContact{
	@Autowired
	public DAOContact(){}
	@Override
	public Contact addContact(Contact contact) {
		EntityManager em = JpaUtil.getEmf().createEntityManager();
		EntityTransaction tx =  em.getTransaction();
		System.out.println("here");
		try 
		{
			tx.begin();
			if (contact.getAddress() != null) {
	            contact.getAddress().setContact(contact);
	        }
	        for (PhoneNum phone : contact.getPhones()) {
	            phone.setContact(contact);
	        }

	        em.persist(contact);
			System.out.println(contact.getEmail());
			tx.commit();

			em.close();

		}catch (Exception e) {
			    if (tx != null && tx.isActive()) {
			        tx.rollback();
			    }
			    e.printStackTrace();
			    return null;
		}
		return contact;
	}

	@Override
	public Contact getContactById(long id) {
		EntityManager em = null;
		Contact contact = null;
		try {
			em = JpaUtil.getEmf().createEntityManager();
			EntityTransaction tx = em.getTransaction();
			tx.begin();

			contact = em.find(Contact.class, id); 

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


	private void handleException(Exception e) {
		// Log the exception, alert the admin, etc.
		e.printStackTrace();
	}

	private void closeEntityManager(EntityManager em) {
		if (em != null) {
			em.close();
		}
	}

	@Override
	public List<Contact> searchContactsAllInfo(String query) {
		EntityManager em = null;
		List<Contact> contacts = new ArrayList<>();

		try {
			em = JpaUtil.getEmf().createEntityManager();

			// Construire la requête JPQL
			String jpql = "SELECT c FROM Contact c WHERE 1=1 ";
			String s = new String("SELECT c FROM Contact c WHERE c.firstName LIKE :query OR c.lastName LIKE :query OR c.email LIKE :query");
			TypedQuery<Contact> typedQuery = em.createQuery(
					s,
					Contact.class);
			typedQuery.setParameter("query", "%" + query + "%");

			contacts = typedQuery.getResultList();
		} catch (Exception e) {
			handleException(e);
		} finally {
			closeEntityManager(em);
		}

		return contacts;

	}
	
	@Override
	public List<Contact> GetAllContacts() {
		EntityManager em = null;
		List<Contact> contacts = new ArrayList<>();

		try {
			em = JpaUtil.getEmf().createEntityManager();
			String s = new String( "FROM Contact");
			TypedQuery<Contact> typedQuery = em.createQuery(s, Contact.class);

			contacts = typedQuery.getResultList();
		} catch (Exception e) {
			handleException(e);
		} finally {
			closeEntityManager(em);
		}

		return contacts;

	}

}
