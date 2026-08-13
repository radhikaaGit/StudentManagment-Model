package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.backend.dto.CourseDto;
import com.example.backend.exception.CourseNotFoundException;
import com.example.backend.models.CourseModel;
import com.example.backend.repo.CourseRepo;

@Service
public class CourseService {
    

    @Autowired
    private CourseRepo courseRepo;

    //paging ki
    public Page<CourseModel> getAllCourses(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return courseRepo.findAll(pageable);
    }

    public CourseModel addCourse(CourseDto courseDto)
    {

        CourseModel course = new CourseModel();
        course.setCourseName(courseDto.getCourseName());
        course.setFees(courseDto.getFees());
        course.setTrainerName(courseDto.getTrainerName());

        return courseRepo.save(course);

    }

    public CourseModel updateCourse(Long id , CourseDto courseDto)  
    {
        CourseModel existingCourse = courseRepo.findById(id)
        .orElseThrow(()->new CourseNotFoundException("Course not found with id "  + id));

        
            existingCourse.setCourseName(courseDto.getCourseName());
            existingCourse.setFees(courseDto.getFees());
            existingCourse.setTrainerName(courseDto.getTrainerName());

            return courseRepo.save(existingCourse);

        

        

    }

    public void deleteCourse(Long id)
    {
        CourseModel course = courseRepo.findById(id)
           .orElseThrow(()-> new CourseNotFoundException("course not found " + id));

        courseRepo.delete(course);

    }
   


}
