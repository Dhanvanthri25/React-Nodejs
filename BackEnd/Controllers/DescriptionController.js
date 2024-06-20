'use strict'


const DescriptionModel = require('../Models/descriptionmodel');


module.exports = {
    AddDescription : async(req,res) => {
        const {permittypeName , role , description} = req.body;
        try{

           const count = await DescriptionModel.countDocuments();
           const newDesdId = count + 1 ;

            const addDes = new DescriptionModel({
                DescriptionId : newDesdId.toString(),
                permittypeName,
                role,
                description
            });
            const data = await addDes.save();

            res.status(200).json({
                message : "Decription Added Successfully",
                data
            });
        }catch(error){
            console.error(error);
            res.status(500).json({
                message : "Internal Server Error",
                error
            });
        };
    },

    getallDescription : async (_,res) => {
        try{
            const getalldes = await DescriptionModel.find();
            res.status(200).json({
                message : "All Descriptions Fetched Successfully",
                getalldes
            });
        }catch(error){
            console.error(error);
            res.status(500).json({
                message : "Internal Server Error",
                error
            });
        };
    },

    getbyId : async(req,res) => {
        const {_id} = req.params;
        try{
            const getby_Id = await DescriptionModel.findById(_id);
            if(!getby_Id){
                return res.status(404).json({
                    message : "Description Not Found For ID",
                    _id
                });
            };
            res.status(200).json({
                message : "Description Fetched Successfully",
                getby_Id
            });
        }catch(error){
            console.error(error)
            res.status(500).json({
                message : "Internal Server Error",
                error
            });
        };
    },

    getDescriptionbyRole_Permit : async (req , res) => {
        const {permittypeName , role} = req.query;

        try{
            const getbyId = await DescriptionModel.find({
                permittypeName , role
            });

            if(!getbyId){
                return res.status(404).json({
                    message : "No Description Found!",
                });
            };
            
            res.status(200).json({
                message : "Description Fetched Succesfully for Role & PermittypeName",
                getbyId
            })
        }catch(error){
            console.error(error);
            res.status(500).json({
                message : "Internal Server Error",
                error
            });
        };
    },

    updateDescription : async (req,res) => {
        const {_id} = req.params;
        const {description} = req.body;

        try{
            const Update  = await DescriptionModel.findByIdAndUpdate(
                _id,
                {description},
                {new : true}
            );
            if(!Update){
                return res.status(404).json({
                    message: "Description Not Found For This Id",
                    _id
                });
            };

            res.status(200).json({
                message : "Description updated Successfully",
                Update
            })
            
        }catch(error){
            console.error(error);
            res.status(500).json({
                message : "Internal Server Error",
                error
            });
        };
    },

    DeleteDescription : async(req , res) => {
        const {_id} = req.params;

        try{
            const deleteDes = await DescriptionModel.findByIdAndDelete(_id);

            if(!deleteDes){
                return res.status(404).json({
                    message : "Description Not Found For the Id",
                    _id
                });
            };

            res.status(200).json({
                message : "Description Deleted Successfully",
                deleteDes
            });
        }catch(error){
            console.error(error);
            res.status(500).json({
                message : "Internal Server Error",
                error
            });
        };
    }
};