package com.hims.patient_care.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
@ControllerAdvice

public class GlobalExceptionHandler {


@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
    return new ResponseEntity<>("Invalid input: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
}

@ExceptionHandler(SymptomNotFoundException.class)
public ResponseEntity<String> handleSymptomNotFound(SymptomNotFoundException ex) {
    return new ResponseEntity<>("Symptom not found: " + ex.getMessage(), HttpStatus.NOT_FOUND);
}
}