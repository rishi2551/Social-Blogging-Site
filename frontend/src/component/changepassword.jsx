import React, { useState } from "react";
import { FaUserLock } from "react-icons/fa";
import { BiLockAlt } from "react-icons/bi";
import Upperheader from "./upperheader";
import "./css/reset.css"
import { useDispatch } from "react-redux";
import {  useParams } from "react-router-dom";
import { handlechangepassword } from "./redux/actions/post";
const Changepassword=()=>{
    const dispatch=useDispatch()
    const profileId=useParams()
    const userId = profileId.id
    console.log(userId)
    const[passworddata,setPassworddata]=useState({
        oldPassword:"",
        newPassword:""
    })
    console.log(passworddata,"12")
    const handlechange=()=>{
        dispatch(handlechangepassword({passworddata,userId}))
    }

    return(
        <>
        <Upperheader></Upperheader>
      <div className="change-body">
        <div className="contain1">
            <div className="reset-icon-div"><FaUserLock className="userlock" /></div>
          <div className="reset-tittle">Change Password</div> 
          {/* <div className="reset-email-div">
            <div className="reset-email">Email</div>
            <div className="reset-email-input-div">
              <input className="reset-email-input" type="text" placeholder="email" onChange={(e)=>setResetdata({...resetdata,email:e.target.value})}/>
            </div>
          </div> */}
          <div className="reset-newpassword-div">
            <div className="reset-newpassword">Old Password</div>
            <div className="reset-newpassword-input-div">
                <div className="reset-input-icon">
                <BiLockAlt className="lockalt"/>
                </div>
            
              <input className="reset-newpassword-input" type="password" placeholder="Old Password" value={passworddata.oldPassword} onChange={(e)=>setPassworddata({...passworddata,oldPassword:e.target.value})}/>
            </div>
          </div>
          <div className="reset-comfirmpassword-div">
            <div className="reset-comfirmpassword">New Password</div>
            <div className="reset-comfirmpassword-input-div">
            <div className="reset-input-icon">
                <BiLockAlt className="lockalt"/>
                </div>
              <input className="reset-comfirmpassword-input" type="password" placeholder="New Password" value={passworddata.newPassword} onChange={(e)=>setPassworddata({...passworddata,newPassword:e.target.value})}/>
            </div>
          </div>

          <div className="reset-button-div">
            <button className="reset-button" onClick={()=>handlechange()}>submit</button>
          </div>
        </div>
      </div>
    </>
    )
}
export default Changepassword