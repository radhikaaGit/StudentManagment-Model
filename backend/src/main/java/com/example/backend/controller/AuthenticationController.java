package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.LoginRequestDto;
import com.example.backend.dto.LoginResponseDto;
import com.example.backend.models.UserModel;
import com.example.backend.repo.UserRepo;
import com.example.backend.service.JwtService;
import com.example.backend.service.UserService;



@RestController
@CrossOrigin("*")
public class AuthenticationController {
    
    private final AuthenticationManager authenticationManager;

    @Autowired
    private UserService uService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepo userRepo;


    AuthenticationController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }
    
    
    @PostMapping("/api/login")
    public LoginResponseDto login(@RequestBody LoginRequestDto request){
       
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUserName(),
                request.getPassword()
            )
        );

        // Pehle sirf token return hota tha, isliye frontend ko pata nahi
        // chalta tha ki user Admin hai ya User. Ab role bhi bhejte hain.
        UserModel user = userRepo.findByUserName(request.getUserName());

        String token = jwtService.generateToken(request.getUserName(), user.getRole());

        return new LoginResponseDto(token, user.getUserName(), user.getRole());
        
    }




}