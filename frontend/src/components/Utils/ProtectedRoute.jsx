import { Navigate  } from "react-router-dom";

import { useContext } from 'react';
import { UserContext } from "../../context/userContext";



const ProtectedRoute = ({children}) => {
 // Desestructurar updateNCliente desde el contexto
 const { NCliente  } = useContext(UserContext);
    console.log( NCliente , typeof(NCliente))

    if (NCliente!='0') {
        return children
    }else{
        return <Navigate to="/" />
    }

    
}

export default ProtectedRoute;
