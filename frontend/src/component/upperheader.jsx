import "./css/header.css";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../image/echoes-high-resolution-logo.png";
import { useEffect } from "react";
import logo from "../image/adventure-archive-high-resolution-logo-transparent (1).png";
import logo1 from "../image/2406722-removebg.png"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  profilehandle,
} from "./redux/actions/post";
const Upperheader = () => {
  const navigate = useNavigate();
  const profileId = localStorage.getItem("userId");
  const { Profile } = useSelector((state) => state.Posts);
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("token");
 
  };

  useEffect(() => {
    dispatch(profilehandle({ profileId }));
  }, []); 
    return (
      <>
  
        <header className="header2">
        <div className="container3">
          <div className="inside-header">
          <div
              className="right-top-inside-header"
              onClick={() => navigate("/main")}
            >
              <img className="logo-image1" src={logo1} alt="" />
               <img className="logo-image" src={logo} alt="" /> 
            </div>
            <div className="left-top-inside-header">
              <div className="image-inside-header">
                <img
                  class="image-top-inside-header-profile"
                  src={`${process.env.REACT_APP_API}/${Profile?.user?.profilePhoto}`}
                />
              </div>
              <div class="paste-button">
                <button class="button-username">
                  {Profile?.user?.username}▼
                </button>
                <div class="dropdown-content">
                  <Link id="top" to="/userprofile">
                    {Profile?.user?.username}
                  </Link>
                  <a id="middle" href="#">
                    Change Password
                  </a>
                  <Link id="bottom" to="/" onClick={()=>logout()} >
                    LogOut
                  </Link>
                </div>
              </div>
            </div>
          </div>
          </div>
        </header>
       
        
          
        
      </>
    );
};
export default Upperheader;
