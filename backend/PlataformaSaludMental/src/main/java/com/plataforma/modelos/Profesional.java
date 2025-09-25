package com.plataforma.modelos;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="profesionales")
public class Profesional {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "Ingresa tu nombre.")
	@Size(min = 3, message="El nombre debe contener al menos 3 caracteres.")
	@Pattern(regexp = "^[a-zA-Z\\s]+$", message = "El nombre no debe contener números.")
	private String nombre;
	
	@NotBlank(message = "Ingresa tu apellido.")
	@Size(min = 3, message="El apellido debe contener al menos 3 caracteres.")
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
	private String correo;
	
	@NotBlank(message = "Ingrese una contraseña.")
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres.")
	@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$", message = "La contraseña debe contener, al menos, una mayúscula, una minúscula y un número.")
	private String contrasenia;
	
	@Transient
	private String confirmarContrasenia;
	
	@Transient
	private boolean aceptarTyC;
	
	@Column(name="estado")
	private String estado;

	@Column(name="token_verificacion")
	private String tokenVerificacion;
	
	/*@ManyToMany
	@JoinTable(
			name = "profesional_consultante",
			joinColumns = @JoinColumn(name = "id_profesional"),
			inverseJoinColumns = @JoinColumn(name = "id_consultante")
	)
	private List<Consultante> consultantes;*/
	
	@DateTimeFormat(pattern="yyyy-mm-dd")
	@Column(name="fecha_creacion")
	private Date fechaCreacion;
	
	
	//constructor
	
	public Profesional () {}
	
	
	//getters y setters


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


	public String getCorreo() {
		return correo;
	}


	public void setCorreo(String correo) {
		this.correo = correo;
	}


	public String getContrasenia() {
		return contrasenia;
	}


	public void setContrasenia(String contrasenia) {
		this.contrasenia = contrasenia;
	}


	public String getConfirmarContrasenia() {
		return confirmarContrasenia;
	}


	public void setConfirmarContrasenia(String confirmarContrasenia) {
		this.confirmarContrasenia = confirmarContrasenia;
	}


	public boolean isAceptarTyC() {
		return aceptarTyC;
	}


	public void setAceptarTyC(boolean aceptarTyC) {
		this.aceptarTyC = aceptarTyC;
	}


	public String getEstado() {
		return estado;
	}


	public void setEstado(String estado) {
		this.estado = estado;
	}


	public String getTokenVerificacion() {
		return tokenVerificacion;
	}


	public void setTokenVerificacion(String tokenVerificacion) {
		this.tokenVerificacion = tokenVerificacion;
	}


	public Date getFechaCreacion() {
		return fechaCreacion;
	}


	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}


	
	
}
