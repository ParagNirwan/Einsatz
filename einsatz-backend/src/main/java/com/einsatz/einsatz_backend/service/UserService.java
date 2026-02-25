package com.einsatz.einsatz_backend.service;

import com.einsatz.einsatz_backend.dto.OrganizationResponseDTO;
import com.einsatz.einsatz_backend.dto.UserResponseDTO;
import com.einsatz.einsatz_backend.entity.Organization;
import com.einsatz.einsatz_backend.entity.User;
import com.einsatz.einsatz_backend.repository.OrganizationRepository;
import com.einsatz.einsatz_backend.repository.UserRepository;
import com.einsatz.einsatz_backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;

    public Optional<UserResponseDTO> getCurrentUser(Authentication auth){
        CustomUserDetails customUserDetails = (CustomUserDetails) auth.getPrincipal();
        User user = userRepository.findByEmail(customUserDetails.getEmail()).orElseThrow(()-> new RuntimeException("User not found"));
        OrganizationResponseDTO orgResponseDTO = null;
        if(user.getOrganization()!=null){
            Organization org = user.getOrganization();
            orgResponseDTO = new OrganizationResponseDTO(
                    org.getId(),
                    org.getName(),
                    org.getDomain()
            );
        }

        return Optional.of(new UserResponseDTO(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getId(),
                user.getRole().name(),
                orgResponseDTO
        ));

    }




}
