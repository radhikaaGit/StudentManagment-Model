package com.example.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.StudentModel;

public interface StudentRepo extends JpaRepository <StudentModel, Long>{

    
} 