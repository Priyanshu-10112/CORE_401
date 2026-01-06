package com.backend.medsetu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.medsetu.entity.Prescription;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
}
