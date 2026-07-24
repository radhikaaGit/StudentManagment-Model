package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.StudentModel;

import com.example.backend.service.StudentService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
 


@RestController
@CrossOrigin("*")


public class StudentController {


@Autowired
private StudentService studentService;

@GetMapping("/api/students")
public List<StudentModel> getStudents() {

    return studentService.getAllStudents();
}

@PostMapping("/api/students")
public StudentModel addStudent(@RequestBody StudentModel student) {
    return studentService.addStudent(student);
}

//  @PutMapping("/api/students/{id}")
//  public StudentModel updateStudent(@PathVariable Long id,
//                                    @RequestBody StudentModel student){ 
//     System.out.println("UPDATE API HIT");
//      return studentService.updateStudent(id, student);  
//  }


@PutMapping("/api/students/{id}")
public StudentModel updateStudent(@PathVariable Long id,
                                  @RequestBody StudentModel student) {

    System.out.println("========== PUT API HIT ==========");
    System.out.println(student.getName());

    return studentService.updateStudent(id, student);
}




@DeleteMapping("/api/students/{id}")
public String deleteStudent(@PathVariable Long id) {

    studentService.deleteStudent(id);

    return "Student Deleted Successfully";
}


   
  

    
    
}
