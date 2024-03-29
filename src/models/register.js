const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const statusSchema = require("./status");

const employeeSchema = new mongoose.Schema({

  firstname: {
    type: 'string',
    required: true
  },
  lastname: {
    type: 'string',
    required: true
  },

  email: {
    type: 'string',
    isrequired: true
  },
  password: {
    type: 'string',
    isrequired: true
  },
  mobilenumber: {
    type: Number,
    isrequired: true
  },
  userType:{
    type: 'string',
    isrequired: true
  },
  statuses:{
    type: [statusSchema]
  }
})

employeeSchema.pre("save", async function (next) {

  if (this.isModified("password")) {
    console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`the current password is ${this.password}`);
  }
  next();
})

const User = new mongoose.model("User", employeeSchema);
module.exports = User;  