import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Reports from "./pages/Reports";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Settings from "./pages/Settings.jsx";


function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Navbar />  
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
               <Route path="/income" element={<Income />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} /> 
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
