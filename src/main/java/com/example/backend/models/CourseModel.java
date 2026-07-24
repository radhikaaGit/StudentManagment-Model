    package com.example.backend.models;

    import java.util.List;

    import com.fasterxml.jackson.annotation.JsonIgnore;

    import jakarta.persistence.Entity;
    import jakarta.persistence.GeneratedValue;
    import jakarta.persistence.GenerationType;
    import jakarta.persistence.Id;

    import jakarta.persistence.ManyToMany;
    import jakarta.persistence.OneToMany;



    @Entity
    public class CourseModel {
        
        @Id
        @GeneratedValue(strategy= GenerationType.AUTO)


        private Long id;
        private String courseName;
        private Integer fees;
        private String trainerName;

        @ManyToMany(mappedBy = "courses")
        @JsonIgnore
        private List<StudentModel> students;


        public List<StudentModel> getStudents() {
            return students;
        }

        public void setStudents(List<StudentModel> students) {
            this.students = students;
        }

        public CourseModel(Long id, String courseName, Integer fees, String trainerName){
            this.id= id;
            this.courseName=courseName;
            this.fees=fees;
            this.trainerName=trainerName;
        }

        public CourseModel(){}

        

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getCourseName() {
            return courseName;
        }

        public void setCourseName(String courseName) {
            this.courseName = courseName;
        }

        public Integer getFees() {
            return fees;
        }

        public void setFees(Integer fees) {
        this.fees = fees;
        }

     
        public String getTrainerName() {
            return trainerName;
        }

        public void setTrainerName(String trainerName) {
            this.trainerName = trainerName;
        }



        
    }
