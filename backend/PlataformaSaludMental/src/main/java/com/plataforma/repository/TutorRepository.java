package com.plataforma.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plataforma.model.Tutor;

public interface TutorRepository extends JpaRepository<Tutor, Long> {

    Optional<Tutor> findByEmail(String email);
}
