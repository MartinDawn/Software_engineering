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
import Navbarhome from "./layouts/Navbar/Navbarhome";
import Print from "./components/student-PrinterDocument";
import PaymentHistory from "./components/student-payment-history";
import PaperBuying from "./components/student-paperBuying";
import SPrintHistory from "./components/student-history-print";
import Navbarst from "./layouts/Navbar/NavSt";
import NavbarMg from "./layouts/Navbar/NavMg";
import Logout from "./components/Logout";
import ScheduleUpdate from "./components/ChangeDefaultPage";

function App() {
  return (
    <BrowserRouter>
        <div className="main-content">
          <Routes>
          <Route
            path="/"
            element={
              <div id="root">
              <Navbarhome/>
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
            <Route path="/student-PrintDocument" element={<Print/>} />
            <Route path="/sprintHistory" element={<SPrintHistory/>} />
            <Route path="/paymentHistory" element={<PaymentHistory/>} />
            <Route path="/paperBuying" element={<PaperBuying/>} />
            <Route path="/student" element={<Navbarst/>} />
            <Route path="/manager" element={<Navbar/>} />
            <Route path="/SPSO" element={<NavbarMg/>} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/modifydefaultpages" element={<ScheduleUpdate />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
