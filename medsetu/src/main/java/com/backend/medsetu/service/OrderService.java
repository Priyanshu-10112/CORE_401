package com.backend.medsetu.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.medsetu.dto.CreateOrderRequest;
import com.backend.medsetu.entity.Order;
import com.backend.medsetu.entity.Store;
import com.backend.medsetu.entity.User;
import com.backend.medsetu.repository.OrderRepository;
import com.backend.medsetu.repository.UserRepository;
import com.backend.medsetu.util.StoreAssignmentUtil;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final StoreService storeService;

    public OrderService(
            OrderRepository orderRepository,
            UserRepository userRepository,
            StoreService storeService) {

        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.storeService = storeService;
    }

    public Order createOrder(CreateOrderRequest request) {

        User customer = userRepository
                .findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        List<Store> stores =
                storeService.getApprovedStoresByPincode(request.getPincode());

        Store assignedStore =
                StoreAssignmentUtil.assignStore(stores);

        if (assignedStore == null) {
            throw new RuntimeException("No store available");
        }

        Order order = new Order();
        order.setCustomer(customer);
        order.setStore(assignedStore);
        order.setStatus("CREATED");

        return orderRepository.save(order);
    }

    public List<Order> getOrdersForStore(Store store) {
        return orderRepository.findByStore(store);
    }

    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository
                .findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);
        return orderRepository.save(order);
    }
}
