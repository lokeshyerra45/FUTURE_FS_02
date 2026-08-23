package com.crm.minicrm.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.crm.minicrm.entity.Lead;
import com.crm.minicrm.repository.LeadRepository;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = "*")
public class LeadController {

    private final LeadRepository leadRepository;

    public LeadController(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    // Add Lead
    @PostMapping
    public Lead addLead(@RequestBody Lead lead) {
        return leadRepository.save(lead);
    }

    // Get All Leads
    @GetMapping
    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    // Get Lead By Id
    @GetMapping("/{id}")
    public Lead getLeadById(@PathVariable Long id) {
        return leadRepository.findById(id).orElse(null);
    }

    // Update Lead
    @PutMapping("/{id}")
    public Lead updateLead(
            @PathVariable Long id,
            @RequestBody Lead updatedLead) {

        Lead lead =
                leadRepository.findById(id)
                .orElse(null);

        if (lead == null) {
            return null;
        }

        lead.setCustomerName(updatedLead.getCustomerName());
        lead.setPhone(updatedLead.getPhone());
        lead.setEmail(updatedLead.getEmail());
        lead.setSource(updatedLead.getSource());
        lead.setStatus(updatedLead.getStatus());
        lead.setAssignedTo(updatedLead.getAssignedTo());

        return leadRepository.save(lead);
    }

    // Delete Lead
    @DeleteMapping("/{id}")
    public String deleteLead(@PathVariable Long id) {

        leadRepository.deleteById(id);

        return "Lead Deleted Successfully";
    }

}