package com.plataforma.controller;

import com.plataforma.model.LoginProfesional;
import com.plataforma.model.Profesional;
import com.plataforma.service.EmailService;
import com.plataforma.service.ProfesionalService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<?> registrarProfesional(@RequestBody @Valid Profesional profesional,
            BindingResult validaciones) {
        
        if (!profesional.isAceptarTyC()) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Debe aceptar los Términos y Condiciones para continuar.",
                "code", "TYC_NOT_ACCEPTED"
            ));
        }

        if (!profesional.getPassword().equals(profesional.getConfirmPassword())) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Las contraseñas no coinciden.",
                "code", "PASSWORD_MISMATCH"
            ));
        }

        if (profesionalService.obtenerProfesionalPorDni(profesional.getDni()) != null) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Ya existe una cuenta registrada con este DNI.",
                "code", "DNI_EXISTS"
            ));
        }

        if (profesionalService.obtenerProfesionalPorCorreo(profesional.getEmail()) != null) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Ya existe una cuenta registrada con este correo.",
                "code", "EMAIL_EXISTS"
            ));
        }

        try {
            profesional.setEstadoValidacion("Pendiente");
            profesional.setTokenVerificacion(UUID.randomUUID().toString());
            Profesional guardado = profesionalService.guardarProfesional(profesional);
            emailService.verificarCorreo(guardado.getEmail(), guardado.getTokenVerificacion());
            return ResponseEntity.ok(Map.of(
                "message", "Registro exitoso, revisa tu correo para verificar la cuenta.",
                "code", "VERIFICATION_PENDING"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "No se pudo completar el registro, intente nuevamente más tarde.",
                "code", "TECHNICAL_ERROR"
            ));
        }
    }

    @GetMapping("/verificar")
    public ResponseEntity<?> verificarCuenta(@RequestParam("token") String token) {
        Profesional profesional = profesionalService.obtenerProfesionalPorToken(token);
        if (profesional == null) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Token inválido.",
                "code", "INVALID_TOKEN"
            ));
        }
        profesional.setEstadoValidacion("verificado");
        profesional.setTokenVerificacion(null);
        profesionalService.guardarProfesional(profesional);
        return ResponseEntity.ok(Map.of(
            "message", "Cuenta verificada correctamente.",
            "code", "ACCOUNT_VERIFIED"
        ));
    }

    // --- Endpoint de Login ---

    @PostMapping("/login")
    public ResponseEntity<?> loginProfesional(@RequestBody LoginProfesional loginProfesional) {
        Profesional profesional = profesionalService.obtenerProfesionalPorDni(loginProfesional.getDni());
        if (profesional == null) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "DNI incorrecto.",
                "code", "DNI_NOT_FOUND"
            ));
        }
        if (!BCrypt.checkpw(loginProfesional.getContrasenia(), profesional.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Contraseña incorrecta.",
                "code", "INCORRECT_PASSWORD"
            ));
        }
        if (!"verificado".equals(profesional.getEstadoValidacion())) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "La cuenta no está verificada.",
                "code", "ACCOUNT_NOT_VERIFIED"
            ));
        }

        return ResponseEntity.ok(Map.of(
            "message", "Login exitoso.",
            "code", "LOGIN_OK"
        ));
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
}
