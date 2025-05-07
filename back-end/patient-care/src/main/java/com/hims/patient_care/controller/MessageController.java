package com.hims.patient_care.controller;

import java.util.ArrayList;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hims.patient_care.enums.MessageStatus;
import com.hims.patient_care.exception.ResourceNotFoundException;
import com.hims.patient_care.model.Message;
import com.hims.patient_care.model.SendMessageRequest;
import com.hims.patient_care.model.Users;
import com.hims.patient_care.repository.MessageRepository;
import com.hims.patient_care.repository.UserRepository;
import com.hims.patient_care.service.serviceImpl.MessageServiceImpl;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;
    
    @Autowired
    private MessageServiceImpl messageService; 
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/{role}/{userId}")
    public List<Message> getMessages(@PathVariable String role, @PathVariable Long userId) {
        Users user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        if (role.equalsIgnoreCase("DOCTOR")) {
            return messageRepository.findByReceiverAndReceiverRole(user, "DOCTOR");
        } else if (role.equalsIgnoreCase("PATIENT")) {
            return messageRepository.findBySenderAndSenderRole(user, "PATIENT");
        }
        
        return new ArrayList<>(); 
    }

    @PostMapping("/{messageId}/status")
    public ResponseEntity<String> updateMessageStatus(@PathVariable Long messageId, @RequestParam MessageStatus status) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found"));
        
        message.setStatus(status);
        messageRepository.save(message);
        return ResponseEntity.ok("Message status updated successfully");
    }

    @PostMapping("/{messageId}/uploadAttachment")
    public ResponseEntity<String> uploadAttachment(@PathVariable Long messageId, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok("Attachment uploaded successfully");
    }
    
    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody SendMessageRequest request) {
        Message sentMessage = messageService.sendMessage(
                request.getSenderIdentifier(),
                request.getReceiverIdentifier(),
                request.getContent(),
                request.getPriority()
        );
        return ResponseEntity.ok(sentMessage);
    }


    @GetMapping("/inbox")
    public ResponseEntity<List<Message>> getInboxMessages(@RequestParam String email) {
        return ResponseEntity.ok(messageService.getMessagesByEmail(email, false));
    }

    @GetMapping("/outbox")
    public ResponseEntity<List<Message>> getOutboxMessages(@RequestParam String email) {
        return ResponseEntity.ok(messageService.getMessagesByEmail(email, true));
    }


    @PostMapping("/archive/{messageId}")
    public ResponseEntity<Void> archiveMessage(@PathVariable Long messageId) {
        messageService.archiveMessage(messageId);
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}/read")
    public ResponseEntity<Message> markAsRead(@PathVariable Long id) {
        Message updatedMessage = messageService.markAsRead(id);
        return ResponseEntity.ok(updatedMessage);
    }

    @PutMapping("/{id}/unread")
    public ResponseEntity<Message> markAsUnread(@PathVariable Long id) {
        Message updatedMessage = messageService.markAsUnread(id);
        return ResponseEntity.ok(updatedMessage);
    }
}

