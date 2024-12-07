package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    .csrf(AbstractHttpConfigurer::disable) // Disable CSRF for simplicity
                    .authorizeHttpRequests(auth -> auth
                            .requestMatchers("/register", "/login").permitAll() // Allow public access to login and register
                            .anyRequest().authenticated() // Secure all other pages
                    )
                    .formLogin(form -> form
                            .loginPage("/login") // Specify the login page
                            .defaultSuccessUrl("/home", true) // Redirect to home page after login
                    )
                    .logout(logout -> logout
                            .logoutUrl("/logout") // Logout URL
                            .logoutSuccessUrl("/login")); // Redirect to login page after logout
            return http.build();
        }

    }
