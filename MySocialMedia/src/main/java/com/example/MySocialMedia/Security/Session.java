package com.example.MySocialMedia.Security;

import com.example.MySocialMedia.services.AdminService;
import com.example.MySocialMedia.services.UserService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Scope("prototype")
public class Session {
    private UserService userService;
    private Date expirationDate;
    private String userId;
    private AdminService adminService;

    public Session(UserService userService, Date expirationDate, String userId) {
        this.userService = userService;
        this.expirationDate = expirationDate;
        this.userId = userId;
    }

    public Session(Date expirationDate, AdminService adminService) {
        this.expirationDate = expirationDate;
        this.adminService = adminService;
    }

    public UserService getUserService() {
        return userService;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public AdminService getAdminService() {
        return adminService;
    }

    public void setAdminService(AdminService adminService) {
        this.adminService = adminService;
    }
}
