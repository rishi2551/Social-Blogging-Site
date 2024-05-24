import { useState } from "react";
import "./css/login.css";
import image from "../image/pexels-photo-598917.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logindetailapi } from "../API/endpoint";
const Login = () => {
  const[loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const [logindetail, setLogindetail] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const handleSubmit = async() => {
    const error = {};
    if (!logindetail.email.trim()) {
      error.email = "Email is required";
    }
    if (!logindetail.password.trim()) {
      error.password = "password is required";
    }
    else if  (Object.keys(errors).length === 0) {
      // const res = await axios.post("http://localhost:7061/auth/login",logindetail);
      const res= await logindetailapi(logindetail)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId",res.data.userId);
        
        navigate("/main");
      }
    }
    setErrors(error);
  };
  const notify = () => toast("Login Successfully");

  return (
    <>
    
      <div className="body12">
        <div className="contain">
          <div className="container1">
            <img className="image1" src={image} alt=""></img>
          </div>
          <div className="container2">
            <div className="login">
              <div className="text-login">
                <h1>Login</h1>
              </div>
              <div className="user">
                <div className="email">Username or Email</div>
                <div>
                  <input
                    type="text"
                    className="username"
                    placeholder="username or email"
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
              <div className="word">
                <div className="pass">Password</div>
                <div>
                  <input
                    type="password"
                    className="password"
                    placeholder="password"
                    value={logindetail.password}
                    onChange={(e) => {
                      setErrors({});
                      setLogindetail({
                        ...logindetail,
                        password: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="error">
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password}</span>
              )}
            </div>
              </div>
              <div className="forgot"><Link className="forgot" to="/forgot">Forgot password</Link></div>
              <div className="button1">
                <button className="b1" onClick={()=>{handleSubmit();notify()}}>
                  login
                </button>
              </div>
              <div className="link">
                Don't have an account ?{" "}
                <Link className="signuplink" to="/signup">
                  Sign up now
                </Link>
              </div>
            </div>
          </div>
        </div>
     
      </div>
    </>
  );
};
export default Login;
 