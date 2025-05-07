package com.hims.patient_care.service.serviceImpl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hims.patient_care.enums.Priority;
import com.hims.patient_care.exception.ResourceNotFoundException;
import com.hims.patient_care.model.Message;
import com.hims.patient_care.model.Users;
import com.hims.patient_care.repository.MessageRepository;
import com.hims.patient_care.repository.UserRepository;

@Service
public class MessageServiceImpl {

	
	    @Autowired
	    private MessageRepository messageRepository;

	    @Autowired
	    private UserRepository userRepository;


//	    public List<Message> getMessages(Long userId, boolean sentMessages) {
//	        return sentMessages
//	                ? messageRepository.findBySenderIdAndIsArchivedFalse(userId)
//	                : messageRepository.findByReceiverIdAndIsArchivedFalse(userId);
//	    }
	    
	    public List<Message> getMessagesByEmail(String email, boolean isOutbox) {
	        Users user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new ResourceNotFoundException("User not found for email: " + email));

	        if (isOutbox) {
	            return messageRepository.findBySender(user);  
	        } else {
	            return messageRepository.findByReceiver(user);  
	        }
	    }


	    public void archiveMessage(Long messageId) {
	        Message message = messageRepository.findById(messageId).orElseThrow(() -> new RuntimeException("Message not found"));
	        message.setArchived(true);
	        messageRepository.save(message);
	    }
	

	    public Message sendMessage(String senderIdentifier, String receiverIdentifier, String content, Priority priority) {
	        Users sender = userRepository.findByUsernameOrEmail(senderIdentifier, senderIdentifier);
	        if (sender == null) {
	            throw new RuntimeException("Sender not found with identifier: " + senderIdentifier);
	        }

	        Users receiver = userRepository.findByUsernameOrEmail(receiverIdentifier, receiverIdentifier);
	        if (receiver == null) {
	            throw new RuntimeException("Receiver not found with identifier: " + receiverIdentifier);
	        }

	        Message message = new Message();
	        message.setSender(sender);
	        message.setReceiver(receiver);
	        message.setContent(content);
	        message.setPriority(priority);
	        message.setSentAt(LocalDateTime.now());
	        message.setArchived(false);

	        return messageRepository.save(message);
	    }


		public Message markAsRead(Long messageId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        message.setRead(true);
        return messageRepository.save(message);
    }

    public Message markAsUnread(Long messageId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        message.setRead(false);
        return messageRepository.save(message);
    }



}
