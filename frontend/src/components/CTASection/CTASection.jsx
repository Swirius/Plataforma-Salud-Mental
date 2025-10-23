import { Container, Content, Button, } from 'rsuite';
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div style={{ backgroundColor: '#1d91f2', padding: '64px 16px', textAlign: 'center' }}>
      <Container>
        <Content>
          <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
            Comienza tu camino hacia el bienestar hoy
          </h3>
          <p style={{ color: '#c5e2ff', marginBottom: '2rem', maxWidth: '40rem', margin: 'auto' }}>
            No esperes más para cuidar tu salud mental. Encuentra el profesional adecuado para ti.
          </p>
          <Link as={Link} to="/register" >
            <Button style={{ backgroundColor: '#ffffffff', padding: '12px 12px', color: "#171717", marginTop: "50px", textAlign: 'center' }} appearance="primary" size="lg">
              Registrarse Gratis
            </Button>
          </Link>
        </Content>
      </Container>
    </div>
  );
};

export default CTASection;