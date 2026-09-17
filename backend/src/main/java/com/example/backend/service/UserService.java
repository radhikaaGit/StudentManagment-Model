package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.LoginRequestDto;
import com.example.backend.models.UserModel;
import com.example.backend.repo.UserRepo;

@Service
public class UserService {


    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtService jwtService;

    public UserModel registerUser(UserModel user){

        user.setPassword( passwordEncoder.encode(user.getPassword()));

        // Agar role frontend se nahi bheja gaya to default "USER" set karo,
        // warna CustomUserDetailsService.roles(null) se login ke time NullPointerException aata hai.
        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("USER");
        }

        return userRepo.save(user);
        
    }


    public String login(LoginRequestDto request)
    {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUserName(),
                request.getPassword()
            )
        );

        return jwtService.generateToken(request.getUserName());
    }




}