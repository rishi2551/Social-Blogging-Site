import { useState } from "react";
import "./css/createpost.css";
import Header from "./header";
import Footer from "./footer";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addblog } from "../API/endpoint";
import Upperheader from "./upperheader";
import { useDispatch } from "react-redux";
import { createpost } from "./redux/actions/post";
const Createpost = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const [logindetail, setLogindetail] = useState({
   title:"",
   description:"",
   image:""
  });
  const [errors, setErrors] = useState({});
  const handleSubmit = async() => {
    const error = {};
    if (!logindetail.title.trim()) {
      error.title = "title is required";
    }
    if (!logindetail.description.trim()) {
      error.description = "description is required";
    }
    
    else if  (Object.keys(errors).length === 0) {
      try{
      // const res = await axios.post("http://localhost:7061/blog/createblog",logindetail);
      const formData = new FormData()
      formData.append("title",logindetail.title)
      formData.append("description",logindetail.description)
      formData.append("image",logindetail.image)
        dispatch(createpost(formData))
        alert("create blog successful");
        navigate("/main");
    }catch(err){
      console.log(err)
    }
  }
    setErrors(error);
  };
  console.log(logindetail,'fdkdfk')
  return (
    <>
      <Upperheader></Upperheader>
      <div className="cont">
        <div className="body14">
          {/* <div className="blog1 post">BLOG POST</div> */}

          <div className="main">
            <div>
              <h1>Add post</h1>
            </div>
            <div className="Title">
              <input
                className="titl"
                type="text"
                placeholder="title"
                value={logindetail.title}
                onChange={(e) => {
                  setErrors({});
                  setLogindetail({ ...logindetail, title: e.target.value });
                }}
              />
            </div>
            <div className="error">
              {errors.title && (
                <span style={{ color: "red" }}>{errors.title}</span>
              )}
            </div>
            <div className="description">
              
              <textarea
                className="des"
                type="text"
                placeholder="Descirption"
                value={logindetail.description}
                onChange={(e) => {
                  setErrors({});
                  setLogindetail({ ...logindetail, description: e.target.value });
                }}
              />
            </div>
            <div className="error">
              {errors.description && (
                <span style={{ color: "red" }}>{errors.description}</span>
              )}
            </div>
            <div className="file">
              <input
                className="f"
                type="file"
                // value={logindetail.image}
                onChange={(e) => {
                  setErrors({});
                  if(e.target.files.length){
                    const selectedFile = e.target.files[0]
                    setLogindetail({...logindetail,image:selectedFile})
                  }else{
                    setLogindetail({...logindetail,image:{}})
                  }
                  // setLogindetail({ ...logindetail, image: e.target.value });
                }}
              />
            </div>
            <div className="b">
              <button className="b5" onClick={()=>{handleSubmit()}}>
                create
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};
export default Createpost;
