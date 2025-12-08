const mongoose = require("mongoose");
const validator = require("validator");

const doctorSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  lname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email format");
      }
    },
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
  },
  gender: {
    type: String,
    required: true,
  },
  leave_type: {
    type: String,
    required: true,
  },
  leaves: {
    type: Number,
    required: true,
    min: 0,
    max: 45,
  },
  profile: {
    type: String,
    required: true,
  },
  echelon: {
    type: String,
    required: true,
  },
  dateCreated: Date,
  dateUpdated: Date,
});

const Doctors = mongoose.model("Doctors", doctorSchema);
module.exports = Doctors;
