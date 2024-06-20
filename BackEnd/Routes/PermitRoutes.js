'use strict' 


const express = require('express');
const Router = express.Router();
const PermitController = require("../Controllers/PermitControler");
const JWTVERIFY = require("../Controllers/CommonController");

Router.post('/addpermittype' ,JWTVERIFY ,PermitController.AddPermittype);
Router.get('/getallpermittype' ,JWTVERIFY , PermitController.getAllPermitTypes );
Router.get('/get_permitby_Id/:_id' , JWTVERIFY , PermitController.get_permiittypebyId);
Router.put('/update_permitby_Id/:_id' , JWTVERIFY , PermitController.updatePermitById);
Router.delete('/delete_permitby_Id/:_id' , JWTVERIFY , PermitController.deletePermitById);

module.exports = Router;