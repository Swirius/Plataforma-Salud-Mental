import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const backendUrl = import.meta.env.VITE_BACKEND_URL;




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
    console.log("se hizo clik")
    try {
      const { data } = await axios.post("/api/profesionales/registro", values, {
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
