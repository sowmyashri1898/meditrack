package com.hims.patient_care.model;

import com.hims.patient_care.enums.Priority;

import lombok.Data;

@Data
public class SendMessageRequest {
	private String senderIdentifier;
	private String receiverIdentifier;
	private String content;
	private Priority priority;

	public String getSenderIdentifier() {
		return senderIdentifier;
	}

	public void setSenderIdentifier(String senderIdentifier) {
		this.senderIdentifier = senderIdentifier;
	}

	public String getReceiverIdentifier() {
		return receiverIdentifier;
	}

	public void setReceiverIdentifier(String receiverIdentifier) {
		this.receiverIdentifier = receiverIdentifier;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
	}

}
