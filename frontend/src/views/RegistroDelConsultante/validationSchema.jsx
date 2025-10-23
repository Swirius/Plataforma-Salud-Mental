import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .required('Debe ingresar su nombre'),

  apellido: Yup.string()
    .required('Debe ingresar su apellido'),
    
  edad: Yup.number()
  .typeError('La edad debe ser un número') // Muestra un error si no es un número
  .required('Debe ingresar su edad')
  .integer('La edad debe ser un número entero') // Asegura que es un número entero
  .min(18, 'Debe ser mayor de 18 años para registrarse'), // <--- Esta es la validación clave

  dni: Yup.string()
    .matches(/^[0-9]{8}$/, 'El DNI debe contener 8 dígitos numéricos')
    .required('El DNI debe contener 8 dígitos numéricos'),

  numeroTramite: Yup.string()
    .required('Debe ingresar el número de trámite'),

      // Esquema para "discapacidad"
    discapacidad: Yup.string()
        .oneOf(['SI', 'NO', 'PREFIERO_NO_RESPONDER'], 'Debe seleccionar una opción válida')
        .required('Debe indicar si tiene una discapacidad'),

    // Esquema para "cud"
    cud: Yup.string()
        .oneOf(['SI', 'NO', 'EN_TRAMITE', 'PREFIERO_NO_RESPONDER'], 'Debe seleccionar una opción válida')
        .required('Debe indicar la situación de su CUD'),

    // Esquema para "obra_social"
    obra_social: Yup.string()
        .oneOf(['SI', 'NO'], 'Debe seleccionar una opción válida')
        .required('Debe indicar si tiene obra social'),

  email: Yup.string()
    .email('Debe ingresar un correo electrónico válido')
    .required('Debe ingresar un correo electrónico válido'),

  password: Yup.string()
    .required('Debe ingresar una contraseña'),

  repetirPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Debe repetir la contraseña'),

  isAceptarTyC: Yup.boolean()
    .oneOf([true], 'Debe aceptar los Términos y Condiciones para continuar'),
});



