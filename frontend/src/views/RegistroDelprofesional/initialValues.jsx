// initialValues.jsx
const initialValues = (initialAdmin = '') => ({
  nombre: initialAdmin,
  apellido: '',
  dni: '',
  numeroTramite: '',
  pais: '',
  provincia: '',
  localidad: '',
  celular: '',
  email: '',
  password: '',
  confirmPassword: '',
  isAceptarTyC: false,
});

export default initialValues;
