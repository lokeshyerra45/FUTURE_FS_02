package com.crm.minicrm.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crm.minicrm.entity.Customer;
import com.crm.minicrm.entity.Followup;
import com.crm.minicrm.entity.Lead;
import com.crm.minicrm.repository.CustomerRepository;
import com.crm.minicrm.repository.FollowupRepository;
import com.crm.minicrm.repository.LeadRepository;
import com.crm.minicrm.repository.UserRepository;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportsController {

    private final LeadRepository leadRepository;
    private final CustomerRepository customerRepository;
    private final FollowupRepository followupRepository;
    private final UserRepository userRepository;

    public ReportsController(
            LeadRepository leadRepository,
            CustomerRepository customerRepository,
            FollowupRepository followupRepository,
            UserRepository userRepository) {

        this.leadRepository = leadRepository;
        this.customerRepository = customerRepository;
        this.followupRepository = followupRepository;
        this.userRepository = userRepository;
    }

    // All Leads Report
    @GetMapping("/leads")
    public List<Lead> getLeadReport() {
        return leadRepository.findAll();
    }

    // All Customers Report
    @GetMapping("/customers")
    public List<Customer> getCustomerReport() {
        return customerRepository.findAll();
    }

    // All Followups Report
    @GetMapping("/followups")
    public List<Followup> getFollowupReport() {
        return followupRepository.findAll();
    }

    // Summary Report
    @GetMapping("/summary")
    public Map<String, Long> getSummaryReport() {

        Map<String, Long> report = new HashMap<>();

        report.put("totalLeads", leadRepository.count());

        report.put(
                "convertedLeads",
                leadRepository.countByStatus("CONVERTED")
        );

        report.put(
                "newLeads",
                leadRepository.countByStatus("NEW")
        );

        report.put(
                "contactedLeads",
                leadRepository.countByStatus("CONTACTED")
        );

        report.put(
                "followupLeads",
                leadRepository.countByStatus("FOLLOWUP")
        );

        report.put(
                "rejectedLeads",
                leadRepository.countByStatus("REJECTED")
        );

        report.put(
                "totalCustomers",
                customerRepository.count()
        );

        report.put(
                "totalEmployees",
                userRepository.count()
        );

        report.put(
                "totalFollowups",
                followupRepository.count()
        );

        return report;
    }
}