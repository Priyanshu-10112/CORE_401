package com.backend.medsetu.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.backend.medsetu.dto.OrderStatusRequest;
import com.backend.medsetu.entity.Order;
import com.backend.medsetu.entity.Store;
import com.backend.medsetu.service.OrderService;
import com.backend.medsetu.service.StoreService;

@RestController
@RequestMapping("/api/store")
public class StoreController {

    private final OrderService orderService;
    private final StoreService storeService;

    public StoreController(
            OrderService orderService,
            StoreService storeService) {

        this.orderService = orderService;
        this.storeService = storeService;
    }

    @GetMapping("/orders")
    public List<Order> getStoreOrders(@RequestParam Long storeId) {

        Store store = storeService.getStoreById(storeId);
        return orderService.getOrdersForStore(store);
    }

    @PostMapping("/orders/{orderId}/approve")
    public Order approveOrder(@PathVariable Long orderId) {
        return orderService.updateOrderStatus(orderId, "APPROVED");
    }

    @PostMapping("/orders/{orderId}/reject")
    public Order rejectOrder(@PathVariable Long orderId) {
        return orderService.updateOrderStatus(orderId, "REJECTED");
    }

    @PostMapping("/orders/{orderId}/status")
    public Order updateStatus(
            @PathVariable Long orderId,
            @RequestBody OrderStatusRequest request) {

        return orderService.updateOrderStatus(orderId, request.getStatus());
    }
}
