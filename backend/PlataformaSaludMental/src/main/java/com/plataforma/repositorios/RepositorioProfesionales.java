package com.plataforma.repositorios;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.plataforma.modelos.Profesional;

@Repository
public interface RepositorioProfesionales extends CrudRepository<Profesional, Long>{
	
	List<Profesional> findAll();
	
	Profesional findByDni(String dni);
	
	Profesional findByCorreo(String correo);
	
	Profesional findByTokenVerificacion(String tokenVerificacion);

}
