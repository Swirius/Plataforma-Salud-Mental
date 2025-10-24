import "rsuite/dist/rsuite.min.css";
import { Button, Panel, Nav, Navbar } from "rsuite";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import BotonNoTienesCuenta from "../../components/BotonNoTienesCuenta/BotonNoTienesCuenta";
import NavBar from "../../components/Navbar/Navbar";

export default function LoginPage() {
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
                      background: "transparent",
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
              Iniciar Sesión
            </h1>
            <p style={{ color: "#4b5563" }}>
              Bienvenido de nuevo a nuestra comunidad
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
              Selecciona tu tipo de cuenta
            </h2>

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
                  <Nav.Item as={Link} to="/login-profesional">
                    <Button
                      appearance="primary"
                      block
                      style={{
                        background: "#2563eb",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        borderRadius: "10px",
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

                  <Nav.Item as={Link} to="/login-consultante">
                    <Button
                      appearance="ghost"
                      block
                      style={{
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
              <BotonNoTienesCuenta />
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}