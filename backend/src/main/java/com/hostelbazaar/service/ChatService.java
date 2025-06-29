package com.hostelbazaar.service;

import com.hostelbazaar.entity.ChatMessage;
import com.hostelbazaar.entity.User;
import com.hostelbazaar.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChatService {
    
    @Autowired
    private ChatMessageRepository chatMessageRepository;
    
    public ChatMessage saveMessage(ChatMessage message) {
        return chatMessageRepository.save(message);
    }
    
    public List<ChatMessage> getConversation(User user1, User user2) {
        return chatMessageRepository.findConversationBetweenUsers(user1, user2);
    }
    
    public List<ChatMessage> getUnreadMessages(User recipient) {
        return chatMessageRepository.findByRecipientAndIsReadFalse(recipient);
    }
    
    public List<User> getChatPartners(User user) {
        return chatMessageRepository.findChatPartners(user);
    }
    
    public void markAsRead(Long messageId) {
        chatMessageRepository.findById(messageId).ifPresent(message -> {
            message.setIsRead(true);
            chatMessageRepository.save(message);
        });
    }
}