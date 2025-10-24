import { Routes, Route } from "react-router-dom";

import LoginPage from '../views/LoginPage/LoginPage';
import LoginProfesional from "../views/LoginProfesional/LoginProfesional";
import LoginConsultante from '../views/LoginConsultante/LoginConsultante';

import RegistroDelprofesional from "../views/RegistroDelprofesional/RegistroDelprofesional";
import RegistroDelConsultante from "../views/RegistroDelConsultante/RegistroDelConsultante"
import Home from '../views/Home/Home';
import RegisterPage from "../views/RegisterPage/RegisterPage";
// import Dashboard from "../views/dashboard/dashboard";

// import { UserProvider } from '../context/userContext';

function RouterPublic() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login-profesional" element={<LoginProfesional />} />
      <Route path="/login-consultante" element={<LoginConsultante />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register-profesional" element={<RegistroDelprofesional />} />
      <Route path="/register-consultante" element={<RegistroDelConsultante />} />
      {/* <Route path="dashboard" element={ <Dashboard />} /> */}

      <Route path="*" element={<h2>Pagina no encontrada</h2>} />
    </Routes>
  );
}

export default RouterPublic;
