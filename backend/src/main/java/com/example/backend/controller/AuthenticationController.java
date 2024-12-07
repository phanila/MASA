package com.example.backend.controller;


import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password, HttpServletResponse response) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        // Validate password (in production, you should hash the password)
        if (user.getPassword().equals(password)) {
            String token = jwtUtil.generateToken(user.getLogin());
            return token;
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // Check if the username already exists
        if (userRepository.findByUsername(user.getLogin()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists.");
        }

        // Save the new user
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }
}

