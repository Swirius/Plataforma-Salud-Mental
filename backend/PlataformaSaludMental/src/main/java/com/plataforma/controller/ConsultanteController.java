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
			@RequestParam(value = "archivoCudPdf", required = false) MultipartFile archivoPdf) {
		try {
			// Valida los terminos y condiciones
			if (!dto.isAceptarTyC()) {
				return ResponseEntity.badRequest()
						.body(Map.of("error", "Debe aceptar los Términos y Condiciones para continuar."));
			}

			// Valida la confirmacion de la contraseña
			if (!dto.getPassword().equals(dto.getConfirmPassword())) {
				return ResponseEntity.badRequest().body(Map.of("error", "Las contraseñas no coinciden."));
			}

			// Verifica si hay un DNI duplicado
			if (consultanteService.obtenerConsultantePorDni(dto.getDni()).isPresent()) {
				return ResponseEntity.badRequest()
						.body(Map.of("error", "Ya existe una cuenta registrada con este DNI."));
			}

			// Verifica si hay un Email duplicado
			if (consultanteService.obtenerConsultantePorEmail(dto.getEmail()).isPresent()) {
				return ResponseEntity.badRequest()
						.body(Map.of("error", "Ya existe una cuenta registrada con este correo."));
			}

			// Pasa el DTO y el archivo opcional al service
			return ResponseEntity.ok(consultanteService.registrarConsultante(dto, archivoPdf));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}

	@PostMapping("/registro-tercero")
	public ResponseEntity<?> registrarPorTercero(@ModelAttribute RegistroTutorDTO dto,
			@RequestParam(value = "archivoCudPdf", required = false) MultipartFile archivoPdf) {
		try {
			// Valida los terminos y condiciones
			if (!dto.isAceptarTyC()) {
				return ResponseEntity.badRequest()
						.body(Map.of("error", "Debe aceptar los Términos y Condiciones para continuar."));
			}

			// Valida la confirmacion de la contraseña
			if (!dto.getPassword().equals(dto.getConfirmPassword())) {
				return ResponseEntity.badRequest().body(Map.of("error", "Las contraseñas no coinciden."));
			}

			// Validate legal consent
			if (!Boolean.TRUE.equals(dto.getConsentimiento())) {
				return ResponseEntity.badRequest()
						.body(Map.of("error", "Debe aceptar el consentimiento legal para continuar."));
			}

			// Verifica si hay un DNI duplicado
			if (consultanteService.obtenerConsultantePorDni(dto.getDniConsultante()).isPresent()) {
				return ResponseEntity.badRequest()
						.body(Map.of("error", "Ya existe una cuenta registrada con este DNI."));
			}

			// Verifica si hay un Email duplicado
			if (consultanteService.obtenerConsultantePorEmail(dto.getEmailConsultante()).isPresent()) {
				return ResponseEntity.badRequest()
						.body(Map.of("error", "Ya existe una cuenta registrada con este correo."));
			}

			return ResponseEntity.ok(consultanteService.registrarPorTercero(dto, archivoPdf));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}

	@PostMapping("/verificar")
	public ResponseEntity<?> verificarCuenta(@RequestBody Map<String, String> verify) {
		String token = verify.get("token");
		Consultante consultante = consultanteService.obtenerConsultantePorToken(token);

		if (consultante == null) {
			return ResponseEntity.badRequest().body(Map.of("error", "Token Inválido."));
		}

		if (consultante.getVerificado()) {
			return ResponseEntity.ok(Map.of("error", "Su cuenta ya fue verificada."));
		}

		if (consultante.getTokenExpiracion().isBefore(LocalDateTime.now())) {
			return ResponseEntity.status(410).body(Map.of("error", "Token Expirado."));
		}

		consultante.setVerificado(true);
		consultante.setTokenVerificacion(null);
		consultante.setTokenExpiracion(null);
		consultanteService.guardarConsultante(consultante);

		return ResponseEntity.ok(Map.of("ok", true));
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginConsultante(@RequestBody LoginConsultante loginConsultante) {

		Optional<Consultante> consultanteOpt = consultanteService
				.obtenerConsultantePorEmail(loginConsultante.getEmail());

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

		return ResponseEntity.ok(Map.of("message", "Login exitoso.", "consultanteId", consultante.getId(), "nombre",
				consultante.getNombre() + " " + consultante.getApellido(), "email", consultante.getEmail()));
	}
}
