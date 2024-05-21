import mongoose from "mongoose";

const Userschema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  comfirmpassword: {
    type: String,
  },
  country:{
    type:String,
    default:""
  },
  state:{
    type:String,
    default:""
  },
  zipcode:{
    type:String,
    default:""
  },
  mobileNo:{
    type:String,
    default:""
  },
  profilePhoto:{
    type:String,
    default:""
  },
  coverPhoto:{
    type:String,
    default:""
  }
});
export const User = mongoose.model("User", Userschema);
