const Doctors = require("../models/doctorSchema");
const Major_Staff = require("../models/majorStaffSchema");
const Minor_Staff = require("../models/minorStaffSchema");
const moment = require("moment");
const csv = require("fast-csv");
const fs = require("fs");

// Controller for Doctor registration
exports.doctorPost = async (req, res) => {
  const file = req.file.filename;
  const { fname, lname, email, mobile, gender, leave_type, leaves, echelon } =
    req.body;

  if (
    !fname ||
    !lname ||
    !email ||
    !mobile ||
    !gender ||
    !leave_type ||
    !leaves ||
    !echelon ||
    !file
  ) {
    res.status(401).json("All inputs are required");
  }

  try {
    const existingDoctor = await Doctors.findOne({ email: email });
    if (existingDoctor) {
      res.status(401).json("This doctor already exists in the database");
    } else {
      const dateCreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      const newDoctor = new Doctors({
        fname,
        lname,
        email,
        mobile,
        gender,
        leave_type,
        leaves,
        echelon,
        profile: file,
        dateCreated,
      });
      await newDoctor.save();
      res.status(200).json(newDoctor);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log("catch block error");
  }
};

// Controller for Major Staff registration
exports.majorStaffPost = async (req, res) => {
  const file = req.file.filename;
  const { fname, lname, email, mobile, gender, leave_type, leaves, echelon } =
    req.body;

  if (
    !fname ||
    !lname ||
    !email ||
    !mobile ||
    !gender ||
    !leave_type ||
    !leaves ||
    !echelon ||
    !file
  ) {
    res.status(401).json("All inputs are required");
  }

  try {
    const existingMajorStaff = await Major_Staff.findOne({ email: email });
    if (existingMajorStaff) {
      res
        .status(401)
        .json("This major staff member already exists in the database");
    } else {
      const dateCreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      const newMajorStaff = new Major_Staff({
        fname,
        lname,
        email,
        mobile,
        gender,
        leave_type,
        leaves,
        echelon,
        profile: file,
        dateCreated,
      });
      await newMajorStaff.save();
      res.status(200).json(newMajorStaff);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log("catch block error");
  }
};

// Controller for Minor Staff registration
exports.minorStaffPost = async (req, res) => {
  const file = req.file.filename;
  const { fname, lname, email, mobile, gender, leave_type, leaves, echelon } =
    req.body;

  if (
    !fname ||
    !lname ||
    !email ||
    !mobile ||
    !gender ||
    !leave_type ||
    !leaves ||
    !echelon ||
    !file
  ) {
    res.status(401).json("All inputs are required");
  }

  try {
    const existingMinorStaff = await Minor_Staff.findOne({ email: email });
    if (existingMinorStaff) {
      res
        .status(401)
        .json("This minor staff member already exists in the database");
    } else {
      const dateCreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      const newMinorStaff = new Minor_Staff({
        fname,
        lname,
        email,
        mobile,
        gender,
        leave_type,
        leaves,
        echelon,
        profile: file,
        dateCreated,
      });
      await newMinorStaff.save();
      res.status(200).json(newMinorStaff);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log("catch block error");
  }
};

// Controller for fetching all users from Doctors, Major Staff, and Minor Staff collections
exports.userget = async (req, res) => {
  const search = req.query.search || "";
  const gender = req.query.gender || "";
  const leave_type = req.query.leave_type || "";
  const sort = req.query.sort || "";
  const staff_type = req.query.staff_type || "All"; // Add staff_type filter

  // pagination
  const page = req.query.page || 1;
  const ITEM_PER_PAGE = 6;

  // Define the search query to match multiple fields
  const query = {
    $or: [
      { fname: { $regex: search, $options: "i" } },
      { lname: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
      { echelon: { $regex: search, $options: "i" } },
      { leave_type: { $regex: search, $options: "i" } },
    ],
  };

  if (gender !== "All") {
    query.gender = gender;
  }

  if (leave_type !== "All") {
    query.leave_type = leave_type;
  }

  try {
    let allUsersData = [];

    // Apply staff_type filter
    if (staff_type === "Doctors" || staff_type === "All") {
      const doctorsData = await Doctors.find(query);
      allUsersData = [...allUsersData, ...doctorsData];
    }

    if (staff_type === "Major_Staff" || staff_type === "All") {
      const majorStaffData = await Major_Staff.find(query);
      allUsersData = [...allUsersData, ...majorStaffData];
    }

    if (staff_type === "Minor_Staff" || staff_type === "All") {
      const minorStaffData = await Minor_Staff.find(query);
      allUsersData = [...allUsersData, ...minorStaffData];
    }

    // Sort by dateCreated depending on the sort query (Newest or Oldest)
    if (sort === "Newest") {
      allUsersData = allUsersData.sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      );
    } else if (sort === "Oldest") {
      allUsersData = allUsersData.sort(
        (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
      );
    }

    // Return the combined data
    res.status(200).json(allUsersData);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user data",
      error: error.message,
    });
  }
};

// get single user
exports.singleuserget = async (req, res) => {
  const { id } = req.params;
  try {
    // Try finding the user in each collection
    let userdata = await Doctors.findOne({ _id: id });

    if (!userdata) {
      userdata = await Major_Staff.findOne({ _id: id });
    }

    if (!userdata) {
      userdata = await Minor_Staff.findOne({ _id: id });
    }

    // If user is found in any collection, return the data
    if (userdata) {
      res.status(200).json(userdata);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// user edit
exports.useredit = async (req, res) => {
  const { id } = req.params;
  const { fname, lname, email, mobile, gender, leave_type, leaves, echelon } =
    req.body;

  // If a new file is uploaded, use it, otherwise keep the existing profile picture
  const file = req.file ? req.file.filename : req.body.user_profile;

  const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

  try {
    let updatedUser;

    // Try updating in Doctors collection
    updatedUser = await Doctors.findByIdAndUpdate(
      { _id: id },
      {
        fname,
        lname,
        email,
        mobile,
        gender,
        leave_type,
        leaves,
        echelon,
        profile: file,
        dateUpdated,
      },
      { new: true }
    );

    // If user not found in Doctors, try Major_Staff
    if (!updatedUser) {
      updatedUser = await Major_Staff.findByIdAndUpdate(
        { _id: id },
        {
          fname,
          lname,
          email,
          mobile,
          gender,
          leave_type,
          leaves,
          echelon,
          profile: file,
          dateUpdated,
        },
        { new: true }
      );
    }

    // If user not found in Major_Staff, try Minor_Staff
    if (!updatedUser) {
      updatedUser = await Minor_Staff.findByIdAndUpdate(
        { _id: id },
        {
          fname,
          lname,
          email,
          mobile,
          gender,
          leave_type,
          leaves,
          echelon,
          profile: file,
          dateUpdated,
        },
        { new: true }
      );
    }

    // If no user found in any collection, return error
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found in any collection." });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// user delete
exports.userdelete = async (req, res) => {
  const { id } = req.params;

  try {
    // Try deleting the user from each collection
    let deleteUser = await Doctors.findByIdAndDelete(id);

    if (!deleteUser) {
      deleteUser = await Major_Staff.findByIdAndDelete(id);
    }

    if (!deleteUser) {
      deleteUser = await Minor_Staff.findByIdAndDelete(id);
    }

    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deleteUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

// Controller for exporting users to CSV
exports.userExport = async (req, res) => {
  try {
    // Fetch data from all collections
    const doctorsData = await Doctors.find();
    const majorStaffData = await Major_Staff.find();
    const minorStaffData = await Minor_Staff.find();

    const allUsersData = [...doctorsData, ...majorStaffData, ...minorStaffData];

    const csvStream = csv.format({ headers: true });

    // Create export directory if not exists
    if (!fs.existsSync("public/files/export")) {
      if (!fs.existsSync("public/files")) {
        fs.mkdirSync("public/files/");
      }
      fs.mkdirSync("public/files/export");
    }

    const writeablestream = fs.createWriteStream(
      "public/files/export/hospital-staff-leaves.csv"
    );

    csvStream.pipe(writeablestream);

    writeablestream.on("finish", function () {
      res.json({
        downloadUrl: `http://localhost:6010/files/export/hospital-staff-leaves.csv`,
      });
    });

    // Write the data to CSV file
    if (allUsersData.length > 0) {
      allUsersData.map((user) => {
        csvStream.write({
          First_Name: user.fname || "-",
          Last_Name: user.lname || "-",
          Email_Address: user.email || "-",
          Mobile_Number: user.mobile || "-",
          Gender: user.gender || "-",
          Leave_Type: user.leave_type || "-",
          Leaves: user.leaves || "-",
          Profile: user.profile || "-",
          Echelon: user.echelon || "-",
          Date_Created: user.dateCreated || "-",
          Leave_Request_Date: user.dateUpdated || "-",
        });
      });
    }

    csvStream.end();
    writeablestream.end();
  } catch (error) {
    res.status(401).json(error);
  }
};
