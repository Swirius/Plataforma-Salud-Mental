// src/pages/EmailVerification.js
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Message, Button, Loader, Container, Header, Panel } from 'rsuite';
import NavBar from '../../components/Navbar/Navbar';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function EmailVerification() {
  const [status, setStatus] = useState('loading'); // loading | success | expired | invalid | already | checkEmail | error
  const [message, setMessage] = useState('');
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  useEffect(() => {
    // Si no hay token => pantalla de “revisá tu correo”
    if (!token) {
      setStatus('checkEmail');
      return;
    }

    // Simula verificación del token con backend
    const verifyEmail = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/auth/verify-email?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          setStatus('success');
          setMessage('Cuenta verificada correctamente.');

          // Redirigimos según rol
          setTimeout(() => {
            if (data.role === 'admin') navigate('/admin');
            else navigate('/dashboard');
          }, 2500);
        } else {
          switch (data.code) {
            case 'EXPIRED':
              setStatus('expired');
              setMessage('El enlace de verificación ha expirado. Reenviamos un nuevo correo.');
              resendVerification();
              break;
            case 'INVALID':
              setStatus('invalid');
              setMessage('El enlace no es válido. Solicitá un nuevo correo de verificación.');
              break;
            case 'ALREADY_VERIFIED':
              setStatus('already');
              setMessage('Tu cuenta ya estaba verificada.');
              setTimeout(() => navigate('/login'), 2500);
              break;
            default:
              throw new Error('Unknown status');
          }
        }
      } catch (err) {
        setStatus('error');
        setMessage('No pudimos verificar tu cuenta. Intentá más tarde.');
        console.log(err)
      }
    };

    verifyEmail();
  }, [token, navigate]);

  const resendVerification = async () => {
    setResending(true);
    try {
      const res = await fetch('/api/auth/resend-verification', { method: 'POST' });
      if (!res.ok) throw new Error();
    } catch {
      setMessage('No pudimos enviar el correo. Intentá más tarde.');
    } finally {
      setResending(false);
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return <Loader backdrop content="Verificando cuenta..." vertical />;
      case 'checkEmail':
        return (
          <Panel bordered className="text-center p-6" style={{ margin: "5em" }}>
            <h4>Revisá tu correo 📩</h4>
            <p style={{ margin: "2em" }}>Te enviamos un enlace de verificación. Hacé clic en él para activar tu cuenta.</p>
            <Button appearance="primary" onClick={resendVerification} loading={resending}>
              Reenviar correo
            </Button>
          </Panel>
        );
      default:
        return (
          <Panel bordered className="text-center p-6 " style={{ margin: "5em" }} >
            <Message showIcon type={status === 'success' ? 'success' : 'warning'}>
              {message}
            </Message>
            {(status === 'invalid' || status === 'expired') && (
              <Button
                appearance="primary"
                onClick={resendVerification}
                loading={resending}
                className="mt-3"
              >
                Reenviar correo
              </Button>
            )}
          </Panel>

        );
    }
  };

  return (
    <>
      <NavBar />
    <Container style={{ marginTop: "2em" }}>
      <Header className="text-center mb-4">
        <h2>Verificación de Email</h2>
      </Header>
      {renderContent()}
    </Container>
    </>
  );
}
