const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  avatar: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
  },
  birthDate: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  position: {
    type: String,
    required: false,
  },
  department: {
    type: String,
  },
  startDate: {
    type: String,
  },

  mark: {
    type: String,
  },
  workHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

// Create the Account model from the schema
const Accounts = mongoose.model("Accounts", accountSchema);

module.exports = Accounts;
