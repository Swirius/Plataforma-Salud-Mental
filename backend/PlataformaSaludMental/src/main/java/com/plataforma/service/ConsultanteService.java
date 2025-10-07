package com.plataforma.service;

import com.plataforma.model.*;
import com.plataforma.model.dto.*;
import com.plataforma.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class ConsultanteService {

	@Autowired
	private ConsultanteRepository consultanteRepository;
	@Autowired
	private TutorService tutorService;
	@Autowired
	private EmailService emailService;

	@Value("${file.upload-dir}")
	private String uploadDir;

	@Transactional
	public Map<String, Object> registrarConsultante(RegistroConsultanteDTO dto, MultipartFile archivoPdf)
			throws IOException {
		if (consultanteRepository.findByEmail(dto.getEmail()).isPresent())
			throw new RuntimeException("El email ya está registrado.");

		String nombreArchivoUnico = guardarArchivo(archivoPdf);

		Consultante c = new Consultante();
		c.setNombre(dto.getNombre());
		c.setApellido(dto.getApellido());
		c.setDni(dto.getDni());
		c.setNumeroTramite(dto.getNumeroTramite());
		c.setFechaNacimiento(dto.getFechaNacimiento());
		c.setEmail(dto.getEmail());
		c.setTelefono(dto.getTelefono());
		c.setPassword(dto.getPassword());
		c.setDiscapacidad(dto.getDiscapacidad());
		c.setCud(dto.getCud());
		c.setNumeroCud(dto.getNumeroCud());
		c.setObraSocial(dto.getObraSocial());
		c.setNombreObraSocial(dto.getNombreObraSocial());

		// Asignamos el nombre del archivo guardado a la entidad
		c.setArchivoCud(nombreArchivoUnico); // <-- CAMBIO IMPORTANTE

		if (!c.isMayorDeEdad())
			throw new RuntimeException("Debe ser mayor de 18 años para registrarse directamente.");

		c.setVerificado(false);
		c.setTokenVerificacion(UUID.randomUUID().toString());

		consultanteRepository.save(c);
		emailService.verificarCorreo(c.getEmail(), c.getTokenVerificacion());

		return Map.of("mensaje", "Registro exitoso. Revisa tu correo para verificar la cuenta.");
	}

	private String guardarArchivo(MultipartFile archivo) throws IOException {

		// Validamos que el archivo no esté vacío
		if (archivo.isEmpty()) {
			throw new IOException("El archivo CUD es obligatorio.");
		}

		// Validamos que sea un PDF
		if (!"application/pdf".equals(archivo.getContentType())) {
			throw new IllegalArgumentException("El archivo debe ser de tipo PDF.");
		}

		// Creamos el directorio si no existe
		Path directorioDeSubida = Paths.get(uploadDir);
		if (!Files.exists(directorioDeSubida)) {
			Files.createDirectories(directorioDeSubida);
		}

		// Generamos un nombre único para el archivo
		String nombreOriginal = archivo.getOriginalFilename();
		String nombreUnico = UUID.randomUUID().toString() + "_" + nombreOriginal;

		// Construimos la ruta completa y guardamos el archivo
		Path rutaCompleta = directorioDeSubida.resolve(nombreUnico);
		Files.copy(archivo.getInputStream(), rutaCompleta);

		return nombreUnico; // Devolvemos el nombre con el que se guardó
	}

	@Transactional
	public Map<String, Object> registrarPorTercero(RegistroTutorDTO dto) {
		if (!Boolean.TRUE.equals(dto.getConsentimiento()))
			throw new RuntimeException("Debe aceptar el consentimiento legal para continuar.");

		Tutor tutor = tutorService.registrarTutor(dto.getNombreTutor(), dto.getEmailTutor(), dto.getTelefonoTutor(),
				dto.getParentesco(), dto.getConsentimiento());

		Consultante c = new Consultante();
		c.setNombre(dto.getNombreConsultante());
		c.setApellido(dto.getApellidoConsultante());
		c.setDni(dto.getDniConsultante());
		c.setNumeroTramite(dto.getNumeroTramiteConsultante());
		c.setFechaNacimiento(dto.getFechaNacimientoConsultante());
		c.setEmail(dto.getEmailConsultante());
		c.setTelefono(dto.getTelefonoConsultante());
		c.setDiscapacidad(dto.getDiscapacidadConsultante());
		c.setCud(dto.getCudConsultante());
		c.setNumeroCud(dto.getNumeroCudConsultante());
		c.setObraSocial(dto.getObraSocialConsultante());
		c.setNombreObraSocial(dto.getNombreObraSocialConsultante());
		c.setTutor(tutor);
		c.setVerificado(false);
		c.setTokenVerificacion(UUID.randomUUID().toString());

		consultanteRepository.save(c);
		emailService.verificarCorreo(c.getEmail(), c.getTokenVerificacion());

		return Map.of("mensaje", "Registro exitoso. Revisa el correo del consultante para verificar la cuenta.");
	}

	public Map<String, Object> verificarCuenta(String token) {
		Optional<Consultante> opt = consultanteRepository.findByTokenVerificacion(token);
		if (opt.isEmpty())
			throw new RuntimeException("Token inválido o inexistente.");

		Consultante c = opt.get();
		if (c.getVerificado())
			return Map.of("mensaje", "La cuenta ya estaba verificada.");

		c.setVerificado(true);
		c.setTokenVerificacion(null);
		consultanteRepository.save(c);
		return Map.of("mensaje", "Cuenta verificada correctamente.", "email", c.getEmail());
	}

	public Optional<Consultante> obtenerConsultantePorEmail(String email) {
		return consultanteRepository.findByEmail(email);
	}
}
