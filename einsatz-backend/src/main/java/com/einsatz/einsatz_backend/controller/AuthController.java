package com.einsatz.einsatz_backend.controller;

import com.einsatz.einsatz_backend.dto.AuthResponseDTO;
import com.einsatz.einsatz_backend.dto.RegisterRequestDTO;
import com.einsatz.einsatz_backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(
            @Valid
            @RequestBody
            RegisterRequestDTO request
    ){
        return ResponseEntity.ok(authService.register(request));
    }
}
