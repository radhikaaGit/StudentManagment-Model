package com.example.backend.dto;

// Pehle login sirf plain token (String) return karta tha, isliye frontend
// ko pata hi nahi chalta tha ki logged-in user Admin hai ya User.
// Ab token ke saath role bhi bhejte hain.
public class LoginResponseDto {

    private String token;
    private String userName;
    private String role;

    public LoginResponseDto(String token, String userName, String role) {
        this.token = token;
        this.userName = userName;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}