import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Spiner from "../../components/spinner/Spiner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

// Import the API function to register Major Staff
import { registerMajorStaff } from "../../services/Apis";
import { addData } from "../../components/context/ContextProvider";

import "./register.css";

const MajorStaff = () => {
  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    echelon: "",
    leaves: 0,
  });

  const [leave_type, setLeaveType] = useState({
    value: "Casual",
    label: "Casual",
  });
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [showspin, setShowSpin] = useState(true);

  const navigate = useNavigate();

  const { setUseradd } = useContext(addData);

  const options = [
    { value: "Casual", label: "Casual" },
    { value: "Medical", label: "Medical" },
  ];

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputdata,
      [name]: name === "leaves" ? parseInt(value) : value,
    });
  };

  const setLeaveTypeValue = (selectedOption) => {
    setLeaveType(selectedOption);
  };

  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  const submitUserData = async (e) => {
    e.preventDefault();

    const { fname, lname, email, mobile, gender, echelon, leaves } = inputdata;

    if (fname === "") {
      toast.error("First name is required!");
    } else if (lname === "") {
      toast.error("Last name is required!");
    } else if (email === "") {
      toast.error("Email is required!");
    } else if (!email.includes("@")) {
      toast.error("Enter a valid email!");
    } else if (mobile === "") {
      toast.error("Mobile number is required!");
    } else if (mobile.length !== 10) {
      toast.error("Enter a valid mobile number!");
    } else if (gender === "") {
      toast.error("Gender is required!");
    } else if (!leave_type.value) {
      toast.error("Type of leave is required!");
    } else if (isNaN(leaves) || leaves <= 0) {
      toast.error("Number of leaves is required and must be greater than 0!");
    } else if (leaves > 45) {
      toast.error("Number of leaves cannot exceed 45!");
    } else if (image === "") {
      toast.error("Profile picture is required!");
    } else if (echelon === "") {
      toast.error("Echelon is required!");
    } else {
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("leave_type", leave_type.value);
      data.append("leaves", leaves);
      data.append("user_profile", image);
      data.append("echelon", echelon);

      const config = {
        "Content-Type": "multipart/form-data",
      };

      const response = await registerMajorStaff(data, config);

      if (response.status === 200) {
        setInputData({
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          echelon: "",
          leaves: 0,
        });
        setLeaveType("");
        setImage("");
        setUseradd(response.data);
        navigate("/home");
      } else {
        toast.error("An error occurred while adding the staff member.");
      }
    }
  };

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [image]);

  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="staff-add-form-bg">
          <div className="staff-add-container">
            <h2 className="text-center mt-1" id="title-text">
              Add Major Staff
            </h2>
            <Card className="shadow mt-3 p-3">
              <div className="profile_div text-center">
                <img
                  src={preview ? preview : "/add-major-staff.jpg"}
                  alt="hospital-staff"
                />
              </div>
              <Form autoComplete="off">
                <Row>
                  <Form.Group className="mb-3 col-lg-6">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fname"
                      value={inputdata.fname}
                      onChange={setInputValue}
                      placeholder="Enter first name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lname"
                      value={inputdata.lname}
                      onChange={setInputValue}
                      placeholder="Enter last name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={inputdata.email}
                      onChange={setInputValue}
                      placeholder="Enter email address"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6">
                    <Form.Label>Mobile number</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile"
                      value={inputdata.mobile}
                      onChange={setInputValue}
                      placeholder="Enter mobile number (without country code: +94)"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6">
                    <Form.Label>Select Gender</Form.Label>
                    <Form.Check
                      type={"radio"}
                      label={`Male`}
                      name="gender"
                      value={"Male"}
                      onChange={setInputValue}
                    />
                    <Form.Check
                      type={"radio"}
                      label={`Female`}
                      name="gender"
                      value={"Female"}
                      onChange={setInputValue}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6">
                    <Form.Label>Select the type of leave</Form.Label>
                    <Select
                      options={options}
                      onChange={setLeaveTypeValue}
                      value={leave_type}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6">
                    <Form.Label>Number of leaves</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      max="45"
                      name="leaves"
                      value={inputdata.leaves}
                      onChange={setInputValue}
                      placeholder="Enter the number of leaves"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6">
                    <Form.Label>Add a profile picture</Form.Label>
                    <Form.Control
                      type="file"
                      name="user_profile"
                      onChange={setProfile}
                      placeholder="Add a profile picture"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6">
                    <Form.Label>Echelon</Form.Label>
                    <Form.Control
                      type="text"
                      name="echelon"
                      value={inputdata.echelon}
                      onChange={setInputValue}
                      placeholder="Enter the appropriate echelon"
                    />
                  </Form.Group>
                </Row>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={submitUserData}
                >
                  Add Major Staff Member
                </Button>
              </Form>
            </Card>
            <ToastContainer position="top-center" />
          </div>
        </div>
      )}
    </>
  );
};

export default MajorStaff;
