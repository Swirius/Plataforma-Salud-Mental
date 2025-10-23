package com.plataforma.model.dto;

import jakarta.persistence.Column;

public class PerfilProfesionalDTO {

    @Column(length = 500)
    private String descripcion;

    @Column(name = "ruta_imagen")
    private String rutaImagen;

    //getters y setters
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
}
