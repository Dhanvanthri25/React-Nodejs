'use strict'


const mongoose = require('mongoose');

const DescriptionSchema = new mongoose.Schema({
    DescriptionId:({
        type : String,
        unique : true
    }),
    permittypeName : ({
        type : String,
        required : true
    }),
    role: ({
        type : String,
        requierd : true
    }),
    description : ({
        type : String,
        required : true
    }),
});

const Description = mongoose.model('Description' , DescriptionSchema);

module.exports = Description;