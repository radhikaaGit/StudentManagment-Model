package com.example.backend.models;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserModel {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
   
    private String userName;
    private String password;
    private String role;

    public String getRole(){
        return role;
    }
    public void setRole(String role){
        this.role =  role;
    }


     public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    

    public UserModel(Long id, String userName, String password,String role)
    {
        this.id= id;
        this.userName = userName;
        this.password = password;
        this.role = role;
    }
    
    public UserModel(){}




    
}
