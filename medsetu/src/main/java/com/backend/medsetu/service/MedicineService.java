package com.backend.medsetu.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.medsetu.entity.Medicine;
import com.backend.medsetu.repository.MedicineRepository;

@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;

    public MedicineService(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    public List<Medicine> searchMedicine(String query) {
        return medicineRepository.findByNameContainingIgnoreCase(query);
    }
}
