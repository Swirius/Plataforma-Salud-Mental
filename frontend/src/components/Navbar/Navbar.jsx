import { Navbar, Nav, Button, Header } from "rsuite";
// import CogIcon from "@rsuite/icons/legacy/Cog";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";


const NavBar = () => {
  return (
    <>
    <Header>              

      <Navbar>
        <Navbar.Brand as={Link} to="/" style={{ fontSize: '24px', fontWeight: 'bold' }}>
          <FaRegHeart color="blue" size={"25px"} />  MentalHealth
        </Navbar.Brand>

        <Nav>          
           <Nav.Item as={Link} to="/emailVerification">Verificacion e-mail</Nav.Item>           
           <Nav.Item as={Link} to="/dashboard">Dashboard</Nav.Item>            
           <Nav.Item as={Link} to="/mensages">Mensages</Nav.Item>           
          
            <Nav.Item as={Link} to="/professionalsPage">Lista de Profesionales</Nav.Item>
            <Nav.Item as={Link} to="/professionalProfilePage">Perfil del Profesional</Nav.Item>
           <Nav.Item as={Link} to="/edit-profile-form">Edit Perfil</Nav.Item>

        </Nav>

        <Nav pullRight>
          {/* <Nav.Item icon={<CogIcon />}>Settings</Nav.Item> */}          
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
      </Navbar>

      </Header>
    </>
  );
};

export default NavBar;
