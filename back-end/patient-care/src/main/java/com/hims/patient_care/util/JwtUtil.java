//package com.hims.patient_care.util;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import jakarta.servlet.http.HttpServletRequest;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//
//@Component
//public class JwtUtil {
//
//    @Value("${jwt.secret}")
//    private String secretKey;
//
//    @Value("${jwt.expirationTime}")
//    private long expirationTime;
//
//
//    // Generate JWT token for a given username
//    public String generateToken(String username) {
//        return Jwts.builder()
//                .setSubject(username)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
//                .signWith(SignatureAlgorithm.HS512, secretKey)
//                .compact();
//    }
//
//    // Extract JWT token from the request
//    public String extractTokenFromRequest(HttpServletRequest request) {
//        String header = request.getHeader("Authorization");
//        if (header != null && header.startsWith("Bearer ")) {
//            return header.substring(7);  // Remove "Bearer " prefix
//        }
//        return null;
//    }
//
//    // Validate JWT token
//    public boolean validateToken(String token) {
//        try {
//            Claims claims = extractAllClaims(token);
//            return !isTokenExpired(claims);
//        } catch (Exception e) {
//            return false;
//        }
//    }
//
//    // Extract all claims from the token
//    private Claims extractAllClaims(String token) {
//        return Jwts.parser()
//                .setSigningKey(secretKey)
//                .parseClaimsJws(token)
//                .getBody();
//    }
//
//    // Check if the token is expired
//    private boolean isTokenExpired(Claims claims) {
//        Date expiration = claims.getExpiration();
//        return expiration.before(new Date());
//    }
//
//    // Extract username (subject) from the token
//    public String extractUsername(String token) {
//        return extractClaim(token, Claims::getSubject);
//    }
//
//    // Generic claim extraction
//    private <T> T extractClaim(String token, ClaimsResolver<T> claimsResolver) {
//        Claims claims = extractAllClaims(token);
//        return claimsResolver.resolve(claims);
//    }
//
//    @FunctionalInterface
//    public interface ClaimsResolver<T> {
//        T resolve(Claims claims);
//    }
//}
