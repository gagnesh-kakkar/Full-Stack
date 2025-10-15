package com.sgportal.grievance.grievance;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/grievances")
public class GrievanceController {
    private final GrievanceRepository repo;

    public GrievanceController(GrievanceRepository repo) { this.repo = repo; }

    public static class CreateReq { @NotBlank public String subject; @NotBlank public String description; }
    public static class StatusReq { public GrievanceStatus status; }

    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<GrievanceEntity> create(@Valid @RequestBody CreateReq req, Authentication auth) {
        GrievanceEntity g = new GrievanceEntity();
        g.setSubject(req.subject);
        g.setDescription(req.description);
        Object userId = auth.getPrincipal();
        g.setStudentId(extractUserId(auth));
        return ResponseEntity.ok(repo.save(g));
    }

    private Long extractUserId(Authentication auth) {
        // In a real setup, parse JWT claims via request attribute or SecurityContext details.
        // For scaffolding, assume username is numeric id if provided; otherwise 1L.
        try { return Long.valueOf(auth.getName()); } catch (NumberFormatException e) { return 1L; }
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('STUDENT','ADMIN')")
    public ResponseEntity<List<GrievanceEntity>> byStudent(@PathVariable Long studentId, Authentication auth) {
        return ResponseEntity.ok(repo.findByStudentIdOrderBySubmittedAtDesc(studentId));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<GrievanceEntity>> list(
        @RequestParam(required = false) GrievanceStatus status,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to
    ) {
        if (status != null) return ResponseEntity.ok(repo.findByStatusOrderBySubmittedAtDesc(status));
        if (from != null && to != null) return ResponseEntity.ok(repo.findBySubmittedAtBetween(from, to));
        return ResponseEntity.ok(repo.findAll());
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GrievanceEntity> updateStatus(@PathVariable Long id, @RequestBody StatusReq req) {
        GrievanceEntity g = repo.findById(id).orElseThrow();
        g.setStatus(req.status);
        return ResponseEntity.ok(repo.save(g));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STUDENT','ADMIN')")
    public ResponseEntity<GrievanceEntity> get(@PathVariable Long id) {
        return ResponseEntity.of(repo.findById(id));
    }
}


