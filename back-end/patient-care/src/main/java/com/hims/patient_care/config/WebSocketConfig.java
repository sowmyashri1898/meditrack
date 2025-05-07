package com.hims.patient_care.config;

import com.hims.patient_care.service.serviceImpl.NotificationWebSocketHandler;

import com.hims.patient_care.service.serviceImpl.WebSocketService;


import com.hims.patient_care.service.serviceImpl.JWTService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
//@Order(Ordered.HIGHEST_PRECEDENCE + 99)
//@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    private final WebSocketService webSocketService;
    private final JWTService jwtService;

    public WebSocketConfig(WebSocketService webSocketService, JWTService jwtService) {
        this.webSocketService = webSocketService;
        this.jwtService = jwtService;
    }

    @Bean
    public NotificationWebSocketHandler notificationWebSocketHandler() {
        return new NotificationWebSocketHandler(webSocketService, jwtService);
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(notificationWebSocketHandler(), "/notifications")
                .setAllowedOrigins("http://localhost:4200"); 
    }
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
