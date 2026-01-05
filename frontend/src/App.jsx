import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow p-4">
          <div className="max-w-5xl mx-auto flex justify-between">
            <Link to="/" className="font-bold">
              Daily Dose
            </Link>
            <div className="flex gap-3">
              <Link to="/favorites">Favorites</Link>
            </div>
          </div>
        </nav>
        <main className="py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
