package com.hostelbazaar.repository;

import com.hostelbazaar.entity.ChatMessage;
import com.hostelbazaar.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    @Query("SELECT m FROM ChatMessage m WHERE " +
           "(m.sender = :user1 AND m.recipient = :user2) OR " +
           "(m.sender = :user2 AND m.recipient = :user1) " +
           "ORDER BY m.createdAt ASC")
    List<ChatMessage> findConversationBetweenUsers(@Param("user1") User user1, @Param("user2") User user2);
    
    List<ChatMessage> findByRecipientAndIsReadFalse(User recipient);
    
    @Query("SELECT DISTINCT CASE WHEN m.sender = :user THEN m.recipient ELSE m.sender END " +
           "FROM ChatMessage m WHERE m.sender = :user OR m.recipient = :user")
    List<User> findChatPartners(@Param("user") User user);
}