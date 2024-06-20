'use strict'


const express = require('express');
const router = express.Router();
const RegisterController = require('../Controllers/RegisterController');
const VerifyToken = require('../Controllers/CommonController');




router.post('/register', RegisterController.register);
router.post('/login', RegisterController.login);
router.get('/get_all_users', VerifyToken , RegisterController.getAllUsers );
router.get('/getbyid/:_id', VerifyToken ,RegisterController.getUserById);
router.put('/updatebyid/:_id', VerifyToken, RegisterController.updateUserById);
router.delete('/deletebyid/:_id', VerifyToken , RegisterController.deleteUserById);
 
module.exports = router;
