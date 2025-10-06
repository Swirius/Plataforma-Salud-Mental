import { Link } from "react-router-dom"
import { Nav } from "rsuite";


const BotonYaTenesCuenta = () => {

  return (
    <>
                <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                  ¿Ya tienes una cuenta?
<Nav>  
                  <Nav.Item
                    as={Link}
                    to="/login"
                    style={{
                      color: "#2563eb",
                      fontWeight: "500",
                      textDecoration: "underline",
                    }}
                  >
                    Inicia sesión aquí
                  </Nav.Item>
 </Nav>
                </p>
    </>
  );
};

export default BotonYaTenesCuenta