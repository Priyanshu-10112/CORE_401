package com.backend.medsetu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.medsetu.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByPhone(String phone);
}
