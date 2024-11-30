import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
    <Router>
      <div id="root">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/createaccount" element={<CreateAccPage />} />
            <Route path="/buyingpermis" element={<BuyPermisPage />} />
            <Route path="/manageactivity" element={<ManageActPage/>} />
            <Route path="/viewpayment" element={<ViewPaymentPage/>}/>
            <Route path="/viewprint_manager" element={<ViewPrintingHistory/>}/>
            <Route path="/viewprinter" element={<ViewPrinterPage/>}/>
            <Route path="/viewprinterhistory" element={<ViewPrinterHistoryPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
