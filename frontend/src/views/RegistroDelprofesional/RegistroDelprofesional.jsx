import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  Checkbox,
  Container,
  Content,
  Panel,
  Stack,
  Text,
  VStack,
} from "rsuite";
import { Grid, Row, Col } from "rsuite";


import { validationSchema } from "./validationSchema";
import { useRegistroSubmit } from "./useRegistroSubmit";
import initialValues from "./initialValues";
import BotonYaTenesCuenta from "../../components/BotonYaTenesCuenta/BotonYaTenesCuenta";
import "../../components/Utils/LabelForm.css";
import BotonVolver from "../../components/BotonVolver/BotonVolver";
import { Navigate } from "react-router-dom";
import NavBar from "../../components/Navbar/Navbar";



const RegistroDelProfesional = () => {
  const { initialAdmin, usernameRef, handleSubmit } = useRegistroSubmit();
 

  const FormikError = ({ name }) => (
    <ErrorMessage name={name}>
      {(msg) => (
        <small style={{ color: "red", fontSize: "0.9em" }}>{msg}</small>
      )}
    </ErrorMessage>
  );



  return (

    <>
    <NavBar />
    <Container  style={{ display: "flex", backgroundColor: "#EFF4FF", marginTop: "2em" }}  >
          <Text size="1.7rem" style={{ fontWeight: "bold" }}>
            Registro Del Profesional
          </Text>
          <span>Complete la información para crear su cuenta profesional</span>      
       <BotonVolver/>

      <Content>
        <Stack justifyContent="center" style={{ margin: "1rem" }}>
          <Col xs={24} style={{ display: "flex" }}>
            <Panel
              bordered
              style={{
                backgroundColor: "#ffffffec",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                padding: "1.3em",
                margin: "0 auto",
              }}
            >
              
              <Formik
                enableReinitialize
                initialValues={initialValues(initialAdmin)}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                  console.log("Submit test", values);
                  handleSubmit(values, actions);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <h3>Información Profesional</h3>
                    <span>Todos los campos son obligatorios</span>

                    <Grid fluid>
                      <Row className="show-grid">
                        <Col xs={24} sm={24} md={12}>
                          {/* Nombre */}
                          <div className="mb-2 d-flex flex-column">
                            <label htmlFor="nombre" className="label-form">
                              Nombre:
                            </label>
                            <Field
                              name="nombre"
                              innerRef={usernameRef}
                              className="rs-input rs-input-lg "
                              style={{ fontSize: "1.3em" }}
                              type="text"
                            />
                            <FormikError name="nombre" />
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                          {/* Apellido */}
                          <div className="mb-2">
                            <label htmlFor="apellido" className="label-form">
                              Apellido:
                            </label>
                            <Field
                              name="apellido"
                              className="rs-input rs-input-lg "
                              style={{ fontSize: "1.3em" }}
                              type="text"
                            />

                            <FormikError name="apellido" />
                          </div>
                        </Col>

                      </Row>
                    </Grid>


                  <Grid fluid>
                   <Row>
                    <Col xs={12}>
                          <div className="mb-2">
                            <label htmlFor="pais" className="label-form">
                              pais:
                            </label>
                            <Field
                              name="pais"
                              className="rs-input rs-input-lg "
                              style={{ fontSize: "1.3em" }}
                              type="text"
                            />

                            <FormikError name="pais" />
                          </div>
                    </Col>
                    <Col xs={12}>
                        <div className="mb-2">
                            <label htmlFor="provincia" className="label-form">
                              provincia:
                            </label>
                            <Field
                              name="provincia"
                              className="rs-input rs-input-lg "
                              style={{ fontSize: "1.3em" }}
                              type="text"
                            />

                            <FormikError name="provincia" />
                          </div>
                    </Col>
                   </Row>
                  </Grid>
                  

                   <Grid fluid>
                   <Row>
                    <Col xs={12}>
                          <div className="mb-2">
                            <label htmlFor="localidad" className="label-form">
                              localidad:
                            </label>
                            <Field
                              name="localidad"
                              className="rs-input rs-input-lg "
                              style={{ fontSize: "1.3em" }}
                              type="text"
                            />

                            <FormikError name="localidad" />
                          </div>
                    </Col>
                    <Col xs={12}>
                        <div className="mb-2">
                            <label htmlFor="celular" className="label-form">
                              celular:
                            </label>
                            <Field
                              name="celular"
                              className="rs-input rs-input-lg "
                              style={{ fontSize: "1.3em" }}
                              type="text"
                            />

                            <FormikError name="celular" />
                          </div>
                    </Col>
                   </Row>
                  </Grid>
                  

                    {/* dni y Tramite */}
                    <Grid fluid>
                      <Row className="show-grid">
                        <Col xs={24} sm={24} md={12}>
                          <label htmlFor="dni" className="label-form">
                            DNI:
                          </label>
                          <Field
                            name="dni"
                            maxLength={8}
                            className="rs-input rs-input-lg text-center"
                            style={{ fontSize: "1.3em" }}
                          />
                          <FormikError name="dni" />
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                          <label htmlFor="numeroTramite" className="label-form">
                            Trámite:
                          </label>
                          <Field
                            name="numeroTramite"
                            className="rs-input rs-input-lg text-center"
                            style={{ fontSize: "1.3em" }}
                          />
                          <FormikError name="numeroTramite" />
                        </Col>
                      </Row>
                    </Grid>

                    {/* Email */}
                    <div className="mb-2">
                      <label htmlFor="email">Email:</label>
                      <Field
                        name="email"
                        className="rs-input rs-input-lg text-center"
                        style={{ fontSize: "1.3em" }}
                      />

                      <FormikError name="email" />
                    </div>

                    <Grid fluid>
                      <Row className="show-grid">
                        <Col xs={24} sm={24} md={12}>
                          {/* Passwords */}
                          <div className="mb-2">
                            <label htmlFor="password" className="label-form">
                              Contraseña:
                            </label>
                            <Field
                              name="password"
                              type="password"
                              className="rs-input rs-input-lg text-center"
                              style={{ fontSize: "1.3em" }}
                            />
                            <FormikError name="password" />
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                          <div className="mb-2">
                            <label
                              htmlFor="confirmPassword"
                              className="label-form"
                            >
                              Repetir Contraseña:
                            </label>
                            <Field
                              name="confirmPassword"
                              type="password"
                              className="rs-input rs-input-lg "
                              style={{ fontSize: "1.3em" }}
                            />
                            <FormikError name="confirmPassword" />
                          </div>
                        </Col>
                      </Row>
                    </Grid>

                    {/* Terminos */}
                    <Field name="aceptarTyC">
                      {({ field, form }) => (
                        <Checkbox
                          checked={field.value}
                          onChange={(_, checked) =>
                            form.setFieldValue(field.name, checked)
                          }
                        >
                          Acepto los Términos y Condiciones
                        </Checkbox>
                      )}
                    </Field>
                    <FormikError name="aceptarTyC" />

                    {/* Botón */}
                    <VStack spacing={10}>
                      <Button
                        appearance="primary"
                        type="submit"
                        block
                        size="lg"
                        loading={isSubmitting}
                        style={{
                          marginTop: "0.8em",
                          fontSize: "1.5em",
                          padding: "1.2em",
                        }}
                      >
                        Crear cuenta profesional
                      </Button>
                    </VStack>
                  </Form>
                )}
              </Formik>

              <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                <BotonYaTenesCuenta />
              </div>

            </Panel>
          </Col>
        </Stack>
      </Content>
    </Container>
    </>

  );
};

export default RegistroDelProfesional;