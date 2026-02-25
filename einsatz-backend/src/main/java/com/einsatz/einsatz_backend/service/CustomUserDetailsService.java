package com.einsatz.einsatz_backend.service;

import com.einsatz.einsatz_backend.entity.User;
import com.einsatz.einsatz_backend.repository.UserRepository;
import com.einsatz.einsatz_backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
public UserDetails loadUserByUsername(String email)
        throws UsernameNotFoundException {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new UsernameNotFoundException("User not found"));

    return new CustomUserDetails(user);
}
}
