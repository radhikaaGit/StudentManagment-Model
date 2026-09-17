package com.example.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.CourseModel;

public interface CourseRepo extends JpaRepository<CourseModel, Long> {
    
}
