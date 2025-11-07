package com.sgportal.message.message;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/grievances/{grievanceId}/messages")
public class MessageController {
    private final MessageRepository repo;

    public MessageController(MessageRepository repo) { this.repo = repo; }

    public static class CreateReq { @NotBlank public String content; }

    @PostMapping
    @PreAuthorize("hasAnyRole('STUDENT','ADMIN')")
    public ResponseEntity<MessageEntity> create(@PathVariable Long grievanceId, @Valid @RequestBody CreateReq req, Authentication auth) {
        MessageEntity m = new MessageEntity();
        m.setGrievanceId(grievanceId);
        m.setSenderId(extractUserId(auth));
        m.setContent(req.content);
        return ResponseEntity.ok(repo.save(m));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('STUDENT','ADMIN')")
    public ResponseEntity<List<MessageEntity>> list(@PathVariable Long grievanceId) {
        return ResponseEntity.ok(repo.findByGrievanceIdOrderByTimestampAsc(grievanceId));
    }

    private Long extractUserId(Authentication auth) {
        try { return Long.valueOf(auth.getName()); } catch (NumberFormatException e) { return 1L; }
    }
}


