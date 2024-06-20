'use strict'


const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
const RegRoutes = require('../BackEnd/Routes/RegisterRoute');
const RoleRoutes = require('../BackEnd/Routes/RoleRoute');
const PermitRoutes = require('../BackEnd/Routes/PermitRoutes');
const ApplicantRoutes = require('../BackEnd/Routes/ApplicantRoute')
const QuestionRoutes = require('../BackEnd/Routes/QuestionRoute')
const DescriptionRoutes = require('../BackEnd/Routes/DescriptionRoute');

const app = express();
app.use(cors()); 
const dotenv = require('dotenv');


dotenv.config();

const MONGODB_URI = process.env.MONGO_URL;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.use(express.json());


app.use('/api/user', RegRoutes);
app.use('/api/role', RoleRoutes);
app.use('/api/permit' , PermitRoutes);
app.use('/api/ApplicantForm' , ApplicantRoutes);
app.use('/api/Question' , QuestionRoutes);
app.use('/api/Description' , DescriptionRoutes);


const JWT_SECRET = process.env.JWT_SECRET ;
console.log(JWT_SECRET, "------------------------------")

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
