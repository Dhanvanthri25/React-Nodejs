'use strict'

const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    
    question: {
        type  : String,
        required : true
    },
    permitCode: {
        type: String,
        required : true
    }


});

const QuestionType = mongoose.model( 'Questions' , QuestionSchema )

module.exports = QuestionType;