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
    const dataToSend = {
      ...values,
      fecha_nacimiento: values.fecha_nacimiento || "",
      telefono: values.telefono || "00000",
      archivo_cud: values.archivo_cud || "Sin especificar",
      pais: values.pais || "Sin especificar",
      partido: values.partido || "Sin especificar",
      provincia: values.provincia || "Sin especificar",
      localidad: values.localidad || "Sin especificar",
    };

    try {
      const { data, status } = await axios.post(
        `${backendUrl}/api/consultantes/registro`,
        dataToSend,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(data)

      if (status === 201) {
        notifySuccess(
          `¡¡ ${data.mensaje} `
        );
        console.log(data.mensaje)

        setTimeout(() => {
          //  navigate("/emailVerification");
          navigate("/login");
        }, 3800);

      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "Error de conexión. Inténtalo nuevamente.";
      notifyError(errorMessage);
      setErrors({ password: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  return { initialAdmin, usernameRef, handleSubmit };
};
