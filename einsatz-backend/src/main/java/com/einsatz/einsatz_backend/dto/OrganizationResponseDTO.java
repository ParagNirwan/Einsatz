package com.einsatz.einsatz_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class OrganizationResponseDTO {
    private UUID organizationID;
    private String organizationName;
    private String domain;
}
