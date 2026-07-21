import React from "react";
import Dashboard from "./Organisms/Dashboard";
import Login from "./Organisms/Login";
import CategoryPage from "./Organisms/CategoryPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
