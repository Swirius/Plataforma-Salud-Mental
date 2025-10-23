import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useRegistroSubmit = () => {
  const { updateNCliente } = useContext(UserContext);
  const [initialAdmin, setInitialAdmin] = useState("");
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
    const savedAdmin = localStorage.getItem("rememberedAdmin");
    if (savedAdmin) setInitialAdmin(savedAdmin);
    if (usernameRef.current) usernameRef.current.focus();
  }, []);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const dataToSend = {
      ...values,
      universidad: values.universidad || "Sin especificar",
      titulo: values.titulo || "Sin especificar",
      categoria: values.categoria || "General",
      etiquetas: values.etiquetas || "general",
    };

    try {
      const { data, status } = await axios.post(
        `${backendUrl}/api/profesionales/registro`,
        dataToSend,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // console.log(data);     

      if (status === 201) {
        updateNCliente(`${values.dni}`);
        notifySuccess(
          `¡¡ ${data.mensaje} `
        );
        console.log(data.mensaje)

        setTimeout(() => {
          navigate("/user/emailVerification");
        }, 3500);

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
