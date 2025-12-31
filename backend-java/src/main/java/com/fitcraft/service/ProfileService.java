package com.fitcraft.service;

import com.fitcraft.dto.ProfileResponse;
import com.fitcraft.dto.ProfileUpdateRequest;
import com.fitcraft.entity.Profile;
import com.fitcraft.entity.User;
import com.fitcraft.repository.ProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {
    
    private final ProfileRepository profileRepository;
    
    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }
    
    public ProfileResponse getProfile(User user) {
        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        
        return mapToResponse(user, profile);
    }
    
    @Transactional
    public ProfileResponse updateProfile(User user, ProfileUpdateRequest request) {
        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        
        if (request.getFullName() != null) {
            profile.setFullName(request.getFullName());
        }
        if (request.getBio() != null) {
            profile.setBio(request.getBio());
        }
        if (request.getGender() != null) {
            profile.setGender(request.getGender());
        }
        if (request.getAge() != null) {
            profile.setAge(request.getAge());
        }
        if (request.getHeightCm() != null) {
            profile.setHeightCm(request.getHeightCm());
        }
        if (request.getWeightKg() != null) {
            profile.setWeightKg(request.getWeightKg());
        }
        
        profile = profileRepository.save(profile);
        return mapToResponse(user, profile);
    }
    
    private ProfileResponse mapToResponse(User user, Profile profile) {
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

