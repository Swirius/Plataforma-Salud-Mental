// initialValues.jsx
const initialValues = (initialAdmin = '') => ({
  nombre: initialAdmin,
  apellido: '',
  DNI: '',
  tramite: '',
  pais: '',
  edad: "",
  discapacidad: '',
    cud: '',
    obra_social: '',
  provincia: '',
  localidad: '',
  partido: '',
  celular: '',
  email: '',
  password: '',
  repetirPassword: '',
  aceptarTyC: false,
});

export default initialValues;
