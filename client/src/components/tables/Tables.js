import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import Paginations from "../pagination/Paginations";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../services/helper";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./table.css";

const Tables = ({ userdata, deleteUser }) => {
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Store user to be deleted

  // Open modal and store user data
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Handle confirming delete
  const handleConfirmDelete = () => {
    deleteUser(selectedUser._id); // Call the delete function with the user's id
    setShowModal(false); // Close modal after deletion
  };

  return (
    <>
      <div className="container" id="table-container">
        <Row>
          <div className="col mt-0">
            <Card className="shadow">
              <Table className="align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Echelon</th>
                    <th>Mobile number (+94)</th>
                    <th>Leave type</th>
                    <th>No. of leaves</th>
                    <th>Avatar</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.length > 0 ? (
                    userdata.map((element, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{element.fname + " " + element.lname}</td>
                          <td>{element.echelon}</td>
                          <td>{element.mobile}</td>
                          <td className="d-flex align-items-center">
                            <Dropdown className="text-center">
                              <Dropdown.Toggle
                                className="dropdown_btn_table"
                                id="dropdown-basic"
                              >
                                <Badge
                                  bg={
                                    element.leave_type === "Casual"
                                      ? "success"
                                      : "primary"
                                  }
                                >
                                  {element.leave_type}
                                </Badge>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>Casual</Dropdown.Item>
                                <Dropdown.Item>Medical</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td>{element.leaves}</td>
                          <td className="img_parent">
                            <img
                              src={`${BASE_URL}/uploads/${element.profile}`}
                              alt="profile-img"
                              className="profile_img"
                            />
                          </td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="light"
                                className="action"
                                id="dropdown-basic"
                              >
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <NavLink
                                    to={`/userprofile/${element._id}`}
                                    className="text-decoration-none"
                                  >
                                    <i
                                      className="fa-solid fa-eye"
                                      style={{ color: "green" }}
                                    ></i>{" "}
                                    <span>View</span>
                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <NavLink
                                    to={`/edit/${element._id}`}
                                    className="text-decoration-none"
                                  >
                                    <i
                                      className="fa-solid fa-pen-to-square"
                                      style={{ color: "orange" }}
                                    ></i>{" "}
                                    <span>Update</span>
                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <div
                                    onClick={() => handleDeleteClick(element)}
                                  >
                                    <i
                                      className="fa-solid fa-trash"
                                      style={{ color: "red" }}
                                    ></i>{" "}
                                    <span>Delete</span>
                                  </div>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Paginations />
            </Card>
          </div>
        </Row>

        {/* Confirmation Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete{" "}
            <strong>{selectedUser?.fname}</strong>?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              No
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Yes, Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Tables;
