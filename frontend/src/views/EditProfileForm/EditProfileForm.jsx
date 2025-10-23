import { useState } from "react";
import { Form, Button, Uploader, Message, toaster } from "rsuite";
import NavBar from "../../components/Navbar/Navbar";

const MAX_DESCRIPTION_LENGTH = 200;
const MAX_IMAGE_SIZE_MB = 5;

const EditProfileForm = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [formError, setFormError] = useState({});

  const validate = () => {
    const errors = {};

    if (description.length > MAX_DESCRIPTION_LENGTH) {
      errors.description = `La descripción no puede superar ${MAX_DESCRIPTION_LENGTH} caracteres`;
    }

    if (image) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(image.type)) {
        errors.image = "El archivo debe estar en formato JPG o PNG";
      }

      if (image.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        errors.image = `La imagen no puede superar ${MAX_IMAGE_SIZE_MB} MB`;
      }
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    console.log("Descripción:", description);
    console.log("Imagen:", image);

    toaster.push(
      <Message type="success" closable>
        Perfil actualizado correctamente
      </Message>
    );
  };

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 550, margin: "50px auto" }}>
        <h2>Mi perfil</h2>
        <Form fluid>
          <Form.Group style={{ marginTop: 4 }}>
            <Form.ControlLabel>Descripción</Form.ControlLabel>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "20rem",
                height: "8rem",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                resize: "none",
              }}
              placeholder="Escribe tu descripción..."
            />
            {formError.description && (
              <div style={{ color: "red", marginTop: 4 }}>
                {formError.description}
              </div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Foto de perfil (opcional)</Form.ControlLabel>
            <Uploader
              autoUpload={false}
              appearance="primary"
              fileList={image ? [image] : []}
              onChange={(files) => setImage(files[0] || null)}
              draggable
              accept="image/png, image/jpeg"
            />
            {formError.image && (
              <div style={{ color: "red", marginTop: 4 }}>
                {formError.image}
              </div>
            )}
          </Form.Group>

          <Form.Group>
            <Button appearance="primary" color="green" onClick={handleSubmit}>
              Guardar cambios
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default EditProfileForm;
