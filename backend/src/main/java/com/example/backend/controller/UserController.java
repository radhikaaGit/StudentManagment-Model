package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.RoleUpdateDto;
import com.example.backend.dto.UserSummaryDto;
import com.example.backend.exception.StudentNotFoundException;
import com.example.backend.models.UserModel;
import com.example.backend.repo.UserRepo;
import com.example.backend.service.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin("*")
public class UserController {
    

    @Autowired
   private UserService userService;

   @Autowired
   private UserRepo userRepo;
   
   @PostMapping("/api/register")
   public UserModel registUser(@RequestBody UserModel user){
          
    // Public register se aane wale sabko hamesha USER hi banate hain,
    // chahe request body mein kuch bhi role bheja gaya ho. Isse koi bhi
    // seedha khud ko Admin nahi bana sakta.
    user.setRole("USER");

    return userService.registerUser(user);

   }

   // Ye endpoint sirf ADMIN role wale user hi call kar sakte hain
   // (SecurityConfig.java mein /api/admin/** ke liye hasRole("ADMIN") lagaya hai).
   // Isi se naye Admin ya User accounts banaye ja sakte hain - normal
   // public /api/register se koi Admin nahi ban sakta.
   @PostMapping("/api/admin/create-user")
   public UserModel createUserByAdmin(@RequestBody UserModel user){

    return userService.registerUser(user);

   }

   // Sabhi registered users ki list - sirf Admin dekh sakta hai.
   // Password kabhi frontend ko nahi bhejte (UserSummaryDto use kiya).
   @GetMapping("/api/admin/users")
   public List<UserSummaryDto> getAllUsers(){

    return userRepo.findAll()
        .stream()
        .map(u -> new UserSummaryDto(u.getId(), u.getUserName(), u.getRole()))
        .toList();

   }

   // Kisi bhi existing user ka role change karna (USER <-> ADMIN) - sirf Admin.
   @PutMapping("/api/admin/users/{id}/role")
   public UserSummaryDto updateUserRole(@PathVariable Long id, @RequestBody RoleUpdateDto request){

    UserModel user = userRepo.findById(id)
        .orElseThrow(() -> new StudentNotFoundException("User not found with id " + id));

    user.setRole(request.getRole());
    userRepo.save(user);

    return new UserSummaryDto(user.getId(), user.getUserName(), user.getRole());

   }

   // User account delete karna - sirf Admin. Khud apna hi account delete
   // na kar baithe isliye ek chhota safety check bhi laga diya.
   @DeleteMapping("/api/admin/users/{id}")
   public String deleteUser(@PathVariable Long id, Authentication authentication){

    UserModel user = userRepo.findById(id)
        .orElseThrow(() -> new StudentNotFoundException("User not found with id " + id));

    // .equals() seedha user.getUserName() pe call karne se, agar wo NULL ho
    // (jaise koi khali/corrupt row) to crash ho jaata tha aur delete fail ho
    // jaata tha. java.util.Objects.equals() null-safe hai.
    if (java.util.Objects.equals(user.getUserName(), authentication.getName())) {
        throw new IllegalStateException("Aap apna hi account delete nahi kar sakte.");
    }

    userRepo.delete(user);

    return "User deleted successfully";

   }

}