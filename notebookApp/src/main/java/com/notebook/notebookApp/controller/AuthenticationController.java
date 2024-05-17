package com.notebook.notebookApp.controller;


import com.notebook.notebookApp.dto.AuthenticationRequest;
import com.notebook.notebookApp.dto.AuthenticationResponse;
import com.notebook.notebookApp.service.AuthenticationService;
import com.notebook.notebookApp.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    @CrossOrigin(origins = "http://localhost:3000") // Allow CORS requests from React app
    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegisterRequest request) {
        try {
            service.register(request); // Call your registration service
            return ResponseEntity.ok("Registration successful"); // Success message (status 200)
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // Bad request (status 400) on failure
        }
    }
    @CrossOrigin(origins = "http://localhost:3000") // Allow CORS requests from React app
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) {

        AuthenticationResponse response = service.authenticate(request); // Call your authentication service

        if (response != null) {
            return ResponseEntity.ok(response); // Return successful login response (status 200)
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Return unauthorized (status 401) on failure
        }
    }


}
