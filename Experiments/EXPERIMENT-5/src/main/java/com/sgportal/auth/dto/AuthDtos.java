package com.sgportal.auth.dto;

import com.sgportal.auth.user.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDtos {
    public static class RegisterRequest {
        @NotBlank
        public String username;
        @NotBlank
        @Size(min = 6)
        public String password;
        public Role role = Role.STUDENT;
    }

    public static class LoginRequest {
        @NotBlank
        public String username;
        @NotBlank
        public String password;
    }

    public static class UserResponse {
        public Long id;
        public String username;
        public Role role;
    }

    public static class TokenResponse {
        public String token;
        public UserResponse user;
    }
}


