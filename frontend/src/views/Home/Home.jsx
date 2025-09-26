import { Link } from "react-router-dom";

import { BsCheck2Circle } from "react-icons/bs";
import { LuLockKeyhole } from "react-icons/lu";
import { IoIosPeople } from "react-icons/io";


import {
  Container,
  
  Content,
  Grid,
  Row,
  Col,
  Nav,
  Button,
  Panel,
  Placeholder,
} from 'rsuite';
import NavBar from "../../components/Navbar/Navbar";



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
      
      <Content style={{ padding: '32px' }}>
        <Grid fluid>
          <Row>
            <Col xs={24} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>
                Conecta con el profesional de salud mental adecuado
              </h1>
              <p style={{ fontSize: '20px', color: 'var(--rs-gray-600)' }}>
                Una plataforma segura y confiable donde consultantes pueden encontrar y conectar con profesionales especializados en salud mental.
              </p>
            </Col>
          </Row>
          
          <Row gutter={32}>
            <Col xs={24} md={8} style={{ marginBottom: '32px' }}>
              <FeatureCard

                icon={<BsCheck2Circle size={"3em"} color="blue" />}
                title="Profesionales Verificados"
                description="Todos nuestros profesionales están debidamente registrados y verificados."
              />
            </Col>
            <Col xs={24} md={8} style={{ marginBottom: '32px' }}>
              <FeatureCard
                icon={<LuLockKeyhole size={"3em"} color="green" />}
                title="Seguridad y Privacidad"
                description="Tu información está protegida con los más altos estándares de seguridad."
              />
            </Col>
            <Col xs={24} md={8} style={{ marginBottom: '32px' }}>
              <FeatureCard
                icon={<IoIosPeople size={"3em"} color="orange" />}
                title="Conexión Personalizada"
                description="Te ayudamos a encontrar el profesional que mejor se adapte a tus necesidades."
              />
            </Col>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
}