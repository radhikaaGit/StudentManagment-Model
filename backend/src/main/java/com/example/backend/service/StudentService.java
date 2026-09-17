    package com.example.backend.service;

    import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

    import com.example.backend.dto.StudentDto;
import com.example.backend.exception.CourseNotFoundException;
import com.example.backend.exception.StudentNotFoundException;
    import com.example.backend.models.CourseModel;
    import com.example.backend.models.StudentModel;
    import com.example.backend.repo.CourseRepo;
    import com.example.backend.repo.StudentRepo;

    @Service
    public class StudentService {
    
        @Autowired
        private StudentRepo studentRepo;

        @Autowired
        private CourseRepo courseRepo;
        //paging ki
        public Page<StudentModel> getAllStudents(int page, int size){
            Pageable pageable =PageRequest.of(page,size);

            return studentRepo.findAll(pageable);

        }

        public StudentModel addStudent(StudentDto studentDto){

            // Create a new StudentModel object
        // DTO ko direct database me save nahi kar sakte
            
            StudentModel student = new StudentModel();

            student.setName(studentDto.getName());
            student.setMail(studentDto.getMail());
            student.setGender(studentDto.getGender());


            // DTO se courses lekar StudentModel me set karenge
           if (studentDto.getCourses() != null) {

    // DTO ke course ids ko database se CourseModel me convert kar rahe hain
    List<CourseModel> courses = studentDto.getCourses()
            .stream()
            .map(courseDto -> courseRepo.findById(courseDto.getId())
                    .orElseThrow(() -> new CourseNotFoundException("Course not found")))
            .collect(Collectors.toList());

    // Student ke saath courses attach kar rahe hain
           student.setCourses(courses);
           }
  

            return studentRepo.save(student);
        }

        public StudentModel updateStudent(Long id , StudentDto studentDto){
            StudentModel existingStudent= studentRepo.findById(id)
            .orElseThrow(()-> new StudentNotFoundException("Student not found with id "  + id));

            //exeption nhi bnaya tha tb ye krte the
            // if(existingStudent != null)
            // {
                //  existingStudent.setName(studentDto.getName());
                // existingStudent.setMail(studentDto.getMail());
                // existingStudent.setGender(studentDto.getGender());

            //     // existingStudent.setCourses(studentDto.getCourses());

            //  return studentRepo.save(existingStudent);

            // }

        
            existingStudent.setName(studentDto.getName());
            existingStudent.setMail(studentDto.getMail());
            existingStudent.setGender(studentDto.getGender());

            if(studentDto.getCourses() != null)
            {
                List<CourseModel> courses= studentDto.getCourses()
                .stream()
                .map(courseDto-> courseRepo.findById(courseDto.getId())
                .orElseThrow(()->new CourseNotFoundException("Course not found")))
                .collect(Collectors.toList());

                existingStudent.setCourses(courses);
            }


        

            return studentRepo.save(existingStudent);





        }


        public void deleteStudent(Long id){

            StudentModel student = studentRepo.findById(id)
            .orElseThrow(()->new StudentNotFoundException("Student not found with id " + id));
            
            studentRepo.delete(student);

        }


    }
