'use strict'


const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  sno: {
    type: Number,
    unique: true
  },

  roleId:{
    type: Number,
    unique:true
  },

  role: {
    type: String,
    required: false
  },

});



const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
