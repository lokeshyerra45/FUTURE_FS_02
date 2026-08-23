package com.crm.minicrm.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crm.minicrm.repository.CustomerRepository;
import com.crm.minicrm.repository.LeadRepository;
import com.crm.minicrm.repository.UserRepository;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final LeadRepository leadRepository;
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;

    public DashboardController(
            LeadRepository leadRepository,
            CustomerRepository customerRepository,
            UserRepository userRepository) {

        this.leadRepository = leadRepository;
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public Map<String, Long> getDashboardStats() {

        Map<String, Long> stats = new HashMap<>();

        stats.put("totalLeads", leadRepository.count());

        stats.put(
                "convertedLeads",
                leadRepository.countByStatus("CONVERTED")
        );

        stats.put(
                "pendingLeads",
                leadRepository.countByStatus("FOLLOWUP")
        );

        stats.put(
                "contactedLeads",
                leadRepository.countByStatus("CONTACTED")
        );

        stats.put(
                "newLeads",
                leadRepository.countByStatus("NEW")
        );

        stats.put(
                "totalCustomers",
                customerRepository.count()
        );

        stats.put(
                "totalUsers",
                userRepository.count()
        );

        return stats;
    }
}