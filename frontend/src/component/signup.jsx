
import "./css/Signup.css"
import image2 from "../image/pexels-photo-821749.webp";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { signupdetail } from "../API/endpoint";
const Signup=()=>{
    const navigate=useNavigate()
    const [logindetail, setLogindetail] = useState({
      username:"",
      email: "",
      password:"",
      comfirmpassword:""
  });
  const [errors, setErrors] = useState({});
  const handleSubmit = async() => {
    const error = {};
    if (!logindetail.username.trim()) {
      error.username = "username is required";
    }
    if (!logindetail.email.trim()) {
      error.email = "Email is required";
    }
    if (!logindetail.password.trim()) {
      error.password = "password is required";
    }
    if (!logindetail.comfirmpassword.trim()) {
      error.comfirmpassword = "comfirmpassword is required";
    }
    else if (Object.keys(errors).length === 0) {
      const res = await signupdetail(logindetail);
        alert("Signup successful");
        navigate("/");
    }
    
    setErrors(error);
  };
    return(
        <>
            <body className="body7">
        <div className="contain2">
         
          <div className="signup-container">
            <div className="signup">
              <div className="text-signup">
                <h1>Signup</h1>
              </div>
                <div className="signup-username">
                <div className="email2">
                  Username 
                </div>
                <div>
                  <input
                    type="text"
                    className="username2"
                    placeholder="Username"
                    value={logindetail.username}
                    onChange={(e) => {
                      setErrors({});
                      setLogindetail({ ...logindetail, username: e.target.value });
                    }}
                  />
                </div>
                <div className="error">
              {errors.username && (
                <span style={{ color: "red" }}>{errors.username}</span>
              )}
            </div>
                </div>

                <div className="signup-username">
                <div className="email2">
                  Email 
                </div>
                <div>
                  <input
                    type="text"
                    className="username2"
                    placeholder="Email"
                    value={logindetail.email}
                    onChange={(e) => {
                      setErrors({});
                      setLogindetail({ ...logindetail, email: e.target.value });
                    }}
                  />
                </div>
                <div className="error">
              {errors.email && (
                <span style={{ color: "red" }}>{errors.email}</span>
              )}
            </div>
                </div>

                <div className="signup-username">
                    <div className="pass2">Create Password</div>
              <div>
                <input
                  type="password"
                  className="password2"
                  placeholder="Create Password"
                  value={logindetail.password}
                  onChange={(e) => {
                    setErrors({});
                    setLogindetail({ ...logindetail, password: e.target.value });
                  }}
                />
              </div>
              <div className="error">
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password}</span>
              )}
            </div>
              </div>

                <div className="signup-username">
                <div className="pass2">Comfirm Password</div>
              <div>
                <input
                  type="password"
                  className="password2"
                  placeholder="Comfirm Password"
                  value={logindetail.comfirmpassword}
                  onChange={(e) => {
                    setErrors({});
                    setLogindetail({ ...logindetail, comfirmpassword: e.target.value });
                  }}
                />
              </div>
              <div className="error">
              {errors.comfirmpassword && (
                <span style={{ color: "red" }}>{errors.comfirmpassword}</span>
              )}
            </div>
                </div>

                <div className="button2">
                    <button onClick={()=>handleSubmit()} className="b2">signup</button>
                </div>
                <div className="login-link">
        if you have an account ? <Link className="loginlink" to="/">login now</Link> 
    </div>
            </div>
          </div>
          <div className="contain3">
            <img className="signup-image" src={image2} alt=""></img>
          </div>
        </div>
      </body>
        </>
    )
}
export default Signup