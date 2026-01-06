package com.backend.medsetu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.medsetu.entity.Order;
import com.backend.medsetu.entity.Store;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByStore(Store store);
}
