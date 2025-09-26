# Plataforma de Salud Mental  

## 📌 Descripción del Proyecto  
Este proyecto busca **centralizar los recursos profesionales relacionados con la salud mental**, abarcando tanto problemáticas generales como especializaciones en neurodivergencias.  

El objetivo es **garantizar prácticas actualizadas, seguras y accesibles**, además de facilitar la **búsqueda y comunicación entre pacientes y profesionales** a través de perfiles, chat y gestión de turnos.  

La plataforma también ofrecerá acceso inclusivo a **información de emergencia, directorios de comercios/espacios de apoyo y recursos digitales descargables**.  

---

## 🎯 Objetivos  
- **Centralizar recursos**: Directorio de psicólogos, acompañantes terapéuticos, terapistas ocupacionales, etc.  
- **Garantizar confianza y actualización**: Validación de certificaciones y especialidades.  
- **Facilitar la comunicación**: Perfiles públicos, chat interno y turnos.  
- **Acceso inclusivo**: Recursos de emergencia disponibles para cualquier usuario, sin registro.  
- **Conectar con apoyos externos**: Comercios que ofrezcan productos útiles (ej.: mantas con peso, fidget toys).  
- **Recursos descargables**: Pictogramas, guías de autorregulación, infografías de derechos, entre otros.  

---

## 🛠️ Tecnologías a Utilizar  
- **Frontend**: React + JavaScript + Tailwind CSS
- **Backend**: Java + Spring Boot  
- **Base de Datos**: MySQL  

---

## 📌 Alcance del Proyecto  
El sistema permitirá:  
- ✅ Registro y autenticación de profesionales y clientes.  
- ✅ Perfiles completos y actualizables de profesionales.  
- ✅ Búsqueda avanzada con filtros.  
- ✅ Chat interno para comunicación directa.  
- ✅ Sistema de turnos vinculado a calendarios.  
- ✅ Directorio de comercios y servicios asociados.  
- ✅ Recursos digitales descargables.  
- ✅ Acceso gratuito a información de emergencias sin registro.  

### ❌ Fuera de Alcance (versión inicial)  
- Gestión de pagos o facturación.  
- Diagnósticos automáticos.  
- Sesiones online con videollamada.  
- Validación oficial de títulos (solo informativa).  
- Gestión de historias clínicas.  
- Navegación anónima de perfiles (solo emergencias visibles sin login).  

---

## 👥 Roles de Usuario y Funcionalidades  

### 🧑‍⚕️ Profesionales  
- Registro y autenticación.  
- Gestión de perfil profesional (especialidades, certificaciones, disponibilidad).  
- Calendario personal de turnos.  
- Gestión de citas (confirmar, reprogramar, cancelar).  
- Comunicación por chat con clientes.  
- Acceso a directorio de comercios y recursos digitales.  

### 👤 Clientes  
- Registro y autenticación.  
- Búsqueda de profesionales con filtros (especialidad, experiencia, ubicación, disponibilidad).  
- Solicitud de turnos.  
- Comunicación por chat.  
- Acceso a recursos digitales y directorio de servicios.  
- Consulta de contactos de emergencia.  

### 🌐 Usuarios no registrados  
- Acceso directo a la información de emergencias.  

---

## 📖 Ejemplo de Historia de Usuario (HU1 – Registro de Profesional)  
**Como profesional de la salud mental**, quiero crear una cuenta en la plataforma y configurar mi perfil para mostrar mis especialidades, certificaciones y disponibilidad.  

**Criterios de Aceptación:**  
- Ingreso de datos básicos + documentos de acreditación.  
- Validación de email único y confirmado.  
- Perfil queda pendiente de aprobación hasta validar documentos.  

**Reglas de Negocio:**  
- Solo profesionales graduados en carreras habilitantes.  
- Obligatorio incluir matrícula o documento equivalente.  
- Aprobación automática o manual por administrador.  

---

## 📐 Pendiente de Incorporar (Futuro)  
- [ ] Requisitos funcionales detallados  
- [ ] Requisitos no funcionales  
- [ ] Mockups de UI/UX  
- [ ] Arquitectura de software  
- [ ] Plan y casos de prueba  
- [ ] Sistema de seguimiento de bugs  
- [ ] Diagramas UML de cada caso de uso / historia de usuario  

---

## 🚀 Cómo Ejecutar el Proyecto  

### Requisitos Previos  
- Node.js y npm  
- Java 17+  
- Spring Boot 3+  
- MySQL 8+  

### Pasos  
1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/Swirius/Plataforma-de-Salud-Mental.git
   cd plataforma-salud-mental


---

## 📂 Estructura del Proyecto (Sugerida)  

```bash
plataforma-salud-mental/
│
├── backend/                # Proyecto en Spring Boot
│   ├── src/main/java/com/plataforma
│   │   ├── controller/     # Controladores REST
│   │   ├── model/          # Entidades JPA
│   │   ├── repository/     # Interfaces de acceso a datos
│   │   ├── service/        # Lógica de negocio
│   │   └── security/       # Configuración de seguridad/autenticación
│   ├── src/main/resources/ 
│   │   ├── application.properties
│   │   └── schema.sql      # Script inicial de BD
│   └── pom.xml
│
├── frontend/               # Proyecto en React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Vistas principales (Login, Registro, Perfiles, etc.)
│   │   ├── services/       # Conexión con API REST
│   │   ├── context/        # Manejo de estado global (Auth, User)
│   │   └── App.js
│   ├── public/
│   └── package.json
│
└── database/
    └── schema.sql          # Definición de tablas iniciales
