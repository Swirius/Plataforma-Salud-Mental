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
import DatosAdicionalesFormik from "./FormikControl";




const RegistroDelConsultante = () => {
  const { initialAdmin, usernameRef, handleSubmit } = useRegistroSubmit();

  const FormikError = ({ name }) => (
    <ErrorMessage name={name}>
      {(msg) => (
        <small style={{ color: "red", fontSize: "0.9em" }}>{msg}</small>
      )}
    </ErrorMessage>
  );

  return (
    <Container style={{ display: "flex", backgroundColor: "#4da3d981", marginTop: "2em" }}>
      <Content>
        <Stack justifyContent="center" style={{ margin: "3rem" }}>
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
              <Text size="1.5rem" color="blue">
                Registro Del consultante
              </Text>

              <Formik
                enableReinitialize
                initialValues={initialValues(initialAdmin)}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {/* Nombre */}
                    <div className="mb-2 d-flex flex-column">
                      <label htmlFor="nombre">Nombre:</label>
                      <Field
                        name="nombre"
                        innerRef={usernameRef}
                        className="rs-input rs-input-lg text-center"
                        style={{ fontSize: "1.3em" }}
                        type="text"
                      />
                      <FormikError name="nombre" />
                    </div>

                    {/* Apellido */}
                    <div className="mb-2">
                      <label htmlFor="apellido">Apellido:</label>
                      <Field
                        name="apellido"
                        className="rs-input rs-input-lg text-center"
                        style={{ fontSize: "1.3em" }}
                        type="text"
                      />

                      <FormikError name="apellido" />
                    </div>

                    {/* dni y Tramite */}
                    <Grid fluid>
                      <Row className="show-grid">
                        <Col xs={24} sm={24} md={12}>
                          <label htmlFor="dni">DNI:</label>
                          <Field
                            name="dni"
                            maxLength={8}
                            className="rs-input rs-input-lg text-center"
                            style={{ fontSize: "1.3em" }}
                          />
                          <FormikError name="dni" />
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                          <label
                            htmlFor="numero_tramite
"
                          >
                            Trámite:
                          </label>
                          <Field
                            name="numero_tramite
"
                            className="rs-input rs-input-lg text-center"
                            style={{ fontSize: "1.3em" }}
                          />
                          <FormikError
                            name="numero_tramite
"
                          />
                        </Col>
                      </Row>
                    </Grid>

                    <DatosAdicionalesFormik />

                    <Grid>
                     <Row>
                      <Col xs={24} sm={24} md={8}>
                      <label htmlFor="edad">Edad:</label>
                      <Field
                        name="edad"
                        type="number"
                        className="rs-input rs-input-lg text-center"
                        style={{ fontSize: "1.3em" }}
                      />
                      <FormikError name="edad" />

                    </Col>
                    {/* Email */}
                    <Col xs={24} sm={24} md={16}>
                      <label htmlFor="email">Email:</label>
                      <Field
                        name="email"
                        className="rs-input rs-input-lg text-center"
                        style={{ fontSize: "1.3em" }}
                      />

                      <FormikError name="email" />
                    </Col>
                     </Row>
                    </Grid>

                    {/* Passwords */}
                    <div className="mb-2">
                      <label htmlFor="password">Contraseña:</label>
                      <Field
                        name="password"
                        type="password"
                        className="rs-input rs-input-lg text-center"
                        style={{ fontSize: "1.3em" }}
                      />
                      <FormikError name="password" />
                    </div>

                    <div className="mb-2">
                      <label htmlFor="repetirPassword">
                        Repetir Contraseña:
                      </label>
                      <Field
                        name="repetirPassword"
                        type="password"
                        className="rs-input rs-input-lg text-center"
                        style={{ fontSize: "1.3em" }}
                      />
                      <FormikError name="repetirPassword" />
                    </div>

                    {/* Terminos */}
                    <Field name="terminos">
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
                    <FormikError name="terminos" />

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
                        Ingresar
                      </Button>
                    </VStack>
                  </Form>
                )}
              </Formik>

            
            </Panel>
          </Col>
        </Stack>
      </Content>
    </Container>
  );
};

export default RegistroDelConsultante;
