package com.example.backend.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.StudentDto;
import com.example.backend.models.StudentModel;

import com.example.backend.service.StudentService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@CrossOrigin("*")


public class StudentController {


@Autowired
private StudentService studentService;

//paging ki import spring framework se hoga Page
@GetMapping("/api/students")
public Page<StudentModel> getStudents(

    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "5") int size){

    return studentService.getAllStudents(page,size);
}

@PostMapping("/api/students")
public StudentModel addStudent(@Valid @RequestBody StudentDto studentDto) {
    return studentService.addStudent(studentDto);
}

//  @PutMapping("/api/students/{id}")
//  public StudentModel updateStudent(@PathVariable Long id,
//                                    @RequestBody StudentModel student){ 
//     System.out.println("UPDATE API HIT");
//      return studentService.updateStudent(id, student);  
//  }


@PutMapping("/api/students/{id}")
public StudentModel updateStudent(@PathVariable Long id,
                                  @Valid @RequestBody StudentDto studentDto) {

    // System.out.println("========== PUT API HIT ==========");
    // System.out.println(studentDto.getName());

    return studentService.updateStudent(id,studentDto);
}




@DeleteMapping("/api/students/{id}")
public String deleteStudent(@PathVariable Long id) {

    studentService.deleteStudent(id);

    return "Student Deleted Successfully";
}


   
  

    
    
}
