package com.example.backend.dto;

// Users ki list frontend ko bhejte waqt password (chahe encrypted ho)
// bhejna sahi practice nahi hai. Ye DTO sirf zaroori fields deta hai.
public class UserSummaryDto {

    private Long id;
    private String userName;
    private String role;

    public UserSummaryDto(Long id, String userName, String role) {
        this.id = id;
        this.userName = userName;
        this.role = role;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}