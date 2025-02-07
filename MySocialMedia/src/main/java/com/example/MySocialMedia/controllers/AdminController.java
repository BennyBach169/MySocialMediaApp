package com.example.MySocialMedia.controllers;

import com.example.MySocialMedia.Security.SessionManager;
import com.example.MySocialMedia.baens.User;
import com.example.MySocialMedia.services.AdminService;
import com.example.MySocialMedia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private SessionManager sessionManager;

    private AdminService getInstance(String token) throws SQLException {
        token =token.replace("Bearer ", "");
        AdminService adminService = sessionManager.getServiceAdmin(token);
        sessionManager.updateSessionExpiration(token);
        return adminService;
    }


    @GetMapping("/users")
    public List<User> getAllUsers(@RequestHeader(value = "Authorization") String token) throws Exception {
        return getInstance(token).getAllUsers();
    }

    @GetMapping("/users/active")
    public List<User> getAllActive(@RequestHeader(value = "Authorization") String token) throws Exception {
        return getInstance(token).getActiveUsers();
    }

    @DeleteMapping("/users/deleteuser/{userId}")
    public void deleteUser(@RequestHeader(value = "Authorization") String token,@PathVariable long userId) throws Exception {
        getInstance(token).kickFromSession(userId);
        getInstance(token).deleteUser(userId);
    }

//    @PostMapping("/users/kickuser/{userId}")
//    public void kickUser(@RequestHeader(value = "Authorization") String token,@PathVariable long userId) throws SQLException {
//        getInstance(token).kickFromSession(userId);
//    }



}
