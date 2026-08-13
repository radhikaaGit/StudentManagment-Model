package com.example.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.backend.models.UserModel;
import com.example.backend.repo.UserRepo;

@Service
public class  CustomUserDetailsService implements  UserDetailsService{
    
    // UserRepo ko inject kiya hai taaki database se user la sake.
    @Autowired
    private UserRepo userRepo;
 
    @Override
    public UserDetails loadUserByUsername(String username)
      throws UsernameNotFoundException{

         UserModel user =userRepo.findByUserName(username);

         if(user == null)
         {
            throw new UsernameNotFoundException("user not found");
         }
      
      return User.builder()
      .username(user.getUserName())
      .password(user.getPassword())
      .roles(user.getRole())
      .build();
    }



}
