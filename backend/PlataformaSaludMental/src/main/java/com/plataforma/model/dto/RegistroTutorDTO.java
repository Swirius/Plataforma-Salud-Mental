package com.plataforma.model.dto;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegistroTutorDTO {
	// Datos del tutor
	
	@NotBlank(message = "Ingresa tu nombre.")
	@Size(min = 3, message = "El nombre debe contener al menos 3 caracteres.")
	@Pattern(regexp = "^[a-zA-Z\\s]+$", message = "El nombre no debe contener números.")
	private String nombreTutor;
	
	@NotBlank(message = "Ingresa un correo electrónico.")
	@Column(unique = true)
	@Email(message = "Ingresa un correo válido.")
	private String emailTutor;
	
	@NotBlank(message = "Ingresa tu número de telefono.")
	private String telefonoTutor;
	
	@NotBlank(message = "Ingresa tu patentesco (padre, madre, tutor legal, etc.).")
	private String parentesco;
	private Boolean consentimiento = false;

	// Datos del consultante (menor)
	
	@NotBlank(message = "Ingresa el nombre del consultante.")
	@Size(min = 3, message = "El nombre debe contener al menos 3 caracteres.")
	@Pattern(regexp = "^[a-zA-Z\\s]+$", message = "El nombre no debe contener números.")
	private String nombreConsultante;
	
	@NotBlank(message = "Ingresa el apellido del consultante.")
	@Size(min = 3, message = "El apellido debe contener al menos 3 caracteres.")
	@Pattern(regexp = "^[a-zA-Z\\s]+$", message = "El apellido no debe contener números.")
	private String apellidoConsultante;
	
	@NotBlank(message = "Ingresa el DNI del consultante.")
	private String dniConsultante;

	@NotBlank(message = "Ingresa el número de trámite del DNI del consultante.")
	private String numeroTramiteConsultante;

	@NotBlank(message = "Ingresa el número fecha de nacimiento del consultante (YYYY-MM-DD).")
	private LocalDate fechaNacimientoConsultante;
	
	@NotBlank(message = "Ingresa un correo electrónico del consultante.")
	@Column(unique = true)
	@Email(message = "Ingresa un correo válido.")
	private String emailConsultante;
	
	@NotBlank(message = "Ingresa el número de telefono del consultante.")
	private String telefonoConsultante;
	
	private String discapacidadConsultante;
	private String cudConsultante;
	private String numeroCudConsultante;
	private String archivoCudConsultante;
	
	private String obraSocialConsultante;
	private String nombreObraSocialConsultante;

	// Getters y setters

	public String getNombreTutor() {
		return nombreTutor;
	}

	public void setNombreTutor(String nombreTutor) {
		this.nombreTutor = nombreTutor;
	}

	public String getEmailTutor() {
		return emailTutor;
	}

	public void setEmailTutor(String emailTutor) {
		this.emailTutor = emailTutor;
	}

	public String getTelefonoTutor() {
		return telefonoTutor;
	}

	public void setTelefonoTutor(String telefonoTutor) {
		this.telefonoTutor = telefonoTutor;
	}

	public String getParentesco() {
		return parentesco;
	}

	public void setParentesco(String parentesco) {
		this.parentesco = parentesco;
	}

	public Boolean getConsentimiento() {
		return consentimiento;
	}

	public void setConsentimiento(Boolean consentimiento) {
		this.consentimiento = consentimiento;
	}

	public String getNombreConsultante() {
		return nombreConsultante;
	}

	public void setNombreConsultante(String nombreConsultante) {
		this.nombreConsultante = nombreConsultante;
	}

	public String getApellidoConsultante() {
		return apellidoConsultante;
	}

	public void setApellidoConsultante(String apellidoConsultante) {
		this.apellidoConsultante = apellidoConsultante;
	}

	public String getDniConsultante() {
		return dniConsultante;
	}

	public void setDniConsultante(String dniConsultante) {
		this.dniConsultante = dniConsultante;
	}

	public String getNumeroTramiteConsultante() {
		return numeroTramiteConsultante;
	}

	public void setNumeroTramiteConsultante(String numeroTramiteConsultante) {
		this.numeroTramiteConsultante = numeroTramiteConsultante;
	}

	public LocalDate getFechaNacimientoConsultante() {
		return fechaNacimientoConsultante;
	}

	public void setFechaNacimientoConsultante(LocalDate fechaNacimientoConsultante) {
		this.fechaNacimientoConsultante = fechaNacimientoConsultante;
	}

	public String getEmailConsultante() {
		return emailConsultante;
	}

	public void setEmailConsultante(String emailConsultante) {
		this.emailConsultante = emailConsultante;
	}

	public String getTelefonoConsultante() {
		return telefonoConsultante;
	}

	public void setTelefonoConsultante(String telefonoConsultante) {
		this.telefonoConsultante = telefonoConsultante;
	}

	public String getDiscapacidadConsultante() {
		return discapacidadConsultante;
	}

	public void setDiscapacidadConsultante(String discapacidadConsultante) {
		this.discapacidadConsultante = discapacidadConsultante;
	}

	public String getCudConsultante() {
		return cudConsultante;
	}

	public void setCudConsultante(String cudConsultante) {
		this.cudConsultante = cudConsultante;
	}

	public String getNumeroCudConsultante() {
		return numeroCudConsultante;
	}

	public void setNumeroCudConsultante(String numeroCudConsultante) {
		this.numeroCudConsultante = numeroCudConsultante;
	}

	public String getArchivoCudConsultante() {
		return archivoCudConsultante;
	}

	public void setArchivoCudConsultante(String archivoCudConsultante) {
		this.archivoCudConsultante = archivoCudConsultante;
	}
	
	public String getObraSocialConsultante() {
		return obraSocialConsultante;
	}

	public void setObraSocialConsultante(String obraSocialConsultante) {
		this.obraSocialConsultante = obraSocialConsultante;
	}

	public String getNombreObraSocialConsultante() {
		return nombreObraSocialConsultante;
	}

	public void setNombreObraSocialConsultante(String nombreObraSocialConsultante) {
		this.nombreObraSocialConsultante = nombreObraSocialConsultante;
	}

}
