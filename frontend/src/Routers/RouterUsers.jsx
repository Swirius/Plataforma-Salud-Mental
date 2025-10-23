import { Routes, Route } from "react-router-dom";

import ProtectedRoute from '../Components/utils/ProtectedRoute';

import Login from "../views/Login/Login";
import EditProfileForm from "../views/EditProfileForm/EditProfileForm";

import Dashboard from "../views/dashboard/dashboard";
import Mensages from "../views/Mensages/Mensages";
import ProfessionalProfilePage from "../views/ProfessionalProfilePage/ProfessionalProfilePage";
import EmailVerification from "../views/EmailVerification/EmailVerification";
import ProfessionalsPage from "../views/ProfessionalsPage/ProfessionalsPage";
import MisCitas from "../views/MisCitas/MisCitas";



function RouterUsers() {    
  return (
    
      <Routes>     
        <Route path="login" element={<Login />} />
        
        
        <Route path="edit-profile-form" element={
          <ProtectedRoute>
            <EditProfileForm />
          </ProtectedRoute>
        } />

         <Route path="dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="mensages" element={
          <ProtectedRoute>
            <Mensages />
          </ProtectedRoute>
        } />
         <Route path="professionalProfilePage" element={
          <ProtectedRoute>
            <ProfessionalProfilePage />
          </ProtectedRoute>
        } />
          <Route path="emailVerification" element={
          <ProtectedRoute>
            <EmailVerification />
          </ProtectedRoute>
        } />

          <Route path="professionalsPage" element={
          <ProtectedRoute>
            <ProfessionalsPage />
          </ProtectedRoute>
        } />

        <Route path="miscitas" element={
          <ProtectedRoute>
            <MisCitas />
          </ProtectedRoute>
        } />

        
                     
      </Routes>            
    
  );
}

export default RouterUsers;
