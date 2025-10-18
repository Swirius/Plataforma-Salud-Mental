import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL;



export const useRegistroSubmit = () => {
  
  const [initialAdmin, setInitialAdmin] = useState('');
  const usernameRef = useRef(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const savedAdmin = localStorage.getItem('rememberedAdmin');
    if (savedAdmin) {
      setInitialAdmin(savedAdmin);
      
    }
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    // Agregar campos requeridos por el backend con valores por defecto
    const dataToSend = {
      ...values,
      universidad: values.universidad || "Sin especificar",
      titulo: values.titulo || "Sin especificar",
      categoria: values.categoria || "General",
      etiquetas: values.etiquetas || "general",
      rutaCertificadoAntecedentes: values.rutaCertificadoAntecedentes || "/uploads/antecedentes/pending.pdf",
      rutaDocumentoMatricula: values.rutaDocumentoMatricula || "/uploads/matriculas/pending.pdf"
    };
    
    console.log("Datos enviados al backend:", JSON.stringify(dataToSend, null, 2));
    try {
      const { data } = await axios.post(`${backendUrl}/api/profesionales/registro`, dataToSend, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (data.result === 'error') {
        setErrors({ password: data.message });
      }

      if (data.result === 'ok') {
        // localStorage.setItem('token', data.token);
        //  axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      

        alert('Registrado correctamente 🚀');
        // navigate(`/`);
      }
    } catch (error) {
      setErrors({ password: error.response?.data?.message || 'Error al registrar' });
    } finally {
      setSubmitting(false);
    }
  };

  return { initialAdmin, usernameRef, handleSubmit };
};
