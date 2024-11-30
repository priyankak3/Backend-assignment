package net.engineeringdigest.journalApp.controller;

import net.engineeringdigest.journalApp.entity.UserEntity;
import net.engineeringdigest.journalApp.repository.UserRepository;
import net.engineeringdigest.journalApp.service.UserEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@RestController
@RequestMapping("/users/")
@Tag(name = "User APIs", description = "Read, Update & Delete User")
public class AuthController {
    @Autowired
    public UserRepository userRepository;

    @Autowired
    public UserEntryService userEntryService;
    @GetMapping("/getAll")
    public List<UserEntity> getAllUsers(){
        return userEntryService.getAll();
    }
    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody UserEntity user) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        UserEntity userInDb = userEntryService.findByUserName(userName);
        userInDb.setUsername(user.getUsername());
        userInDb.setPassword(user.getPassword());
        userEntryService.saveNewUser(userInDb);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @DeleteMapping
//    public ResponseEntity<?> deleteUserById() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        userRepository.deleteByUserName(authentication.getName());
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
}
