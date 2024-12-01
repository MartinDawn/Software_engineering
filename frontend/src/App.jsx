import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Link } from 'react-router-dom';
import Report from "./components/Report";
import Manage from "./components/Manage";
import PrintHistory from "./components/PrintHis";
import './styles/Manage.css';
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from './layouts/Navbar/Navbar';
import Footer from './layouts/Footer/Footer';
import CreateAccPage from './app/homepage/createaccount/CreateAcc';
import BuyPermisPage from './app/homepage/buyingpermis/BuyPermis';
import ManageActPage from './app/homepage/manageactivity/ManageAct';
import ViewPaymentPage from './app/homepage/viewpayment/ViewPay';
import ViewPrintingHistory from './app/homepage/viewprint_manager/ViewPrint';
import ViewPrinterPage from './app/homepage/viewprinter/PrinterPage';
import ViewPrinterHistoryPage from './app/homepage/viewprinterhistory/ViewPrinterHis';
import Login from "./components/Login";
function App() {
  return (
    <BrowserRouter>
        <div className="main-content">
          <Routes>
          <Route
            path="/"
            element={
              <div id="root">
              <Navbar />
              </div>
            }
          />

            <Route path="/createaccount" element={<CreateAccPage />} />
            <Route path="/buyingpermis" element={<BuyPermisPage />} />
            <Route path="/manageactivity" element={<ManageActPage/>} />
            <Route path="/viewpayment" element={<ViewPaymentPage/>}/>
            <Route path="/viewprint_manager" element={<ViewPrintingHistory/>}/>
            <Route path="/viewprinter" element={<ViewPrinterPage/>}/>
            <Route path="/viewprinterhistory" element={<ViewPrinterHistoryPage />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="/printhistory" element={<PrintHistory />} />
            <Route path="/report" element={<Report />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
