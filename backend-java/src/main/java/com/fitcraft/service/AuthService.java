package com.fitcraft.service;

import com.fitcraft.dto.LoginRequest;
import com.fitcraft.dto.ProfileResponse;
import com.fitcraft.dto.SignupRequest;
import com.fitcraft.entity.Profile;
import com.fitcraft.entity.User;
import com.fitcraft.repository.ProfileRepository;
import com.fitcraft.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    public AuthService(UserRepository userRepository, ProfileRepository profileRepository,
                      PasswordEncoder passwordEncoder, JwtService jwtService,
                      AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }
    
    @Transactional
    public User signup(SignupRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmailIgnoreCase(request.getEmail())) {
            throw new RuntimeException("Email already registered.");
        }
        
        // Create user
        User user = new User();
        user.setEmail(request.getEmail().toLowerCase());
        user.setUsername(request.getEmail().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFullName());
        user = userRepository.save(user);
        
        // Create profile
        Profile profile = new Profile();
        profile.setUser(user);
        profile.setFullName(request.getFullName());
        profileRepository.save(profile);
        
        return user;
    }
    
    public String login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail().toLowerCase(),
                request.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = (User) authentication.getPrincipal();
        return jwtService.generateToken(user.getUsername());
    }
    
    public ProfileResponse getProfileResponse(User user) {
        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        
        ProfileResponse response = new ProfileResponse();
        response.setEmail(user.getEmail());
        response.setUsername(user.getUsername());
        response.setFullName(profile.getFullName());
        response.setBio(profile.getBio());
        response.setGender(profile.getGender());
        response.setAge(profile.getAge());
        response.setHeightCm(profile.getHeightCm());
        response.setWeightKg(profile.getWeightKg());
        response.setAvatar(profile.getAvatar());
        
        return response;
    }
}

