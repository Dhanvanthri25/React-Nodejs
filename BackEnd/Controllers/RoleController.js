'use strict'


const RoleModel = require("../Models/rolemodel");
module.exports = {
  role_register : async (req, res) => {
    const { role } = req.body;
    try {
      const maxSnoRole = await RoleModel.findOne().sort({ sno: -1});
      let maxSno = 0;
      if (maxSnoRole){
        maxSno = maxSnoRole.sno;
      };



      const maxRoleId = await  RoleModel.findOne().sort({ roleId: -1});
      let maxRoleIdno = 0;
      if(maxRoleId){
        maxRoleIdno = maxRoleId.roleId
      };
      

      const newSno = maxSno + 1;
      const newRoleId = maxRoleIdno + 1;
      const newRole = new RoleModel({
        sno : newSno,
        roleId : newRoleId,
        role,
      });
  
      await newRole.save();
  
      res.status(200).json({ message: 'role registered successfully', roleData: newRole });
      console.log(newRole);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    };
  },


  get_all_roles :  async (_,res) => {
    try {
      const allRoles = await RoleModel.find();
      res.status(200).json({ roles: allRoles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    };
  },
  
  get_role_byId:async(req,res) => {
    const {_id} = req.params
      try{
        const role = await RoleModel.findById(_id)
        if(!role){
          return res.status(404).json({error : "Role Not Found"});
        }
        res.status(200).json({role})
      }catch(error){
        console.error("Error" , error)
        res.status(500).json({error: "Internal Server Error "})
      };
    },

    UpdateById : async(req,res) => {
      const {_id} = req.params;
      const {role } = req.body;
      try{
        const update = await RoleModel.findByIdAndUpdate(_id , {role 
        }  ,{new : true});
        if(!update){
          console.log("Role Not Found")
          return res.status(404).json({error : "Role Not Found"});
        }
        res.status(200).json({ message: "Role Updated Successfully" , update})
      }catch(error){
        console.error("Error" , error);
        res.status(500).json({error : "Internal Server Error "})
      };
    },

    DeletebyId:async(req , res) => {
      const {_id} = req.params;
      try{
        const deletebyId = await RoleModel.findByIdAndDelete(_id);
        if (!deletebyId){
          console.log("Role Not Found");
          return res.status(404).json({error : "Role Not Found"});
        }
        res.status(200).json({ message : "Role Deleted Successfully" , deletebyId})
      }catch(error){
        console.error(error)
        res.status(500).json({error : "Internal Server Error "})
      };
    }

};






