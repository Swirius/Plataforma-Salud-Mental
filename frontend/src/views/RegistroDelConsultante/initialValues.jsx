// initialValues.jsx
const initialValues = (initialAdmin = '') => ({
  nombre: initialAdmin,
  apellido: '',
  dni: '',
  numero_tramite: '',
  edad: "",
  discapacidad: '',
  cud: '',
  obra_social: '',
  email: '',
  password: '',
  repetirPassword: '',
  isAceptarTyC: false,
});

export default initialValues;
