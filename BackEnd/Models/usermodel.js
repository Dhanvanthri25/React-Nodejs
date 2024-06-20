'use struct'



const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  sno: {
    type: Number,
    unique: true
},
userid: {
    type: String,
    unique: true
},
    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    mobileNumber: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false
    },
    companyName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    profileimage: {
        type: String,
        required: false
    } 

});

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isNew) {
        return next();
    }
    try {
        const latestUser = await this.constructor.findOne().sort({ sno: -1 }).exec();
        user.sno = latestUser ? latestUser.sno + 1 : 1;
        user.userid = 'User' + String(user.sno).padStart(5, '0'); 
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
