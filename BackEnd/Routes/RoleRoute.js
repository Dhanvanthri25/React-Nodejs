'use strict'



const express = require('express');
const router = express.Router();
const RoleController = require('../Controllers/RoleController');
const VerifyToken = require('../Controllers/CommonController');



router.post('/addrole' , VerifyToken , RoleController.role_register)
router.get('/get_all_roles' ,VerifyToken, RoleController.get_all_roles)
router.get('/get_role_byId/:_id' ,VerifyToken, RoleController.get_role_byId)
router.put('/UpdateById/:_id' ,VerifyToken, RoleController.UpdateById);
router.delete('/DeletebyId/:_id' ,VerifyToken, RoleController.DeletebyId)

module.exports = router;
