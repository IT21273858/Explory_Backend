const { CURSOR_FLAGS } = require("mongodb");
const jwt = require("jsonwebtoken");
var studentModel = require("./studentModel");

module.exports.getDataFromDBService = () => {
  return new Promise((resolve, reject) => {
    studentModel
      .find({}).populate(['course'])
      .populate({
        path: "course"        
      })
      
      .then((result) => resolve(result))
      .catch((error) => reject(false));
  });
};
module.exports.getStudentDBService = (id) => {
  return new Promise((resolve, reject) => {
    studentModel
      .findById(id).populate(['course'])
      .populate({
        path: "course"        
      })
      .then((result) => resolve(result))
      .catch((error) => {
        console.log("Error caused whie fetching :id " + error);
      });
  });
};

module.exports.createStudentDBService = (studentDetails) => {
  return new Promise((resolve, reject) => {
    var studentModelData = new studentModel();
    studentModelData.name = studentDetails.name;
    studentModelData.email = studentDetails.email;
    studentModelData.password = studentDetails.password;
    studentModelData.address = studentDetails.address;
    studentModelData.number = studentDetails.number;
    studentModelData.course = studentDetails.course;
    studentModelData.faculty = studentDetails.faculty;

    studentModelData
      .save()
      .then((result) => resolve(true))
      .catch((error) => reject(false));
  });
};

module.exports.updateStudentDBService = (id, studentDetails) => {
  return new Promise((resolve, reject) => {
    studentModel
      .findByIdAndUpdate(id, studentDetails)
      .then((result) => resolve(result))
      .catch((error) => reject(false));
  });
};

module.exports.removestudentDBService = (id) => {
  return new Promise((resolve, reject) => {
    studentModel
      .findByIdAndDelete(id)
      .then((result) => resolve(result))
      .catch((error) => reject(false));
  });
};
module.exports.loginStudentController = async (name, password) => {
  try {
    const user = await studentModel.findOne({ name, password });

    if (user) {
      const token = generateToken(user._id);
      return { user, token };
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// FUnction to generate JWT token
function generateToken(userId) {
  const crypto = require("crypto");

  // Generate a random secret key
  const secretKey = crypto.randomBytes(32).toString("hex");
  // Expires in 1 Hour
  const expiresIn = "1h";

  return jwt.sign({ userId }, secretKey, { expiresIn });
}
