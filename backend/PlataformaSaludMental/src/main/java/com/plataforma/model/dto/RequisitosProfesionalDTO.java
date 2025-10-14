package com.plataforma.model.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;

public class RequisitosProfesionalDTO {
	
	private String universidad;
	private String titulo;
	@NotBlank(message = "Ingresa tu número de matrícula.")
	@Column(unique = true)
	private String matricula;
	private String categoria;
	private String etiquetas;
	@Column(name = "ruta_certificado_antecedentes")
	private String rutaCertificadoAntecedentes;

	@Column(name = "ruta_documento_matricula")
	private String rutaDocumentoMatricula;

	
	//getters y setters
	
	
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

	public String getMatricula() {
		return matricula;
	}

	public void setMatricula(String matricula) {
		this.matricula = matricula;
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

}
