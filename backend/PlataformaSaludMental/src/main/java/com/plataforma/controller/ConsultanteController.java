package com.plataforma.controller;

import com.plataforma.model.Consultante;
import com.plataforma.model.LoginConsultante;
import com.plataforma.model.dto.*;
import com.plataforma.service.ConsultanteService;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/consultantes")
public class ConsultanteController {

	@Autowired
	private ConsultanteService consultanteService;

	@PostMapping("/registro")
	public ResponseEntity<?> registrarConsultante(@ModelAttribute RegistroConsultanteDTO dto,
			@RequestParam("archivoCudPdf") MultipartFile archivoPdf) {
		try {
			// Pasamos el DTO y el archivo al servicio
			return ResponseEntity.ok(consultanteService.registrarConsultante(dto, archivoPdf));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/registro-tercero")
	public ResponseEntity<?> registrarPorTercero(@RequestBody RegistroTutorDTO dto) {
		try {
			return ResponseEntity.ok(consultanteService.registrarPorTercero(dto));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/verificar")
	public ResponseEntity<?> verificarCuenta(@RequestBody Map<String, String> verify) {
		String token = verify.get("token");
		Consultante consultante = consultanteService.obtenerConsultantePorToken(token);

		if (consultante == null) {
			return ResponseEntity.badRequest().body(Map.of(
					"error", "Token Inválido."));
		}

		if (consultante.getVerificado()) {
			return ResponseEntity.ok(Map.of(
					"error", "Su cuenta ya fue verificada."));
		}

		if (consultante.getTokenExpiracion().isBefore(LocalDateTime.now())) {
			return ResponseEntity.status(410).body(Map.of(
					"error", "Token Expirado."));
		}

		consultante.setVerificado(true);
		consultante.setTokenVerificacion(null);
		consultante.setTokenExpiracion(null);
		consultanteService.guardarConsultante(consultante);

		return ResponseEntity.ok(Map.of("ok", true));
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginConsultante(@RequestBody LoginConsultante loginConsultante) {
	    
	    Optional<Consultante> consultanteOpt = consultanteService.obtenerConsultantePorEmail(loginConsultante.getEmail());
	    
	    if (consultanteOpt.isEmpty()) {
	        return ResponseEntity.badRequest().body(Map.of("error", "Email incorrecto."));
	    }
	    
	    Consultante consultante = consultanteOpt.get();
	    
	    if (!BCrypt.checkpw(loginConsultante.getPassword(), consultante.getPassword())) {
	        return ResponseEntity.badRequest().body(Map.of("error", "Contraseña incorrecta."));
	    }
	    
	    if (!consultante.getVerificado()) {
	        return ResponseEntity.badRequest().body(Map.of("error", "La cuenta no está verificada."));
	    }
	    
	    return ResponseEntity.ok(Map.of(
	        "message", "Login exitoso.",
	        "consultanteId", consultante.getId(),
	        "nombre", consultante.getNombre() + " " + consultante.getApellido(),
	        "email", consultante.getEmail()
	    ));
	}
}
