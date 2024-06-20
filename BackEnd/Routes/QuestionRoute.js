'use strict' 


const express = require('express');
const Router = express.Router();
const QuestionController = require("../Controllers/QusetionController");
const JWTVERIFY = require("../Controllers/CommonController");

Router.post('/add_question' ,JWTVERIFY ,QuestionController.add_questions);
Router.get('/get_questions' ,JWTVERIFY , QuestionController.get_questions );
Router.get('/getbyId/:_id' ,JWTVERIFY , QuestionController.getbyId );
Router.put('/updateQuestionsby_Id/:_id' , JWTVERIFY, QuestionController.updateQuestions);
Router.delete('/deleteQuestion/:_id' , JWTVERIFY , QuestionController.deleteQuestions);

module.exports = Router;