package com.backend.medsetu.controller;

import com.backend.medsetu.dto.StoreRegisterDto;
import com.backend.medsetu.entity.Store;
import com.backend.medsetu.entity.User;
import com.backend.medsetu.repository.StoreRepository;
import com.backend.medsetu.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/stores")
@CrossOrigin
public class AdminStoreController {

    private final StoreRepository storeRepository;
    private final UserRepository userRepository;

    public AdminStoreController(StoreRepository storeRepository,
                                UserRepository userRepository) {
        this.storeRepository = storeRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public Store registerStore(@RequestBody StoreRegisterDto dto) {

        Store store = new Store();
        store.setName(dto.name);
        store.setLicenseNumber(dto.licenseNumber);
        store.setAddress(dto.address);
        store.setPincode(dto.pincode);
        store.setPriority(dto.priority);
        store.setStatus("PENDING");

        Store savedStore = storeRepository.save(store);

        User storeUser = new User();
        storeUser.setName(dto.name + " Login");
        storeUser.setPhone(dto.phone);
        storeUser.setRole("STORE");

        userRepository.save(storeUser);

        return savedStore;
    }

    @PostMapping("/{id}/approve")
    public Store approve(@PathVariable Long id) {
        Store store = storeRepository.findById(id).orElseThrow();
        store.setStatus("APPROVED");
        return storeRepository.save(store);
    }

    @PostMapping("/{id}/reject")
    public Store reject(@PathVariable Long id) {
        Store store = storeRepository.findById(id).orElseThrow();
        store.setStatus("REJECTED");
        return storeRepository.save(store);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        storeRepository.deleteById(id);
    }
}
