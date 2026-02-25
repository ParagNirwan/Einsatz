package com.einsatz.einsatz_backend.dto;

import com.einsatz.einsatz_backend.entity.Organization;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class UserResponseDTO {
    private String firstName;
    private String lastName;
    private String email;
    private UUID userId;
    private String role;
    private OrganizationResponseDTO org;
}

