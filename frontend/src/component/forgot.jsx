import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { AiFillLock } from "react-icons/ai";

import "./css/forgot.css";
import { forgotpassword } from "../API/endpoint";
const Forgot=()=>{
    const navigation = useNavigate();
    const[forgotdata,setForgotdata]=useState({
        email:""
    })
    
    const fetchforgotpassword=async()=>{
        try{
            const res= await forgotpassword(forgotdata)
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }
    return(
        <>
        <div className="forgot-body">
            <div className="contain1">
                <div className="forgot-icon-div">
                <AiFillLock className="fill-lock" />
                </div>
                <div className="forgot-tittle">
                    Forgot Your Password
                </div>
                <div className="forgot-description">
                    please enter the email address you'd like your password reset information sent to
                </div>
                <div className="forgot-input-div">
                    <div className="forgot-input-tittle">Enter Email address</div>
                    <div className="forgot-input-email-div">
                    <input className="forgot-input-email" type="text" placeholder="Enter Email Address" onChange={(e)=>{setForgotdata({...forgotdata,email:e.target.value})}} />
                    </div>
                </div>
                <div className="forgot-button-div">
                    <button className="forgot-button" onClick={()=>fetchforgotpassword()}>
                        Request Reset Link
                    </button>
                </div>
                <div className="forgot-link-div"> 
                    <Link className="forgot-link" to="/"
                    >Back to Login</Link>
                  </div>
            </div>
        </div>
        </>
    )
}
export default Forgot