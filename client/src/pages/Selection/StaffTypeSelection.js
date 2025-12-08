import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./staff-type.css";

const StaffTypeSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="staff-selection-container d-flex flex-column align-items-center">
      <div className="profile_div text-center">
        <img src="/hospital-staff.jpg" alt="hospital-staff" />
      </div>
      <h2 className="text-center mt-5">Select the type of health staff</h2>
      <div className="d-flex flex-column align-items-center mt-5">
        <Button
          variant="primary"
          className="mb-3"
          onClick={() => navigate("/add-doctor")}
          style={{ width: "200px" }} // Optional: Set a fixed width for consistency
        >
          Add Doctor
        </Button>
        <Button
          variant="secondary"
          className="mb-3"
          onClick={() => navigate("/add-major-staff")}
          style={{ width: "200px" }} // Optional: Set a fixed width for consistency
        >
          Add Major Staff
        </Button>
        <Button
          variant="success"
          className="mb-3"
          onClick={() => navigate("/add-minor-staff")}
          style={{ width: "200px" }} // Optional: Set a fixed width for consistency
        >
          Add Minor Staff
        </Button>
      </div>
    </div>
  );
};

export default StaffTypeSelection;
