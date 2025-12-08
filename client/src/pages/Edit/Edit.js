import React, { useEffect, useState, useCallback, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Spiner from "../../components/spinner/Spiner";
import { singleUsergetfunc, editfunc } from "../../services/Apis";
import { useNavigate, useParams } from "react-router-dom";
import { updateData } from "../../components/context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Row from "react-bootstrap/Row";

import "./edit.css";
import { BASE_URL } from "../../services/helper";

const Edit = () => {
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
  const [imgdata, setImgdata] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  // Removed 'update' from destructuring
  const { setUpdate } = useContext(updateData);
  const navigate = useNavigate();
  const [showspin, setShowSpin] = useState(true);

  const { id } = useParams(); // Get the user ID from URL params

  // Leave type options
  const options = [
    { value: "Casual", label: "Casual" },
    { value: "Medical", label: "Medical" },
  ];

  // Set input field value dynamically
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputdata,
      [name]: name === "leaves" ? parseInt(value) : value, // Parse leaves to an integer
    });
  };

  // Set leave type value
  const setLeaveTypeValue = (selectedOption) => {
    setLeaveType(selectedOption);
  };

  // Set profile image
  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  // Fetch the user's data by ID for editing
  const userProfileGet = useCallback(async () => {
    const response = await singleUsergetfunc(id);
    if (response.status === 200) {
      setInputData(response.data);
      setLeaveType({
        value: response.data.leave_type,
        label: response.data.leave_type,
      });
      setImgdata(response.data.profile);
    } else {
      console.log("An error occurred while fetching the user!");
    }
  }, [id]);

  // Submit the updated user data
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
      data.append("user_profile", image || imgdata);
      data.append("echelon", echelon);

      const config = {
        "Content-Type": "multipart/form-data",
      };

      try {
        const response = await editfunc(id, data, config);

        if (response.status === 200) {
          setUpdate(response.data);
          navigate("/home");
          toast.success("User updated successfully!");
        } else {
          toast.error("Error updating user");
        }
      } catch (error) {
        toast.error("Error updating user");
        console.error(error);
      }
    }
  };

  useEffect(() => {
    userProfileGet(); // Fetch the user profile
  }, [id, userProfileGet]);

  // useEffect to handle image preview
  useEffect(() => {
    if (image) {
      setImgdata("");
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
        <div className="container">
          <h2 className="text-center mt-1" id="title-text">
            Update Details
          </h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile_div text-center">
              <img
                src={image ? preview : `${BASE_URL}/uploads/${imgdata}`}
                alt="hospital-staff"
                className="profile_img"
              />
            </div>
            <Form autoComplete="off">
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    value={inputdata.fname}
                    onChange={setInputValue}
                    placeholder="Enter first name"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    value={inputdata.lname}
                    onChange={setInputValue}
                    placeholder="Enter last name"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={inputdata.email}
                    onChange={setInputValue}
                    placeholder="Enter email address"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Mobile number</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={inputdata.mobile}
                    onChange={setInputValue}
                    placeholder="Enter mobile number (without country code: +94)"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Gender</Form.Label>
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    checked={inputdata.gender === "Male"}
                    onChange={setInputValue}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    checked={inputdata.gender === "Female"}
                    onChange={setInputValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select the type of leave</Form.Label>
                  <Select
                    options={options}
                    value={leave_type}
                    onChange={setLeaveTypeValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
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

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Add a profile picture</Form.Label>
                  <Form.Control
                    type="file"
                    name="user_profile"
                    onChange={setProfile}
                    placeholder="Add a profile picture"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
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
              <Button variant="primary" type="submit" onClick={submitUserData}>
                Update
              </Button>
            </Form>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
};

export default Edit;
