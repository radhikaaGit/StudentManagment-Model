package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.LoginRequestDto;
import com.example.backend.models.UserModel;
import com.example.backend.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin("*")
public class UserController {
    

    @Autowired
   private UserService userService;
   
   @PostMapping("/api/register")
   public UserModel registUser(@RequestBody UserModel user){
          
    return userService.registerUser(user);

   }
   
   

   

}
