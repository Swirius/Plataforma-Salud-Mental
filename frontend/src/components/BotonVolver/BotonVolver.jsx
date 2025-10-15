import { MdOutlineArrowBack } from "react-icons/md";
import { Button, Col } from "rsuite";
import { Link } from "react-router-dom";
import { Navbar, Nav, Header } from "rsuite";

const BotonVolver = () => {
  return (
    <>
      <div style={{ margin: "20px auto" }}>
        <Col xs={4}>
          <Nav>
             <Nav.Item as={Link} to="/register" ><MdOutlineArrowBack />Volver</Nav.Item>            
          </Nav>
        </Col>
      </div>
    </>
  );
};

export default BotonVolver;
