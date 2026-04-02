package com.project.portfolio_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.portfolio_backend.model.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
     List<Contact> findAllByEmail(String email);
}
