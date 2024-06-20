'use strict'

const express = require('express');
const Router = express.Router();
const DescriptionController = require('../Controllers/DescriptionController');
const JWT_VERIFY = require('../Controllers/CommonController');


Router.post('/addDescription' , JWT_VERIFY , DescriptionController.AddDescription);
Router.get('/getallDescription' , JWT_VERIFY , DescriptionController.getallDescription);
Router.get('/getbyId/:_id' , JWT_VERIFY , DescriptionController.getbyId);
Router.get('/getDesby_Role_Permit' , JWT_VERIFY , DescriptionController.getDescriptionbyRole_Permit);
Router.put('/updateDes/:_id' , JWT_VERIFY , DescriptionController.updateDescription);
Router.delete('/deleteDes/:_id' , JWT_VERIFY , DescriptionController.DeleteDescription);


module.exports = Router;