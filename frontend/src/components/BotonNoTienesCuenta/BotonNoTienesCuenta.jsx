import { Link } from "react-router-dom"
import { Nav } from "rsuite";

const BotonNoTienesCuenta = () => {

  return (
    <>
      <p style={{ fontSize: "0.875rem", color: "#4b5563" }}></p>
      ¿No tienes una cuenta?
      <Nav>
        <Nav.Item
          as={Link}
          to="/register"
          style={{
            color: "#2563eb",
            fontWeight: "500",
            textDecoration: "underline",
          }}
        >
          Registrate aquí
        </Nav.Item>
      </Nav>

    </>
  );
};

export default BotonNoTienesCuenta