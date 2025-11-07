package com.sgportal.report.report;

import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.Map;

@RestController
public class StatsController {

    @GetMapping("/grievances/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> stats(
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to
    ) {
        // Placeholder static response. In production, query grievance-service DB or replicate events.
        return ResponseEntity.ok(Map.of(
            "total", 0,
            "byStatus", Map.of("NEW", 0, "IN_PROGRESS", 0, "RESOLVED", 0)
        ));
    }
}


