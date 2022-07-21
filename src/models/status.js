const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const statusSchema = new mongoose.Schema({

  title: {
    type: 'string',
    required: true
  },
  description: {
    type: 'string',
    required: true

  }
})

const Status = new mongoose.model("Status", statusSchema);
module.exports = Status;  