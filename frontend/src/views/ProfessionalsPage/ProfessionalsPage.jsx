import React, { useState } from "react";
import {
  Button,
  Input,
  SelectPicker,
  Panel,
  Tag,
  Avatar,
  IconButton,
  Divider,
} from "rsuite";
import { Calendar, Search, Message, Star } from "@rsuite/icons";
import NavBar from "../../components/Navbar/Navbar";

// Mock data for professionals
const professionals = [
  {
    id: 1,
    name: "Dra. Ana Martínez",
    specialty: "Psicología Clínica",
    rating: 4.9,
    reviews: 127,
    experience: "8 años",
    location: "Ciudad de México",
    price: "$800",
    avatar: "/female-doctor.png",
    languages: ["Español", "Inglés"],
    modalities: ["Presencial", "Virtual"],
    specializations: ["Ansiedad", "Depresión", "Terapia Cognitiva"],
    nextAvailable: "Mañana",
    verified: true,
  },
  {
    id: 2,
    name: "Dr. Carlos Ruiz",
    specialty: "Psiquiatría",
    rating: 4.8,
    reviews: 89,
    experience: "12 años",
    location: "Guadalajara",
    price: "$1200",
    avatar: "/male-doctor.png",
    languages: ["Español"],
    modalities: ["Presencial", "Virtual"],
    specializations: ["Trastornos del Ánimo", "Medicación", "Psicosis"],
    nextAvailable: "En 3 días",
    verified: true,
  },
  {
    id: 3,
    name: "Dra. Laura Hernández",
    specialty: "Terapia Familiar",
    rating: 4.7,
    reviews: 156,
    experience: "6 años",
    location: "Monterrey",
    price: "$900",
    avatar: "/female-therapist.png",
    languages: ["Español", "Francés"],
    modalities: ["Presencial"],
    specializations: ["Terapia de Pareja", "Conflictos Familiares", "Adolescentes"],
    nextAvailable: "En 1 semana",
    verified: true,
  },
  {
    id: 4,
    name: "Dr. Miguel Torres",
    specialty: "Psicología Infantil",
    rating: 4.9,
    reviews: 203,
    experience: "10 años",
    location: "Ciudad de México",
    price: "$750",
    avatar: "/male-therapist.png",
    languages: ["Español", "Inglés"],
    modalities: ["Presencial", "Virtual"],
    specializations: ["TDAH", "Autismo", "Desarrollo Infantil"],
    nextAvailable: "Hoy",
    verified: true,
  },
];

export default function ProfessionalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedModality, setSelectedModality] = useState(null);
  const [filteredProfessionals, setFilteredProfessionals] = useState(professionals);
  const [showFilters, setShowFilters] = useState(false);

  const specialties = ["Psicología Clínica", "Psiquiatría", "Terapia Familiar", "Psicología Infantil"];
  const locations = ["Ciudad de México", "Guadalajara", "Monterrey", "Puebla"];
  const modalities = ["Presencial", "Virtual"];

  const handleSearch = () => {
    let filtered = professionals;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.specialty.toLowerCase().includes(term) ||
          p.specializations.some((spec) => spec.toLowerCase().includes(term))
      );
    }

    if (selectedSpecialty) {
      filtered = filtered.filter((p) => p.specialty === selectedSpecialty);
    }

    if (selectedLocation) {
      filtered = filtered.filter((p) => p.location === selectedLocation);
    }

    if (selectedModality) {
      filtered = filtered.filter((p) => p.modalities.includes(selectedModality));
    }

    setFilteredProfessionals(filtered);
  };

  return (

    <>
    <NavBar />
    <div style={{ padding: 20 }}>
      <h2>Encuentra tu Profesional Ideal</h2>

      {/* Search */}
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <Input
          placeholder="Buscar por nombre, especialidad o tratamiento..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <Button onClick={handleSearch} appearance="primary">
          <Search /> Buscar
        </Button>
        <Button appearance="default" onClick={() => setShowFilters(!showFilters)}>
          Filtros
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <SelectPicker
            data={[{ label: "Todas las especialidades", value: null }, ...specialties.map(s => ({ label: s, value: s }))]}
            style={{ width: 200 }}
            value={selectedSpecialty}
            onChange={setSelectedSpecialty}
          />
          <SelectPicker
            data={[{ label: "Todas las ubicaciones", value: null }, ...locations.map(l => ({ label: l, value: l }))]}
            style={{ width: 200 }}
            value={selectedLocation}
            onChange={setSelectedLocation}
          />
          <SelectPicker
            data={[{ label: "Todas las modalidades", value: null }, ...modalities.map(m => ({ label: m, value: m }))]}
            style={{ width: 200 }}
            value={selectedModality}
            onChange={setSelectedModality}
          />
        </div>
      )}

      <Divider />

      {/* Professional Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {filteredProfessionals.length === 0 && (
          <div>No se encontraron profesionales. Ajusta tus filtros.</div>
        )}
        {filteredProfessionals.map((prof) => (
          <Panel key={prof.id} bordered style={{ width: 300 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <Avatar src={prof.avatar} circle />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <strong>{prof.name}</strong>
                  {prof.verified && <Tag color="green">Verificado</Tag>}
                </div>
                <div>{prof.specialty}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Star /> {prof.rating} ({prof.reviews})
                </div>
                
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 5 }}>
                  {prof.specializations.slice(0, 3).map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                  {prof.modalities.map((m) => (
                    <Tag key={m}>{m}</Tag>
                  ))}
                </div>
                <div style={{ marginTop: 5 }}>
                  Disponible: <strong>{prof.nextAvailable}</strong>
                </div>
                <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
                  <Button appearance="ghost" block>
                    Ver Perfil
                  </Button>
                  <Button appearance="primary" block>
                    <Calendar /> Agendar Cita
                  </Button>
                  <IconButton icon={<Message />} circle />
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
    
    </>



  );
}
