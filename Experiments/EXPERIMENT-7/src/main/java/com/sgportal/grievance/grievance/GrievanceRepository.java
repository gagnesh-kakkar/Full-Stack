package com.sgportal.grievance.grievance;

import java.time.Instant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GrievanceRepository extends JpaRepository<GrievanceEntity, Long> {
    List<GrievanceEntity> findByStudentIdOrderBySubmittedAtDesc(Long studentId);
    List<GrievanceEntity> findByStatusOrderBySubmittedAtDesc(GrievanceStatus status);
    List<GrievanceEntity> findBySubmittedAtBetween(Instant from, Instant to);
}


