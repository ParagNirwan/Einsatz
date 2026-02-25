package com.einsatz.einsatz_backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OrganizationRequestDTO {
    @NotBlank(message = "Organization name is required.")
    private String name;
     @NotBlank(message = "Organization domain is required.")
    private String domain;
}
