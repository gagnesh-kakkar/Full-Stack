package com.sgportal.report.notify;

import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/events")
public class NotificationController {
    private final JavaMailSender mailSender;
    private final String from;

    public NotificationController(JavaMailSender mailSender, @Value("${notify.from}") String from) {
        this.mailSender = mailSender;
        this.from = from;
    }

    public static class StatusChangeEvent {
        @NotBlank public String grievanceId;
        @NotBlank public String oldStatus;
        @NotBlank public String newStatus;
        @NotBlank public String studentEmail;
        public String subject;
    }

    @PostMapping("/status-change")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> onStatusChange(@RequestBody StatusChangeEvent event) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(from);
            msg.setTo(event.studentEmail);
            msg.setSubject("Grievance Status Update: " + (event.subject == null ? event.grievanceId : event.subject));
            msg.setText("Your grievance " + event.grievanceId + " changed from " + event.oldStatus + " to " + event.newStatus + ".");
            mailSender.send(msg);
        } catch (Exception e) {
            // ignore failures in dev; in prod, log and retry
        }
        return ResponseEntity.accepted().build();
    }
}


