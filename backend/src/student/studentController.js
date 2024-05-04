var studentService = require("./studentServices");

// Get all the Student details
var getDataControllerfn = async (req, res) => {
  try {
    var studentData = await studentService.getDataFromDBService();
    res
      .status(200)
      .json({
        status: true,
        data: studentData,
        message: "Data retrieved successfully",
      });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Get specific Student of a specific id
var findStudentController = async (req, res) => {
  try {
    var result = await studentService.getStudentDBService(req.params.id);
    if (result) {
      res
        .status(200)
        .json({ status: true, data: result, message: "Student found" });
    } else {
      res.status(404).json({ status: false, message: "Student not found" });
    }
  } catch (error) {
    console.error("Error finding student:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Function to create Student
var createStudentControllerFn = async (req, res) => {
  try {
    var status = await studentService.createStudentDBService(req.body);
    if (status) {
      res
        .status(201)
        .json({ status: true, message: "Student created successfully" });
    } else {
      res
        .status(400)
        .json({ status: false, message: "Error creating student" });
    }
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Function to update Student
var updateStudentController = async (req, res) => {
  try {
    var result = await studentService.updateStudentDBService(
      req.params.id,
      req.body
    );
    if (result) {
      res
        .status(200)
        .json({ status: true, message: "Student updated successfully" });
    } else {
      res.status(404).json({ status: false, message: "Student not found" });
    }
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Function to delete Student
var deleteStudentController = async (req, res) => {
  try {
    var result = await studentService.removeStudentDBService(req.params.id);
    if (result) {
      res
        .status(200)
        .json({ status: true, message: "Student deleted successfully" });
    } else {
      res.status(404).json({ status: false, message: "Student not found" });
    }
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};


// Function to login with jwt token
var loginControllerFn = async (req, res) => {
    const { name, password } = req.body;
    try {
      const { user, token } = await studentService.loginStudentController(name, password);
      res.status(200).json({ status: true, message: "Login successful", user, token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(403).json({ status: false, message: "Invalid username or password" });
    }
  };
module.exports = {
  getDataControllerfn,
  createStudentControllerFn,
  updateStudentController,
  deleteStudentController,
  findStudentController,
  loginControllerFn,
};
