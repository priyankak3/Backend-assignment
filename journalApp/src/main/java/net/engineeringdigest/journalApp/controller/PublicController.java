package net.engineeringdigest.journalApp.controller;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import net.engineeringdigest.journalApp.dto.UserDTO;
import net.engineeringdigest.journalApp.entity.UserEntity;
import net.engineeringdigest.journalApp.service.UserDetailsServiceImpl;
import net.engineeringdigest.journalApp.service.UserEntryService;
import net.engineeringdigest.journalApp.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/public")
@Slf4j
@Tag(name = "Public APIs")
public class PublicController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private UserEntryService userEntryService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/health-check")
    public String healthCheck() {
        log.info("Health is ok !");
        return "Ok";
    }

//    @PostMapping("/signup")
//    public void signup(@RequestBody UserDTO user) {
//        UserEntity newUser = new UserEntity();
//        newUser.setUsername(user.getUserName());
//        newUser.setPassword(user.getPassword());
//        userEntryService.saveNewUser(newUser);
//    }
@PostMapping("/signup")
public ResponseEntity<?> signup(@Valid @RequestBody UserDTO user) {
    // Extensive Logging
    System.out.println("Received UserDTO: " + user);
    if (user == null) {
        return ResponseEntity.badRequest().body("User object is null");
    }

    if (user.getUserName() == null || user.getUserName().trim().isEmpty()) {
        return ResponseEntity.badRequest().body("Username is required and cannot be empty");
    }

    try {
        UserEntity newUser = new UserEntity();
        newUser.setUsername(user.getUserName());
        newUser.setPassword(user.getPassword());

        userEntryService.saveNewUser(newUser);

        return ResponseEntity.ok("User registered successfully");
    } catch (Exception e) {
        System.err.println("Signup Error: " + e.getMessage());
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred during signup: " + e.getMessage());
    }
}

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserEntity user) {
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
            String jwt = jwtUtil.generateToken(userDetails.getUsername());
            return new ResponseEntity<>(jwt, HttpStatus.OK);
        }catch (Exception e){
            log.error("Exception occurred while createAuthenticationToken ", e);
            return new ResponseEntity<>("Incorrect username or password", HttpStatus.BAD_REQUEST);
        }
    }

}

