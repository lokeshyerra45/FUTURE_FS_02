package com.crm.minicrm.controller;

import com.crm.minicrm.entity.User;
import com.crm.minicrm.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (user.getEmail() == null || user.getEmail().isBlank() ||
            user.getPassword() == null || user.getPassword().length() < 6 ||
            user.getName() == null || user.getName().isBlank()) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Name, email and a password of at least 6 characters are required."));
        }
        if (userRepository.existsByEmail(user.getEmail().trim().toLowerCase())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("An account with this email already exists."));
        }
        user.setEmail(user.getEmail().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null || user.getRole().isBlank()) user.setRole("EMPLOYEE");
        return ResponseEntity.status(HttpStatus.CREATED).body(userRepository.save(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        if (loginUser.getEmail() == null || loginUser.getPassword() == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Invalid email or password."));
        User user = userRepository.findByEmail(loginUser.getEmail().trim().toLowerCase()).orElse(null);
        if (user == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Invalid email or password."));
        String stored = user.getPassword();
        boolean matches = stored != null && (stored.startsWith("$2a$") || stored.startsWith("$2b$") || stored.startsWith("$2y$"))
                ? passwordEncoder.matches(loginUser.getPassword(), stored)
                : stored.equals(loginUser.getPassword());
        if (!matches) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Invalid email or password."));
        // Upgrade old plaintext passwords on successful login.
        if (stored != null && !(stored.startsWith("$2a$") || stored.startsWith("$2b$") || stored.startsWith("$2y$"))) {
            user.setPassword(passwordEncoder.encode(loginUser.getPassword()));
            userRepository.save(user);
        }
        return ResponseEntity.ok(user);
    }

    public record ErrorResponse(String message) {}
}
