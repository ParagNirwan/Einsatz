package com.einsatz.einsatz_backend.service;

import com.einsatz.einsatz_backend.dto.AuthResponseDTO;
import com.einsatz.einsatz_backend.dto.RegisterRequestDTO;
import com.einsatz.einsatz_backend.entity.User;
import com.einsatz.einsatz_backend.enums.UserRoles;
import com.einsatz.einsatz_backend.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponseDTO register(@Valid RegisterRequestDTO request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("User with this email already exists.");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRoles.USER);

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        return new AuthResponseDTO(token);
    }
}
