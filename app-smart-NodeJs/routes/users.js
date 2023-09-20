const express= require("express");
const bcrypt = require("bcrypt");
const {auth, authAdmin} = require("../middlewares/auth")
const {UserModel,validateUser, validateLogin, createToken} = require("../models/userModel")

const router = express.Router();

// index for user 
router.get("/", async(req,res) => {
  res.json({msg:"Users endpoint"});
})

// this router return token of user/admin
router.get("/checkToken", auth,async(req,res) => {
  try{
    res.json(req.tokenData);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})
// users list - only admin can do req
router.get("/usersList", authAdmin, async(req,res) => {
  // diffine the var - to do the oprand on mongo
  let perPage = Math.min(req.query.perPage, 20) || 20;
  let page = req.query.page - 1 || 0;
  let sort = req.query.sort || "_id"
  let reverse = req.query.reverse == "yes" ? 1 : -1
  // advance operand on mongodb
  try {
    let data = await UserModel
      .find({})///find all
      .limit(perPage)///limt res
      .skip(page * perPage)///skip of k
      .sort({ [sort]: reverse })///sort by q
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})



// get of page each one by his own data
router.get("/userInfo", auth , async(req,res) => {
  try{
    let user = await UserModel.findOne({_id:req.tokenData._id},{password:0});
    res.json(user);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})




// sign up - req for add new user
router.post("/", async(req,res) => {
  let validBody = validateUser(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let user = new UserModel(req.body);
    // bcrypt the pass 
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    // hidding the pass word
    user.password = "***"
    res.json(user);
  }
  catch(err){
    if(err.code == 11000){
      return res.status(400).json({msg:"Email already in system",code:11000})
    }
    console.log(err);
    res.status(502).json({err})
  }
})
// req for user to kog in to the system
router.post("/logIn", async(req,res) => {
  let validBody = validateLogin(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    // at first chak if there is email match
    let user = await UserModel.findOne({email:req.body.email})
    if(!user){
      return res.status(401).json({msg:"Email Worng."})
    }
    // camoer the pass with the bycrpt pass in the data base
    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
      return res.status(401).json({msg:"Password Worng."})
    }
    // send token - and role 
    let token = createToken(user._id, user.role)
    // res.json({token:token})
    res.json({token,role:user.role})
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})


router.patch("/changeRole/:id/:role", authAdmin , async(req,res) => {
  try{
    const id = req.params.id;
    const newRole = req.params.role;

    // 63b2a02cee44ada32ecbe89e -> admin@walla.com -> id
    if(id == req.tokenData._id || id == "63b2a02cee44ada32ecbe89e"){
      return res.status(401).json({err:"You cant change your user role or the super admin"})
    }
    const data = await UserModel.updateOne({_id:id},{role:newRole})
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})


module.exports = router;