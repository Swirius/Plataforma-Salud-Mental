// initialValues.jsx
const initialValues = (initialAdmin = '') => ({
  nombre: initialAdmin,
  apellido: '',
  DNI: '',
  tramite: '',
  pais: '',
  provincia: '',
  localidad: '',
  partido: '',
  celular: '',
  email: '',
  password: '',
  repetirPassword: '',
  terminos: false,
});

export default initialValues;
