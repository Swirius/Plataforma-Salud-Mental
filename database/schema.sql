-- ========================
-- CONSULTANTES (pacientes)
-- ========================
CREATE TABLE consultantes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(20) NOT NULL UNIQUE,
    numero_tramite VARCHAR(50) NOT NULL,
    edad INT NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    
    -- Información de discapacidad
    discapacidad ENUM('SI', 'NO', 'PREFIERO_NO_RESPONDER') NOT NULL,
    cud ENUM('SI', 'NO', 'EN_TRAMITE', 'PREFIERO_NO_RESPONDER') NOT NULL,
    obra_social ENUM('SI', 'NO') NOT NULL,

    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    celular VARCHAR(30),
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,

    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- OPCIONAL: RELACIÓN CONSULTANTE ↔ PROFESIONAL
-- (Ejemplo: un consultante puede tener varios profesionales asignados)
-- ========================
CREATE TABLE consultante_profesional (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    consultante_id BIGINT NOT NULL,
    profesional_id BIGINT NOT NULL,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (consultante_id) REFERENCES consultantes(id),
    FOREIGN KEY (profesional_id) REFERENCES profesionales(id)
);
