package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CourseDto {

    
    private Long id;

    @NotBlank(message = "Course name is required")
    private String courseName;

    @NotNull( message = "Course fees is required")
    private Integer fees;

    @NotBlank( message = "TrainerName is required")
    private String trainerName;

    public CourseDto(){}

    public CourseDto(Long id,String courseName, Integer fees, String trainerName){
        this.id = id;
        this.courseName= courseName;
        this.fees = fees;
        this.trainerName = trainerName;

    }
     public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Integer getFees() {
        return fees;
    }

    public void setFees(Integer fees) {
        this.fees = fees;
    }

    public String getTrainerName() {
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    
    
    

    
}
