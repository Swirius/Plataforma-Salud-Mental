package com.plataforma.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "profesionales")
public class Profesional {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nombre;

	private String apellido;

	private String dni;

	private String numeroTramite;

	private String pais;

	private String provincia;

	private String localidad;

	private String celular;

	private String email;

	private String password;

	@Transient
	private String confirmPassword;

	@Transient
	private boolean aceptarTyC;

	private String universidad;
	private String titulo;
	private String matricula;
	private String categoria;
	private String etiquetas;

	@Column(name = "estado_validacion")
	private String estadoValidacion;
	
	@Column(name = "token_verificacion")
	private String tokenVerificacion;

	@Column(name = "token_expiracion")
	private LocalDateTime tokenExpiracion;

	@NotNull
	@Column(name = "activo")
	private Boolean activo;

	@Column(name = "ruta_certificado_antecedentes")
	private String rutaCertificadoAntecedentes;

	@Column(name = "ruta_documento_matricula")
	private String rutaDocumentoMatricula;
	
	@Column(length = 500)
	private String descripcion;
	
	@Column(name = "ruta_imagen")
	private String rutaImagen;

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

	public LocalDateTime getTokenExpiracion() {
		return tokenExpiracion;
	}

	public void setTokenExpiracion(LocalDateTime tokenExpiracion) {
		this.tokenExpiracion = tokenExpiracion;
	}

	public boolean isActivo() {
		return activo;
	}

	public void setActivo(boolean activo) {
		this.activo = activo;
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

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getRutaImagen() {
		return rutaImagen;
	}

	public void setRutaImagen(String rutaImagen) {
		this.rutaImagen = rutaImagen;
	}

	public LocalDateTime getFechaRegistro() {
		return fechaRegistro;
	}

	public void setFechaRegistro(LocalDateTime fechaRegistro) {
		this.fechaRegistro = fechaRegistro;
	}

}
