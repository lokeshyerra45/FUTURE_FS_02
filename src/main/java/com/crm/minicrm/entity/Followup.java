package com.crm.minicrm.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "followups")
public class Followup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followupId;

    private Long leadId;

    private LocalDate followupDate;

    private String notes;

    public Followup() {
    }

    public Long getFollowupId() {
        return followupId;
    }

    public void setFollowupId(Long followupId) {
        this.followupId = followupId;
    }

    public Long getLeadId() {
        return leadId;
    }

    public void setLeadId(Long leadId) {
        this.leadId = leadId;
    }

    public LocalDate getFollowupDate() {
        return followupDate;
    }

    public void setFollowupDate(LocalDate followupDate) {
        this.followupDate = followupDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}