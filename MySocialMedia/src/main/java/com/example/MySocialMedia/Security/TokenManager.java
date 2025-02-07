package com.example.MySocialMedia.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.MySocialMedia.services.AdminService;
import com.example.MySocialMedia.services.UserService;
import org.springframework.stereotype.Component;

import java.sql.SQLException;
import java.util.Date;
import java.util.Map;

@Component
public class TokenManager {


    public static String createToken(UserService userService) throws SQLException {
        return JWT.create().withIssuer("PostLikers")
                .withHeader(Map.of("Authorization", "Bearer"))
                .withIssuedAt(new Date())
                .withClaim("userName", userService.getUserDetails().getUserName())
                .withClaim("firstName", userService.getUserDetails().getFirstName())
                .withClaim("lastName", userService.getUserDetails().getLastName())
                .withExpiresAt(setExpiredInMinutes(30))
                .sign(Algorithm.none());
    }

    public static String createAdminToken(AdminService adminService) throws SQLException {
        return JWT.create().withIssuer("PostLikers")
                .withHeader(Map.of("Authorization", "Bearer"))
                .withIssuedAt(new Date())
                .withClaim("userName", "admini000000")
                .withExpiresAt(setExpiredInMinutes(30))
                .sign(Algorithm.none());
    }

    public static Date setExpiredInMinutes(int minutes) {
        long currentTimeMillis = System.currentTimeMillis();
        long expirationTimeMillis = currentTimeMillis + (minutes * 60 * 1000);
        return new Date(expirationTimeMillis);
    }
}
