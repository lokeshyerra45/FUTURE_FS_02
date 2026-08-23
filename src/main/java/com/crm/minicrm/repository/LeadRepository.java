package com.crm.minicrm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crm.minicrm.entity.Lead;

public interface LeadRepository extends JpaRepository<Lead, Long> {

    List<Lead> findByStatus(String status);

    List<Lead> findByAssignedTo(String assignedTo);

    long countByStatus(String status);
}