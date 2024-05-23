import express from "express";
import { User } from "../models/user.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken"
import { applyMiddleware } from "../middleware/auth.js";
import { upload } from "../middleware/fileUpload.js";
import nodemailer from "nodemailer";
const authRouter = express.Router();
const transporter = nodemailer.createTransport({
  service:"gmail", 
  auth: {
    user: "projecttraining848@gmail.com",
    pass: "ocpq mqbg olwz mvui",
  },
})
authRouter.post("/send-mail",async(req,res)=>{
  const {email}=req.body
  try{
    const user=await User.findOne({email});
    if(!user){
      return res.status(404).json({message:"email is not found "})
    }
    const mailoption={
      from:"projecttaining848@gmail.com",
      to:email,
      subject:"forgot Password",
      text:`click on this link for reset password. https://adventure-archive-2b9k.onrender.com/reset/${email}`
    }
    await transporter.sendMail(mailoption)
    res.status(200).json({message:"email is sent successfully"})
  }catch(err){
    res.status(500).json({message:"email is not sent", error:err.message})
  }

});

authRouter.post("/signup", async (req,res) => {
  try {
    const { username, email, password, comfimpassword } = req.body
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ message: "user already existed" });
    }
    const passwordvalue = 10;
    const hashPassword = await bcrypt.hash(password, passwordvalue);
    const user = new User({
        username,
        email,
        password: hashPassword,
    });
    await user.save();
    res.status(201).json({
      message: "user is successfully created",
    });
  } catch(err) {
    console.log(err);
  }
});

authRouter.post("/reset-password/:email",async(req,res)=>{
  const email=req.params.email;
    const{newpassword}=req.body;
    try{
      const user=await User.findOne({email});
      if(!user){
        return res.status(400).json({message:"User not exist"})
      }
      const saltvalue=10
      const hashpassword=await bcrypt.hash(newpassword,saltvalue);
      user.password=hashpassword
      await user.save();
      res.status(200).json({message:"password is reset succesfully"})
    }
    catch(err){
      console.log(err,"error during the reset-password");
    }
})
//profile get api
authRouter.get("/profile/:id",applyMiddleware,async(req,res)=>{
  const userId=req.params.id;
    try{
        const user=await User.findById(userId);
        if(!user){
          return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user profile retrieved successfully",user})
    }catch(err){
        console.log(err)
    }
}) 
//profile update api
authRouter.put("/profile/:id",async(req,res)=>{
  const userId=req.params.id;
  try{
    const user=await User.findById(userId).select("-password");
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    const {username,email,mobileNo,country,state,zipcode}=req.body;
    user.username=username ||user.username
    user.email=email ||user.email
    user.mobileNo=mobileNo ||user.mobileNo
    user.country=country ||user.country 
    user.state=state ||user.state
    user.zipcode=zipcode ||user.zipcode
    await user.save()
    res.status(200).json({message:"user profile is successfully updated",user});
  }catch(err){
    console.log(err,"error in api")
  }
})
authRouter.patch("/profile/:id",upload.single("profilePhoto"),async(req,res)=>{
  const userId=req.params.id;
  try{
    const profilePhoto=req.file.path;
    const user=await User.findById(userId)
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    user.profilePhoto=profilePhoto;
    await user.save()
    res.status(200).json({message:"user profile photo successfully updated",user})
  }catch(err){
    console.log(err,"error in api")
  }
})
authRouter.patch("/profilecoverphoto/:id",upload.single("coverPhoto"),async(req,res)=>{
  const userId=req.params.id;
  try{
    const coverPhoto=req.file.path;
    const user=await User.findById(userId)
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    user.coverPhoto=coverPhoto;
    await user.save()
    res.status(200).json({message:"user profile photo successfully updated",user})
  }catch(err){
    console.log(err,"error in api")
  }
})


authRouter.post("/login",async(req,res)=>{
  const {email,password}=req.body
  if(!email||!password){
    return res.status(400).json({message:"all field are required"});
  }
  const existinguser=await User.findOne({email})
    if(!existinguser){
      return res.status(400).json({message:"user not exist"})
    }
    const matchpassword=await bcrypt.compare(password,existinguser.password);
    if(!matchpassword){
      return res.status(400).json({message:"invalid password"})
    }
    const token=jwt.sign(
      {userId:existinguser._id},
    process.env.JWT_SECRET_KEY
    )
    console.log(token)
    
    const userId=existinguser._id
    console.log(userId)
    res.status(200).json({message:"login sucessfully",token,userId})
})
authRouter.patch("/change-password/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const saltValue = 10;
    const hashPassword = await bcrypt.hash(newPassword, saltValue);
    const oldpassword = await bcrypt.compare(oldPassword, user.password);
    if (oldpassword) {
      user.password = hashPassword;
    }
    await user.save();
    res.status(200).json({ message: "Change password successfully!" });
  } catch (error) {
    console.log(error, "change password error!");
  }
});

export default authRouter;
