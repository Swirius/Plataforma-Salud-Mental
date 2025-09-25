package com.plataforma.servicios;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.plataforma.modelos.Profesional;
import com.plataforma.repositorios.RepositorioProfesionales;

@Service
public class ServicioProfesionales {
	@Autowired
	
	private RepositorioProfesionales repositorioProfesionales;
	
	public ServicioProfesionales(RepositorioProfesionales repositorioProfesionales) {
		this.repositorioProfesionales = repositorioProfesionales;
	}
	
	//métodos
	
	public Profesional obtenerProfesionalPorId(Long profesionalId) {
		return this.repositorioProfesionales.findById(profesionalId).orElse(null);
	}
	
	public Profesional obtenerProfesionalPorDni(String dni) {
		return this.repositorioProfesionales.findByDni(dni);
	}
	
	public Profesional obtenerProfesionalPorCorreo(String correo) {
		return this.repositorioProfesionales.findByCorreo(correo);
	}
	
	public Profesional guardarProfesional(Profesional nuevoProfesional) {
        String contraseniaEncriptada = BCrypt.hashpw(nuevoProfesional.getContrasenia(), BCrypt.gensalt());
        nuevoProfesional.setContrasenia(contraseniaEncriptada);
        return repositorioProfesionales.save(nuevoProfesional);
    }
    
	public Profesional obtenerProfesionalPorToken(String token) {
	    return repositorioProfesionales.findByTokenVerificacion(token);
	}

	public Profesional registrarPendiente(Profesional profesional) {
	    String contraseniaEncriptada = BCrypt.hashpw(profesional.getContrasenia(), BCrypt.gensalt());
	    profesional.setContrasenia(contraseniaEncriptada);
	    profesional.setEstado("pendiente");
	    profesional.setTokenVerificacion(UUID.randomUUID().toString());
	    return repositorioProfesionales.save(profesional);
	}

}
