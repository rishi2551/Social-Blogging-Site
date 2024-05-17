import { useEffect, useState } from "react";
import "./css/blogpost.css";
import { useNavigate } from "react-router-dom";
import Card from "./card";
import { filterAPI, getData } from "../API/endpoint";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import { getpost } from "./redux/actions/post";
const Blogpost = () => {
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  const {posts}=useSelector((state)=>state.Posts)
  const dispatch=useDispatch()
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  
  const [getdata, setGetdata] = useState([]);

  const fetchdata = async () => {
    try {
      const res = dispatch(getpost())
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
      dispatch(getpost())
  }, [render]);
  const notify = () => toast("Logout Successfully");
  return (
    <>
    <Header setGetdata={setGetdata}></Header>
      <div className="container5">
        <div className="createpost">
          <div className="blog1">BLOG POST</div>

          {/* <div className="bu2">
            <button className="button" onClick={() => navigate("/createpost")}>
              Create post
            </button>
          </div> */}

        </div>
       {
        posts?.length ? <div className="main-map">
         {posts?.map((item, index) => {
            return<Card item={item} render={render} setRender={setRender}></Card>
          })}</div>
        : <span>no blogs</span>
       } 
       
       </div>
    </>
  );
};
export default Blogpost;
