import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Link } from 'react-router-dom';
import Report from "./components/Report";
import Manage from "./components/Manage";
import PrintHistory from "./components/PrintHis";
import './styles/Manage.css';
import ProtectedRoute from "./components/ProtectedRoute";
  
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={
                <Manage />
            }
          />
          <Route path="/manage" element={<Manage />} />
          <Route path="/printhistory" element={<PrintHistory />} />
          <Route path="/report" element={<Report />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
