CREATE DATABASE IF NOT EXISTS plataforma_db;

USE plataforma_db;

-- ========================
-- TUTORES
-- ========================
CREATE TABLE tutores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(30) NOT NULL,
    parentesco VARCHAR(100) NOT NULL,
    consentimiento BOOLEAN DEFAULT FALSE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- CONSULTANTES (pacientes)
-- ========================
CREATE TABLE consultantes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(20) NOT NULL UNIQUE,
    numero_tramite VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,

    discapacidad ENUM('SI','NO','PREFIERO_NO_RESPONDER') NOT NULL DEFAULT 'PREFIERO_NO_RESPONDER',
    cud ENUM('SI','NO','EN_TRAMITE','PREFIERO_NO_RESPONDER') NOT NULL DEFAULT 'PREFIERO_NO_RESPONDER',
    numero_cud VARCHAR(50),
    archivo_cud VARCHAR(255),

    obra_social ENUM('SI','NO') NOT NULL DEFAULT 'NO',
    nombre_obra_social VARCHAR(150),

    verificado BOOLEAN DEFAULT FALSE,
    token_verificacion VARCHAR(255),
    tutor_id BIGINT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (tutor_id) REFERENCES tutores(id) ON DELETE SET NULL
);

-- ========================
-- PROFESIONALES
-- ========================
CREATE TABLE profesionales (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(20) NOT NULL UNIQUE,
    numero_tramite VARCHAR(50) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    localidad VARCHAR(100) NOT NULL,
    matricula VARCHAR(50) NOT NULL UNIQUE,
    celular VARCHAR(30) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT 'FALSE',
    
    -- Datos profesionales / académicos
    universidad VARCHAR(150) NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    etiquetas VARCHAR(255),

    -- Estado de validación documental
    estado_validacion ENUM('PENDIENTE','VALIDADO','RECHAZADO') DEFAULT 'PENDIENTE',

    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- RELACIÓN CONSULTANTE ↔ PROFESIONAL
-- ========================
CREATE TABLE consultante_profesional (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    consultante_id BIGINT NOT NULL,
    profesional_id BIGINT NOT NULL,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (consultante_id) REFERENCES consultantes(id),
    FOREIGN KEY (profesional_id) REFERENCES profesionales(id)
);
