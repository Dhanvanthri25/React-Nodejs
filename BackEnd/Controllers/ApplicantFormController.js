'use strict'


const ApplicantFormModel = require('../Models/applicantformmodel')
const PermitModel = require("../Models/permitmodel")



module.exports = {
    add_Applicant_details: async (req, res) => {
        const {
            UserId,
            permitType,
            projectCode,
            descofWork,
            startdateofWork,
            startdateofStarttime,
            startdateofEndtime,
            enddateofWork,
            enddateofStarttime,
            enddateofEndtime,
            locationofWork,
            locationImages,
            checklist,
            applicantName,
            applicantRemarks,
            applicantdateofSubmit,
            applicantDescription,
            applicantSignature,
            aplicationStatus,
            supervisorVerified,
            safetyassessorVerified,
            projectmanagerVerified,
            auditVerified,

        } = req.body;

        console.log("its came...")

        try {
            const maxSnoPermit = await ApplicantFormModel.findOne().sort({ sno: -1 });
            let maxSno = 0;
            if (maxSnoPermit) {
                maxSno = parseInt(maxSnoPermit.sno);
            }
            let newSno = maxSno + 1;
            let snoStr = newSno.toString();

            if (snoStr.length > 1 && snoStr.charAt(0) === '1') {
                newSno = parseInt(snoStr.substring(0, snoStr.length - 1) + '0') + 1;
            };

            await PermitModel.find({ permittypeName: permitType }).then(async (data) => {
                if(data) {
                console.log(data)
                    const AddApplicant =await  new ApplicantFormModel({
                        UserId,
                        refno: `${data[0].permitCode}-${newSno.toString()}`,
                        permitType,
                        projectCode,
                        descofWork,
                        startdateofWork,
                        startdateofStarttime,
                        startdateofEndtime,
                        enddateofWork,
                        enddateofStarttime,
                        enddateofEndtime,
                        locationofWork,
                        locationImages,
                        checklist,
                        applicantName,
                        applicantRemarks,
                        applicantdateofSubmit,
                        applicantDescription,
                        applicantSignature,
                        aplicationStatus,
                        supervisorVerified,
                        safetyassessorVerified,
                        projectmanagerVerified,
                        auditVerified,
                    });

                    const Applicationdata = await AddApplicant.save();
                   return  res.status(200).json({
                        message: "Applicant Details Added Successfully",
                        applicantdata: Applicationdata
                    });
                }
                else{
                  throw new error;
                }
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Internal Server Error",
                error
            })
        }

    },

    getallApplicantdetails: async (_, res) => {
        try {
            const getallapplicant = await ApplicantFormModel.find();
            res.status(200).json({
                message: "All Applicant Details Fetched Successfully",
                data: getallapplicant
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "Internal Server Error"
            });
        };
    },

    getapplicantby_Id: async (req, res) => {
        const { _id } = req.params;
        try {
            const getbyid = await ApplicantFormModel.findById(_id);
            if (!getbyid) {
                return res.status(404).json({
                    error: "Applicant Details  Not found for this Id ",
                    _id
                });
            };
            res.status(200).json({
                message: "Applicant Details Fetched Successfully",
                data: getbyid
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Internal Server Error"
            });
        };
    },

    updateApplicantby_Id: async (req, res) => {
        const { _id } = req.params;
        const {
            UserId,
            refno,
            permitType,
            projectCode,
            descofWork,
            startdateofWork,
            startdateofStarttime,
            startdateofEndtime,
            enddateofWork,
            enddateofStarttime,
            enddateofEndtime,
            locationofWork,
            locationImages,
            checklist,
            applicantName,
            applicantRemarks,
            applicantdateofSubmit,
            applicantDescription,
            applicantSignature,
            aplicationStatus,
            supervisorVerified,
            safetyassessorVerified,
            projectmanagerVerified,
            auditVerified
        } = req.body;

        try {
            const UpdateById = await ApplicantFormModel.findByIdAndUpdate(
                _id,
                {
                    UserId,
                    refno,
                    permitType,
                    projectCode,
                    descofWork,
                    startdateofWork,
                    startdateofStarttime,
                    startdateofEndtime,
                    enddateofWork,
                    enddateofStarttime,
                    enddateofEndtime,
                    locationofWork,
                    locationImages,
                    checklist,
                    applicantName,
                    applicantRemarks,
                    applicantdateofSubmit,
                    applicantDescription,
                    applicantSignature,
                    aplicationStatus,
                    supervisorVerified,
                    safetyassessorVerified,
                    projectmanagerVerified,
                    auditVerified
                },
                { new: "true" }
            );
            if (!UpdateById) {
                return res.status(404).json({
                    error: "Applicant Details  Not found for this Id ",
                    _id
                });
            };
            res.status(200).json({
                message: "Applicant Details Updated Successfully",
                data: UpdateById
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "Internal Server Error"
            });
        };
    },

    deleteApplicantby_Id: async (req, res) => {
        const { _id } = req.params;
        try {
            const deletebyId = await ApplicantFormModel.findByIdAndDelete(_id);
            if (!deletebyId) {
                return res.status(404).json({
                    error: "Applicant Details  Not found for this Id ",
                    _id
                });
            };
            res.status(200).json({
                message: "Applicant details deleted Successfully",
                data: deletebyId
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Internal Server Error"
            });
        };
    }
};