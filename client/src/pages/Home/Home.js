import React, { useContext, useEffect, useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Tables from "../../components/tables/Tables";
import Spiner from "../../components/spinner/Spiner";
import { useNavigate } from "react-router-dom";
import {
  addData,
  dltdata,
  updateData,
} from "../../components/context/ContextProvider";
import { usergetfunc, deletefunc, exporttocsvfunc } from "../../services/Apis";
import Alert from "react-bootstrap/Alert";
import { toast } from "react-toastify";

import "./home.css";

const Home = () => {
  const [userdata, setUserData] = useState([]);
  const [showspin, setShowSpin] = useState(true);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [leave_type, setLeaveType] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [staff_type, setStaffType] = useState("All");

  const { useradd, setUseradd } = useContext(addData);
  const { update, setUpdate } = useContext(updateData);
  const { deletedata, setDLtdata } = useContext(dltdata);

  const navigate = useNavigate();

  const adduser = () => {
    navigate("/select-staff-type");
  };

  const userGet = useCallback(async () => {
    const response = await usergetfunc(
      search,
      gender,
      leave_type,
      sort,
      staff_type
    );

    if (response.status === 200) {
      setUserData(response.data);
    } else {
      console.log("Error getting user data");
    }
  }, [search, gender, leave_type, sort, staff_type]);

  // delete user
  const deleteUser = async (id) => {
    const response = await deletefunc(id);
    if (response.status === 200) {
      userGet();
      setDLtdata(response.data);
      toast.success(`User ${response.data.fname} deleted successfully`);
    } else {
      toast.error("Error deleting user");
    }
  };

  // export user
  const exportuser = async () => {
    const response = await exporttocsvfunc();
    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank");
    } else {
      toast.error("Error downloading the file. Please try again later.");
    }
  };

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [userGet]);

  return (
    <>
      {useradd ? (
        <Alert variant="success" onClose={() => setUseradd("")} dismissible>
          HOSPITAL STAFF MEMBER {useradd.fname.toUpperCase()}, SUCCESSFULLY
          ADDED
        </Alert>
      ) : (
        ""
      )}
      {update ? (
        <Alert variant="primary" onClose={() => setUpdate("")} dismissible>
          HOSPITAL STAFF MEMBER {update.fname.toUpperCase()}, SUCCESSFULLY
          UPDATED
        </Alert>
      ) : (
        ""
      )}
      {deletedata && deletedata.fname ? (
        <Alert variant="danger" onClose={() => setDLtdata("")} dismissible>
          HOSPITAL STAFF MEMBER {deletedata.fname.toUpperCase()}, SUCCESSFULLY
          DELETED
        </Alert>
      ) : (
        ""
      )}
      <div className="container">
        <div className="main_div">
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="success" className="search_btn">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
              </Form>
            </div>
            <div className="action_buttons d-flex justify-content-between">
              <Button variant="primary" onClick={adduser} className="me-2">
                <i className="fa-solid fa-plus"></i>&nbsp; Add Staff
              </Button>
              <Button className="export_btn" onClick={exportuser}>
                Export to CSV
              </Button>
            </div>
          </div>

          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="filter_staff_type">
              <p>Filter by Staff Type</p>
              <Dropdown className="text-center">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  <i className="fa-solid fa-user-md"></i> &nbsp; Staff Type
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => setStaffType("All")}
                    active={staff_type === "All"}
                  >
                    {staff_type === "All" && <i className="fa fa-check"></i>}{" "}
                    All
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setStaffType("Doctors")}
                    active={staff_type === "Doctors"}
                  >
                    {staff_type === "Doctors" && (
                      <i className="fa fa-check"></i>
                    )}{" "}
                    Doctors
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setStaffType("Major_Staff")}
                    active={staff_type === "Major_Staff"}
                  >
                    {staff_type === "Major_Staff" && (
                      <i className="fa fa-check"></i>
                    )}{" "}
                    Major Staff
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setStaffType("Minor_Staff")}
                    active={staff_type === "Minor_Staff"}
                  >
                    {staff_type === "Minor_Staff" && (
                      <i className="fa fa-check"></i>
                    )}{" "}
                    Minor Staff
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="filter_gender">
              <p>Filter by Gender</p>
              <div className="gender d-flex justify-content-between">
                <Form.Check
                  type={"radio"}
                  label={`All`}
                  name="gender"
                  value={"All"}
                  className="radio-spacing"
                  defaultChecked
                  onChange={(e) => setGender(e.target.value)}
                />
                <Form.Check
                  type={"radio"}
                  label={`Male`}
                  name="gender"
                  value={"Male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="radio-spacing"
                />
                <Form.Check
                  type={"radio"}
                  label={`Female`}
                  name="gender"
                  value={"Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </div>

            <div className="filter_newold">
              <p>Filter by Date</p>
              <Dropdown className="text-center">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  <i className="fa-solid fa-calendar-week"></i> &nbsp; Date
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => setSort("Newest")}
                    active={sort === "Newest"}
                  >
                    {sort === "Newest" && <i className="fa fa-check"></i>}{" "}
                    Newest
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setSort("Oldest")}
                    active={sort === "Oldest"}
                  >
                    {sort === "Oldest" && <i className="fa fa-check"></i>}{" "}
                    Oldest
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="filter_leave_type">
              <p>Filter by Leave Type</p>
              <div className="leave_type_radio d-flex justify-content-between flex-wrap">
                <Form.Check
                  type={"radio"}
                  label={`All`}
                  name="leave_type"
                  value={"All"}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="radio-spacing"
                  defaultChecked
                />
                <Form.Check
                  type={"radio"}
                  label={`Casual`}
                  name="leave_type"
                  value={"Casual"}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="radio-spacing"
                />
                <Form.Check
                  type={"radio"}
                  label={`Medical`}
                  name="leave_type"
                  value={"Medical"}
                  onChange={(e) => setLeaveType(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        {showspin ? (
          <Spiner />
        ) : (
          <Tables userdata={userdata} deleteUser={deleteUser} />
        )}
      </div>
      <div className="footer">
        <br />
        <br />
        <br />
        <p>developed by: supun seth xiii</p>
      </div>
    </>
  );
};

export default Home;
