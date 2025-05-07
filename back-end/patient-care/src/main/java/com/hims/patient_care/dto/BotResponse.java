package com.hims.patient_care.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class BotResponse {

    private String text;

    // Default constructor
    public BotResponse() {}

    // Constructor with 'text' field
    @JsonCreator
    public BotResponse(@JsonProperty("text") String text) {
        this.text = text;
    }

    // Getter and Setter for 'text'
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
