import "./App.css";
import Login from "./component/login";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Main from "./component/main";
import Createpost from "./component/createpost";
import Signup from "./component/signup";
import { useEffect } from "react";
import Card from "./component/card";
import Updated from "./component/updatepage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Userprofile from "./component/user-profile";
import Forgot from "./component/forgot";
import Reset from "./component/reset";
import Blogdetail from "./component/blogdetail";
import Usecounter from "./component/usecounter";
import Changepassword from "./component/changepassword";
function App1() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/main");
    } //else {
    //   navigate("/");
    // }
  }, []);
  return (
    <>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/main" element={<Main></Main>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/createpost" element={<Createpost></Createpost>}></Route>
        <Route path="/update/:id" element={<Updated></Updated>}></Route>
        <Route
          path="/Blogdetail/:id"
          element={<Blogdetail></Blogdetail>}
        ></Route>

        <Route
          path="/userprofile"
          element={<Userprofile></Userprofile>}
        ></Route>
        <Route path="/forgot" element={<Forgot></Forgot>}></Route>
        <Route path="/reset/:email" element={<Reset></Reset>}></Route>
        <Route path="/changepassword/:id" element={<Changepassword></Changepassword>}></Route>
      </Routes>
    </>
  );
}
function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <App1></App1>
      </BrowserRouter>
    </>
  );
}
export default App;
