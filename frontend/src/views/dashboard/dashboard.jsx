import { useState } from "react";

import {
  Button,
  Avatar,
  Badge,
  Card,
  Container,
  Row,
  Col,
  Nav,
} from "rsuite";

import { FaRegHeart } from "react-icons/fa";
// import { FiShield } from "react-icons/fi";
import { GoCalendar, GoBell, GoSearch } from "react-icons/go";

import { FiMessageCircle } from "react-icons/fi";
import { BsGear } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { PiSignOutBold } from "react-icons/pi";
import NavBar from "../../components/Navbar/Navbar";

import { Link } from "react-router-dom";


export default function Dashboard() {
  const [user] = useState({
    name: "María González",
    email: "maria@email.com",
    type: "patient",
    avatar: "/woman-profile.png",
  });

  const upcomingAppointments = [
    {
      id: 1,
      professional: "Dr. Ana Martínez",
      specialty: "Psicología Clínica",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "Virtual",
      avatar: "/female-doctor.png",
    },
    {
      id: 2,
      professional: "Dr. Carlos Ruiz",
      specialty: "Psiquiatría",
      date: "2024-01-18",
      time: "2:30 PM",
      type: "Presencial",
      avatar: "/male-doctor.png",
    },
  ];

  const recentMessages = [
    {
      id: 1,
      from: "Dr. Ana Martínez",
      message: "Hola María, recuerda completar el ejercicio que discutimos...",
      time: "2 horas",
      unread: true,
    },
    {
      id: 2,
      from: "Dr. Carlos Ruiz",
      message: "Los resultados de tu evaluación están listos...",
      time: "1 día",
      unread: false,
    },
  ];

  return (

    <>
      <NavBar />
      <div style={{ minHeight: "100vh", background: "#f7f7f7" }}>
        {/* Header */}
        {/* <header style={{ background: "#fff", borderBottom: "1px solid #ddd", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
       
      </header> */}

        <Container style={{ padding: "20px" }}>
          {/* Welcome Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <h2>Hola !!</h2>
            {/* <h2>Bienvenida, {user.name.split(" ")[0]}</h2> */}
            <p>Aquí tienes un resumen de tu actividad y próximas citas</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Avatar src={user.avatar} alt={user.name} circle />
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* <span>{user.name}</span>
              <span style={{ fontSize: 12, color: "#666" }}>{user.email}</span> */}
              </div>
            </div>

          </div>

          <Nav>
            {/* Quick Actions */}
            <Row gutter={[20, 16]} style={{ marginBottom: "20px", padding: "2rem" }}>
              <Col xs={6}>
                <Card bordered>
                  <div style={{ textAlign: "center", padding: "0.7rem" }}>
                    <p>Encuentra nuevos especialistas</p>
                    <Nav.Item style={{ margin: "1rem" }} as={Link} to="/user/professionalsPage">
                      <GoSearch style={{ fontSize: 32, color: "#007bff" }} />
                      <h4> Buscar Profesionales</h4>
                    </Nav.Item>

                  </div>
                </Card>
              </Col>
              <Col xs={6}>
                <Card bordered>
                  <div style={{ textAlign: "center", padding: "1rem" }}>
                    <p>Ver todas las citas</p>
                    <Nav.Item style={{ margin: "1rem" }} as={Link} to="/user/mis_citas">
                      <GoCalendar style={{ fontSize: 32, color: "#28a745" }} />
                      <h4>Mis Citas</h4>
                    </Nav.Item>

                  </div>
                </Card>
              </Col>
              <Col xs={6}>
                <Card bordered>
                  <div style={{ textAlign: "center", padding: "0.7rem" }}>
                    <p>Comunicación directa</p>
                    <Nav.Item style={{ margin: "1rem" }} as={Link} to="/user/mensages">
                      <FiMessageCircle style={{ fontSize: 32, color: "#6f42c1" }} />
                      <h4>Mensajes</h4>
                    </Nav.Item>
                  </div>
                </Card>
              </Col>
              <Col xs={6}>
                <Card bordered>
                  <div style={{ textAlign: "center", padding: "1rem" }}>
                    <FaRegHeart style={{ fontSize: 32, color: "#dc3545" }} />
                    <h4>Mi Bienestar</h4>
                    <p>Seguimiento personal</p>
                  </div>
                </Card>
              </Col>
            </Row>
          </Nav>

          <Row gutter={16}>
            {/* Upcoming Appointments */}
            <Col xs={16}>
              <Card>
                <h3><GoCalendar /> Próximas Citas</h3>
                <p>Tus citas programadas para los próximos días</p>
                {upcomingAppointments.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                    <GoCalendar style={{ fontSize: 40, opacity: 0.5 }} />
                    <p>No tienes citas programadas</p>
                    <Button>Buscar Profesionales</Button>
                  </div>
                ) : (
                  upcomingAppointments.map((appt) => (
                    <div key={appt.id} style={{ display: "flex", alignItems: "center", gap: "12px", border: "1px solid #ddd", borderRadius: "8px", padding: "10px", marginBottom: "10px" }}>
                      <Avatar src={appt.avatar} alt={appt.professional} circle />
                      <div style={{ flex: 1 }}>
                        <h5>{appt.professional}</h5>
                        <p style={{ margin: 0, fontSize: 12, color: "#666" }}>{appt.specialty}</p>
                        <div style={{ display: "flex", gap: "10px", marginTop: "4px", fontSize: 12, color: "#666" }}>
                          <div><GoCalendar style={{ fontSize: 14 }} /> {appt.date}</div>
                          <div><CiClock2 style={{ fontSize: 14 }} /> {appt.time}</div>
                          <Badge style={{ padding: "2px 6px" }}>{appt.type}</Badge>
                        </div>
                      </div>
                      {/* <Button appearance="default" size="sm">Ver Detalles</Button> */}
                    </div>
                  ))
                )}
              </Card>
            </Col>

            {/* Recent Messages */}
            <Col xs={8}>
              <Card>
                <h3><FiMessageCircle /> Mensajes Recientes</h3>
                <p>Comunicación con tus profesionales</p>
                {recentMessages.map((msg) => (
                  <div key={msg.id} style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <span style={{ fontWeight: 500, fontSize: 12 }}>{msg.from}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ fontSize: 10, color: "#666" }}>{msg.time}</span>
                        {msg.unread && <div style={{ width: 6, height: 6, background: "#007bff", borderRadius: "50%" }} />}
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "#666", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{msg.message}</p>
                  </div>
                ))}
                <Button appearance="default" block>Ver Todos los Mensajes</Button>
              </Card>

              {/* Quick Stats */}
              <Card style={{ marginTop: "16px" }}>
                <h4>Tu Progreso</h4>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: 12 }}>Citas Completadas</span>
                  <Badge>12</Badge>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: 12 }}>Profesionales Consultados</span>
                  <Badge>3</Badge>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12 }}>Días Activo</span>
                  <Badge>45</Badge>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>

  );
}
