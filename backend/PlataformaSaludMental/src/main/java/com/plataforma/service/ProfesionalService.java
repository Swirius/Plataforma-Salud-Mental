package com.plataforma.service;

import com.plataforma.model.Profesional;
import com.plataforma.repository.ProfesionalRepository;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

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
        String uploadDir = "uploads/";

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
        String contraseniaEncriptada = BCrypt.hashpw(nuevoProfesional.getPassword(), BCrypt.gensalt());
        nuevoProfesional.setPassword(contraseniaEncriptada);
        return profesionalRepository.save(nuevoProfesional);
    }
    
	public Profesional obtenerProfesionalPorToken(String token) {
	    return profesionalRepository.findByTokenVerificacion(token);
	}

	public Profesional registrarPendiente(Profesional profesional) {
	    String contraseniaEncriptada = BCrypt.hashpw(profesional.getPassword(), BCrypt.gensalt());
	    profesional.setPassword(contraseniaEncriptada);
	    profesional.setEstadoValidacion("Pendiente");
	    profesional.setTokenVerificacion(UUID.randomUUID().toString());
	    return profesionalRepository.save(profesional);
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
