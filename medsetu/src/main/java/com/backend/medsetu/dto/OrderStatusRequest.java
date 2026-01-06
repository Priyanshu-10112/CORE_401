package com.backend.medsetu.dto;

public class OrderStatusRequest {

    private String status; // PACKED / READY

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
