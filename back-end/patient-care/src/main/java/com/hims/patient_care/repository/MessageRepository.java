package com.hims.patient_care.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hims.patient_care.model.Message;
import com.hims.patient_care.model.Users;
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

	 List<Message> findBySenderAndSenderRole(Users sender, String role);

	    List<Message> findByReceiverAndReceiverRole(Users receiver, String role);
	    
	    List<Message> findBySenderRoleOrReceiverRole(String senderRole, String receiverRole);

		List<Message> findBySenderIdAndIsArchivedFalse(Long userId);

		List<Message> findByReceiverIdAndIsArchivedFalse(Long userId);

		List<Message> findBySender(Users user);

		List<Message> findByReceiver(Users user);
}
