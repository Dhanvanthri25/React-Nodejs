'use strict'


const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();


const Secert = process.env.JWT_SECRET

module.exports = (req, res, middleware) => {
    const Token = req.headers['authorization']
    const payload = Token.split(" ");  
    if(!Token){
        return res.status(400).json("Invalid Token")
    };
    try{
        jwt.verify(payload[1],Secert ,(error , data)=>{
            
            if(error){
                console.log(error);
            }else{
            req.decrypt = data;     
            middleware();     
            }
        });
    }catch(error){
        console.error(error , "Internal Server Error")
    };

};


