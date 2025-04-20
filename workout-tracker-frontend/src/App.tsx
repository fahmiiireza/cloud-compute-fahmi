import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ManageUnitsPage from "./pages/Unit";

function App() {
  console.log("App component is rendering...");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/add-unit" element={<ManageUnitsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
