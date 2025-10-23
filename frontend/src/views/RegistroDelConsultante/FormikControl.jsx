import { useField } from "formik";
import { Field } from "formik";
import { Form, SelectPicker, RadioGroup, Radio } from "rsuite";
import { Grid, Row, Col } from "rsuite";

// --- Opciones de datos ---
const discapacidadOptions = [
  { label: "Sí", value: "SI" },
  { label: "No", value: "NO" },
  { label: "Prefiero no responder", value: "PREFIERO_NO_RESPONDER" },
];

const cudOptions = [
  { label: "Sí", value: "SI" },
  { label: "No", value: "NO" },
  { label: "En Trámite", value: "EN_TRAMITE" },
  { label: "Prefiero no responder", value: "PREFIERO_NO_RESPONDER" },
];

// Este componente adapta SelectPicker para Formik
const FormikSelectPicker = ({ label, name, data, ...props }) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <Form.Group>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <SelectPicker
        name={field.name}
        data={data}
        value={field.value}
        onChange={(value) =>
          field.onChange({ target: { name: field.name, value: value } })
        }
        onBlur={field.onBlur}
        style={{ width: 224 }}
        cleanable={false}
        {...props}
      />
      {hasError && (
        <Form.HelpText style={{ color: "red" }}>{meta.error}</Form.HelpText>
      )}
    </Form.Group>
  );
};

// Este componente adapta RadioGroup para Formik
const FormikRadioGroup = ({ label, name, children, ...props }) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <Form.Group>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <RadioGroup
        name={field.name}
        inline
        value={field.value}
        onChange={(value) =>
          field.onChange({ target: { name: field.name, value: value } })
        }
        onBlur={field.onBlur}
        {...props}
      >
        {children}
      </RadioGroup>
      {hasError && (
        <Form.HelpText style={{ color: "red" }}>{meta.error}</Form.HelpText>
      )}
    </Form.Group>
  );
};

// --- Implementación de los campos ---
const DatosAdicionalesFormik = () => {
  return (
    <>
      <Grid fluid>
        <Row className="show-grid">
          <Col xs={24} sm={24} md={9}>
            <FormikSelectPicker
              label="¿Tiene alguna discapacidad?"
              name="discapacidad"
              data={discapacidadOptions}
            />
          </Col>

          <Col xs={24} sm={24} md={9}>
            <FormikSelectPicker
              label="¿Tiene Certificado Único de Discapacidad (CUD)?"
              name="cud"
              data={cudOptions}
            />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <FormikRadioGroup
              label="¿Tiene Obra Social o Prepaga?"
              name="obra_social"
            >
              <Radio value="SI">Sí</Radio>
              <Radio value="NO">No</Radio>
            </FormikRadioGroup>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <label htmlFor="nombre_obra_social" className="label-form">
              Obra_social:
            </label>
            <Field
              name="nombre_obra_social"
              className="rs-input rs-input-lg text-center"
              style={{ fontSize: "1.3em" }}
            />
          </Col>
        </Row>
      </Grid>
    </>
  );
};

export default DatosAdicionalesFormik;
