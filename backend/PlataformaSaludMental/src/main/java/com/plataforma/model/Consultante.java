package com.plataforma.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "consultantes")
public class Consultante {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nombre;
	private String apellido;
	private String dni;
	private String numeroTramite;
	private LocalDate fechaNacimiento;

	private String pais;
	private String provincia;
	private String localidad;

	private String email;
	private String telefono;
	private String password;

	@Transient
	private String confirmPassword;

	private String discapacidad;
	private String cud;
	private String numeroCud;

	@Column(name = "archivo_CUD")
	private String archivoCud;

	private String obraSocial;
	private String nombreObraSocial;

	private boolean verificado = false;

	@Column(name = "token_verificacion")
	private String tokenVerificacion;
	private LocalDateTime fechaRegistro = LocalDateTime.now();

	@Column(name = "token_expiracion")
	private LocalDateTime tokenExpiracion;

	@ManyToOne
	@JoinColumn(name = "tutor_id")
	private Tutor tutor;

	// Método auxiliar
	public boolean isMayorDeEdad() {
		return fechaNacimiento != null && LocalDate.now().minusYears(18).isAfter(fechaNacimiento);
	}

	// Getters y setters
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

	public Boolean getVerificado() {
		return verificado;
	}

	public void setVerificado(Boolean verificado) {
		this.verificado = verificado;
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

	public LocalDateTime getFechaRegistro() {
		return fechaRegistro;
	}

	public void setFechaRegistro(LocalDateTime fechaRegistro) {
		this.fechaRegistro = fechaRegistro;
	}

	public Tutor getTutor() {
		return tutor;
	}

	public void setTutor(Tutor tutor) {
		this.tutor = tutor;
	}
}
