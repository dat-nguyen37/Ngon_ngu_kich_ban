const db=require('../models')
const User=db.User
const Role=db.Role
const md5=require('md5')
const jwt=require('jsonwebtoken')
const dotenv= require("dotenv").config();
const config = require("../config/auth.config");


exports.register=async(req,res,next)=>{
    const enyti={
        name:req.body.name,
        username: req.body.username,
        email: req.body.email,
        password:md5(req.body.password),
        phone:req.body.phone,
        address:req.body.address,
    }
    try {
      const username=await User.findOne({where:{username:req.body.username}})
      if(username){
         return res.status(409).json("User already exists")
      }
      const email=await User.findOne({where:{email:req.body.email}})
      if(email){
         return res.status(409).json("Email already exists")
      }
      const newUser=await User.create(enyti)
      res.status(200).json(newUser)
    } catch (err) {
      next(err);
    }
    
}

exports.signin = async(req, res, next) => {
    try {
      const user = await User.findOne({ where: { username: req.body.username } });

      if (!user) {
          return res.status(404).json("Not found user");
      }
      const isPasswordValid =await user.password === md5(req.body.password);
      if (!isPasswordValid) {
          return res.status(401).json("Wrong password");
      }
      const tokenData = { User: user };
          
      Role.findOne({ where: { userId: user.id } })
        .then(role => {
          if (role) {
            tokenData.Role = role;
          }
          const token = jwt.sign(tokenData, config.secret, { expiresIn: 86400 });
          tokenData.Token = token;
          const cookieOption = {
            expiresIn: new Date(Date.now() + 86400),
            httpOnly: true
          };
          res.cookie("userlogin", token, cookieOption);
          res.status(200).json(tokenData);
        })

    } catch (err) {
        next(err);
    }
  };
  
  
exports.logout=(req,res)=>{
  res.clearCookie("userlogin",{
    secure:true,
    sameSite:"none"
  }).status(200).json("User has been logged out.")
}