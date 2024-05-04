var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
  // Refering Course and student
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  course: [
    {
      type: Schema.Types.ObjectId,
        ref: 'course',
    },
  ],
  faculty: {
    type: String,
  },
  role: {
    type: String,
    default: "Student",
  },
});

module.exports = mongoose.model("student", StudentSchema);
