import "rsuite/dist/rsuite.min.css";
import { Button, Panel, Nav, Navbar } from "rsuite";
import { FaHeart } from "react-icons/fa"; // reemplazo de lucide-react
import { Link } from "react-router-dom";
import BotonYaTenesCuenta from "../../components/BotonYaTenesCuenta/BotonYaTenesCuenta";
import NavBar from "../../components/Navbar/Navbar";

export default function RegisterPage() {

  return (
    <>
      <NavBar />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right, #ebf4ff, #e0e7ff)",
          padding: "1rem",
        }}
      >
        <div style={{ width: "100%", maxWidth: "420px" }}>
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              padding: "1.5rem",
              borderRadius: "1rem",
            }}
          >
            <Navbar>
              <Nav style={{ width: "100%", justifyContent: "center" }}>
                <Nav.Item as={Link} to="/" style={{ width: "100%" }}>
                  <button
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      textDecoration: "none",
                      background: "transparent", // 🔥 transparente total
                      border: "none",
                      padding: "0.75rem 1rem",
                      cursor: "pointer",
                    }}
                  >
                    <FaHeart size={28} color="#2563eb" />
                    <span
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#111827",
                      }}
                    >
                      MentalCare
                    </span>
                  </button>
                </Nav.Item>
              </Nav>
            </Navbar>

            <h1
              style={{
                fontSize: "1.875rem",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "0.5rem",
                marginTop: "1rem",
              }}
            >
              Crear Cuenta
            </h1>
            <p style={{ color: "#4b5563" }}>
              Únete a nuestra comunidad de bienestar mental
            </p>
          </div>

          <Panel
            bordered
            shaded
            style={{ borderRadius: "12px", padding: "1.5rem", backgroundColor: "#fff" }}
          >
            <h2
              style={{
                textAlign: "center",
                fontSize: "1.25rem",
                marginBottom: "0.5rem",
              }}
            >
              Registro
            </h2>
            <p
              style={{
                textAlign: "center",
                color: "#6b7280",
                marginBottom: "1.5rem",
              }}
            >
              Selecciona el tipo de cuenta que deseas crear
            </p>

            {/* Botones */}
            <Navbar>
              <Nav>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "1.5rem",
                  }}
                >
                  <Nav.Item as={Link} to="/register-profesional">
                    <Button
                      appearance="primary"
                      block
                      style={{
                        // height: "64px",
                        background: "#2563eb",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        borderRadius: "10px",
                        // padding: "1.5rem"
                      }}
                    >
                      <span style={{ fontWeight: "600", fontSize: "1.125rem" }}>
                        Soy Profesional
                      </span>
                      <span style={{ fontSize: "0.875rem", opacity: 0.9 }}>
                        Psicólogo, Psiquiatra, Terapeuta
                      </span>
                    </Button>
                  </Nav.Item>

                  <Nav.Item as={Link} to="/register-consultante">
                    <Button
                      appearance="ghost"
                      block
                      style={{
                        // height: "64px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        borderRadius: "10px",
                      }}
                    >
                      <span style={{ fontWeight: "600", fontSize: "1.125rem" }}>
                        Soy Consultante
                      </span>
                      <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                        Busco ayuda profesional
                      </span>
                    </Button>
                  </Nav.Item>
                </div>

              </Nav>
            </Navbar>
            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
              <BotonYaTenesCuenta />
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
