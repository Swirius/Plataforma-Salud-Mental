import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useRegistroSubmit = () => {

  const [initialAdmin, setInitialAdmin] = useState('');
  const usernameRef = useRef(null);
  const navigate = useNavigate();

  const notifyError = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Cerrar',
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true
    });
  };

  const notifySuccess = (message) => {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: message,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Cerrar',
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  };

  useEffect(() => {
    const savedCons = localStorage.getItem('rememberedConsultante');
    if (savedCons) {
      setInitialAdmin(savedCons);

    }
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      console.log("Valores a enviar:", values); // Para debugging

      // Crear FormData para manejar archivos y datos
      const formData = new FormData();

      // Mapear los campos correctamente
      const fieldsToSend = {
        nombre: values.nombre,
        apellido: values.apellido,
        dni: values.dni,
        numeroTramite: values.numeroTramite,
        fechaNacimiento: values.fechaNacimiento, // será YYYY-MM-DD desde el input date
        pais: values.pais || "Argentina",
        provincia: values.provincia || "Buenos Aires",
        localidad: values.localidad || "CABA",
        email: values.email,
        telefono: values.telefono || "00000",
        password: values.password,
        confirmPassword: values.confirmPassword,
        discapacidad: values.discapacidad || "No",
        cud: values.cud || "No",
        numeroCud: values.numeroCud || "0",
        archivoCud: values.archivoCud || "",
        obraSocial: values.obraSocial || "No",
        nombreObraSocial: values.nombreObraSocial || "Ninguna",
        aceptarTyC: values.aceptarTyC
      };

      // Agregar campos al FormData
      Object.entries(fieldsToSend).forEach(([key, value]) => {
        formData.append(key, value);
      });

      console.log("FormData a enviar:", Object.fromEntries(formData)); // Para debugging

      const response = await axios.post(
        `${backendUrl}/api/consultantes/registro`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        notifySuccess("Registro exitoso");
        setTimeout(() => {
          navigate("/login");
        }, 3800);
      }
    } catch (error) {
      console.error("Error en el registro:", error.response?.data || error);
      const errorMessage = error.response?.data?.error || "Error en el registro";
      notifyError(errorMessage);
      setErrors({ submit: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  return { initialAdmin, usernameRef, handleSubmit };
};
