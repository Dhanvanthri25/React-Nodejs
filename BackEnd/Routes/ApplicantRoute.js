'use strict'

const express = require('express');
const Router = express.Router();
const ApplicantFormController = require('../Controllers/ApplicantFormController');
const JWT_VERIFY = require('../Controllers/CommonController');


Router.post('/add_Applicant' ,JWT_VERIFY , ApplicantFormController.add_Applicant_details );
Router.get('/get_all_applicant' ,JWT_VERIFY , ApplicantFormController.getallApplicantdetails );
Router.get('/getapplicant_byId/:_id' , JWT_VERIFY , ApplicantFormController.getapplicantby_Id);
Router.put('/updateapplicant_byId/:_id' , JWT_VERIFY , ApplicantFormController.updateApplicantby_Id);
Router.delete('/deleteapplicant_byId/:_id' , JWT_VERIFY , ApplicantFormController.deleteApplicantby_Id);


module.exports = Router;