import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Reports from "./pages/Reports";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Settings from "./pages/Settings.jsx";
import EMI from "./pages/EMI.jsx";
import EMIPlans from "./pages/EMIPlans.jsx";
import EMIDetails from "./pages/EMIDetails.jsx";
import Loans from "./pages/Loan.jsx";
import LoansHome from "./pages/LoansHome.jsx";
import PersonList from "./pages/PersonList.jsx";
import PersonDetails from "./pages/PersonDetails.jsx";
import AddPersonForm from "./pages/AddPersonForm.jsx";


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
              <Route path="/emi" element={<EMIPlans />} />
              <Route path="/emi/:id" element={<EMIDetails />} />
              <Route path="/loans" element={<LoansHome />} />
              <Route path="/loans/:type" element={<PersonList />} />
              <Route path="/loans/:type/:personId" element={<PersonDetails />} />
              <Route path="/loans/:type/add" element={<AddPersonForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
