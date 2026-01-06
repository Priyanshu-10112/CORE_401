package com.backend.medsetu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.medsetu.entity.Store;

public interface StoreRepository extends JpaRepository<Store, Long> {

    List<Store> findByPincodeAndStatusOrderByPriorityAsc(String pincode, String status);
}
