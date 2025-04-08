import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  console.log("App component is rendering...");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} /> 
      </Routes>
    </Router>
  );
}

export default App;
