package com.plataforma.controller;

import com.plataforma.model.LoginProfesional;
import com.plataforma.model.Profesional;
import com.plataforma.model.dto.RegistroProfesionalDTO;
import com.plataforma.service.EmailService;
import com.plataforma.service.ProfesionalService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/profesionales")
public class ProfesionalController {

    private final ProfesionalService profesionalService;
    private final EmailService emailService;

    public ProfesionalController(ProfesionalService profesionalService, EmailService emailService) {
        this.profesionalService = profesionalService;
        this.emailService = emailService;
    }

    // --- Endpoints de Registro y Verificación ---

    @PostMapping("/registro")
    public ResponseEntity<?> registrarProfesional(@RequestBody @Valid RegistroProfesionalDTO registrarProfesional,
            BindingResult validaciones) {
        
        if (!registrarProfesional.isAceptarTyC()) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Debe aceptar los Términos y Condiciones para continuar."));
        }

        if (!registrarProfesional.getPassword().equals(registrarProfesional.getConfirmPassword())) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Las contraseñas no coinciden."));
        }

        if (profesionalService.obtenerProfesionalPorDni(registrarProfesional.getDni()) != null) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Ya existe una cuenta registrada con este DNI."));
        }

        if (profesionalService.obtenerProfesionalPorEmail(registrarProfesional.getEmail()) != null) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Ya existe una cuenta registrada con este correo."));
        }

        try {

            Profesional guardado = profesionalService.registrarPendiente(registrarProfesional);
            //emailService.verificarCorreo(guardado.getEmail(), guardado.getTokenVerificacion());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(registrarProfesional);
        
        } catch (Exception e) {
        	e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                "error", "No se pudo completar el registro, intente nuevamente más tarde."));
        }
    }

    @GetMapping("/verificar")
    public ResponseEntity<?> verificarCuenta(@RequestParam("token") String token) {
        
    	Profesional profesional = profesionalService.obtenerProfesionalPorToken(token);
        if (profesional == null) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Token inválido."));
        }
        profesional.setEstadoValidacion("verificado");
        profesional.setTokenVerificacion(null);
        profesionalService.guardarProfesional(profesional);
        
        return ResponseEntity.ok(Map.of(
            "message", "Cuenta verificada correctamente."));
    }

    // --- Endpoint de Login ---

    @PostMapping("/login")
    public ResponseEntity<?> loginProfesional(@RequestBody LoginProfesional loginProfesional) {
        
    	Profesional profesional = profesionalService.obtenerProfesionalPorDni(loginProfesional.getDni());
        
    	if (profesional == null) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "DNI incorrecto."));
        }
        
    	if (!BCrypt.checkpw(loginProfesional.getPassword(), profesional.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Contraseña incorrecta."));
        }
        
    	if (!"verificado".equals(profesional.getEstadoValidacion())) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "La cuenta no está verificada."));
        }

        return ResponseEntity.ok(Map.of(
            "message", "Login exitoso."));
    }

    // --- Endpoint de Requisitos ---

    @PostMapping("/{id}/requisitos")
    public ResponseEntity<?> subirRequisitos(
            @PathVariable Long id,
            @RequestParam String universidad,
            @RequestParam String matricula,
            @RequestParam String titulo,
            @RequestParam String categoria,
            @RequestParam String etiquetas,
            @RequestParam("certificadoAntecedentes") MultipartFile certificadoAntecedentes,
            @RequestParam("documentoMatricula") MultipartFile documentoMatricula) {

        try {
            // Buscar al profesional existente
            Profesional profesionalExistente = profesionalService.obtenerProfesionalPorId(id);
            if (profesionalExistente == null) {
                return ResponseEntity.status(404)
                        .body(Map.of("error", "No se encontró un profesional con el ID proporcionado."));
            }

            // Validaciones de campos
            if (universidad.isBlank())
                return ResponseEntity.badRequest().body(Map.of("error", "Debe ingresar la universidad"));
            if (matricula.isBlank())
                return ResponseEntity.badRequest().body(Map.of("error", "Debe ingresar la matrícula"));
            if (titulo.isBlank())
                return ResponseEntity.badRequest().body(Map.of("error", "Debe ingresar el título"));
            if (categoria.isBlank())
                return ResponseEntity.badRequest().body(Map.of("error", "Debe ingresar la categoría"));
            if (etiquetas.isBlank())
                return ResponseEntity.badRequest().body(Map.of("error", "Debe ingresar las etiquetas"));

            // Validaciones de archivos
            if (certificadoAntecedentes == null || certificadoAntecedentes.isEmpty())
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Debe adjuntar certificado de antecedentes penales"));
            if (!certificadoAntecedentes.getContentType().equals("application/pdf"))
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "El archivo de antecedentes debe estar en formato PDF"));
            if (certificadoAntecedentes.getSize() > 5 * 1024 * 1024)
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "El archivo de antecedentes no debe superar 5 MB"));

            if (documentoMatricula == null || documentoMatricula.isEmpty())
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Debe adjuntar documento de matrícula/especialización"));
            if (!documentoMatricula.getContentType().equals("application/pdf"))
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "El archivo de matrícula debe estar en formato PDF"));
            if (documentoMatricula.getSize() > 5 * 1024 * 1024)
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "El archivo de matrícula no debe superar 5 MB"));

            // Actualizar el profesional existente con los nuevos datos
            profesionalExistente.setUniversidad(universidad);
            profesionalExistente.setMatricula(matricula);
            profesionalExistente.setTitulo(titulo);
            profesionalExistente.setCategoria(categoria);
            profesionalExistente.setEtiquetas(etiquetas);

            // Guardar los archivos y actualizar en BD
            profesionalService.guardarPendiente(profesionalExistente, certificadoAntecedentes, documentoMatricula);

            return ResponseEntity.ok(Map.of(
                "mensaje", "Documentos recibidos. Su perfil está pendiente de validación."
            ));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Error al procesar la solicitud: " + e.getMessage()));
        }
    }
    
    // --- Endpoint de Actualizar Perfil ---
    
    @PutMapping("/{id}/perfil")
    public ResponseEntity<?> actualizarPerfil(@PathVariable Long id,
    		                                  @RequestParam("descripcion") String descripcion,
    		                                  @RequestParam("imagen") MultipartFile imagen) {
    	
    	try {
    	
    		Profesional profesionalActual = this.profesionalService.obtenerProfesionalPorId(id);
        
    		String contentType = imagen.getContentType();
    		if (!(contentType.equals("image/jpeg") || contentType.equals("image/png"))) {
    		    return ResponseEntity.badRequest().body(Map.of(
    		    		"error", "El archivo debe estar en formato JPG o PNG"));
    		}
    	    
    		if (imagen.getSize() > 5 * 1024 * 1024)
    	    	return ResponseEntity.badRequest().body(Map.of(
    	    			"error", "La imagen no debe superar 5 MB."));
       
    	    if (descripcion.length() > 500)
    	    	return ResponseEntity.badRequest().body(Map.of(
        		        "error", "La descripción no puede superar los 500 caracteres."));
        
    	    profesionalActual.setDescripcion(descripcion);
    	    profesionalService.guardarImagen(profesionalActual, imagen);
		
    	} catch (Exception e) {
			
    		return ResponseEntity.internalServerError().body(Map.of(
    				"error", "Error al procesar la solicitud. Intente nuevamente más tarde."));
		}
         
    	return ResponseEntity.ok(Map.of(
    			"message", "Actualización exitosa."));
    }
}
