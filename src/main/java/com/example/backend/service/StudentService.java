package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.models.StudentModel;
import com.example.backend.repo.StudentRepo;

@Service
public class StudentService {
 
    @Autowired
    private StudentRepo studentRepo;
     
    public List<StudentModel> getAllStudents(){
        return studentRepo.findAll();

    }

    public StudentModel addStudent(StudentModel student){
        return studentRepo.save(student);
    }

    public StudentModel updateStudent(Long id , StudentModel student){
        StudentModel existingStudent= studentRepo.findById(id).orElse(null);

        if(existingStudent != null)
        {
            existingStudent.setName(student.getName());
            existingStudent.setMail(student.getMail());
            existingStudent.setGender(student.getGender());

            existingStudent.setCourses(student.getCourses());

            return studentRepo.save(existingStudent);

        }

        return null;

    }


    public void deleteStudent(Long id){
        studentRepo.deleteById(id);
    }


}
