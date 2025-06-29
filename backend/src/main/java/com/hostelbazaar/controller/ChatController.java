package com.hostelbazaar.controller;

import com.hostelbazaar.dto.ChatMessageRequest;
import com.hostelbazaar.entity.ChatMessage;
import com.hostelbazaar.entity.Product;
import com.hostelbazaar.entity.User;
import com.hostelbazaar.service.ChatService;
import com.hostelbazaar.service.ProductService;
import com.hostelbazaar.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ChatController {
    
    @Autowired
    private ChatService chatService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private ProductService productService;
    
    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@Valid @RequestBody ChatMessageRequest messageRequest,
                                       Authentication authentication) {
        String senderEmail = authentication.getName();
        Optional<User> sender = userService.findByEmail(senderEmail);
        Optional<User> recipient = userService.findById(messageRequest.getRecipientId());
        
        if (sender.isEmpty() || recipient.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }
        
        ChatMessage message = new ChatMessage();
        message.setContent(messageRequest.getContent());
        message.setSender(sender.get());
        message.setRecipient(recipient.get());
        
        if (messageRequest.getProductId() != null) {
            Optional<Product> product = productService.findById(messageRequest.getProductId());
            product.ifPresent(message::setProduct);
        }
        
        ChatMessage savedMessage = chatService.saveMessage(message);
        return ResponseEntity.ok(savedMessage);
    }
    
    @GetMapping("/conversation/{userId}")
    public ResponseEntity<List<ChatMessage>> getConversation(@PathVariable Long userId,
                                                           Authentication authentication) {
        String currentUserEmail = authentication.getName();
        Optional<User> currentUser = userService.findByEmail(currentUserEmail);
        Optional<User> otherUser = userService.findById(userId);
        
        if (currentUser.isEmpty() || otherUser.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        List<ChatMessage> messages = chatService.getConversation(currentUser.get(), otherUser.get());
        return ResponseEntity.ok(messages);
    }
    
    @GetMapping("/partners")
    public ResponseEntity<List<User>> getChatPartners(Authentication authentication) {
        String email = authentication.getName();
        Optional<User> user = userService.findByEmail(email);
        
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        List<User> partners = chatService.getChatPartners(user.get());
        return ResponseEntity.ok(partners);
    }
    
    @GetMapping("/unread")
    public ResponseEntity<List<ChatMessage>> getUnreadMessages(Authentication authentication) {
        String email = authentication.getName();
        Optional<User> user = userService.findByEmail(email);
        
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        List<ChatMessage> unreadMessages = chatService.getUnreadMessages(user.get());
        return ResponseEntity.ok(unreadMessages);
    }
    
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(ChatMessage chatMessage) {
        return chatService.saveMessage(chatMessage);
    }
}