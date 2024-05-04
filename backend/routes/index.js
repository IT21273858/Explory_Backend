var express = require('express');

const router = express.Router();


// Admin route

var adminController = require('../src/admin/adminController');

router.route('/admin/getAll').get(adminController.getDataControllerfn);

router.route('/admin/create').post(adminController.createAdminControllerFn);

router.route('/admin/update/:id').patch(adminController.updateAdminController);

router.route('/admin/delete/:id').delete(adminController.deleteAdminController);

router.route('/admin/get/:id').get(adminController.findAdminController);

router.route('/admin/login').post(adminController.loginControllerFn);


// Student route

var studentController = require('../src/student/studentController');

router.route('/student/getAll').get(studentController.getDataControllerfn);

router.route('/student/create').post(studentController.createStudentControllerFn);

router.route('/student/update/:id').patch(studentController.updateStudentController);

router.route('/student/delete/:id').delete(studentController.deleteStudentController);

router.route('/student/get/:id').get(studentController.findStudentController);

router.route('/student/login').post(studentController.loginControllerFn);


module.exports = router;