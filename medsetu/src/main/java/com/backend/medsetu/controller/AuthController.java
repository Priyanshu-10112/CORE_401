package com.backend.medsetu.controller;

import org.springframework.web.bind.annotation.*;

import com.backend.medsetu.dto.LoginRequest;
import com.backend.medsetu.entity.User;
import com.backend.medsetu.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {

        User user = userRepository.findByPhone(request.getPhone());

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return user;
    }
}
