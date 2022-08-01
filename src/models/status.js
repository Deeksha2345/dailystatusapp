const mongoose = require("mongoose");

const statusSchema = ({

  title: {
    type: 'string',
    required: true
  },
  description: {
    type: 'string',
    required: true
  },
  timestamp: {
    type: 'date',
    required: true
  }
})

// const Status = new mongoose.model("Status", statusSchema);
module.exports = statusSchema;  