package com.hostelbazaar.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ChatMessageRequest {
    @NotBlank
    private String content;

    @NotNull
    private Long recipientId;

    private Long productId;

    // Constructors
    public ChatMessageRequest() {}

    public ChatMessageRequest(String content, Long recipientId, Long productId) {
        this.content = content;
        this.recipientId = recipientId;
        this.productId = productId;
    }

    // Getters and Setters
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public Long getRecipientId() { return recipientId; }
    public void setRecipientId(Long recipientId) { this.recipientId = recipientId; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
}