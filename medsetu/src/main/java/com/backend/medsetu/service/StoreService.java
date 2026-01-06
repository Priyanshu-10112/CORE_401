package com.backend.medsetu.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.medsetu.entity.Store;
import com.backend.medsetu.repository.StoreRepository;

@Service
public class StoreService {

    private final StoreRepository storeRepository;

    public StoreService(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    public List<Store> getApprovedStoresByPincode(String pincode) {
        return storeRepository
                .findByPincodeAndStatusOrderByPriorityAsc(pincode, "APPROVED");
    }

    public Store getStoreById(Long storeId) {
        return storeRepository.findById(storeId).orElse(null);
    }
}
