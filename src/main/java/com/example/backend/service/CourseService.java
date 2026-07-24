package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.models.CourseModel;
import com.example.backend.repo.CourseRepo;

@Service
public class CourseService {
    

    @Autowired
    private CourseRepo courseRepo;

    public List<CourseModel> getAllCourses(){
        return courseRepo.findAll();
    }

    public CourseModel addCourse(CourseModel course)
    {
        return courseRepo.save(course);

    }

    public CourseModel updateCourse(Long id , CourseModel course)
    {
        CourseModel existiCourse = courseRepo.findById(id).orElse(null);

        if(existiCourse != null)
        {
            existiCourse.setCourseName(course.getCourseName());
            existiCourse.setFees(course.getFees());
            existiCourse.setTrainerName(course.getTrainerName());

            return courseRepo.save(existiCourse);

        }

        return null;

    }

    public void deleteCourse(Long id)
    {
        courseRepo.deleteById(id);
    }
   


}
