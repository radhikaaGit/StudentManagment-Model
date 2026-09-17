package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.CourseDto;
import com.example.backend.models.CourseModel;


import com.example.backend.service.CourseService;

import jakarta.validation.Valid;



@RestController
@CrossOrigin("*")

public class CourseController {

    @Autowired
    private CourseService courseService;

    //paging ki
    @GetMapping("/api/courses")
    public Page<CourseModel> getCourses(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size
    )
    {
        
        return courseService.getAllCourses(page,size);
    }
    
    @PostMapping("/api/courses")
    public CourseModel addCourse(@Valid @RequestBody CourseDto courseDto)
    {
        return courseService.addCourse(courseDto);
    }

     @PutMapping("/api/courses/{id}")
    public CourseModel updateCourse(@PathVariable Long id,
                                    @Valid @RequestBody CourseDto courseDto) {

        return courseService.updateCourse(id, courseDto);
    }

@DeleteMapping("/api/courses/{id}")
public String deleteCourse(@PathVariable Long id)
{
    courseService.deleteCourse(id);
    return "Course Deleted Successfully";
} 
    



    



    



}
