import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .required('Debe ingresar su nombre'),

  apellido: Yup.string()
    .required('Debe ingresar su apellido'),

  dni: Yup.string()
    .matches(/^[0-9]{8}$/, 'El DNI debe contener 8 dígitos numéricos')
    .required('El DNI debe contener 8 dígitos numéricos'),

  numero_tramite: Yup.string()
    .required('Debe ingresar el número de trámite'),

  email: Yup.string()
    .email('Debe ingresar un correo electrónico válido')
    .required('Debe ingresar un correo electrónico válido'),

  password: Yup.string()
    .required('Debe ingresar una contraseña'),

  repetirPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Debe repetir la contraseña'),

  terminos: Yup.boolean()
    .oneOf([true], 'Debe aceptar los Términos y Condiciones para continuar'),
});



