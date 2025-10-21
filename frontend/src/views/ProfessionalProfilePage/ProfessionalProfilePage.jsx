import { useState } from 'react';
import {
  Button,
  Panel,
  Tabs,  
  Avatar,
  Badge,
  Grid,
  Row,
  Col,        
  FlexboxGrid,
} from 'rsuite';
import {
  LuHeart,
  LuStar,
  LuMapPin,
  LuCalendar,
  LuMessageCircle,
  LuAward,
  LuClock,
  LuCircleCheckBig ,
  LuArrowLeft,
  LuGlobe,
  LuVideo,
  LuMapPin as LuMapPinIcon,
} from 'react-icons/lu';

// Mock data
const professionalData = {
  id: 1,
  name: 'Dra. Ana Martínez',
  specialty: 'Psicología Clínica',
  rating: 4.9,
  reviews: 127,
  experience: '8 años',
  location: 'Ciudad de México',
  price: '$800',
  avatar: '/female-doctor.png',
  languages: ['Español', 'Inglés'],
  modalities: ['Presencial', 'Virtual'],
  specializations: ['Ansiedad', 'Depresión', 'Terapia Cognitiva', 'Trastornos del Sueño'],
  nextAvailable: 'Mañana',
  verified: true,
  education: [
    'Doctorado en Psicología Clínica - UNAM',
    'Maestría en Terapia Cognitivo Conductual - Universidad Iberoamericana',
    'Licenciatura en Psicología - UNAM',
  ],
  certifications: [
    'Certificación en Terapia Cognitivo Conductual',
    'Especialización en Trastornos de Ansiedad',
    'Certificación en Mindfulness y Meditación',
  ],
  about:
    'Soy una psicóloga clínica con más de 8 años de experiencia ayudando a personas a superar desafíos emocionales y mentales. Mi enfoque se basa en la terapia cognitivo-conductual, combinada con técnicas de mindfulness para proporcionar herramientas prácticas y efectivas.',
  approach:
    'Mi metodología se centra en crear un espacio seguro y sin juicios donde mis pacientes puedan explorar sus pensamientos y emociones. Utilizo técnicas basadas en evidencia científica, adaptando el tratamiento a las necesidades específicas de cada persona.',
  schedule: {
    monday: '9:00 AM - 6:00 PM',
    tuesday: '9:00 AM - 6:00 PM',
    wednesday: '9:00 AM - 6:00 PM',
    thursday: '9:00 AM - 6:00 PM',
    friday: '9:00 AM - 4:00 PM',
    saturday: '10:00 AM - 2:00 PM',
    sunday: 'Cerrado',
  },
};

const reviews = [
  {
    id: 1,
    name: 'María G.',
    rating: 5,
    date: 'Hace 2 semanas',
    comment:
      'Excelente profesional. Me ayudó muchísimo con mi ansiedad. Sus técnicas son muy efectivas y siempre me sentí cómoda en las sesiones.',
  },
  {
    id: 2,
    name: 'Carlos R.',
    rating: 5,
    date: 'Hace 1 mes',
    comment:
      'La Dra. Martínez es muy empática y profesional. Sus consejos han sido fundamentales en mi proceso de recuperación.',
  },
  {
    id: 3,
    name: 'Laura H.',
    rating: 4,
    date: 'Hace 2 meses',
    comment: 'Muy buena experiencia. Las sesiones virtuales funcionaron perfectamente y siempre fue muy puntual.',
  },
];

// Helper para mostrar día en español
const getDayName = (dayKey) => {
  const days = {
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo',
  };
  return days[dayKey] || dayKey;
};

const ProfessionalProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Simulamos navegación con window.history o redirección
  const handleGoBack = () => {
    window.history.back(); // o podrías usar router si estás en un entorno con routing
  };

  const initials = professionalData.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
          <FlexboxGrid justify="space-between" align="middle">           
            <FlexboxGrid.Item>
              <Button appearance="default" onClick={handleGoBack} style={{ borderRadius: '6px' }}>
                <LuArrowLeft style={{ marginRight: '8px' }} />
                Volver a Búsqueda
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </div>
      </div>

      <div style={{ padding: '32px 16px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Professional Header */}
        <Panel shaded style={{ marginBottom: '32px', borderRadius: '12px' }}>
          <div style={{ padding: '32px' }}>
            <Grid fluid>
              <Row>
                <Col xs={24} md={8} style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <Avatar
                    circle
                    size="lg"
                    src={professionalData.avatar}
                    alt={professionalData.name}
                    style={{ width: '128px', height: '128px', margin: '0 auto 16px', backgroundColor: '#e0e7ff' }}
                  >
                    {initials}
                  </Avatar>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {professionalData.modalities.map((modality) => (
                      <Badge key={modality} color="blue">
                        {modality === 'Virtual' ? <LuVideo style={{ marginRight: '4px' }} /> : <LuMapPinIcon style={{ marginRight: '4px' }} />}
                        {modality}
                      </Badge>
                    ))}
                  </div>
                </Col>

                <Col xs={24} md={16}>
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                      <div>
                        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {professionalData.name}
                          {professionalData.verified && (
                            <Badge color="green">
                              <LuCircleCheckBig  style={{ marginRight: '4px' }} />
                              Verificado
                            </Badge>
                          )}
                        </h1>
                        <p style={{ fontSize: '20px', color: '#4096ff', fontWeight: '600', marginBottom: '12px' }}>
                          {professionalData.specialty}
                        </p>
                        <div style={{ display: 'flex', gap: '24px', color: '#666', flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <LuMapPin style={{ height: '16px', width: '16px' }} />
                            <span>{professionalData.location}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <LuAward style={{ height: '16px', width: '16px' }} />
                            <span>{professionalData.experience} de experiencia</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#059669' }}>{professionalData.price}</p>
                        <p style={{ color: '#999' }}>por sesión</p>
                      </div>
                    </div>

                    <div style={{ marginTop: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex' }}>
                          {[...Array(5)].map((_, i) => (
                            <LuStar
                              key={i}
                              style={{
                                height: '20px',
                                width: '20px',
                                color: i < Math.floor(professionalData.rating) ? '#fbbf24' : '#e5e7eb',
                              }}
                            />
                          ))}
                        </div>
                        <span style={{ fontWeight: '600', marginLeft: '8px' }}>{professionalData.rating}</span>
                        <span style={{ color: '#999' }}>({professionalData.reviews} reseñas)</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669' }}>
                        <LuClock style={{ height: '16px', width: '16px' }} />
                        <span style={{ fontWeight: '600' }}>Disponible {professionalData.nextAvailable}</span>
                      </div>
                    </div>

                    <div style={{ marginTop: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {professionalData.specializations.map((spec) => (
                        <Badge key={spec} color="blue">
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                      <Button
                        color="blue"
                        appearance="primary"
                        style={{ flex: 1, borderRadius: '8px', fontWeight: '600' }}
                        href={`/appointments/book/${professionalData.id}`}
                      >
                        <LuCalendar style={{ marginRight: '8px' }} />
                        Agendar Cita
                      </Button>
                      <Button appearance="default" style={{ flex: 1, borderRadius: '8px', fontWeight: '600' }}>
                        <LuMessageCircle style={{ marginRight: '8px' }} />
                        Enviar Mensaje
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
        </Panel>

        {/* Tabs */}
        <Tabs activeKey={activeTab} onSelect={setActiveTab} appearance="subtle">
          <Tabs.TabPane eventKey="overview" tab="Información" />
          <Tabs.TabPane eventKey="experience" tab="Experiencia" />
          <Tabs.TabPane eventKey="reviews" tab="Reseñas" />
          <Tabs.TabPane eventKey="schedule" tab="Horarios" />
        </Tabs>

        <div style={{ marginTop: '24px' }}>
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Panel shaded header="Acerca de mí">
                <p style={{ color: '#555', lineHeight: 1.6 }}>{professionalData.about}</p>
              </Panel>

              <Panel shaded header="Mi Enfoque Terapéutico">
                <p style={{ color: '#555', lineHeight: 1.6 }}>{professionalData.approach}</p>
              </Panel>

              <Panel shaded header="Idiomas">
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {professionalData.languages.map((lang) => (
                    <Badge key={lang} color="cyan">
                      <LuGlobe style={{ marginRight: '4px' }} />
                      {lang}
                    </Badge>
                  ))}
                </div>
              </Panel>
            </div>
          )}

          {activeTab === 'experience' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Panel shaded header="Educación">
                <ul style={{ paddingLeft: '20px', lineHeight: 1.8 }}>
                  {professionalData.education.map((edu, i) => (
                    <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <LuAward style={{ color: '#4096ff', marginTop: '4px' }} />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </Panel>

              <Panel shaded header="Certificaciones">
                <ul style={{ paddingLeft: '20px', lineHeight: 1.8 }}>
                  {professionalData.certifications.map((cert, i) => (
                    <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <LuCircleCheckBig  style={{ color: '#059669', marginTop: '4px' }} />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
          )}

          {activeTab === 'reviews' && (
            <Panel shaded header={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Reseñas de Pacientes</span>
                <Badge color="blue">{professionalData.reviews} reseñas</Badge>
              </div>
            }>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {reviews.map((review) => (
                  <div key={review.id} style={{ paddingBottom: '24px', borderBottom: '1px solid #eee' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <Avatar circle size="sm" style={{ backgroundColor: '#e0e7ff' }}>
                          {review.name[0]}
                        </Avatar>
                        <div>
                          <p style={{ fontWeight: '600', margin: 0 }}>{review.name}</p>
                          <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>{review.date}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex' }}>
                        {[...Array(5)].map((_, i) => (
                          <LuStar
                            key={i}
                            style={{
                              height: '16px',
                              width: '16px',
                              color: i < review.rating ? '#fbbf24' : '#e5e7eb',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <p style={{ color: '#555' }}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </Panel>
          )}

          {activeTab === 'schedule' && (
            <Panel shaded header={
              <div>
                <h3 style={{ margin: 0, fontWeight: '600' }}>Horarios de Atención</h3>
                <p style={{ margin: 0, color: '#999', fontSize: '14px' }}>Horarios disponibles para citas</p>
              </div>
            }>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {Object.entries(professionalData.schedule).map(([day, hours]) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
                    <span style={{ fontWeight: '600' }}>{getDayName(day)}</span>
                    <span style={{ color: hours === 'Cerrado' ? '#999' : '#059669' }}>{hours}</span>
                  </div>
                ))}
              </div>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfilePage;