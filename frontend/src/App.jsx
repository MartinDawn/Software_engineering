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
function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App;
