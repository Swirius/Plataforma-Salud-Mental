package com.plataforma.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tutores")
public class Tutor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nombreCompleto;
	private String email;
	private String telefono;
	private String parentesco; // padre, madre, tutor legal, etc.
	private Boolean consentimiento = false;
	private LocalDateTime fechaRegistro = LocalDateTime.now();

	@OneToMany(mappedBy = "tutor", cascade = CascadeType.ALL)
	private List<Consultante> consultantes;

	// Getters y setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombreCompleto() {
		return nombreCompleto;
	}

	public void setNombreCompleto(String nombreCompleto) {
		this.nombreCompleto = nombreCompleto;
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

	public LocalDateTime getFechaRegistro() {
		return fechaRegistro;
	}

	public void setFechaRegistro(LocalDateTime fechaRegistro) {
		this.fechaRegistro = fechaRegistro;
	}

	public List<Consultante> getConsultantes() {
		return consultantes;
	}

	public void setConsultantes(List<Consultante> consultantes) {
		this.consultantes = consultantes;
	}
}
