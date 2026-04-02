package com.project.portfolio_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.portfolio_backend.model.Contact;
import com.project.portfolio_backend.service.ContactService;

import lombok.RequiredArgsConstructor;


@CrossOrigin(origins = {"http://localhost:5173", "http://localhost"})
@RestController
@RequiredArgsConstructor
public class Controller {
    
    private final ContactService contactService;

    @GetMapping("/about")
    public ResponseEntity<Void> About() {
        return ResponseEntity.noContent().build(); 
    }

    @PostMapping("/contact")
    public ResponseEntity<Contact> Contact(@RequestBody Contact contact) {
        
        return ResponseEntity.ok(contactService.addContact(contact));
    }

    @GetMapping("/projects")
    public ResponseEntity<Void> projects() {
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/techstack")
    public ResponseEntity<Void> techStack() {
        return ResponseEntity.noContent().build();
    }
   
       @GetMapping("/admin/all")
    public ResponseEntity<List<Contact>> findAllContact() {
        return ResponseEntity.ok(contactService.getAll());
    }
    
    @GetMapping("/admin/all/{email}")
    public ResponseEntity<List<Contact>> findAllByEmail(@PathVariable String email) {
        return ResponseEntity.ok(contactService.getAllByEmail(email));
    }
}
