package com.einsatz.einsatz_backend.controller;

import com.einsatz.einsatz_backend.dto.UserResponseDTO;
import com.einsatz.einsatz_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<Optional<UserResponseDTO>> getCurrentUser(Authentication auth){
        return ResponseEntity.ok(userService.getCurrentUser(auth));
    }
}
