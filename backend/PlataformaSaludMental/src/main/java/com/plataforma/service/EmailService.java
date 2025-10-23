package com.plataforma.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Value("${spring.mail.username}")
    private String remitente;

    public void verificarCorreo(String destinatario, String token) {
        String asunto = "Verifica tu cuenta";
        String url = "http://localhost:8080/profesional/verificar?token=" + token;
        String texto = "Haz clic en el siguiente enlace para verificar tu cuenta: " + url;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(remitente);
        message.setTo(destinatario);
        message.setSubject(asunto);
        message.setText(texto);
        emailSender.send(message);
    }

}
