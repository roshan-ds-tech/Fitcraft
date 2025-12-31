package com.fitcraft.dto;

public class SessionResponse {
    private boolean authenticated;
    private ProfileResponse profile;
    
    public SessionResponse() {}
    
    public SessionResponse(boolean authenticated, ProfileResponse profile) {
        this.authenticated = authenticated;
        this.profile = profile;
    }
    
    public boolean isAuthenticated() { return authenticated; }
    public void setAuthenticated(boolean authenticated) { this.authenticated = authenticated; }
    public ProfileResponse getProfile() { return profile; }
    public void setProfile(ProfileResponse profile) { this.profile = profile; }
}

