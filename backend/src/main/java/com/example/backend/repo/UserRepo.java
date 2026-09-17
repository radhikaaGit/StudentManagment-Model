package com.example.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.UserModel;

public interface UserRepo extends JpaRepository<UserModel, Long> {
    
    UserModel findByUserName(String userName);
}
