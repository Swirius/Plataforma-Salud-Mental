package com.plataforma.service;

import java.io.File;
import java.io.IOException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.plataforma.model.Profesional;
import com.plataforma.model.dto.RegistroProfesionalDTO;
import com.plataforma.repository.ProfesionalRepository;

@Service
public class ProfesionalService {

    private final ProfesionalRepository profesionalRepository;

    public ProfesionalService(ProfesionalRepository profesionalRepository, EmailService emailService) {
        this.profesionalRepository = profesionalRepository;
    }

    public Profesional guardarPendiente(
            Profesional profesional,
            MultipartFile certificadoAntecedentes,
            MultipartFile documentoMatricula) throws IOException {

        // Guardar archivos en carpeta /uploads
        String uploadDir = new File("uploads").getAbsolutePath();

        File uploadFolder = new File(uploadDir);
        if (!uploadFolder.exists()) {
            uploadFolder.mkdirs();
        }

        String antecedentesPath = uploadDir + "antecedentes_" + profesional.getEmail() + ".pdf";
        String matriculaPath = uploadDir + "matricula_" + profesional.getEmail() + ".pdf";

        certificadoAntecedentes.transferTo(new File(antecedentesPath));
        documentoMatricula.transferTo(new File(matriculaPath));

        // Guardar rutas en BD
        profesional.setRutaCertificadoAntecedentes(antecedentesPath);
        profesional.setRutaDocumentoMatricula(matriculaPath);

        Profesional guardado = profesionalRepository.save(profesional);

        return guardado;
    }

    public Profesional obtenerProfesionalPorId(Long profesionalId) {
        return this.profesionalRepository.findById(profesionalId).orElse(null);
    }

    public Profesional obtenerProfesionalPorDni(String dni) {
        return this.profesionalRepository.findByDni(dni);
    }

    public Profesional obtenerProfesionalPorEmail(String email) {
        return this.profesionalRepository.findByEmail(email);
    }

    public Profesional guardarProfesional(Profesional nuevoProfesional) {
        return profesionalRepository.save(nuevoProfesional);
    }

    public Profesional obtenerProfesionalPorToken(String token) {
        return profesionalRepository.findByTokenVerificacion(token);
    }

    public String generarToken() {
        SecureRandom sr = new SecureRandom();
        byte[] bytes = new byte[16];
        sr.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    public Profesional registrarPendiente(RegistroProfesionalDTO registroProfesionalDTO) {
        Profesional profesionalPendiente = new Profesional();

        profesionalPendiente.setNombre(registroProfesionalDTO.getNombre());
        profesionalPendiente.setApellido(registroProfesionalDTO.getApellido());
        profesionalPendiente.setDni(registroProfesionalDTO.getDni());
        profesionalPendiente.setNumeroTramite(registroProfesionalDTO.getNumeroTramite());
        profesionalPendiente.setPais(registroProfesionalDTO.getPais());
        profesionalPendiente.setProvincia(registroProfesionalDTO.getProvincia());
        profesionalPendiente.setLocalidad(registroProfesionalDTO.getLocalidad());
        profesionalPendiente.setCelular(registroProfesionalDTO.getCelular());
        profesionalPendiente.setEmail(registroProfesionalDTO.getEmail());

        String contraseniaEncriptada = BCrypt.hashpw(registroProfesionalDTO.getPassword(), BCrypt.gensalt());
        profesionalPendiente.setPassword(contraseniaEncriptada);

        profesionalPendiente.setEstadoValidacion("Pendiente");
        profesionalPendiente.setTokenVerificacion(generarToken());
        profesionalPendiente.setTokenExpiracion(LocalDateTime.now().plusMinutes(30));
        profesionalPendiente.setActivo(true); // No esta completamente finalizada la funcion de validacion, por el momento lo dejamos activo.

        return profesionalRepository.save(profesionalPendiente);
    }

    public Profesional actualizarPerfil(Profesional descripcion) {
        return profesionalRepository.save(descripcion);
    }

    public Profesional guardarImagen(Profesional profesional,
            MultipartFile imagenPerfil) throws IOException {

        String uploadImg = "uploadPhoto/";

        File uploadImages = new File(uploadImg);
        if (!uploadImages.exists()) {
            uploadImages.mkdirs();
        }

        String originalFilename = imagenPerfil.getOriginalFilename();
        String tipo = originalFilename.substring(originalFilename.lastIndexOf('.') + 1).toLowerCase();
        String imagePath = uploadImg + "foto_perfil_" + profesional.getEmail() + "." + tipo;

        imagenPerfil.transferTo(new File(imagePath));
        profesional.setRutaImagen(imagePath);

        Profesional perfilActualizado = profesionalRepository.save(profesional);

        return perfilActualizado;
    }
}
