package com.plataforma.service;

import com.plataforma.model.Tutor;
import com.plataforma.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TutorService {

	@Autowired
	private TutorRepository tutorRepository;

	@Transactional
	public Tutor registrarTutor(String nombreCompleto, String email, String telefono, String parentesco,
			Boolean consentimiento) {
		return tutorRepository.findByEmail(email).orElseGet(() -> {
			Tutor tutor = new Tutor();
			tutor.setNombreCompleto(nombreCompleto);
			tutor.setEmail(email);
			tutor.setTelefono(telefono);
			tutor.setParentesco(parentesco);
			tutor.setConsentimiento(consentimiento);
			return tutorRepository.save(tutor);
		});
	}
}
