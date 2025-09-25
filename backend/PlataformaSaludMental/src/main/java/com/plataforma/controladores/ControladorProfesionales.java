package com.plataforma.controladores;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.plataforma.modelos.LoginProfesional;
import com.plataforma.modelos.Profesional;
import com.plataforma.servicios.ServicioEmail;
import com.plataforma.servicios.ServicioProfesionales;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/profesionales")
public class ControladorProfesionales {

    @Autowired
    private ServicioProfesionales servicioProfesionales;

    @Autowired
    private ServicioEmail servicioEmail;

    //registro
    @PostMapping("/registro/profesional")
    public ResponseEntity<?> registrarProfesional(@RequestBody @Valid Profesional profesional, 
    		                                      BindingResult validaciones) {

        if (!profesional.isAceptarTyC()) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Debe aceptar los Términos y Condiciones para continuar.",
                "code", "TYC_NOT_ACCEPTED"
            ));
        }

        if (!profesional.getContrasenia().equals(profesional.getConfirmarContrasenia())) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Las contraseñas no coinciden.",
                "code", "PASSWORD_MISMATCH"
            ));
        }

        if (servicioProfesionales.obtenerProfesionalPorDni(profesional.getDni()) != null) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Ya existe una cuenta registrada con este DNI.",
                "code", "DNI_EXISTS"
            ));
        }

        if (servicioProfesionales.obtenerProfesionalPorCorreo(profesional.getCorreo()) != null) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Ya existe una cuenta registrada con este correo.",
                "code", "EMAIL_EXISTS"
            ));
        }
        
        try {
            profesional.setEstado("pendiente");
            profesional.setTokenVerificacion(UUID.randomUUID().toString());
            Profesional guardado = servicioProfesionales.guardarProfesional(profesional);
            servicioEmail.verificarCorreo(guardado.getCorreo(), guardado.getTokenVerificacion());
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
    

    //login
    @PostMapping("/login/profesional")
    public ResponseEntity<?> loginProfesional(@RequestBody LoginProfesional loginProfesional) {
        Profesional profesional = servicioProfesionales.obtenerProfesionalPorDni(loginProfesional.getDni());
        if (profesional == null) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "DNI incorrecto.",
                "code", "DNI_NOT_FOUND"
            ));
        }
        if (!BCrypt.checkpw(loginProfesional.getContrasenia(), profesional.getContrasenia())) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Contraseña incorrecta.",
                "code", "INCORRECT_PASSWORD"
            ));
        }
        if (!"verificado".equals(profesional.getEstado())) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "La cuenta no está verificada.",
                "code", "ACCOUNT_NOT_VERIFIED"
            ));
        }

        return ResponseEntity.ok(Map.of(
            "message", "Login exitoso.",
            "code", "LOGIN_OK"));
    }
    

    // Endpoint de verificación de email
    @GetMapping("/verificar")
    public ResponseEntity<?> verificarCuenta(@RequestParam("token") String token) {
        Profesional profesional = servicioProfesionales.obtenerProfesionalPorToken(token);
        if (profesional == null) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Token inválido.",
                "code", "INVALID_TOKEN"
            ));
        }
        profesional.setEstado("verificado");
        profesional.setTokenVerificacion(null);
        servicioProfesionales.guardarProfesional(profesional);
        return ResponseEntity.ok(Map.of(
            "message", "Cuenta verificada correctamente.",
            "code", "ACCOUNT_VERIFIED"
        ));
    }
}