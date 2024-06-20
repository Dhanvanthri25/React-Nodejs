'use strict'



const User = require('../Models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_verify = require('../Controllers/CommonController')


exports.register = async (req, res,  next) => {

    const { username, password,role,companyName,mobileNumber,email,status,profileimage } = req.body;
    
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { mobileNumber }] });
        if (existingUser) {
            console.log('User already exists'); 
            return res.status(400).json({ message: 'User already exists' });
        };


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const latestUser = await User.findOne().sort({ sno: -1 }).exec();
        const latestSno = latestUser ? latestUser.sno : 0;
        const sno = latestSno + 1;

        const userid = 'User' + String(sno).padStart(5, '0');


        const newUser = new User({
            username,
            password: hashedPassword,
            mobileNumber,
            role,
            companyName,
            email,
            status,
            profileimage
        });


        await newUser.save();

        console.log('User registered successfully');
        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    };
};


exports.login = async (req, res) => {
  const { email, password } = req.body; 
  try {
      let user;
      if (!email || !password) {
          console.log('Email or password is missing');
          return res.status(400).json({ message: 'Email and password are required' });
      };

      user = await User.findOne({ email });
      console.log("user---------------------------------" , user)

      if (!user) {
          console.log('User not found');
          return res.status(401).json({ message: 'Invalid credentials' });
      };

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          console.log('Invalid password');
          return res.status(401).json({ message: 'Invalid credentials' });
      };

      const token = jwt.sign(
          { userId: user.userid, email: user.email }, 
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );

      console.log('Login successful');
      return res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal server error' });
  };
};

exports.getAllUsers = async (_, res) => {
  try {
      const users = await User.find();
      console.log('All users retrieved successfully');
      return res.status(200).json({ message: 'All users retrieved successfully', users });
  } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Internal server error' });
  };
};


exports.getUserById = async (req, res) => {
  const { _id } = req.params;

  try {
      const user = await User.findById(_id);

      if (!user) {
          console.log('User not found');
          return res.status(404).json({ 
            message: 'User not found for this Id',
            _id
       });
      };

      console.log('User found by ID');
      return res.status(200).json({ 
        message: 'User found by ID', 
        user 
      });
  } catch (error) {
      console.error('Error fetching user by ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
  };
};

exports.updateUserById = async (req, res) => {
  const { _id } = req.params; 
  const { username, password,role,companyName,email,status,profileimage } = req.body;

  try {

    const updatedUser = await User.findByIdAndUpdate(_id, { username, password,role,companyName,email,status,profileimage }, { new: true });
    if (!updatedUser) {
      console.log('User not found');
      return res.status(404).json({
         message: 'User not found for this ID',
        _id
      });
    };
    console.log('User updated successfully');
    console.log('Updated User:', updatedUser);
    return res.status(200).json({ 
      message: 'User updated successfully', 
      updatedUser
     });
  } catch (error) {
    console.error('Error updating user by ID:', error);
    return res.status(500).json({ message: 'Internal server error' });
  };
};


exports.deleteUserById = async (req, res) => {
  const { _id } = req.params; 

  try {
    const deletedUser = await User.findByIdAndDelete(_id);

    if (!deletedUser) {
      console.log('User not found');
      return res.status(404).json({ 
        message: 'User not found',
       _id
       });
    };

    console.log('User deleted successfully');
    console.log('Deleted User:', deletedUser); 
    return res.status(200).json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    console.error('Error deleting user by ID:', error);
    return res.status(500).json({ message: 'Internal server error' });
  };
};


module.exports = exports; 
