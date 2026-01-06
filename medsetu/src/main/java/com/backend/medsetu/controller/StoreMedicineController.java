package com.backend.medsetu.controller;

import com.backend.medsetu.dto.MedicineRequestDto;
import com.backend.medsetu.entity.Medicine;
import com.backend.medsetu.entity.Store;
import com.backend.medsetu.repository.MedicineRepository;
import com.backend.medsetu.repository.StoreRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/store/medicines")
@CrossOrigin
public class StoreMedicineController {

    private final MedicineRepository medicineRepository;
    private final StoreRepository storeRepository;

    public StoreMedicineController(MedicineRepository medicineRepository,
                                   StoreRepository storeRepository) {
        this.medicineRepository = medicineRepository;
        this.storeRepository = storeRepository;
    }

    @PostMapping
    public Medicine addMedicine(@RequestBody MedicineRequestDto dto) {

        Store store = storeRepository.findById(dto.storeId)
                .orElseThrow(() -> new RuntimeException("Store not found"));

        Medicine medicine = new Medicine();
        medicine.setName(dto.name);
        medicine.setPrice(dto.price);
        medicine.setRequiresPrescription(dto.requiresPrescription);
        medicine.setStore(store);

        return medicineRepository.save(medicine);
    }
}
