package com.plataforma.model.dto;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Transient;
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

	@NotBlank(message = "Ingresa tu apellido.")
	@Size(min = 3, message = "El apellido debe contener al menos 3 caracteres.")
	@Pattern(regexp = "^[a-zA-Z\\s]+$", message = "El apellido no debe contener números.")
	private String apellidoTutor;

	@NotBlank(message = "Ingresa tu DNI.")
	@Column(unique = true)
	private String dniTutor;

	@NotBlank(message = "Ingresa el número de trámite de tu DNI.")
	@Column(unique = true)
	private String numeroTramiteTutor;

	@NotBlank(message = "Ingresa tu fecha de nacimiento (YYYY-MM-DD).")
	private LocalDate fechaNacimientoTutor;

	@NotBlank(message = "Ingresa tu país.")
	private String paisTutor;

	@NotBlank(message = "Ingresa tu provincia.")
	private String provinciaTutor;

	@NotBlank(message = "Ingresa tu localidad.")
	private String localidadTutor;

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

	@NotBlank(message = "Ingresa el país del consultante.")
	private String paisConsultante;

	@NotBlank(message = "Ingresa la provincia del consultante.")
	private String provinciaConsultante;

	@NotBlank(message = "Ingresa la localidad del consultante.")
	private String localidadConsultante;

	@NotBlank(message = "Ingresa un correo electrónico del consultante.")
	@Column(unique = true)
	@Email(message = "Ingresa un correo válido.")
	private String emailConsultante;

	@NotBlank(message = "Ingresa el número de telefono del consultante.")
	private String telefonoConsultante;

	@NotBlank(message = "Ingrese una contraseña.")
	@Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres.")
	@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$", message = "La contraseña debe contener, al menos, una mayúscula, una minúscula y un número.")
	private String password;

	@Transient
	private String confirmPassword;

	private String discapacidadConsultante;
	private String cudConsultante;
	private String numeroCudConsultante;
	private String archivoCudConsultante;

	private String obraSocialConsultante;
	private String nombreObraSocialConsultante;

	@Transient
	private boolean aceptarTyC;

	// Getters y setters

	public String getNombreTutor() {
		return nombreTutor;
	}

	public void setNombreTutor(String nombreTutor) {
		this.nombreTutor = nombreTutor;
	}

	public String getApellidoTutor() {
		return apellidoTutor;
	}

	public void setApellidoTutor(String apellidoTutor) {
		this.apellidoTutor = apellidoTutor;
	}

	public String getDniTutor() {
		return dniTutor;
	}

	public void setDniTutor(String dniTutor) {
		this.dniTutor = dniTutor;
	}

	public String getNumeroTramiteTutor() {
		return numeroTramiteTutor;
	}

	public void setNumeroTramiteTutor(String numeroTramiteTutor) {
		this.numeroTramiteTutor = numeroTramiteTutor;
	}

	public LocalDate getFechaNacimientoTutor() {
		return fechaNacimientoTutor;
	}

	public void setFechaNacimientoTutor(LocalDate fechaNacimientoTutor) {
		this.fechaNacimientoTutor = fechaNacimientoTutor;
	}

	public String getPaisTutor() {
		return paisTutor;
	}

	public void setPaisTutor(String paisTutor) {
		this.paisTutor = paisTutor;
	}

	public String getProvinciaTutor() {
		return provinciaTutor;
	}

	public void setProvinciaTutor(String provinciaTutor) {
		this.provinciaTutor = provinciaTutor;
	}

	public String getLocalidadTutor() {
		return localidadTutor;
	}

	public void setLocalidadTutor(String localidadTutor) {
		this.localidadTutor = localidadTutor;
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

	public String getPaisConsultante() {
		return paisConsultante;
	}

	public void setPaisConsultante(String paisConsultante) {
		this.paisConsultante = paisConsultante;
	}

	public String getProvinciaConsultante() {
		return provinciaConsultante;
	}

	public void setProvinciaConsultante(String provinciaConsultante) {
		this.provinciaConsultante = provinciaConsultante;
	}

	public String getLocalidadConsultante() {
		return localidadConsultante;
	}

	public void setLocalidadConsultante(String localidadConsultante) {
		this.localidadConsultante = localidadConsultante;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
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

	public boolean isAceptarTyC() {
		return aceptarTyC;
	}

	public void setAceptarTyC(boolean aceptarTyC) {
		this.aceptarTyC = aceptarTyC;
	}
}
