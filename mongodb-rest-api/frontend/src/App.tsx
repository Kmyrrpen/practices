import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </div>
  );
}

export default App;
