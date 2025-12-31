package com.fitcraft.controller;

import com.fitcraft.dto.*;
import com.fitcraft.entity.User;
import com.fitcraft.service.AuthService;
import com.fitcraft.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final AuthService authService;
    private final ProfileService profileService;
    
    public AuthController(AuthService authService, ProfileService profileService) {
        this.authService = authService;
        this.profileService = profileService;
    }
    
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest request) {
        try {
            User user = authService.signup(request);
            LoginRequest loginRequest = new LoginRequest();
            loginRequest.setEmail(request.getEmail());
            loginRequest.setPassword(request.getPassword());
            String token = authService.login(loginRequest);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new AuthResponse("Signup successful", token));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AuthResponse(e.getMessage(), null));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            String token = authService.login(request);
            return ResponseEntity.ok(new AuthResponse("Login successful", token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Invalid credentials"));
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(new AuthResponse("Logged out", null));
    }
    
    @GetMapping("/session")
    public ResponseEntity<?> getSession() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated() || 
            "anonymousUser".equals(authentication.getPrincipal().toString())) {
            return ResponseEntity.ok(new SessionResponse(false, null));
        }
        
        try {
            User user = (User) authentication.getPrincipal();
            ProfileResponse profile = authService.getProfileResponse(user);
            return ResponseEntity.ok(new SessionResponse(true, profile));
        } catch (Exception e) {
            return ResponseEntity.ok(new SessionResponse(false, null));
        }
    }
    
    @GetMapping("/profile")
    public ResponseEntity<ProfileResponse> getProfile() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ProfileResponse profile = profileService.getProfile(user);
        return ResponseEntity.ok(profile);
    }
    
    @PatchMapping("/profile")
    public ResponseEntity<ProfileResponse> updateProfile(@Valid @RequestBody ProfileUpdateRequest request) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ProfileResponse profile = profileService.updateProfile(user, request);
        return ResponseEntity.ok(profile);
    }
    
    // Inner class for error response
    private static class ErrorResponse {
        private String detail;
        
        public ErrorResponse(String detail) {
            this.detail = detail;
        }
        
        public String getDetail() {
            return detail;
        }
        
        public void setDetail(String detail) {
            this.detail = detail;
        }
    }
}

