package com.backend.medsetu.dto;

public class LoginRequest {

    private String phone;
    private String role; // CUSTOMER / STORE / ADMIN

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
