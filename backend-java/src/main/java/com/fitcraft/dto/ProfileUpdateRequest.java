package com.fitcraft.dto;

import jakarta.validation.constraints.Size;

public class ProfileUpdateRequest {
    @Size(max = 255, message = "Full name must not exceed 255 characters")
    private String fullName;
    
    @Size(max = 255, message = "Bio must not exceed 255 characters")
    private String bio;
    
    @Size(max = 50, message = "Gender must not exceed 50 characters")
    private String gender;
    
    private Integer age;
    private Integer heightCm;
    private Integer weightKg;
    
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public Integer getHeightCm() { return heightCm; }
    public void setHeightCm(Integer heightCm) { this.heightCm = heightCm; }
    public Integer getWeightKg() { return weightKg; }
    public void setWeightKg(Integer weightKg) { this.weightKg = weightKg; }
}

