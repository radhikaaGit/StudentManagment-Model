package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.LoginRequestDto;
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


    AuthenticationController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }
    
    
    @PostMapping("/api/login")
    public String login(@RequestBody LoginRequestDto request){
       
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUserName(),
                request.getPassword()
            )
        );
        
        return jwtService.generateToken(request.getUserName());
        
    }




}
