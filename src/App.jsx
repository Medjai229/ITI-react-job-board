import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Protected Routes (Normal Users) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
