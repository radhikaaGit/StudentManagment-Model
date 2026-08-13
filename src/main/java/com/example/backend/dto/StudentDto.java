package com.example.backend.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;

public class StudentDto {
    

    @NotBlank( message = "Name is required")
    private String name;

    @NotBlank( message = "Mail is required")
    private String mail;

    @NotBlank( message = "gender is required")
    private String gender;

        // Yahi CourseDto ka use hai
    private List<CourseDto> courses;

 

    public StudentDto(){}

    public StudentDto(String name, String mail, String gender){
        this.name = name;
        this.mail = mail;
        this.gender = gender;
}


    public List<CourseDto> getCourses() {
         return courses;
    }

    public void setCourses(List<CourseDto> courses) {
        this.courses = courses;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    
}
