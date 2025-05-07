package com.hims.patient_care.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hims.patient_care.model.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long>{

	boolean existsByRecipientIdAndMessage(Long recipientId, String message);

	List<Notification> findByRecipientId(Long id);


}
