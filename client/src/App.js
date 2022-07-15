import React from "react";
import { Routes, Route } from "react-router-dom";
import { Landing } from "./Components/Landing/Landing";
import { Home } from "./Components/Home/Home";
import { CardDetail } from "./Components/CardDetail/CardDetail.jsx";
import { CreateFood } from "./Components/CreateFood/CreateFood";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/CardDetail/:id" element={<CardDetail />} />
      <Route path="/CreateFood" element={<CreateFood />} />
    </Routes>
  );
}
export default App;
