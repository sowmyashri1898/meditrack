package com.hims.patient_care.exception;

public class SymptomNotFoundException extends RuntimeException {
	 public SymptomNotFoundException(String message) {
	        super(message);
	    }

	    public SymptomNotFoundException(String message, Throwable cause) {
	        super(message, cause);
	    }
}
