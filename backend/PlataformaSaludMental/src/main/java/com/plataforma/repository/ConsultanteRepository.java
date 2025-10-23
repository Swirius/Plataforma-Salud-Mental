package com.plataforma.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plataforma.model.Consultante;

public interface ConsultanteRepository extends JpaRepository<Consultante, Long> {

    Optional<Consultante> findByDni(String dni);

    Optional<Consultante> findByEmail(String email);

    Optional<Consultante> findByTokenVerificacion(String token);
}
