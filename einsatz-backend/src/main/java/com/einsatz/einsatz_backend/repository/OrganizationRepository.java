package com.einsatz.einsatz_backend.repository;

import com.einsatz.einsatz_backend.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface OrganizationRepository extends JpaRepository<Organization, UUID> {
    Optional<Organization> findByDomain(String domain);
    boolean existsByDomain(String domain);
}
