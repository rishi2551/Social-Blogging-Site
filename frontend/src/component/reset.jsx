import React, { useState } from "react";
import "./css/reset.css";
import { FaUserLock } from "react-icons/fa";
import { BiLockAlt } from "react-icons/bi";
import {useNavigate,useParams} from"react-router-dom";
import { resetpassword } from "../API/endpoint";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Reset = () => {
    const navigation=useNavigate()
    const getemail=useParams()
      const[resetdata,setResetdata]=useState({
        newpassword:""
      })
     
      console.log(getemail)
      const mail=getemail.email
      console.log(mail)
      const fetchresetdata=async()=>{
          try{
            const res=await resetpassword(mail,resetdata)
            console.log(res.data)
            navigation("/")
          }catch(err){
            console.log(err)
          }
      }
      const notify = () => toast("Logout Successfully");
  return (
    <>
      <div className="reset-body">
        <div className="contain1">
            <div className="reset-icon-div"><FaUserLock className="userlock" /></div>
          <div className="reset-tittle">Reset Password</div> 
          {/* <div className="reset-email-div">
            <div className="reset-email">Email</div>
            <div className="reset-email-input-div">
              <input className="reset-email-input" type="text" placeholder="email" onChange={(e)=>setResetdata({...resetdata,email:e.target.value})}/>
            </div>
          </div> */}
          <div className="reset-newpassword-div">
            <div className="reset-newpassword">New Password</div>
            <div className="reset-newpassword-input-div">
                <div className="reset-input-icon">
                <BiLockAlt className="lockalt"/>
                </div>
            
              <input className="reset-newpassword-input" type="password" placeholder="New Password" onChange={(e)=>setResetdata({...resetdata,newpassword:e.target.value})} />
            </div>
          </div>
          <div className="reset-comfirmpassword-div">
            <div className="reset-comfirmpassword">Comfirm Password</div>
            <div className="reset-comfirmpassword-input-div">
            <div className="reset-input-icon">
                <BiLockAlt className="lockalt"/>
                </div>
              <input className="reset-comfirmpassword-input" type="password" placeholder="Comfirm Password" />
            </div>
          </div>

          <div className="reset-button-div">
            <button className="reset-button" onClick={()=>{fetchresetdata();notify()}}>submit</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Reset;
