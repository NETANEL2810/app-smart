const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const {config} = require("../config/secrets");
// sechma for user 
const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  date_created:{
    type:Date, default:Date.now
  },
  // role -> diffine role admin/user
  role:{
    type:String, default:"user"
  }
})


exports.UserModel = mongoose.model("users",userSchema);

// function of create token
exports.createToken = (user_id,role) => {
  let token = jwt.sign({_id:user_id,role:role},config.token_secret,{expiresIn:"600mins"})
  return token;
}

// valid all data server got - if match to the database
exports.validateUser = (_reqBody) => {
  let joiSchema = Joi.object({
    name:Joi.string().min(2).max(150).required(),
    email:Joi.string().min(2).max(150).email().required(),
    password:Joi.string().min(3).max(150).required()
  })
  return joiSchema.validate(_reqBody);
}
// valid for login - user/admin
exports.validateLogin = (_reqBody) => {
  let joiSchema = Joi.object({
    email:Joi.string().min(2).max(150).email().required(),
    password:Joi.string().min(3).max(150).required()
  })
  return joiSchema.validate(_reqBody);
}