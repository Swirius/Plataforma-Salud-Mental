import { Navbar, Nav, Button, Header } from "rsuite";
// import CogIcon from "@rsuite/icons/legacy/Cog";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
    <Header>              

      <Navbar>
        <Navbar.Brand as={Link} to="/" style={{ fontSize: '24px', fontWeight: 'bold' }}>
          MentalHealth
        </Navbar.Brand>

        <Nav>          
           <Nav.Item as={Link} to="/edit-profile-form">Edit Perfil</Nav.Item>
        </Nav>

        <Nav pullRight>
          {/* <Nav.Item icon={<CogIcon />}>Settings</Nav.Item> */}          
          <Nav.Item as={Link} to="/login">
                    <Button appearance="primary">
                      Iniciar Sesión
                    </Button>
           </Nav.Item>
           <Nav.Item as={Link} to="/register">
                    <Button appearance="ghost">
                      Registro del Profesional
                    </Button>
           </Nav.Item>     
            <Nav.Item as={Link} to="/register-consultante">
                    <Button appearance="ghost">
                      Registro del consultante
                    </Button>
           </Nav.Item>        
        </Nav>
      </Navbar>

      </Header>
    </>
  );
};

export default NavBar;
