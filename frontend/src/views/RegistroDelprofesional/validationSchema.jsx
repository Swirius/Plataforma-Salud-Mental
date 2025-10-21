import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .required('Debe ingresar su nombre'),

  apellido: Yup.string()
    .required('Debe ingresar su apellido'),

  dni: Yup.string()
    .matches(/^[0-9]{8}$/, 'El DNI debe contener 8 dígitos numéricos')
    .required('El DNI debe contener 8 dígitos numéricos'),

  numeroTramite: Yup.string()
    .required('Debe ingresar el número de trámite'),

  pais: Yup.string()
    .required('Debe ingresar el país'),

  provincia: Yup.string()
    .required('Debe ingresar la provincia'),

  localidad: Yup.string()
    .required('Debe ingresar la localidad'),

  celular: Yup.string()
    .required('Debe ingresar el número de celular'),

  email: Yup.string()
    .email('Debe ingresar un correo electrónico válido')
    .required('Debe ingresar un correo electrónico válido'),

  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('Debe ingresar una contraseña'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Debe repetir la contraseña'),

  aceptarTyC: Yup.boolean()
    .oneOf([true], 'Debe aceptar los Términos y Condiciones para continuar'),
});



