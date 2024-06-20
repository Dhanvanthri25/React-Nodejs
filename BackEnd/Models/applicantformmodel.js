'use strict' 



const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
    sno:{
        type : String,
        unique  : true
    },
    ApplicationId: {
        type : String,
        unique : true
    },
    UserId : {
        type : String,
        required : false
    },
    refno: {
        type : String,
        required : false,
        unique : true
    },
    permitType: {
        type : String,
        required : false
    },
    projectCode: {
        type : String,
        required : false
    },
    descofWork: {
        type : String,
        required : false
    },
    startdateofWork: {
        type : String,
        required : false
    },
    startdateofStarttime: {
        type : String,
        required : false
    },
    startdateofEndtime: {
        type : String,
        required : false
    },
    enddateofWork: {
        type : String,
        required : false
    },
    enddateofStarttime: {
        type : String,
        required : false
    },
    enddateofEndtime: {
        type : String,
        required : false
    },
    locationofWork: {
        type : String,
        required : false
    },
    locationImages: {
        type : String,
        required : false
    },
    checklist: {
        type : Array,
        required : true
    },
    applicantName: {
        type : String,
        required : false
    },
    applicantRemarks: {
        type : String,
        required : false
    },
    applicantdateofSubmit: {
        type : String,
        required : false
    },
    applicantDescription: {
        type : String,
        required : false
    },
    applicantSignature: {
        type : String,
        required : false
    },
    aplicationStatus: {
        type : String,
        required : false
    },
    supervisorVerified: {
        type : String,
        required : false
    },
    safetyassessorVerified: {
        type : String,
        required : false
    },
    projectmanagerVerified: {
        type : String,
        required : false
    },
    auditVerified: {
        type : String,
        required : false
    },



});

ApplicantSchema.pre('save', async function(next) {
    try {
        // Generate sno
        if (!this.sno) {
            const count = await this.constructor.countDocuments();
            this.sno = (count + 1).toString();
        }
        // Generate ApplicationId
        if (!this.ApplicationId) {
            const appIdCount = await this.constructor.countDocuments();
            const paddedCount = (appIdCount + 1).toString().padStart(5, '0');
            this.ApplicationId = `AID${paddedCount}`;
        }
        next();
    } catch (error) {
        next(error);
    }
});
const ApplicantModel = mongoose.model("ApplicantForm" ,ApplicantSchema );

module.exports = ApplicantModel;
