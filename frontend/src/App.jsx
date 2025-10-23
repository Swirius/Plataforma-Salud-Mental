import { Routes, Route } from "react-router-dom";
import RouterPublic from "./Routers/RouterPublic";
import RouterUsers from "./Routers/RouterUsers";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<RouterPublic />} />
      <Route path="/user/*" element={<RouterUsers />} />
    </Routes>
  );
}

export default App;
