// initialValues.jsx
const initialValues = (initialAdmin = '') => ({
  nombre: initialAdmin,
  apellido: '',
  dni: '',
  numeroTramite: '',
  fechaNacimiento: '',
  pais: '',
  provincia: '',
  localidad: '',
  email: '',
  telefono: '',
  password: '',
  confirmPassword: '',
  discapacidad: '',
  cud: '',
  numeroCud: '',
  archivoCud: '',
  obraSocial: '',
  nombreObraSocial: '',
  aceptarTyC: false
});

export default initialValues;
