import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// ✅ SOLO agregamos esto para usar Grid, Row, Col y Button de RSuite
import { Button, Checkbox, Container, Content, Panel, Stack, Text, VStack } from 'rsuite';
import { Col } from 'rsuite';
import BotonNoTienesCuenta from '../../components/BotonNoTienesCuenta/BotonNoTienesCuenta';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const validationSchema = Yup.object().shape({
  dni: Yup.string().required('Requerido'),
  password: Yup.string().required('Requerido'),
});

const Login = () => {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [initialAdmin, setInitialAdmin] = useState('');

  useEffect(() => {
    const savedAdmin = localStorage.getItem('rememberedAdmin');
    if (savedAdmin) {
      setInitialAdmin(savedAdmin);
      setRememberMe(true);
    }
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  return (
    <Container style={{ display: "flex", backgroundColor: '#4da3d981', marginTop: "2em" }}>
      <Content>

        <Stack alignItems="center" justifyContent="center" style={{ height: '100dvh' }}>
          <Col xs={24} style={{ display: "flex", justifyContent: "center" }}>
            <Panel bordered
              style={{
                backgroundColor: '#ffffffec',
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                padding: "1.5em",
                width: "95%",
                maxWidth: "1450px", // 🔹 límite de ancho
                margin: "0 auto"   // 🔹 centrado
              }}
            >
              <Text size="2rem" color="blue" >Login</Text>

              <Formik
                enableReinitialize
                initialValues={{ dni: initialAdmin, password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                  axios
                    .post(`${backendUrl}/api/profesionales/login`, values, {
                      withCredentials: true,
                      headers: {
                        'Content-Type': 'application/json',
                      }
                    })

                    .then((response) => {
                      console.log(response.data)

                      debugger;
                      if (response.data.result === 'error') {
                        setErrors({ password: response.data.message });
                      }

                      if (response.status === 200) {
                        localStorage.setItem('token', response.data.token);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                        if (rememberMe) {
                          localStorage.setItem('rememberedAdmin', values.dni);
                        } else {
                          localStorage.removeItem('rememberedAdmin');
                        }
                        navigate(`/dashboard`);

                      } else if (response.status === 401) {
                        setErrors({ password: response.data.message });
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
                      <label htmlFor="dni" className="d-block mb-1 text-body-tertiary">DNI:</label>
                      <Field
                        name="dni"
                        innerRef={usernameRef}
                        className="rs-input rs-input-lg  text-center"
                        style={{ fontSize: '1.6em', }}
                        type="number"
                      />
                      <ErrorMessage name="dni" className="text-danger" component="small" />
                    </div>

                    {/* 🔹 PASSWORD */}
                    <div className="mb-1">
                      <label htmlFor="password" className="d-block mt-2 text-body-tertiary">Contraseña</label>
                      <Field
                        name="password"
                        className="rs-input rs-input-lg  text-center "
                        style={{ fontSize: '1.6em' }}
                        type="password"
                      />
                      <ErrorMessage name="password" className="text-danger" component="small" />
                    </div>

                    {/* 🔹 CHECKBOX */}
                    <VStack spacing={10}>
                      <div className="mb-1">
                        <Checkbox className='text-body-tertiary' checked={rememberMe} onChange={(_, checked) => setRememberMe(checked)}>
                          Recordarme en este dispositivo
                        </Checkbox>
                      </div>
                    </VStack>

                    <VStack spacing={10}>
                      {/* 🔹 BOTÓN */}
                      <Button appearance="primary" type="submit" block size="lg" loading={isSubmitting}
                        style={{ marginTop: '0.8em', fontSize: '2em', padding: '1.2em' }}>
                        Ingresar
                      </Button >

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
  );
};

export default Login;
