import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Spiner from "../../components/spinner/Spiner";
import { singleUsergetfunc } from "../../services/Apis";
import "./profile.css";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../services/helper";
import moment from "moment";

const Profile = () => {
  const [userprofile, setUserProfile] = useState({});
  const [showspin, setShowSpin] = useState(true);

  const { id } = useParams(); // Get the user ID from URL params

  useEffect(() => {
    const userProfileGet = async () => {
      const response = await singleUsergetfunc(id);

      if (response.status === 200) {
        setUserProfile(response.data);
      } else {
        console.log("An error occurred while fetching the user!");
      }
    };

    userProfileGet(); // Call the function to fetch the user data
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [id]); // The dependency is now just 'id'

  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container">
          <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center">
                    <img
                      src={`${BASE_URL}/uploads/${userprofile.profile}`}
                      alt="profile"
                      className="profile_img"
                    />
                  </div>
                </div>
              </Row>
              <div className="text-left">
                <h3 className="user-name">
                  {userprofile.fname} {userprofile.lname}
                </h3>
                <div>
                  <h6>
                    <i className="fa-regular fa-envelope"></i>&nbsp;&nbsp;Email
                    address:&nbsp;&nbsp;
                    <span>{userprofile.email}</span>
                  </h6>
                  <h6>
                    <i className="fa-solid fa-mobile-screen-button"></i>
                    &nbsp;&nbsp;&nbsp;Mobile number:&nbsp;&nbsp;
                    <span>{userprofile.mobile}</span>
                  </h6>
                  <h6>
                    <i className="fa-solid fa-person-half-dress"></i>
                    &nbsp;&nbsp;&nbsp;Gender:&nbsp;&nbsp;
                    <span>{userprofile.gender}</span>
                  </h6>
                  <h6>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    &nbsp;&nbsp;Type of leave:&nbsp;&nbsp;
                    <span>{userprofile.leave_type}</span>
                  </h6>
                  <h6>
                    <i className="fa-solid fa-list-ol"></i>
                    &nbsp;&nbsp;Number of leaves:&nbsp;&nbsp;
                    <span>{userprofile.leaves}</span>
                  </h6>
                  <h6>
                    <i className="fa-solid fa-ranking-star"></i>
                    &nbsp;Echelon:&nbsp;&nbsp;
                    <span>{userprofile.echelon}</span>
                  </h6>
                  <h6>
                    <i className="fa-regular fa-calendar-plus"></i>
                    &nbsp;&nbsp; Date Created:&nbsp;&nbsp;
                    <span>
                      {moment(userprofile.dateCreated).format("DD-MM-YYYY")}
                    </span>
                  </h6>
                  <h6>
                    <i className="fa-regular fa-calendar-check"></i>
                    &nbsp;&nbsp;&nbsp;Last Date of Leave Request:&nbsp;&nbsp;
                    <span>
                      {userprofile.dateUpdated
                        ? moment(userprofile.dateUpdated).format("DD-MM-YYYY")
                        : moment(userprofile.dateCreated).format("DD-MM-YYYY")}
                    </span>
                  </h6>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default Profile;
