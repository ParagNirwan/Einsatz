package com.einsatz.einsatz_backend.service;

import com.einsatz.einsatz_backend.dto.OrganizationRequestDTO;
import com.einsatz.einsatz_backend.entity.Organization;
import com.einsatz.einsatz_backend.entity.User;
import com.einsatz.einsatz_backend.enums.UserRoles;
import com.einsatz.einsatz_backend.repository.OrganizationRepository;
import com.einsatz.einsatz_backend.repository.UserRepository;
import com.einsatz.einsatz_backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrganizationService {
    private final OrganizationRepository organizationRepository;
    private final UserRepository userRepository;

    public Organization create(OrganizationRequestDTO orgRequestDTO,
                               Authentication auth) {


        //if domain already exists throw error.
        if (organizationRepository
                .findByDomain(orgRequestDTO.getDomain())
                .isPresent()) {
            throw new RuntimeException("Organization with this domain already exists");
        }

        //Get User Details
        CustomUserDetails customUserDetails =
                (CustomUserDetails) auth.getPrincipal();

        UUID ownerId = customUserDetails.getId();

        //find user
        User user = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("User not found"));


        //Convert from OrgDTO to Org object
        Organization org = new Organization();
        org.setDomain(orgRequestDTO.getDomain());
        org.setName(orgRequestDTO.getName());
        org.setCreatedAt(Instant.now());
        org.setUpdatedAt(Instant.now());
        org.setIsActive(true);
        org.setOwnerId(ownerId);

        Organization savedOrg = organizationRepository.save(org);

        //update User
        user.setOrganization(savedOrg);
        user.setRole(UserRoles.OWNER);
        userRepository.save(user);


        return savedOrg;
    }
}
