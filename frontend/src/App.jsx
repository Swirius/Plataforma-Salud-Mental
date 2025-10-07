import "./App.css";
import CTASection from "./components/CTASection/CTASection";
import FooterPage from "./components/Footer/Footer";

import NavBar from "./components/Navbar/Navbar";
import RouterPublic from "./Routers/RouterPublic";
import { Container} from 'rsuite';


function App() {

  return (
    <>
      <Container style={{ width: '100%' }}>
        
            <NavBar />
            
              <RouterPublic />

              <CTASection />

              <FooterPage />
       
      </Container>
    </>
  );
}

export default App;
