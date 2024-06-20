'use strict'


const QuestionModel = require("../Models/questionsmodel")

module.exports ={ 
    add_questions: async (req, res) => {
        const { question  , permitCode } = req.body;
        try {
            const addques = await new QuestionModel({
                question  , permitCode
            });
            await addques.save().then((data)=>{
                if(data){
                   return res.status(200).json({
                        message: "Questions Added Successfully",
                        data : data
                    });
                }else{
                    throw new error;
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    },


    get_questions: async (req, res) => {
    const {permitCode }  = req.query;
        try {
            const getques = await QuestionModel.find({permitCode});

            if(getques){
              return  res.status(200).json({
                    message: "Questions Fetched  Successfully For Permittypename"  ,
                    data : getques
                });
            }
            else{
                throw new error;
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    },

    getbyId : async(req,res) => {
        const {_id} = req.params;
        try{
            const getby_Id = await QuestionModel.findById(_id);
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


    updateQuestions : async (req,res) => {
        const {_id} = req.params;
        const {question  , permitCode } = req.body;
        console.log("req.body------------------------------------------" , req.body)

        try{
            const updatequestion = await QuestionModel.findByIdAndUpdate(_id , {question  , permitCode} , {new : true});
            if(!updatequestion){
                return res.status(404).json({
                    message : "Cannot Find Questions For The _id",
                    _id
                });
            };
            res.status(200).json({
                message : "Questions Updated Successfully",
                data : updatequestion
            });
        }catch(error){
            console.error(error);
            res.status(500).json({
                error : "Internal Server Error ",
                error
            });
        };
    },

    deleteQuestions : async (req,res) => {
        const {_id} = req.params;
        try{
            const deleteques = await QuestionModel.findByIdAndDelete(_id);
            if(!deleteques){
                return res.status(404).json({
                    message : "Cannot Find Questions For The _id",
                    _id
                });
            };
            res.status(200).json({
                message : "Question Deleted Successfully",
                deleteques
            });
        }catch(error){
            console.error(error);
            res.status(500).json({
                error  : "Internal Server Error",
                error
            });
        };
    }
    


};