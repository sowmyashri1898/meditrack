package com.hims.patient_care.service.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class NotificationWebSocketHandler extends TextWebSocketHandler {

    private final WebSocketService webSocketService;
    private final JWTService jwtService;

    @Autowired
    public NotificationWebSocketHandler(WebSocketService webSocketService, JWTService jwtService) {
        this.webSocketService = webSocketService;
        this.jwtService = jwtService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        try {
            String username = extractUsernameFromToken(session);

            if (username != null) {
                webSocketService.addSession(username, session);
                System.out.println("WebSocket session established for username: " + username);
            } else {
                System.out.println("Username could not be extracted. Closing session.");
                session.close(CloseStatus.BAD_DATA);
            }
        } catch (Exception e) {
            System.err.println("Error during WebSocket connection establishment: " + e.getMessage());
            session.close(CloseStatus.SERVER_ERROR);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        try {
            webSocketService.removeSession(session);
            System.out.println("WebSocket session closed: " + session.getId());
        } catch (Exception e) {
            System.err.println("Error during WebSocket session closure: " + e.getMessage());
        }
    }

    private String extractUsernameFromToken(WebSocketSession session) {
        String query = session.getUri().getQuery();
        if (query != null) {
            for (String param : query.split("&")) {
                String[] keyValue = param.split("=");
                if (keyValue.length == 2 && keyValue[0].equals("token")) {
                    String token = keyValue[1];
                    try {
                        if (jwtService.validateToken(token)) {
                            return jwtService.extractUserName(token);
                        } else {
                            System.err.println("Invalid or expired JWT token.");
                        }
                    } catch (Exception e) {
                        System.err.println("Error validating JWT token: " + e.getMessage());
                    }
                }
            }
        }
        return null;
    }
}
