package com.plataforma.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http

            .csrf(csrf -> csrf.disable()) 
            
            .authorizeHttpRequests(authorize -> authorize
                // Permite el acceso SIN autenticación al endpoint de registro.
                .requestMatchers("/api/profesionales/registro").permitAll()
                
                .requestMatchers("/api/profesionales/login").permitAll()
                
                .requestMatchers("/api/profesionales/verificar").permitAll()
                
                .requestMatchers("/api/profesionales/{id}/requisitos").permitAll()
                
                .requestMatchers("/api/profesionales/{id}/actualizar/perfil").permitAll()
                
                .anyRequest().authenticated()
            );

        return http.build();
    }
}
