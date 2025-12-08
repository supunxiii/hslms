import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/headers/Headers";
import Welcome from "./pages/Welcome/Welcome";
import Home from "./pages/Home/Home";
import StaffTypeSelection from "./pages/Selection/StaffTypeSelection";
import Doctor from "./pages/Register/Doctor";
import MinorStaff from "./pages/Register/MinorStaff";
import MajorStaff from "./pages/Register/MajorStaff";
import Edit from "./pages/Edit/Edit";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/select-staff-type" element={<StaffTypeSelection />} />
        <Route path="/add-doctor" element={<Doctor />} />
        <Route path="/add-major-staff" element={<MajorStaff />} />
        <Route path="/add-minor-staff" element={<MinorStaff />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/userprofile/:id" element={<Profile />} />
        <Route path="/analyse" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
