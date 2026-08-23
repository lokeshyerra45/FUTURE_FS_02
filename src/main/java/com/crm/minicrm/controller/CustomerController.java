package com.crm.minicrm.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.crm.minicrm.entity.Customer;
import com.crm.minicrm.repository.CustomerRepository;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {

    private final CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    // Add Customer
    @PostMapping
    public Customer addCustomer(@RequestBody Customer customer) {
        return customerRepository.save(customer);
    }

    // Get All Customers
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Get Customer By Id
    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    // Update Customer
    @PutMapping("/{id}")
    public Customer updateCustomer(
            @PathVariable Long id,
            @RequestBody Customer updatedCustomer) {

        Customer customer =
                customerRepository.findById(id)
                        .orElse(null);

        if (customer == null) {
            return null;
        }

        customer.setName(updatedCustomer.getName());
        customer.setEmail(updatedCustomer.getEmail());
        customer.setPhone(updatedCustomer.getPhone());
        customer.setAddress(updatedCustomer.getAddress());

        return customerRepository.save(customer);
    }

    // Delete Customer
    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable Long id) {

        customerRepository.deleteById(id);

        return "Customer Deleted Successfully";
    }
}