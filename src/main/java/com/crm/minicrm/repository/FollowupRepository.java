package com.crm.minicrm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crm.minicrm.entity.Followup;

public interface FollowupRepository extends JpaRepository<Followup, Long> {

    List<Followup> findByLeadId(Long leadId);

}