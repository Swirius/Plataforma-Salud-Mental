import { Container, Content, Grid, Row, Col, Divider, Footer } from 'rsuite';
import { FaHeart } from 'react-icons/fa'; // Asegúrate de tener instalado react-icons

const FooterPage = () => {
  return (
    <Footer style={{ backgroundColor: '#161618', color: 'white', padding: '48px 16px' }}>
      <Container style={{ width: '100%' }}>
        <Content>
          <Grid fluid>
            <Row gutter={30}>
              <Col xs={24} sm={12} md={6}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <FaHeart style={{ height: '24px', width: '24px', color: '#42a5f5' }} />
                  <span style={{ fontSize: '20px', fontWeight: 'bold' }}>MentalHealth</span>
                </div>
                <p style={{ color: '#9e9e9e' }}>Conectando personas con profesionales de salud mental de confianza.</p>
              </Col>
              
              <Col xs={24} sm={12} md={6}>
                <h4 style={{ fontWeight: '600', marginBottom: '16px' }}>Servicios</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#9e9e9e', lineHeight: '2' }}>
                  <li>Psicología</li>
                  <li>Psiquiatría</li>
                  <li>Terapia de Pareja</li>
                  <li>Terapia Familiar</li>
                </ul>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <h4 style={{ fontWeight: '600', marginBottom: '16px' }}>Soporte</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#9e9e9e', lineHeight: '2' }}>
                  <li>Centro de Ayuda</li>
                  <li>Contacto</li>
                  <li>Términos de Uso</li>
                  <li>Privacidad</li>
                </ul>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <h4 style={{ fontWeight: '600', marginBottom: '16px' }}>Contacto</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#9e9e9e', lineHeight: '2' }}>
                  <li>info@mentalhealth.com</li>
                  <li>+1 (555) 123-4567</li>
                  <li>Disponible 24/7</li>
                </ul>
              </Col>
            </Row>
          </Grid>
          <Divider style={{ margin: '32px 0 16px 0', borderColor: '#424242' }} />
          <div style={{ textAlign: 'center', color: '#9e9e9e' }}>
            <p>&copy; 2025 MentalHealth. Todos los derechos reservados.</p>
          </div>
        </Content>
      </Container>
    </Footer>
  );
};

export default FooterPage;