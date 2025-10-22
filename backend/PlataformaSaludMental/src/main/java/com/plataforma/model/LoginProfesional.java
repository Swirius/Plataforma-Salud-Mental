package com.plataforma.model;

import jakarta.validation.constraints.NotBlank;

public class LoginProfesional {

	@NotBlank(message = "Ingresa tu DNI.")
	private String dni;

	@NotBlank(message = "Ingresa tu contraseña.")
	private String password;

	// constructor
	public LoginProfesional() {
	}

	// getters y setters
	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
