import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

import { Button, Checkbox, Container, Content, Panel, Stack, Text, VStack } from 'rsuite';
import { Col } from 'rsuite';
import BotonNoTienesCuenta from '../../components/BotonNoTienesCuenta/BotonNoTienesCuenta';
import NavBar from '../../components/Navbar/Navbar';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
  password: Yup.string()
    .required('La contraseña es requerida'),
});

const LoginConsultante = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const { updateNCliente } = useContext(UserContext);
  const [rememberMe, setRememberMe] = useState(false);
  const [initialEmail, setInitialEmail] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setInitialEmail(savedEmail);
      setRememberMe(true);
    }
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  return (
    <>
      <NavBar />
      <Container style={{ display: "flex", backgroundColor: '#4da3d981', marginTop: "2em" }}>
        <Content>
          <Stack alignItems="center" justifyContent="center" style={{ height: '100dvh' }}>
            <Col xs={24} style={{ display: "flex", justifyContent: "center" }}>
              <Panel bordered style={{
                backgroundColor: '#ffffffec',
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                padding: "1.5em",
                width: "95%",
                maxWidth: "1450px",
                margin: "0 auto"
              }}>
                <Text size="2rem" color="blue">Login Consultante</Text>

                <Formik
                  enableReinitialize
                  initialValues={{ email: initialEmail, password: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting, setErrors }) => {
                    axios
                      .post(`${backendUrl}/api/consultantes/login`, values, {
                        withCredentials: true,
                        headers: {
                          'Content-Type': 'application/json',
                        }
                      })
                      .then((response) => {
                        if (response.data.result === 'error') {
                          setErrors({ password: response.data.message });
                        }

                        if (response.status === 200) {
                          updateNCliente(values.email);
                          localStorage.setItem('token', response.data.token);
                          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                          if (rememberMe) {
                            localStorage.setItem('rememberedEmail', values.email);
                          } else {
                            localStorage.removeItem('rememberedEmail');
                          }

                          navigate(`/user/dashboard`);
                        }
                      })
                      .catch((error) => {
                        setErrors({ password: error.response?.data?.message || 'Error al iniciar sesión' });
                      })
                      .finally(() => setSubmitting(false));
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-2">
                        <label htmlFor="email" className="d-block mb-1 text-body-tertiary">Email:</label>
                        <Field
                          name="email"
                          innerRef={emailRef}
                          className="rs-input rs-input-lg text-center"
                          style={{ fontSize: '1.6em' }}
                          type="email"
                        />
                        <ErrorMessage name="email" className="text-danger" component="small" />
                      </div>

                      <div className="mb-1">
                        <label htmlFor="password" className="d-block mt-2 text-body-tertiary">Contraseña:</label>
                        <Field
                          name="password"
                          className="rs-input rs-input-lg text-center"
                          style={{ fontSize: '1.6em' }}
                          type="password"
                        />
                        <ErrorMessage name="password" className="text-danger" component="small" />
                      </div>

                      <VStack spacing={10}>
                        <div className="mb-1">
                          <Checkbox 
                            className='text-body-tertiary' 
                            checked={rememberMe} 
                            onChange={(_, checked) => setRememberMe(checked)}
                          >
                            Recordarme en este dispositivo
                          </Checkbox>
                        </div>
                      </VStack>

                      <VStack spacing={10}>
                        <Button 
                          appearance="primary" 
                          type="submit" 
                          block 
                          size="lg" 
                          loading={isSubmitting}
                          style={{ marginTop: '0.8em', fontSize: '2em', padding: '1.2em' }}
                        >
                          Ingresar
                        </Button>
                      </VStack>
                    </Form>
                  )}
                </Formik>

                <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                  <BotonNoTienesCuenta />
                </div>
              </Panel>
            </Col>
          </Stack>
        </Content>
      </Container>
    </>
  );
};

export default LoginConsultante;