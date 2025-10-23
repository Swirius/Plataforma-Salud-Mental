import React, { useState } from "react";
import {
  Button,
  ButtonToolbar,
  Panel,
  FlexboxGrid,
  Avatar,
  Form,
  Input,
  Message,
  Divider,
  SelectPicker,
  Checkbox,
  DatePicker
} from "rsuite";

import {
  FaArrowLeft,
  FaHeart,
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaVideo,
  FaStar,
  FaCreditCard,
  FaCheckCircle
} from "react-icons/fa";
import NavBar from "../../components/Navbar/Navbar";

const professional = {
  id: 1,
  name: "Dra. Ana Martínez",
  specialty: "Psicología Clínica",
  rating: 4.9,
  reviews: 127,
  price: "$800",
  avatar: "https://i.ibb.co/k8b4P5n/female-doctor.png",
  modalities: ["Presencial", "Virtual"],
  specializations: ["Ansiedad", "Depresión", "Terapia Cognitiva"],
  nextAvailable: "Mañana",
};

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

export default function BookAppointmentPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedModality, setSelectedModality] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [notes, setNotes] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleBooking = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 2000);
  };

  const handlePayment = () => setStep(3);

  // =============================
  // STEP 4: Confirmación
  // =============================
  if (step === 4) {
    return (
      <>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f7f9fc",
          }}
        >
          <Panel bordered shaded style={{ maxWidth: 400, textAlign: "center", padding: 30 }}>
            <FaCheckCircle size={64} color="green" style={{ marginBottom: 10 }} />
            <h3>¡Cita Agendada!</h3>
            <p>
              Tu cita con {professional.name} ha sido confirmada para el{" "}
              {selectedDate?.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              a las {selectedTime}.
            </p>
            <ButtonToolbar>
              <Button appearance="primary">Ver Mis Citas</Button>
              <Button appearance="ghost">Ir al Dashboard</Button>
            </ButtonToolbar>
          </Panel>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div style={{ minHeight: "100vh", background: "#f7f9fc" }}>

        <FlexboxGrid justify="center" style={{ padding: "40px 20px" }}>
          <FlexboxGrid.Item colspan={22} md={16}>
            <FlexboxGrid justify="space-between" align="top">
              {/* Sidebar Profesional */}
              <FlexboxGrid.Item colspan={24} md={8}>
                <Panel bordered shaded style={{ position: "sticky", top: 100 }}>
                  <h5>Resumen de la Cita</h5>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <Avatar circle src={professional.avatar} alt={professional.name} />
                    <div>
                      <b>{professional.name}</b>
                      <div style={{ color: "#3498ff" }}>{professional.specialty}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <FaStar color="gold" />
                        <small>
                          {professional.rating} ({professional.reviews})
                        </small>
                      </div>
                    </div>
                  </div>
                  <Divider />

                  {selectedDate && selectedTime && (
                    <>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <FaCalendar />{" "}
                        {selectedDate.toLocaleDateString("es-ES", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <FaClock /> {selectedTime} (50 min)
                      </div>
                      {selectedModality && (
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {selectedModality === "Virtual" ? <FaVideo /> : <FaMapMarkerAlt />} {selectedModality}
                        </div>
                      )}
                      <Divider />
                    </>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <b>Total:</b>
                    <b style={{ color: "green", fontSize: 18 }}>{professional.price}</b>
                  </div>
                </Panel>
              </FlexboxGrid.Item>

              {/* Formulario principal */}
              <FlexboxGrid.Item colspan={24} md={15}>
                {step === 1 && (
                  <Panel bordered shaded header="Selecciona Fecha y Hora">
                    <p>Elegí el día y horario que mejor te quede.</p>

                    <Form fluid>
                      <Form.Group>
                        <Form.ControlLabel>Fecha</Form.ControlLabel>
                        <DatePicker oneTap value={selectedDate} onChange={setSelectedDate} block />
                      </Form.Group>

                      <Form.Group>
                        <Form.ControlLabel>Horarios disponibles</Form.ControlLabel>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              appearance={selectedTime === time ? "primary" : "ghost"}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </Form.Group>

                      <Form.Group>
                        <Form.ControlLabel>Modalidad</Form.ControlLabel>
                        <ButtonToolbar>
                          {professional.modalities.map((modality) => (
                            <Button
                              key={modality}
                              appearance={selectedModality === modality ? "primary" : "ghost"}
                              onClick={() => setSelectedModality(modality)}
                            >
                              {modality === "Virtual" ? <FaVideo /> : <FaMapMarkerAlt />} {modality}
                            </Button>
                          ))}
                        </ButtonToolbar>
                      </Form.Group>

                      <Button
                        appearance="primary"
                        block
                        disabled={!selectedDate || !selectedTime || !selectedModality}
                        onClick={() => setStep(2)}
                      >
                        Continuar
                      </Button>
                    </Form>
                  </Panel>
                )}

                {step === 2 && (
                  <Panel bordered shaded header="Detalles de la Cita">
                    <Form fluid>
                      <Form.Group>
                        <Form.ControlLabel>Tipo de Consulta</Form.ControlLabel>
                        <SelectPicker
                          data={[
                            { label: "Consulta Inicial", value: "initial" },
                            { label: "Sesión de Seguimiento", value: "followup" },
                            { label: "Evaluación Psicológica", value: "evaluation" },
                            { label: "Sesión de Terapia", value: "therapy" },
                          ]}
                          placeholder="Selecciona el tipo de consulta"
                          value={appointmentType}
                          onChange={setAppointmentType}
                          block
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.ControlLabel>Motivo de la Consulta (Opcional)</Form.ControlLabel>
                        <Input
                          as="textarea"
                          rows={4}
                          value={notes}
                          onChange={setNotes}
                          placeholder="Describe brevemente el motivo..."
                        />
                      </Form.Group>

                      <Form.Group>
                        <Checkbox checked={isFirstTime} onChange={(_, checked) => setIsFirstTime(checked)}>
                          Es mi primera vez con este profesional
                        </Checkbox>
                      </Form.Group>

                      <ButtonToolbar>
                        <Button appearance="ghost" onClick={() => setStep(1)}>
                          Atrás
                        </Button>
                        <Button appearance="primary" disabled={!appointmentType} onClick={handlePayment}>
                          Continuar al Pago
                        </Button>
                      </ButtonToolbar>
                    </Form>
                  </Panel>
                )}

                {step === 3 && (
                  <Panel bordered shaded header="Información de Pago">
                    <Message
                      type="info"
                      description="Tu información de pago está protegida con encriptación segura."
                    />

                    <Form fluid style={{ marginTop: 20 }}>
                      <Form.Group>
                        <Form.ControlLabel>Número de Tarjeta</Form.ControlLabel>
                        <Form.Control name="cardNumber" placeholder="1234 5678 9012 3456" />
                      </Form.Group>

                      <Form.Group>
                        <Form.ControlLabel>Nombre en la Tarjeta</Form.ControlLabel>
                        <Form.Control name="cardName" placeholder="Juan Pérez" />
                      </Form.Group>

                      <Form.Group>
                        <Form.ControlLabel>Fecha de Vencimiento</Form.ControlLabel>
                        <Form.Control name="expiry" placeholder="MM/AA" />
                      </Form.Group>

                      <Form.Group>
                        <Form.ControlLabel>CVV</Form.ControlLabel>
                        <Form.Control name="cvv" placeholder="123" />
                      </Form.Group>

                      <Divider />

                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>Subtotal:</span>
                        <span>{professional.price}</span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>Comisión:</span>
                        <span>$50</span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                        <span>Total:</span>
                        <span style={{ color: "green" }}>$850</span>
                      </div>

                      <ButtonToolbar style={{ marginTop: 20 }}>
                        <Button appearance="ghost" onClick={() => setStep(2)}>
                          Atrás
                        </Button>

                        <Button appearance="primary" loading={isLoading} onClick={handleBooking}>
                          Confirmar y Pagar
                        </Button>
                      </ButtonToolbar>
                    </Form>
                  </Panel>
                )}
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    </>
  );

}
