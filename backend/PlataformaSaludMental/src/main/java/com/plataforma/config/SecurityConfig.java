package com.plataforma.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.csrf(csrf -> csrf.disable())

				.authorizeHttpRequests(authorize -> authorize
						// Permite el acceso SIN autenticación al endpoint de registro.
						
						//Profesionales
						.requestMatchers("/api/profesionales/registro").permitAll()

						.requestMatchers("/api/profesionales/verificar").permitAll()

						.requestMatchers("/api/profesionales/login").permitAll()

						.requestMatchers("/api/profesionales/*/requisitos").permitAll()

						.requestMatchers("/api/profesionales/*/actualizar/perfil").permitAll()
						
						
						//Consultantes
						.requestMatchers("/api/consultantes/registro").permitAll()

						.requestMatchers("/api/consultantes/registro-tercero").permitAll()

						.requestMatchers("/api/consultantes/verificar").permitAll()

						.requestMatchers("/api/consultantes/login").permitAll()

						.requestMatchers("/api/consultantes/*/requisitos").permitAll()

					.requestMatchers("/api/consultantes/*/actualizar/perfil").permitAll()
					
					// Health check / ping endpoint
					.requestMatchers("/api/ping").permitAll()

					.anyRequest().authenticated());

		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(true);
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
