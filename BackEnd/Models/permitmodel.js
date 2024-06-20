'use strict'

const mongoose = require('mongoose')

const PermitSchema = new mongoose.Schema({
    sno : {
        type : String,
        unique : true
    },
    
    permittypeName: {
        type  : String,
        required : true
    },
     permitCode:{
        type : String,
        required : true
     }


});

const PermitType = mongoose.model( 'Permittype' , PermitSchema )

module.exports = PermitType;