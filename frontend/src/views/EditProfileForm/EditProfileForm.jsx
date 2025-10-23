import { useState } from "react";
import { Form, Button, Uploader, Message, toaster } from "rsuite";

const MAX_DESCRIPTION_LENGTH = 200; // Ajusta X caracteres
const MAX_IMAGE_SIZE_MB = 5;

const EditProfileForm = () => {
  const [formValue, setFormValue] = useState({
    description: "",
    image: null
  });

  const [formError, setFormError] = useState({});

  const validate = () => {
    const errors = {};

    if (formValue.description.length > MAX_DESCRIPTION_LENGTH) {
      errors.description = `La descripción no puede superar ${MAX_DESCRIPTION_LENGTH} caracteres`;
    }

    if (formValue.image) {
      const file = formValue.image;
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        errors.image = "El archivo debe estar en formato JPG o PNG";
      }

      if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        errors.image = `La imagen no puede superar ${MAX_IMAGE_SIZE_MB} MB`;
      }
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // Aquí iría la lógica para enviar al backend
    console.log("Descripción:", formValue.description);
    console.log("Imagen:", formValue.image);

    toaster.push(<Message type="success" closable>Perfil actualizado correctamente</Message>);
  };

  return (
    <div style={{ maxWidth: 550, margin: "50px auto" }}>
      <h2>Mi perfil</h2>
      <Form
        formValue={formValue}
        onChange={setFormValue}
        fluid
      >
        <Form.Group style={{ marginTop: 4 }}>
          <Form.ControlLabel>Descripción</Form.ControlLabel>
          <Form.Control
            name="description"
            accepter="textarea"
            style={{ width: "20rem" }}
            rows={8}
            placeholder="Escribe tu descripción..."
          />
          {formError.description && (
            <div style={{ color: "red", marginTop: 4 }}>{formError.description}</div>
          )}
        </Form.Group>

        <Form.Group>
          <Form.ControlLabel>Foto de perfil (opcional)</Form.ControlLabel>
          <Uploader
            autoUpload={false}
            appearance="primary"
            fileList={formValue.image ? [formValue.image] : []}
            onChange={(files) => setFormValue({ ...formValue, image: files[0] || null })}
            draggable
            accept="image/png, image/jpeg"
          />
          {formError.image && (
            <div style={{ color: "red", marginTop: 4 }}>{formError.image}</div>
          )}
        </Form.Group>

        <Form.Group>
          <Button appearance="primary" color="green" onClick={handleSubmit}>
            Guardar cambios
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditProfileForm;
