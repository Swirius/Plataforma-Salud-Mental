package com.plataforma.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "profesionales")
public class Profesional {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

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

	@NotBlank(message = "Ingresa tu número de matrícula.")
	@Column(unique = true)
	private String matricula;

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

	private String universidad;
	private String titulo;
	private String categoria;
	private String etiquetas;

	@Column(name = "estado_validacion")
	private String estadoValidacion;
	
	@Column(name = "token_verificacion")
	private String tokenVerificacion;

	@Column(name = "ruta_certificado_antecedentes")
	private String rutaCertificadoAntecedentes;

	@Column(name = "ruta_documento_matricula")
	private String rutaDocumentoMatricula;

	@Column(name = "fecha_registro")
	private LocalDateTime fechaRegistro = LocalDateTime.now();

	// constructor
	public Profesional() {
	}

	// Getters y Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public String getMatricula() {
		return matricula;
	}

	public void setMatricula(String matricula) {
		this.matricula = matricula;
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

	public String getUniversidad() {
		return universidad;
	}

	public void setUniversidad(String universidad) {
		this.universidad = universidad;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public String getEtiquetas() {
		return etiquetas;
	}

	public void setEtiquetas(String etiquetas) {
		this.etiquetas = etiquetas;
	}

	public String getEstadoValidacion() {
		return estadoValidacion;
	}

	public void setEstadoValidacion(String estadoValidacion) {
		this.estadoValidacion = estadoValidacion;
	}

	public String getRutaCertificadoAntecedentes() {
		return rutaCertificadoAntecedentes;
	}

	public void setRutaCertificadoAntecedentes(String rutaCertificadoAntecedentes) {
		this.rutaCertificadoAntecedentes = rutaCertificadoAntecedentes;
	}

	public String getRutaDocumentoMatricula() {
		return rutaDocumentoMatricula;
	}

	public void setRutaDocumentoMatricula(String rutaDocumentoMatricula) {
		this.rutaDocumentoMatricula = rutaDocumentoMatricula;
	}

	public LocalDateTime getFechaRegistro() {
		return fechaRegistro;
	}

	public void setFechaRegistro(LocalDateTime fechaRegistro) {
		this.fechaRegistro = fechaRegistro;
	}
}
