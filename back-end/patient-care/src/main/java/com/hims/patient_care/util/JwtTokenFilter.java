//package com.hims.patient_care.util;
//
//import java.io.IOException;
//import java.util.Collections;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import com.hims.patient_care.service.serviceImpl.copy.CustomUserDetailsService;  // Import your custom UserDetailsService
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//@Component
//public class JwtTokenFilter extends OncePerRequestFilter {
//
//    @Autowired
//    private JwtUtil jwtUtil;  // Autowire JwtUtil directly
//
//    @Autowired
//    private CustomUserDetailsService customUserDetailsService;  // Autowire CustomUserDetailsService
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//
//        String token = jwtUtil.extractTokenFromRequest(request);  // Extract token from header
//
//        if (token != null && jwtUtil.validateToken(token)) {
//            String username = jwtUtil.extractUsername(token);  // Extract username from the token
//            if (username != null) {
//                // Fetch user details from the database using CustomUserDetailsService
//                var userDetails = customUserDetailsService.loadUserByUsername(username);
//
//                // Set the authentication context with the loaded user details
//                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
//                        userDetails, null, userDetails.getAuthorities());  // Pass authorities from the userDetails
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
//        }
//
//        filterChain.doFilter(request, response);  // Continue with the request processing
//    }
//}
