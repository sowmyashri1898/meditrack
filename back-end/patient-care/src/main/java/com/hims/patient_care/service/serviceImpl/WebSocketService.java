package com.hims.patient_care.service.serviceImpl;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashMap;
import java.util.Map;

@Service
public class WebSocketService {

    private final Map<String, WebSocketSession> userSessions = new HashMap<>(); 
    private final Map<WebSocketSession, String> sessionUserMap = new HashMap<>(); 

    public void addSession(String username, WebSocketSession session) {
        userSessions.put(username, session);
        sessionUserMap.put(session, username);
    }

    public void removeSession(String username) {
        WebSocketSession session = userSessions.remove(username);
        if (session != null) {
            sessionUserMap.remove(session);
        }
    }

    public void removeSession(WebSocketSession session) {
        String username = sessionUserMap.remove(session);
        if (username != null) {
            userSessions.remove(username);
        }
    }

    public void sendNotificationToUser(String username, String message) {
        WebSocketSession session = userSessions.get(username);
        if (session != null && session.isOpen()) {
            try {
                session.sendMessage(new TextMessage(message));
            } catch (Exception e) {
                System.err.println("Error sending message to user: " + e.getMessage());
            }
        } else {
            System.out.println("No active session found for username: " + username);
        }
    }

    public void sendNotificationToAll(String message) {
        for (WebSocketSession session : userSessions.values()) {
            if (session.isOpen()) {
                try {
                    session.sendMessage(new TextMessage(message));
                } catch (Exception e) {
                    System.err.println("Error sending message to session: " + e.getMessage());
                }
            }
        }
    }
}
