import { Routes, Route } from "react-router-dom";
import Login from "../views/Login/Login";
import RegistroDelprofesional from "../views/RegistroDelprofesional/RegistroDelprofesional";
import EditProfileForm from "../views/EditProfileForm/EditProfileForm";
import RegistroDelConsultante from "../views/RegistroDelConsultante/RegistroDelConsultante"
import Home from '../views/Home/Home';
import RegisterPage from "../views/RegisterPage/RegisterPage";




function RouterPublic() {    

  return (

    <Routes>                    
      <Route path="/" element={<Home />} />    
      <Route path="/login" element={<Login />} />         
      <Route path="/register" element={<RegisterPage />} /> 
      <Route path="/register-profesional" element={<RegistroDelprofesional />} />      
      <Route path="/register-consultante" element={<RegistroDelConsultante />} />  
      <Route path="/edit-profile-form" element={<EditProfileForm />} />

          
      <Route path="*" element={<h2>Pagina no encontrada</h2>} />                          
    </Routes>

  );

}

export default RouterPublic;
