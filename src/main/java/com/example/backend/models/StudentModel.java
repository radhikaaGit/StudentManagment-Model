package com.example.backend.models;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;



    @Entity
    public class StudentModel {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)

        private Long id;
        private String name;
        private String mail;
        private String gender;

        @ManyToMany
        @JoinTable(
            name = "student_course",
            joinColumns = @JoinColumn(name = "student_id"),
              inverseJoinColumns = @JoinColumn(name = "course_id")
        )
        private List<CourseModel> courses;



        public List<CourseModel> getCourses() {
            return courses;
        }

        public void setCourses(List<CourseModel> courses) {
            this.courses = courses;
        }

        public StudentModel(Long id,String name, String mail, String gender){
            this.id= id;
            this.name= name;
            this.mail= mail;
            this.gender= gender;

        }

        public StudentModel(){}


      


        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
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
