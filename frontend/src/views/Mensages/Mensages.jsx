import { useState, useRef, useEffect } from 'react';
import {
  Button,
  Input,
  InputGroup,
  Avatar,
  Badge,
  Sidenav,
  Panel,
  FlexboxGrid,
  IconButton,
  Whisper,
  Tooltip,
  Divider,
} from 'rsuite';
import {
  LuHeart,
  LuSearch,
  LuSend,
  LuPaperclip,
  LuPhone,
  LuVideo,
  LuSlidersVertical,
  LuCircle,
  LuCheckCheck,
  LuCalendar,
} from 'react-icons/lu';

// Mock data (igual que antes)
const conversations = [
  {
    id: 1,
    professional: {
      name: 'Dra. Ana Martínez',
      specialty: 'Psicología Clínica',
      avatar: 'https://placehold.co/100x100/4096ff/ffffff?text=AM',
      online: true,
    },
    lastMessage: {
      text: 'Hola María, recuerda completar el ejercicio que discutimos en nuestra última sesión.',
      time: '2 horas',
      sender: 'professional',
      read: false,
    },
    unreadCount: 2,
  },
  {
    id: 2,
    professional: {
      name: 'Dr. Carlos Ruiz',
      specialty: 'Psiquiatría',
      avatar: 'https://placehold.co/100x100/17a2b8/ffffff?text=CR',
      online: false,
    },
    lastMessage: {
      text: 'Los resultados de tu evaluación están listos. ¿Podemos agendar una cita para revisarlos?',
      time: '1 día',
      sender: 'professional',
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: 3,
    professional: {
      name: 'Dra. Laura Hernández',
      specialty: 'Terapia Familiar',
      avatar: 'https://placehold.co/100x100/6f42c1/ffffff?text=LH',
      online: true,
    },
    lastMessage: {
      text: 'Perfecto, nos vemos el viernes a las 4:00 PM. Que tengas un buen día.',
      time: '3 días',
      sender: 'patient',
      read: true,
    },
    unreadCount: 0,
  },
];

const messages = [
  { id: 1, text: 'Hola María, ¿cómo te has sentido desde nuestra última sesión?', sender: 'professional', time: '10:30 AM', read: true },
  { id: 2, text: 'Hola doctora, he estado practicando los ejercicios de respiración que me enseñó.', sender: 'patient', time: '10:35 AM', read: true },
  { id: 3, text: 'Excelente, ¿has notado alguna mejora en tu nivel de ansiedad?', sender: 'professional', time: '10:36 AM', read: true },
  { id: 4, text: 'Sí, definitivamente me siento más tranquila, especialmente en las mañanas.', sender: 'patient', time: '10:40 AM', read: true },
  { id: 5, text: 'Me alegra mucho escuchar eso. Recuerda completar el ejercicio que discutimos en nuestra última sesión.', sender: 'professional', time: '2 horas', read: false },
  { id: 6, text: '¿Podrías enviarme el documento con los ejercicios adicionales que mencionaste?', sender: 'professional', time: '2 horas', read: false },
];

const ConversationItem = ({ conversation, isSelected, onClick }) => {
  const initials = conversation.professional.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Panel
      shaded={isSelected}
      bordered={isSelected}
      bodyFill
      style={{ marginBottom: '8px', cursor: 'pointer' }}
      onClick={onClick}
    >
      <FlexboxGrid align="middle" style={{ padding: '12px' }}>
        <FlexboxGrid.Item colspan={4}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              circle
              size="lg"
              src={conversation.professional.avatar}
              alt={conversation.professional.name}
              style={{ backgroundColor: '#4096ff', color: '#fff' }}
            >
              {initials}
            </Avatar>
            {conversation.professional.online && (
              <span style={{ position: 'absolute', bottom: '-4px', right: '-4px' }}>
                <LuCircle
                  style={{
                    height: '16px',
                    width: '16px',
                    fill: '#17c964',
                    stroke: '#17c964',
                    strokeWidth: 2,
                  }}
                />
              </span>
            )}
          </div>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={20}>
          <div style={{ marginLeft: '12px' }}>
            <FlexboxGrid justify="space-between" align="middle">
              <strong style={{ fontSize: '14px', color: '#333' }}>{conversation.professional.name}</strong>
              <span style={{ fontSize: '12px', color: '#999' }}>{conversation.lastMessage.time}</span>
            </FlexboxGrid>
            <div style={{ fontSize: '12px', color: '#4096ff', fontWeight: 'bold', marginBottom: '4px' }}>
              {conversation.professional.specialty}
            </div>
            <FlexboxGrid justify="space-between" align="middle">
              <span style={{ fontSize: '13px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {conversation.lastMessage.text}
              </span>
              <div>
                {conversation.lastMessage.sender === 'patient' && (
                  <LuCheckCheck style={{ height: '14px', width: '14px', color: '#4096ff', marginRight: '4px' }} />
                )}
                {conversation.unreadCount > 0 && (
                  <Badge content={conversation.unreadCount} style={{ backgroundColor: '#4096ff' }} />
                )}
              </div>
            </FlexboxGrid>
          </div>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  );
};

const MessageBubble = ({ message }) => (
  <div style={{ textAlign: message.sender === 'patient' ? 'right' : 'left', marginBottom: '12px' }}>
    <div
      style={{
        display: 'inline-block',
        maxWidth: '70%',
        padding: '12px 16px',
        borderRadius: '18px',
        background: message.sender === 'patient' ? '#4096ff' : '#fff',
        color: message.sender === 'patient' ? '#fff' : '#333',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        borderBottomRightRadius: message.sender === 'patient' ? '4px' : '18px',
        borderBottomLeftRadius: message.sender !== 'patient' ? '4px' : '18px',
        border: message.sender !== 'patient' ? '1px solid #eee' : 'none',
      }}
    >
      <div style={{ fontSize: '14px', lineHeight: 1.4 }}>{message.text}</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '4px',
          marginTop: '6px',
          fontSize: '11px',
          color: message.sender === 'patient' ? 'rgba(255,255,255,0.8)' : '#999',
        }}
      >
        {message.time}
        {message.sender === 'patient' && (
          <LuCheckCheck
            style={{
              height: '12px',
              width: '12px',
              color: message.read ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)',
            }}
          />
        )}
      </div>
    </div>
  </div>
);

const Mensages = () => {
  const messagesEndRef = useRef(null);
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.professional.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedInitials = selectedConversation?.professional.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee', padding: '16px' }}>
        <FlexboxGrid justify="space-between" align="middle">
          <FlexboxGrid.Item>
            <FlexboxGrid align="middle" gap={12}>
              <LuHeart style={{ height: '32px', width: '32px', color: '#4096ff', fill: 'rgba(64,150,255,0.1)' }} />
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#333' }}>MentalCare</h1>
            </FlexboxGrid>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <Button appearance="primary" color="blue" style={{ borderRadius: '999px', fontWeight: '600' }}>
              Mi Cuenta
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar de conversaciones */}
        <Sidenav
          style={{ width: '100%', maxWidth: '320px', height: '100%' }}
          appearance="subtle"
        >
          <Sidenav.Body>
            <div style={{ padding: '16px' }}>
              <InputGroup inside>
                <InputGroup.Addon>
                  <LuSearch style={{ color: '#999' }} />
                </InputGroup.Addon>
                <Input
                  placeholder="Buscar conversaciones..."
                  value={searchTerm}
                  onChange={setSearchTerm}
                />
              </InputGroup>
            </div>
            <Divider style={{ margin: '8px 0' }} />
            <div style={{ padding: '0 12px', overflowY: 'auto', height: 'calc(100% - 100px)' }}>
              {filteredConversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isSelected={selectedConversation?.id === conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                />
              ))}
            </div>
          </Sidenav.Body>
        </Sidenav>

        {/* Área de chat */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedConversation ? (
            <>
              {/* Header del chat */}
              <div
                style={{
                  backgroundColor: '#fff',
                  borderBottom: '1px solid #eee',
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <FlexboxGrid align="middle" gap={12}>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar
                      circle
                      size="md"
                      src={selectedConversation.professional.avatar}
                      alt={selectedConversation.professional.name}
                      style={{ backgroundColor: '#4096ff', color: '#fff' }}
                    >
                      {selectedInitials}
                    </Avatar>
                    {selectedConversation.professional.online && (
                      <span style={{ position: 'absolute', bottom: '-2px', right: '-2px' }}>
                        <LuCircle
                          style={{
                            height: '12px',
                            width: '12px',
                            fill: '#17c964',
                            stroke: '#17c964',
                            strokeWidth: 2,
                          }}
                        />
                      </span>
                    )}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>
                      {selectedConversation.professional.name}
                    </div>
                    <div style={{ fontSize: '13px', color: '#4096ff', fontWeight: 'bold' }}>
                      {selectedConversation.professional.specialty}
                    </div>
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      {selectedConversation.professional.online ? 'En línea' : 'Desconectado'}
                    </div>
                  </div>
                </FlexboxGrid>

                <div>
                  <Whisper placement="top" speaker={<Tooltip>Llamada</Tooltip>}>
                    <IconButton icon={<LuPhone />} appearance="subtle" circle />
                  </Whisper>
                  <Whisper placement="top" speaker={<Tooltip>Video</Tooltip>}>
                    <IconButton icon={<LuVideo />} appearance="subtle" circle />
                  </Whisper>
                  <Whisper placement="top" speaker={<Tooltip>Agendar cita</Tooltip>}>
                    <IconButton icon={<LuCalendar />} appearance="subtle" circle as="a" href={`/appointments/book/${selectedConversation.id}`} />
                  </Whisper>
                  <Whisper placement="top" speaker={<Tooltip>Opciones</Tooltip>}>
                    <IconButton icon={<LuSlidersVertical />} appearance="subtle" circle />
                  </Whisper>
                </div>
              </div>

              {/* Mensajes */}
              <div
                style={{
                  flex: 1,
                  padding: '24px',
                  overflowY: 'auto',
                  backgroundColor: '#f9fafb',
                }}
              >
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input de mensaje */}
              <div style={{ backgroundColor: '#fff', borderTop: '1px solid #eee', padding: '16px' }}>
                <FlexboxGrid align="middle" gap={12}>
                  <IconButton icon={<LuPaperclip />} appearance="subtle" circle />
                  <InputGroup style={{ flex: 1, borderRadius: '999px', background: '#f5f5f5' }}>
                    <Input
                      placeholder="Escribe tu mensaje..."
                      value={newMessage}
                      onChange={(value) => setNewMessage(value)}
                      style={{ border: 'none', background: 'transparent', padding: '8px 16px' }}
                    />
                    <InputGroup.Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      appearance="primary"
                      color="blue"
                      style={{
                        borderRadius: '999px',
                        minWidth: '40px',
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <LuSend style={{ height: '16px', width: '16px' }} />
                    </InputGroup.Button>
                  </InputGroup>
                </FlexboxGrid>
                <div style={{ textAlign: 'center', fontSize: '12px', color: '#999', marginTop: '8px' }}>
                  Presiona Enter para enviar. Tus mensajes están protegidos con encriptación de extremo a extremo.
                </div>
              </div>
            </>
          ) : (
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9fafb',
              }}
            >
              <Panel shaded style={{ textAlign: 'center', padding: '32px', borderRadius: '16px' }}>
                <LuHeart style={{ height: '64px', width: '64px', color: '#d0e4ff', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#555', marginBottom: '8px' }}>
                  Selecciona una conversación
                </h3>
                <p style={{ color: '#888' }}>Elige un profesional para comenzar a chatear</p>
              </Panel>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mensages;