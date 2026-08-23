package com.crm.minicrm.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.crm.minicrm.entity.Followup;
import com.crm.minicrm.repository.FollowupRepository;

@RestController
@RequestMapping("/api/followups")
@CrossOrigin(origins = "*")
public class FollowupController {

    private final FollowupRepository followupRepository;

    public FollowupController(FollowupRepository followupRepository) {
        this.followupRepository = followupRepository;
    }

    // Add Followup
    @PostMapping
    public Followup addFollowup(@RequestBody Followup followup) {
        return followupRepository.save(followup);
    }

    // Get All Followups
    @GetMapping
    public List<Followup> getAllFollowups() {
        return followupRepository.findAll();
    }

    // Get Followup By Id
    @GetMapping("/{id}")
    public Followup getFollowupById(@PathVariable Long id) {
        return followupRepository.findById(id).orElse(null);
    }

    // Update Followup
    @PutMapping("/{id}")
    public Followup updateFollowup(
            @PathVariable Long id,
            @RequestBody Followup updatedFollowup) {

        Followup followup =
                followupRepository.findById(id)
                        .orElse(null);

        if (followup == null) {
            return null;
        }

        followup.setLeadId(updatedFollowup.getLeadId());
        followup.setFollowupDate(updatedFollowup.getFollowupDate());
        followup.setNotes(updatedFollowup.getNotes());

        return followupRepository.save(followup);
    }

    // Delete Followup
    @DeleteMapping("/{id}")
    public String deleteFollowup(@PathVariable Long id) {

        followupRepository.deleteById(id);

        return "Followup Deleted Successfully";
    }
}