import { Link } from "react-router-dom";

import { FiShield } from "react-icons/fi";
import { GoCalendar } from "react-icons/go";
import { FiMessageCircle } from "react-icons/fi";


import {
  Container,  
  Content,
  Grid,
  Row,
  Col,  
  Panel,  
} from 'rsuite';

import NavBar from "../../components/Navbar/Navbar";
import CTASection from "../../components/CTASection/CTASection";
import FooterPage from "../../components/Footer/Footer";


const FeatureCard = ({ icon, title, description }) => (
  <Panel header={
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
      <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--rs-bg-hover)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
    </div>
  } bordered>
    <h3 style={{ textAlign: 'center', marginBottom: '8px' }}>{title}</h3>
    <p style={{ textAlign: 'center' }}>{description}</p>
  </Panel>
);


export default function Home() {
  return (
    <Container>        
      <NavBar />
      <Content style={{ padding: '32px', backgroundColor: "#EEF4FF" }}>
        <Grid fluid>
          <Row>
            <Col xs={24} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>
                Encuentra el apoyo que necesitas para tu bienestar mental
              </h1>
              <p style={{ fontSize: '20px', color: "#717273" }}>
                Conecta con psicólogos, psiquiatras y terapeutas certificados. Agenda citas, comunícate de forma segura y comienza tu camino hacia el bienestar.
              </p>
            </Col>
          </Row>
          
          <Row gutter={32}>
            <Col xs={24} md={8} style={{ marginBottom: '32px' }}>
              <FeatureCard

                icon={<FiShield size={"3em"} color="blue" />}
                title="Profesionales Verificados"
                description="Todos nuestros profesionales están debidamente registrados y verificados."
              />
            </Col>
            <Col xs={24} md={8} style={{ marginBottom: '32px' }}>
              <FeatureCard
                icon={<GoCalendar  size={"3em"} color="green" />}
                title="Seguridad y Privacidad"
                description="Tu información está protegida con los más altos estándares de seguridad."
              />
            </Col>
            <Col xs={24} md={8} style={{ marginBottom: '32px' }}>
              <FeatureCard
                icon={<FiMessageCircle size={"3em"} style={{color:"#9810FA"}} />}
                title="Conexión Personalizada"
                description="Te ayudamos a encontrar el profesional que mejor se adapte a tus necesidades."
              />
            </Col>
          </Row>
        </Grid>

        <CTASection />
        <FooterPage />

      </Content>
    </Container>
  );
}