package com.backend.medsetu.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.backend.medsetu.entity.Store;
import com.backend.medsetu.repository.StoreRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final StoreRepository storeRepository;

    public AdminController(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    @GetMapping("/stores/pending")
    public List<Store> getPendingStores() {
        return storeRepository.findAll()
                .stream()
                .filter(s -> "PENDING".equals(s.getStatus()))
                .toList();
    }

    @PostMapping("/stores/{storeId}/approve")
    public Store approveStore(@PathVariable Long storeId) {

        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new RuntimeException("Store not found"));

        store.setStatus("APPROVED");
        return storeRepository.save(store);
    }

    @PostMapping("/stores/{storeId}/suspend")
    public Store suspendStore(@PathVariable Long storeId) {

        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new RuntimeException("Store not found"));

        store.setStatus("SUSPENDED");
        return storeRepository.save(store);
    }
}
