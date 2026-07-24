package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.CourseModel;


import com.example.backend.service.CourseService;



@RestController
@CrossOrigin("*")

public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/api/courses")
    public List<CourseModel> getCourses()
    {
        return courseService.getAllCourses();
    }
    
    @PostMapping("/api/courses")
    public CourseModel addCourse(@RequestBody CourseModel course)
    {
        return courseService.addCourse(course);
    }

     @PutMapping("/api/courses/{id}")
    public CourseModel updateCourse(@PathVariable Long id,
                                    @RequestBody CourseModel course) {

        return courseService.updateCourse(id, course);
    }

@DeleteMapping("/api/courses/{id}")
public String deleteCourse(@PathVariable Long id)
{
    courseService.deleteCourse(id);
    return "Course Deleted Successfully";
} 
    



    



    



}
