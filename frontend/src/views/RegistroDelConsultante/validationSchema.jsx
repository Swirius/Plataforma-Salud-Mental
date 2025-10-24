import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .required('Debe ingresar su nombre'),

  apellido: Yup.string()
    .required('Debe ingresar su apellido'),

  fechaNacimiento: Yup.date()
    .required('Debe ingresar su fecha de nacimiento')
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
      'Debe ser mayor de 18 años para registrarse'
    ),

  dni: Yup.string()
    .matches(/^[0-9]{8}$/, 'El DNI debe contener 8 dígitos numéricos')
    .required('El DNI debe contener 8 dígitos numéricos'),

  numeroTramite: Yup.string()
    .required('Debe ingresar el número de trámite'),

  discapacidad: Yup.string()
    .oneOf(['SI', 'NO', 'PREFIERO_NO_RESPONDER'], 'Debe seleccionar una opción válida')
    .required('Debe indicar si tiene una discapacidad'),

  cud: Yup.string()
    .oneOf(['SI', 'NO', 'EN_TRAMITE', 'PREFIERO_NO_RESPONDER'], 'Debe seleccionar una opción válida')
    .required('Debe indicar la situación de su CUD'),

  obraSocial: Yup.string()
    .oneOf(['SI', 'NO'], 'Debe seleccionar una opción válida')
    .required('Debe indicar si tiene obra social'),

  email: Yup.string()
    .email('Debe ingresar un correo electrónico válido')
    .required('Debe ingresar un correo electrónico válido'),

  password: Yup.string()
    .required('Debe ingresar una contraseña'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Debe repetir la contraseña'),

  aceptarTyC: Yup.boolean()
    .oneOf([true], 'Debe aceptar los Términos y Condiciones para continuar'),
});


