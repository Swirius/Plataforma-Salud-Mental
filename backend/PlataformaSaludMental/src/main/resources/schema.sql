CREATE DATABASE IF NOT EXISTS plataforma_db;

USE plataforma_db;

-- ========================
-- TUTORES
-- ========================

CREATE TABLE tutores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(20) NOT NULL UNIQUE,
    numero_tramite VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    pais VARCHAR(100) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    localidad VARCHAR(100) NOT NULL,
    partido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(30) NOT NULL,
    parentesco VARCHAR(100) NOT NULL,
    consentimiento BOOLEAN DEFAULT FALSE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- CONSULTANTES
-- ========================

CREATE TABLE consultantes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(20) NOT NULL UNIQUE,
    numero_tramite VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    pais VARCHAR(100) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    localidad VARCHAR(100) NOT NULL,
    partido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,

    discapacidad ENUM('SI','NO','PREFIERO_NO_RESPONDER') DEFAULT 'PREFIERO_NO_RESPONDER',
    cud ENUM('SI','NO','EN_TRAMITE','PREFIERO_NO_RESPONDER') DEFAULT 'PREFIERO_NO_RESPONDER',
    numero_cud VARCHAR(50),
    archivo_cud VARCHAR(255),

    obra_social ENUM('SI','NO') DEFAULT 'NO',
    nombre_obra_social VARCHAR(150),

    verificado BOOLEAN DEFAULT FALSE,
    token_verificacion VARCHAR(255),
    aceptar_tyc BOOLEAN DEFAULT FALSE,
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
    partido VARCHAR(100) NOT NULL,
    celular VARCHAR(30) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,

	-- Datos profesionales / académicos
    universidad VARCHAR(150),
    matricula VARCHAR(50) UNIQUE,
    titulo VARCHAR(150),
    categoria VARCHAR(100),
    etiquetas VARCHAR(255),

    descripcion VARCHAR(500),
    imagen_perfil VARCHAR(255),

    certificado_antecedentes VARCHAR(255),
    documento_matricula VARCHAR(255),

    -- Estado de validación documental
    estado_validacion ENUM('PENDIENTE','VALIDADO','RECHAZADO') DEFAULT 'PENDIENTE',
    activo BOOLEAN DEFAULT FALSE,
    verificado BOOLEAN DEFAULT FALSE,
    token_verificacion VARCHAR(255),
    aceptar_tyc BOOLEAN DEFAULT FALSE,
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

    FOREIGN KEY (consultante_id) REFERENCES consultantes(id) ON DELETE CASCADE,
    FOREIGN KEY (profesional_id) REFERENCES profesionales(id) ON DELETE CASCADE
);