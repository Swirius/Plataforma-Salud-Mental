import { Navbar, Nav, Button, Header } from "rsuite";
// import CogIcon from "@rsuite/icons/legacy/Cog";
import { Link,  useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

import { useContext } from "react";
import { UserContext } from "../../context/userContext";


const NavBar = () => {

  const { vaciarNCliente, NCliente } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    vaciarNCliente();
    navigate("/");
  };


  return (
    <>
    <Header>              

      <Navbar>
        <Navbar.Brand as={Link} to="/" style={{ fontSize: '24px', fontWeight: 'bold' }}>
          <FaRegHeart color="blue" size={"25px"} />  MentalHealth
        </Navbar.Brand>

        {NCliente == "0" ? (       

        <Nav pullRight>
          <Nav.Item as={Link} to="/login">
                    <Button appearance="ghost">
                      Iniciar Sesión
                    </Button>
           </Nav.Item>
           <Nav.Item as={Link} to="/register">
                    <Button appearance="primary" style={{backgroundColor:"#171717" , color:"#ffff", padding:"10px" , width:"10rem" }} >
                      Registrarse
                    </Button>
           </Nav.Item> 
        </Nav>


        ) : (
       <Nav>          
           {/* <Nav.Item as={Link} to="/emailVerification">Verificacion e-mail</Nav.Item>            */}
           <Nav.Item as={Link} to="/user/dashboard">Dashboard</Nav.Item>            
           <Nav.Item as={Link} to="/user/mensages">Mensages</Nav.Item>           
            <Nav.Item as={Link} to="/user/miscitas">Mis citas</Nav.Item>           
           
          
            <Nav.Item as={Link} to="/user/professionalsPage">Lista de Profesionales</Nav.Item>
            
             <Nav.Menu title="Perfil">
              <Nav.Item as={Link} to="/user/professionalProfilePage">Ver Perfil del Profesional</Nav.Item>
              <Nav.Item as={Link} to="/user/edit-profile-form">Edit Perfil</Nav.Item>
              </Nav.Menu>

          <Nav pullRight>
          <Button 
                      onClick={handleLogout} 
                      appearance="primary"                     
                      style={{backgroundColor:"#171717" , color:"#ffff", padding:"5px" , width:"10rem", margin: "10px" }} >
                        Salir
                    </Button>
           </Nav>
        </Nav>
        )}
      </Navbar>

      </Header>
    </>
  );
};

export default NavBar;
