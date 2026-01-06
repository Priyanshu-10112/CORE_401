package com.backend.medsetu.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.backend.medsetu.dto.CreateOrderRequest;
import com.backend.medsetu.entity.Medicine;
import com.backend.medsetu.entity.Order;
import com.backend.medsetu.service.MedicineService;
import com.backend.medsetu.service.OrderService;

@RestController
@RequestMapping("/api")
public class CustomerController {

    private final MedicineService medicineService;
    private final OrderService orderService;

    public CustomerController(
            MedicineService medicineService,
            OrderService orderService) {

        this.medicineService = medicineService;
        this.orderService = orderService;
    }

    @GetMapping("/medicines/search")
    public List<Medicine> searchMedicine(@RequestParam String query) {
        return medicineService.searchMedicine(query);
    }

    @PostMapping("/orders")
    public Order createOrder(@RequestBody CreateOrderRequest request) {
        return orderService.createOrder(request);
    }

    @GetMapping("/orders/{orderId}")
    public Order getOrder(@PathVariable Long orderId) {
        return orderService.updateOrderStatus(orderId, "CREATED");
    }
}
