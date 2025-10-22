package com.plataforma.model.dto;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegistroConsultanteDTO {

	@NotBlank(message = "Ingresa tu nombre.")
	@Size(min = 3, message = "El nombre debe contener al menos 3 caracteres.")
	@Pattern(regexp = "^[a-zA-Z\\s]+$", message = "El nombre no debe contener números.")
	private String nombre;

	@NotBlank(message = "Ingresa tu apellido.")
	@Size(min = 3, message = "El apellido debe contener al menos 3 caracteres.")
	@Pattern(regexp = "^[a-zA-Z\\s]+$", message = "El apellido no debe contener números.")
	private String apellido;

	@NotBlank(message = "Ingresa tu DNI.")
	@Column(unique = true)
	private String dni;

	@NotBlank(message = "Ingresa el número de trámite de tu DNI.")
	@Column(unique = true)
	private String numeroTramite;

	@NotBlank(message = "Ingresa el número fecha de nacimiento (YYYY-MM-DD).")
	private LocalDate fechaNacimiento;

	@NotBlank(message = "Ingresa tu país.")
	private String pais;

	@NotBlank(message = "Ingresa tu provincia.")
	private String provincia;

	@NotBlank(message = "Ingresa tu localidad.")
	private String localidad;

	@NotBlank(message = "Ingresa tu partido.")
	private String partido;

	@NotBlank(message = "Ingresa un correo electrónico.")
	@Column(unique = true)
	@Email(message = "Ingresa un correo válido.")
	private String email;

	@NotBlank(message = "Ingresa tu número de telefono.")
	private String telefono;

	@NotBlank(message = "Ingrese una contraseña.")
	@Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres.")
	@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$", message = "La contraseña debe contener, al menos, una mayúscula, una minúscula y un número.")
	private String password;

	@Transient
	private String confirmPassword;

	private String discapacidad;
	private String cud;
	private String numeroCud;
	private String archivoCud;

	private String obraSocial;
	private String nombreObraSocial;

	@Transient
	private boolean aceptarTyC;

	// Getters y setters

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getNumeroTramite() {
		return numeroTramite;
	}

	public void setNumeroTramite(String numeroTramite) {
		this.numeroTramite = numeroTramite;
	}

	public LocalDate getFechaNacimiento() {
		return fechaNacimiento;
	}

	public void setFechaNacimiento(LocalDate fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}

	public String getPais() {
		return pais;
	}

	public void setPais(String pais) {
		this.pais = pais;
	}

	public String getProvincia() {
		return provincia;
	}

	public void setProvincia(String provincia) {
		this.provincia = provincia;
	}

	public String getLocalidad() {
		return localidad;
	}

	public void setLocalidad(String localidad) {
		this.localidad = localidad;
	}

	public String getPartido() {
		return partido;
	}

	public void setPartido(String partido) {
		this.partido = partido;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
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

	public String getDiscapacidad() {
		return discapacidad;
	}

	public void setDiscapacidad(String discapacidad) {
		this.discapacidad = discapacidad;
	}

	public String getCud() {
		return cud;
	}

	public void setCud(String cud) {
		this.cud = cud;
	}

	public String getNumeroCud() {
		return numeroCud;
	}

	public void setNumeroCud(String numeroCud) {
		this.numeroCud = numeroCud;
	}

	public String getArchivoCud() {
		return archivoCud;
	}

	public void setArchivoCud(String archivoCud) {
		this.archivoCud = archivoCud;
	}

	public String getObraSocial() {
		return obraSocial;
	}

	public void setObraSocial(String obraSocial) {
		this.obraSocial = obraSocial;
	}

	public String getNombreObraSocial() {
		return nombreObraSocial;
	}

	public void setNombreObraSocial(String nombreObraSocial) {
		this.nombreObraSocial = nombreObraSocial;
	}

	public boolean isAceptarTyC() {
		return aceptarTyC;
	}

	public void setAceptarTyC(boolean aceptarTyC) {
		this.aceptarTyC = aceptarTyC;
	}
}
