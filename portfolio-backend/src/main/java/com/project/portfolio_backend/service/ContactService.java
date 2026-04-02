package com.project.portfolio_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.portfolio_backend.model.Contact;
import com.project.portfolio_backend.repository.ContactRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;

    public Contact getById(long id){
        return contactRepository.findById(id)
        .orElseThrow(() -> new Error("Id not Found!"));
    }

    public List<Contact> getAll(){
        return contactRepository.findAll();
    }

    public Contact addContact(Contact contact){
        return contactRepository.save(contact);
    }

    public List<Contact> getAllByEmail(String email){
        return contactRepository.findAllByEmail(email);
    }
}
