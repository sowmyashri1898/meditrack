package com.hims.patient_care.dto;

import java.time.LocalDateTime;

import com.hims.patient_care.model.Notification;

public class NotificationDTO {
    private Long id;
    private String message;
    private LocalDateTime timestamp;

    public NotificationDTO(Notification notification) {
        this.id = notification.getId();
        this.message = notification.getMessage();
        this.timestamp = notification.getTimestamp();
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

   
}
