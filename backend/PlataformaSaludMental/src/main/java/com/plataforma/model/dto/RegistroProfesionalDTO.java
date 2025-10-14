package com.plataforma.model.dto;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegistroProfesionalDTO {
	
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

	@NotBlank(message = "Ingresa tu país de nacimiento.")
	private String pais;

	@NotBlank(message = "")
	private String provincia;

	@NotBlank(message = "")
	private String localidad;

	@NotBlank(message = "Ingresa tu número de celular.")
	private String celular;

	@NotBlank(message = "Ingresa un correo electrónico.")
	@Column(unique = true)
	@Email(message = "Ingresa un correo válido.")
	private String email;

	@NotBlank(message = "Ingrese una contraseña.")
	@Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres.")
	@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$", message = "La contraseña debe contener, al menos, una mayúscula, una minúscula y un número.")
	private String password;

	@Transient
	private String confirmPassword;

	@Transient
	private boolean aceptarTyC;
	
	@Column(name = "token_verificacion")
	private String tokenVerificacion;

	@Column(name = "token_expiracion")
	private LocalDateTime tokenExpiracion;

	@NotNull
	@Column(name = "activo")
	private Boolean activo;
	
	
	//getters y setters
	

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

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public boolean isAceptarTyC() {
		return aceptarTyC;
	}

	public void setAceptarTyC(boolean aceptarTyC) {
		this.aceptarTyC = aceptarTyC;
	}

	public String getTokenVerificacion() {
		return tokenVerificacion;
	}

	public void setTokenVerificacion(String tokenVerificacion) {
		this.tokenVerificacion = tokenVerificacion;
	}

	public LocalDateTime getTokenExpiracion() {
		return tokenExpiracion;
	}

	public void setTokenExpiracion(LocalDateTime tokenExpiracion) {
		this.tokenExpiracion = tokenExpiracion;
	}

	public Boolean isActivo() {
		return activo;
	}

	public void setActivo(Boolean activo) {
		this.activo = activo;
	}
	
	

}
