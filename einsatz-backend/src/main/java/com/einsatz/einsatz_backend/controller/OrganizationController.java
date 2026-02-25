package com.einsatz.einsatz_backend.controller;

import com.einsatz.einsatz_backend.dto.OrganizationRequestDTO;
import com.einsatz.einsatz_backend.entity.Organization;
import com.einsatz.einsatz_backend.service.OrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/organization")
@RequiredArgsConstructor
public class OrganizationController {
    private final OrganizationService orgService;

     @PostMapping("/create")
    public ResponseEntity<Organization> create(
            @RequestBody OrganizationRequestDTO organizationRequestDTO,
            Authentication auth
     ){
         return ResponseEntity.ok(orgService.create(organizationRequestDTO, auth));
     }

}
