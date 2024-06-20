'use strict'


const PermitModel = require("../Models/permitmodel")

module.exports ={ 

    AddPermittype: async (req, res) => {
        const { permittypeName, permitCode } = req.body;
        try {
            const count = await PermitModel.countDocuments();
            const newSno = count + 1;
    
            const newPermittype = new PermitModel({
                sno: newSno.toString(),
                permittypeName,
                permitCode
            });
    
            await newPermittype.save();
    
            res.status(200).json({
                message: "Permitype Added Successfully",
                permittypedata: newPermittype
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    },
    
    
     getAllPermitTypes : async (_, res) => {
        try {
            const allPermitTypes = await PermitModel.find();
            res.status(200).json({
                message: "All Permit Types Fetched Successfully",
                data: allPermitTypes
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Internal Server Error"
            });
        };;
    },

    get_permiittypebyId : async (req , res) => {
        const {_id} = req.params;
        try{
            const getbyId = await PermitModel.findById(_id);
            if(!getbyId){
                return res.status(404).json({
                    error : "PermittypeName Not Found For This ID",
                    _id
                });
            };
            res.status(200).json({
                message : "PermitTypeName Fetched Successfully",
                data : getbyId
            });
        }catch(error){
            console.error(error);
            res.status(500).json({
                error : "Internal Server Error"
            });
        };
    },

    updatePermitById : async (req , res) => {
        const { _id } = req.params;
        const { permittypeName , permitCode } = req.body;
        try{
            const Update = await PermitModel.findByIdAndUpdate(_id , {permittypeName, permitCode} , {new :true});
            if(!Update){
                return res.status(404).json({ 
                    error : "PermitTypeName Not Found For This ID",
                _id
            });
            };
            res.status(200).json({
                message : "Updated Successfuly",
                Update
            });
            
        }
        catch(error){
            console.error(error)
            res.status(500).json({
                error : "Internal server Error"
            });
        };
    },

    deletePermitById : async (req , res) => {
        const {_id} = req.params;
        try{
            const DeletebyId = await PermitModel.findByIdAndDelete(_id);
            if(! DeletebyId){
                return res.status(404).json({
                    error : "Permittypename Not Found For This ID" ,
                    _id
                });
            };
            res.status(200).json({
                message : "Permittypename Deleted Successfully",
                DeletebyId
            });
        }catch(error){
            console.error(error);
            res.status(500).json({
                error  : "Internal Server Error"
            });
        };
    }

};