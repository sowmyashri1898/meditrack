package com.hims.patient_care.service;

import java.util.List;

import com.hims.patient_care.model.Notification;
import com.hims.patient_care.model.Users;

public interface NotificationService {
    void sendNotification(Long recipientId, String message);

	void sendPasswordChangeNotification(Users user);

	void sendProfileUpdateNotification(Users user);

	List<Notification> getScheduledNotificationsForUser(Users authenticatedUser);

}
