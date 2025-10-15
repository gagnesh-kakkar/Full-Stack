package com.sgportal.auth.service;

import com.sgportal.auth.config.JwtUtil;
import com.sgportal.auth.dto.AuthDtos;
import com.sgportal.auth.user.Role;
import com.sgportal.auth.user.UserEntity;
import com.sgportal.auth.user.UserRepository;
import java.util.HashMap;
import java.util.Map;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Transactional
    public AuthDtos.UserResponse register(AuthDtos.RegisterRequest request) {
        if (userRepository.existsByUsername(request.username)) {
            throw new IllegalArgumentException("Username already exists");
        }
        UserEntity user = new UserEntity();
        user.setUsername(request.username);
        user.setPasswordHash(passwordEncoder.encode(request.password));
        user.setRole(request.role == null ? Role.STUDENT : request.role);
        user = userRepository.save(user);
        AuthDtos.UserResponse resp = new AuthDtos.UserResponse();
        resp.id = user.getId();
        resp.username = user.getUsername();
        resp.role = user.getRole();
        return resp;
    }

    @Transactional(readOnly = true)
    public AuthDtos.TokenResponse login(AuthDtos.LoginRequest request) {
        UserEntity user = userRepository.findByUsername(request.username)
            .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        if (!passwordEncoder.matches(request.password, user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("role", user.getRole().name());
        String token = jwtUtil.generateToken(user.getUsername(), claims);
        AuthDtos.UserResponse ur = new AuthDtos.UserResponse();
        ur.id = user.getId();
        ur.username = user.getUsername();
        ur.role = user.getRole();
        AuthDtos.TokenResponse tr = new AuthDtos.TokenResponse();
        tr.token = token;
        tr.user = ur;
        return tr;
    }
}


