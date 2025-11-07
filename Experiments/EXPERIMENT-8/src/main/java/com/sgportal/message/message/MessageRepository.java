package com.sgportal.message.message;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
    List<MessageEntity> findByGrievanceIdOrderByTimestampAsc(Long grievanceId);
}


