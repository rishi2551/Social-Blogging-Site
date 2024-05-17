import react from "react";
import "./css/login.css";
import image from "./image/pexels-photo-598917.jpeg";
import { Link } from "react-router-dom";
const Login = () => {
    
  return (
    <>
      <body className="body">
        <div className="container">
          <div className="container1">
            <img className="image1" src={image} alt=""></img>
          </div>
          <div className="container2">
            <div className="login">
              <div>
                <h1>Login</h1>
              </div>
              <div className="user">
                <div className="email">
                  Usersname or Email
                </div>
                <div>
                  <input
                    type="text"
                    className="username"
                    placeholder="username or email"
                  />
                </div>
              </div>
              <div className="word">
              <div className="pass">Password</div>
              <div>
                <input
                  type="password"
                  className="password"
                  placeholder="password"
                />
              </div>
              </div>
            <div className="forgot">
                Forgot password
            </div>
                <div className="button">
                    <button className="b1">login</button>
                </div>
    <div className="link">
        Don't have an account ? <Link className="signuplink" to="/signup">Sign up now</Link> 
    </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};
export default Login;
