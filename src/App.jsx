import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Customer from "./Pages/Customer/Customer";
import Doctor from "./Pages/Doctor/Doctor";
import './App.css'
import Animal from "./Pages/Animal/Animal";
import Appointment from "./Pages/Appointment/Appointment";
import AvailableDate from "./Pages/AvailableDate/AvailableDate";
import Vaccine from "./Pages/Vaccine/Vaccine";
import Navbar from "./Components/Navbar/Navbar";
import Report from "./Pages/Report/Report";


function App() {


  return (
   
    <>
     <Navbar />
     <Routes>
      <Route path="/" element={<Home />} />
     <Route path="/doctor" element={<Doctor />} />  
     <Route path="/customer" element={<Customer />} />
      <Route path="/animal" element={<Animal />} />
     <Route path="/appointment" element={<Appointment />} />
     <Route path="/availabledate" element={<AvailableDate />} />
     <Route path="/vaccine" element={<Vaccine />} />
     <Route path="/report" element={<Report />} />

      </Routes>
  
    </>
   
  )
}

export default App
