
import { useState, createContext } from "react";



export const UserContext = createContext({
                      NCliente: '0',                     
})


export const UserProvider = ({children}) => {
           
        //    const [NCliente, setNCliente] = useState('0');   
                              
        
        const storedNCliente = localStorage.getItem("NCliente") || '0';
        const [NCliente, setNCliente] = useState(storedNCliente);
        console.log("Numero de cliente: " , NCliente)           

                const updateNCliente = (newNCliente) => {
                setNCliente(newNCliente);
                localStorage.setItem("NCliente", newNCliente);
                };

                const vaciarNCliente = () => {
                setNCliente('0');
                localStorage.removeItem("NCliente");
                };



           
           return(
                      <UserContext.Provider value={{NCliente, updateNCliente, vaciarNCliente}}>
                                 {children}
                      </UserContext.Provider>
           )



}


