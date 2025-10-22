package com.plataforma.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.plataforma.model.Profesional;

public interface ProfesionalRepository extends JpaRepository<Profesional, Long> {

	List<Profesional> findAll();

	Profesional findByDni(String dni);

	Profesional findByEmail(String email);

	Profesional findByTokenVerificacion(String tokenVerificacion);
}
