package com.plataforma.repository;

import com.plataforma.model.Consultante;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ConsultanteRepository extends JpaRepository<Consultante, Long> {
	Optional<Consultante> findByEmail(String email);

	Optional<Consultante> findByTokenVerificacion(String token);
}
