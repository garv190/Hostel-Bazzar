package com.hostelbazaar.controller;

import com.hostelbazaar.dto.LoginRequest;
import com.hostelbazaar.dto.SignupRequest;
import com.hostelbazaar.entity.User;
import com.hostelbazaar.service.UserService;
import com.hostelbazaar.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {
    
    @Autowired
    AuthenticationManager authenticationManager;
    
    @Autowired
    UserService userService;
    
    @Autowired
    JwtUtils jwtUtils;
    
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        
        User user = userService.findByEmail(loginRequest.getEmail()).orElse(null);
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", jwt);
        response.put("type", "Bearer");
        response.put("user", user);
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userService.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Error: Email is already in use!"));
        }
        
        // Create new user's account
        User user = new User(signUpRequest.getName(),
                           signUpRequest.getEmail(),
                           signUpRequest.getPassword(),
                           signUpRequest.getHostel(),
                           signUpRequest.getRoom());
        
        user.setPhone(signUpRequest.getPhone());
        user.setAvatar("https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg");
        
        userService.createUser(user);
        
        return ResponseEntity.ok(Map.of("message", "User registered successfully!"));
    }
}